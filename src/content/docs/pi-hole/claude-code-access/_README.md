# claude-code-access: how this section is built

Read this before editing anything in this directory.

## Current model

Three staged pages, tabbed, indexed, plus four one-pagers in their own
subdirectory:

- `index.mdx` - the hub. Overview, decisions, routing.
- `set-up.mdx` - create the account (if any), install Claude Code, grant read access.
- `extend.mdx` - optional write access, root diagnostics, revoke, the API alternative.
- `one-pagers/` - four complete, tab-free walkthroughs, one per setup
  combination, plus `one-pagers/index.mdx`, a picker page. See "One-pagers"
  below.

The two setup choices (`cc-location`: On the Pi / From a workstation, `cc-identity`:
Your login user / Dedicated agent user) are Starlight `<Tabs syncKey>` pairs. Sync
matches on **tab label text**, and a mismatched label fails silently with no build
error, so keep these byte-identical everywhere:

| `syncKey` | Labels |
|---|---|
| `cc-location` | `On the Pi` / `From a workstation` |
| `cc-identity` | `Your login user` / `Dedicated agent user` |

## Every command needs to be right for the reader in front of it

A code block titled `From the Pi` is a claim: this is what you type, verbatim, in
the context you're in. That claim is only true for a reader who chose "On the Pi."
A reader who chose "From a workstation" needs the same operation wrapped over SSH,
usually `ssh pi-hole-admin '<command>'` or, when the command needs `sudo`,
`ssh -t pi-hole-admin '<command>'` (`-t` is not optional there - without it there's
no terminal on the far end and `sudo` fails).

**Every `title="From the Pi"` block must be inside a `<Tabs syncKey="cc-location">`
branch with a correct workstation-side version, or carry its own reminder right next
to it.** A single explanatory note earlier on the page, however clearly worded, is
not sufficient - a reader working through a long page will not reliably remember it
and reapply it correctly twenty commands later. Check with:

```shell
pnpm lint:location-coverage         # scoped to lines changed since HEAD
node scripts/check-location-coverage.mjs --all   # full backlog, no diff scoping
```

Mark a block as deliberately exempt (rare - most things claiming "From the Pi"
really do need the other branch) with a comment on the line immediately above it:

```mdx
{/* location-fixed: reason */}
```shell title="From the Pi"
...
```
```

## History: one-pagers were generated, then dropped, then revived as partials

An earlier version of this section generated four flat, self-contained pages
(one per combination of the two choices) via `scripts/build-onepagers.mjs`, so
a reader could land on a single URL for their exact setup instead of working
through tabs. That generator correctly resolved the tab choices, but it also
stripped the one explanatory note above about wrapping commands over SSH
(correctly - that note lived in a "Choose Your Setup" section that makes no
sense once a one-pager reader has already made the choice), which is what
exposed the note as insufficient in the first place: it left the generated
workstation pages with bare, unwrapped `From the Pi` commands, one of which
was outright wrong (`curl http://127.0.0.1/...`, which reaches the reader's
own laptop, not the Pi).

Rather than carry that generation complexity while also fixing every command
individually, this reverted to the three staged pages as the only published
shape for a time (recoverable from git history around PR #56 if useful:
`scripts/build-onepagers.mjs` and the four old one-pager files).

The one-pagers were later rebuilt, this time as hand-composed pages importing
the same partials `set-up.mdx` uses (see "File naming" and "One-pagers"
below), so there's no generator to silently drop page-specific context, and
the per-command wrapping is correct by construction rather than something a
script has to get right.

## File naming

Non-page files here **must** start with `_`.

Starlight globs `**/[^_]*.{md,mdx,mdoc}`, which tests the *filename*, not the
directory. A `_partials/` folder does not protect the files inside it: they
load, fail schema validation for a missing `title`, and break the build. This
README is `_README.md` for that reason.

## One-pagers

`one-pagers/on-the-pi.mdx`, `one-pagers/on-the-pi-dedicated-user.mdx`,
`one-pagers/over-ssh.mdx`, and `one-pagers/over-ssh-dedicated-user.mdx` are
complete, tab-free walkthroughs, one per combination of the two choices in
`index.mdx`, composed from the same partials as `set-up.mdx`. They exist for
a reader who already knows which combination they want.

`one-pagers/index.mdx` is the picker page: a short intro plus a comparison
table, linked from `index.mdx`'s "In This Guide" section (which also tucks
the same table into a `<details>` there, so a reader doesn't have to leave
the hub page just to see it). The table itself lives in one place,
`_one-pager-picker-table.mdx` in this directory (not inside `one-pagers/`,
since both `index.mdx` and `one-pagers/index.mdx` import it), so it can't
drift between the two pages that show it.

Because `one-pagers/` is a subdirectory, its pages' relative imports go up
one extra level than a partial import from this directory would - `../_foo.mdx`
for a partial here, one more `../` for `Verified.astro` and
`CLAUDE.md.example`. Easy to get wrong when copying an import line from
`set-up.mdx` instead of from another file already in `one-pagers/`.

**The four one-pager pages, and the picker page itself, are excluded from
`public/llms-full.txt`.** Their content is already in the bundle via
`set-up.mdx`'s tabbed sections; including a one-pager too would duplicate
that same text under a different heading, which is exactly the kind of
drift risk `llms-full.txt`'s own generation plan
(`.docs-assist/reports/llms-generation-plan.md`) exists to prevent. They
still get individual entries in `public/llms.txt` (the link index), just
not a section in the concatenated full-text file.

## Background

`drafts-research/pi-hole-agent-access-study.md`, a sibling of this repo,
records why the content says what it says: the findings that overturned the
original version, the container tests behind the ACL claims, and the review
rounds that produced the current text.
