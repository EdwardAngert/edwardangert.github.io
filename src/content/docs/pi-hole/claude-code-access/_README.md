# claude-code-access: how this section is built

Read this before editing anything in this directory.

## The one rule

**Edit the staged pages. Never edit a one-pager.**

This guide is published in two shapes:

| Shape | Files | Edit? |
|---|---|---|
| Staged guide, tabbed | `index.mdx`, `set-up.mdx`, `extend.mdx` | **Yes.** Source of truth |
| One-pagers, tabs resolved | `on-the-pi.mdx`, `on-the-pi-dedicated-user.mdx`, `over-ssh.mdx`, `over-ssh-dedicated-user.mdx` | **No.** Generated |

`scripts/build-onepagers.mjs` reads the three staged pages, resolves both tab
axes to one fixed combination, and writes the four one-pagers. They are
committed, the same way `public/llms-full.txt` is.

```shell
pnpm build:onepagers   # regenerate
pnpm lint:onepagers    # fail if the committed output is stale
```

`pnpm build` regenerates before `astro build`, and `pnpm lint` runs the check,
so a hand-edited one-pager fails rather than quietly drifting.

## Markers

Two directives, both written as MDX comments immediately above the `##` they
apply to. Keep the vocabulary this small: every extra marker is another way
for the two shapes to diverge.

```mdx
{/* onepager:skip — a one-pager reader has already made this choice */}
## Choose Your Setup
```

`onepager:skip` drops that whole section from the generated pages. Used for
the decision sections, which make no sense on a page where the decision is
already baked in.

The generator resolves tabs by matching `syncKey` to a tab label, so no marker
is needed for the branching itself.

## Tabs

Two synced axes. Sync matches on **tab label text**, and a mismatched label
fails silently with no build error, so keep these byte-identical everywhere:

| `syncKey` | Labels |
|---|---|
| `cc-location` | `On the Pi` / `From a workstation` |
| `cc-identity` | `Your login user` / `Dedicated agent user` |

A new label value means a new one-pager combination, so add it to `COMBOS` in
the generator too, or generation throws.

**Prose must read correctly with the tab chrome removed.** A one-pager has no
tabs, so a sentence like "the workstation tab above" breaks there. The
`--check` run cannot catch this. It is a review habit.

## Which pages are indexed

| Page | Indexed | Why |
|---|---|---|
| `index.mdx` | yes | The hub. Overview, decisions, routing. Not a duplicate |
| the four one-pagers | yes, self-canonical | The search and AI-facing product |
| `set-up.mdx`, `extend.mdx` | **no** (`noindex, follow`) | Same content as the one-pagers |

Two places must agree, or search engines get a contradictory signal: the
`noindex` in each staged page's frontmatter `head:`, and the `sitemap({ filter })`
call in `astro.config.mjs`.

## File naming

Non-page files here **must** start with `_`.

Starlight globs `**/[^_]*.{md,mdx,mdoc}`, which tests the *filename*, not the
directory. A `_partials/` folder does not protect the files inside it: they
load, fail schema validation for a missing `title`, and break the build. This
README is `_README.md` for that reason.

## Sidebar and breadcrumbs

The one-pagers are deliberately absent from the sidebar in `astro.config.mjs`;
four near-identical entries would bury the rest of the Pi-hole guide.

`src/starlightRouteData.ts` injects the current one-pager into its own route's
sidebar. That does two jobs at once, and the second is not obvious:

1. the reader sees where they are, with the current page marked
2. `Breadcrumbs.astro` reads its labels from the sidebar Starlight built for
   that route, so the injection is what gives the last crumb a real name

If a breadcrumb suddenly reads `Over Ssh Dedicated User`, the middleware
stopped matching that route. The `claude-code-access` segment itself is named
by `SEGMENT_OVERRIDES` in `Breadcrumbs.astro`, because the sidebar labels it
"Overview and setup choices", which is right in a sidebar and wrong in a trail.

## When you change a section

1. Edit the staged page.
2. Run `pnpm build`, which regenerates the one-pagers.
3. Check the tab label counts per `syncKey` still balance in the built HTML.
4. Regenerate `public/llms-full.txt` from the **staged** pages only. Putting
   the one-pagers in would land the same procedure in the grounding file four
   times.
5. Update `public/llms.txt` if a title or description changed.

## Background

`drafts-research/pi-hole-agent-access-study.md`, a sibling of this repo,
records why the content says what it says: the findings that overturned the
original version, the container tests behind the ACL claims, and the review
rounds that produced the current text.
