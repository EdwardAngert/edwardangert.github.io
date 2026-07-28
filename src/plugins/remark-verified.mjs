import GithubSlugger from 'github-slugger';
import { toString as mdastToString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

/**
 * Collects every <Verified> component on a page into page frontmatter, so the
 * stale report and llms.txt generation read structured data instead of parsing
 * MDX.
 *
 * Verification metadata lives next to the content it describes. This plugin
 * only derives the index; it never becomes the place the dates are authored.
 * That is why there is no anchor-resolution check here: there are no anchor
 * keys to resolve, because the component sits inside the section it describes
 * and cannot drift from it.
 *
 * Writes `verified` to frontmatter: an array of
 * { anchor, heading, depth, date, method }.
 *
 * Deliberately does NOT derive a page-level date. Page-level "last touched" is
 * Starlight's `lastUpdated`, derived from git, and it answers a different
 * question: when the file changed, not when its claims were confirmed. Rolling
 * the badges up into one page number was tried and rejected: taking the oldest
 * made a page whose key claim was tested today advertise itself as years stale,
 * destroying the very recency signal the badges exist to provide.
 *
 * Also injects a `section` prop into each <Verified> node, so the rendered
 * badge can state which heading it belongs to for screen readers and for
 * anything extracting the badge away from its surrounding context. The author
 * never types it; it is resolved from the preceding heading.
 */

export const VERIFICATION_METHODS = ['tested', 'vendor-docs', 'community', 'inherited'];

/**
 * Month precision, deliberately. Community and vendor evidence usually cannot
 * be pinned to a day, so a day would be invented precision, and month is the
 * right resolution for judging staleness.
 *
 * A day is accepted and discarded rather than rejected. Writing the full date
 * is the natural thing to do, especially when copying one off a commit or a
 * forum post, and failing the build over it would be pedantry. Normalising
 * here means the component, the rendered output, and the frontmatter index all
 * see the same month-precision value, so nothing downstream has to care which
 * form the author used.
 */
const ISO_MONTH_OR_DATE = /^(\d{4}-\d{2})(?:-\d{2})?$/;

/** Reads a plain string prop off an MDX JSX node, ignoring expression values. */
function readStringAttribute(node, name) {
  const attribute = node.attributes?.find(
    (attr) => attr.type === 'mdxJsxAttribute' && attr.name === name
  );
  if (!attribute) return undefined;
  // Expression values (date={foo}) arrive as objects; treat them as unusable
  // rather than silently stringifying them into the index.
  return typeof attribute.value === 'string' ? attribute.value : null;
}

/** The current month at UTC, so the current month never counts as the future. */
function utcThisMonth() {
  const now = new Date();
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1);
}

export function remarkVerified() {
  return function transformer(tree, file) {
    const frontmatter = file.data?.astro?.frontmatter;
    if (!frontmatter) return;

    // github-slugger is what Astro uses to build heading ids. Run it over
    // every heading in document order, including unbadged ones, so the
    // duplicate-heading counters line up with the anchors Astro emits.
    const slugger = new GithubSlugger();
    const collected = [];
    let section = null;

    visit(tree, (node) => {
      if (node.type === 'heading') {
        const heading = mdastToString(node);
        section = { anchor: slugger.slug(heading), heading, depth: node.depth };
        return;
      }

      const isJsx = node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement';
      if (!isJsx || node.name !== 'Verified') return;

      const date = readStringAttribute(node, 'date');
      const method = readStringAttribute(node, 'method');

      if (date === undefined) {
        file.fail('<Verified> is missing a `date` prop.', node);
      }
      if (date === null) {
        file.fail(
          '<Verified> `date` must be a literal string like "2026-05", not an expression.',
          node
        );
      }
      const dateMatch = ISO_MONTH_OR_DATE.exec(date);
      if (!dateMatch) {
        file.fail(
          `<Verified> \`date\` must be YYYY-MM. Received: "${date}". ` +
            'A full YYYY-MM-DD is accepted too, but the day is discarded.',
          node
        );
      }
      // Everything downstream sees month precision, whichever form was written.
      const month = dateMatch[1];

      const parsed = Date.parse(`${month}-01T00:00:00Z`);
      if (Number.isNaN(parsed)) {
        file.fail(`<Verified> \`date\` is not a real month: "${date}".`, node);
      }
      if (parsed > utcThisMonth()) {
        file.fail(
          `<Verified> \`date\` is in the future: "${date}". A date you cannot support yet is worse than no date.`,
          node
        );
      }

      // Rewrite the prop so the component receives the normalised value and
      // never has to decide how to render a day it is going to drop.
      for (const attr of node.attributes) {
        if (attr.type === 'mdxJsxAttribute' && attr.name === 'date') {
          attr.value = month;
        }
      }

      if (method === undefined) {
        file.fail(
          `<Verified> is missing a \`method\` prop. Use one of: ${VERIFICATION_METHODS.join(', ')}.`,
          node
        );
      }
      if (!VERIFICATION_METHODS.includes(method)) {
        file.fail(
          `<Verified> \`method\` must be one of ${VERIFICATION_METHODS.join(', ')}. Received: ${JSON.stringify(method)}.`,
          node
        );
      }

      // Tell the component which section it sits in, so the badge can name its
      // referent instead of rendering a date with no stated subject.
      if (section?.heading) {
        node.attributes.push({
          type: 'mdxJsxAttribute',
          name: 'section',
          value: section.heading,
        });
      }

      collected.push({
        // A badge before the first heading describes the page as a whole.
        anchor: section?.anchor ?? null,
        heading: section?.heading ?? null,
        depth: section?.depth ?? null,
        date: month,
        method,
      });
    });

    if (collected.length === 0) return;

    frontmatter.verified = collected;
  };
}

export default remarkVerified;
