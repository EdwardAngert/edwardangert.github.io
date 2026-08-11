import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

/**
 * Puts the generated Claude Code one-pagers into the sidebar for their own
 * route only.
 *
 * The one-pagers are deliberately absent from the global sidebar in
 * `astro.config.mjs`: four near-identical entries would bury the rest of the
 * Pi-hole guide. But a page missing from the sidebar has two problems, and
 * this fixes both at once:
 *
 * 1. Nothing in the navigation shows where the reader is.
 * 2. `Breadcrumbs.astro` takes its labels from the sidebar Starlight built
 *    for the route, so the last crumb falls back to a title-cased slug and
 *    renders as "Over Ssh Dedicated User", in the visible trail and in the
 *    BreadcrumbList structured data.
 *
 * Injecting the current page under the Claude Code Access group solves both,
 * because the breadcrumb component reads the sidebar this middleware just
 * edited.
 */

/** Sidebar labels for the generated one-pagers, keyed by URL path. */
const ONE_PAGERS: Record<string, string> = {
	'/docs/pi-hole/claude-code-access/on-the-pi/': 'On the Pi',
	'/docs/pi-hole/claude-code-access/on-the-pi-dedicated-user/': 'On the Pi, dedicated user',
	'/docs/pi-hole/claude-code-access/over-ssh/': 'Over SSH',
	'/docs/pi-hole/claude-code-access/over-ssh-dedicated-user/': 'Over SSH, dedicated user',
};

/** The sidebar group these get nested into, matched on an entry it contains. */
const GROUP_ANCHOR = '/docs/pi-hole/claude-code-access/';

type Entry = {
	type: 'link' | 'group';
	label: string;
	href?: string;
	entries?: Entry[];
	isCurrent?: boolean;
	attrs?: Record<string, unknown>;
	badge?: unknown;
};

/** Depth-first: does this subtree contain a link to `href`? */
function contains(entries: Entry[], href: string): boolean {
	return entries.some((e) =>
		e.type === 'group' ? contains(e.entries ?? [], href) : e.href === href
	);
}

function inject(entries: Entry[], pathname: string, label: string): boolean {
	for (const entry of entries) {
		if (entry.type !== 'group') continue;
		const children = entry.entries ?? [];
		if (contains(children, GROUP_ANCHOR)) {
			children.push({
				type: 'link',
				label,
				href: pathname,
				isCurrent: true,
				attrs: {},
				badge: undefined,
			});
			return true;
		}
		if (inject(children, pathname, label)) return true;
	}
	return false;
}

export const onRequest = defineRouteMiddleware((context) => {
	const label = ONE_PAGERS[context.url.pathname];
	if (!label) return;

	const route = (context.locals as { starlightRoute?: { sidebar?: Entry[] } }).starlightRoute;
	if (!route?.sidebar) return;

	inject(route.sidebar, context.url.pathname, label);
});
