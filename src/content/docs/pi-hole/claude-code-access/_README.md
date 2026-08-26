# claude-code-access: how this section is built

Read this before editing anything in this directory.

## Current model

Three staged pages, tabbed, indexed, no generated duplicates:

- `index.mdx` - the hub. Overview, decisions, routing.
- `set-up.mdx` - create the account (if any), install Claude Code, grant read access.
- `extend.mdx` - optional write access, root diagnostics, revoke, the API alternative.

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

## History: this page used to also generate four one-pagers

An earlier version of this section additionally generated four flat,
self-contained pages (one per combination of the two choices) via
`scripts/build-onepagers.mjs`, so a reader could land on a single URL for their
exact setup instead of working through tabs. That generator correctly resolved
the tab choices, but it also stripped the one explanatory note above about
wrapping commands over SSH (correctly - that note lived in a "Choose Your Setup"
section that makes no sense once a one-pager reader has already made the choice),
which is what exposed the note as insufficient in the first place: it left the
generated workstation pages with bare, unwrapped `From the Pi` commands, one of
which was outright wrong (`curl http://127.0.0.1/...`, which reaches the reader's
own laptop, not the Pi).

Rather than carry that generation complexity while also fixing every command
individually, this reverted to the three staged pages as the only published
shape. The generator script and the one-pagers themselves are gone from the
working tree, recoverable from git history (`scripts/build-onepagers.mjs` and
`on-the-pi.mdx`, `on-the-pi-dedicated-user.mdx`, `over-ssh.mdx`,
`over-ssh-dedicated-user.mdx`, all last present as of this repository's history
around PR #56) if a future need justifies rebuilding it - this time with the
per-command wrapping done properly from the start, since that's now required by
the rule above regardless of whether generation exists.

## File naming

Non-page files here **must** start with `_`.

Starlight globs `**/[^_]*.{md,mdx,mdoc}`, which tests the *filename*, not the
directory. A `_partials/` folder does not protect the files inside it: they
load, fail schema validation for a missing `title`, and break the build. This
README is `_README.md` for that reason.

## Background

`drafts-research/pi-hole-agent-access-study.md`, a sibling of this repo,
records why the content says what it says: the findings that overturned the
original version, the container tests behind the ACL claims, and the review
rounds that produced the current text.
