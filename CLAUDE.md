# edwardangert.github.io

Astro + Starlight site. Package manager is `pnpm`. Main branch is `main`.

```shell
pnpm build          # must pass before any commit
pnpm lint           # markdownlint + Vale
pnpm lint:vale      # Vale only, via scripts/vale.sh
```

## Writing

- **Never use em dashes** in prose you write. Use a hyphen, a comma, or rewrite
  the sentence. Leave the user's own existing em dashes alone; they use them
  deliberately in first-person site prose.
- **No knowing flourish clauses**, the "for reasons nobody understood" wink.
  They read as machine-written. If one is cut, don't argue it back.
- Headings are **title case**. `Google.Headings` is disabled in `.vale.ini`
  for exactly this reason.
  - **Exception: symptom headings in troubleshooting pages stay sentence case**
    ("Gravity fails to update", not "Gravity Fails to Update"). They are phrased
    the way a reader describes the problem, which is also how the query arrives.
    Don't normalize them to title case. Task and concept headings on those same
    pages stay title case ("Fix List Health Issues").
- One sentence per line in docs prose. Line length is not enforced
  (`MD013` is off) because one-sentence-per-line makes lines intentionally long.

## Code blocks

Every code block renders with a copy button, so a reader copies the whole
block at once.

- Multiple commands that should run in sequence must be chained with `&&`
  (use `&& \` across lines), so a failure stops the run.
- Commands that are **expected to fail**, such as permission checks, must be
  in separate blocks. Chaining them with `&&` would stop at the first one and
  silently skip the rest.

## Verification badges

`<Verified date="YYYY-MM" method="..." />` goes immediately after the heading
it applies to, never inside it. Methods are `tested`, `vendor-docs`,
`community`, `inherited`, and they mean different things:

- `tested` means run on real hardware, not reasoned about and not run in a
  container standing in for it.
- `vendor-docs` covers claims traced to vendor documentation or vendor source.

`src/plugins/remark-verified.mjs` collects these and fails the build on future
dates or bad methods.

## Content collection gotcha

Starlight globs `**/[^_]*.{md,mdx,mdoc}` under `src/content/docs/`. That tests
the **filename**, not the directory.

Any non-page file in there must start with `_`, or the build fails with
`InvalidContentEntryDataError ... title: Required`. A `_partials/` directory
does **not** protect the files inside it. This is why you cannot put a
`CLAUDE.md` inside a docs directory, and why `CLAUDE.md.example` is safe
(it does not end in `.md`).

## The Pi-hole guide

`src/content/docs/pi-hole/` is the site's most-referenced work and its main
value as an AI grounding source.

**`src/content/docs/pi-hole/claude-code-access/` is composed from partials.
Read `_README.md` in that directory before editing anything in it.** The short
version: every word lives in exactly one partial, pages only compose, and
editing prose directly inside a composed page silently forks the two published
shapes of the same guide.

When you add, remove, rename, or change the title/description/body of any page
under `src/content/docs/pi-hole/`, treat these as part of the change:

1. `public/llms.txt`, the site index for AI tools.
2. The sidebar in `astro.config.mjs`, and `src/content/docs/pi-hole/index.mdx`.

**`public/llms-full.txt`, the full text of the Pi-hole guide only, is a
merge-prep step, not a per-edit one.** Don't hand-edit it alongside a content
change; it drifts too easily and hand-edits have already broken it twice
(see `.docs-assist/reports/llms-generation-plan.md`). Regenerate it only when
asked to get a branch ready to merge.

## Breadcrumbs

`src/components/Breadcrumbs.astro` builds its trail by splitting the URL and
takes each label from the sidebar Starlight built **for that route**, falling
back to a title-cased slug. A page missing from the sidebar gets an ugly
auto-label in both the breadcrumb and its `BreadcrumbList` structured data.

`pnpm lint:links` fails if the `NON_PAGE_PATHS` list in that file goes stale.
