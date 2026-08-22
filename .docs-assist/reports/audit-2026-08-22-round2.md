# Pi-hole Guide: Full Docs Audit, Round 2

Date: 2026-08-22
Scope: `src/content/docs/pi-hole/**` (16 files, ~6,780 lines) - same scope as the round 1 audit
Method: mechanical checks run directly (markdownlint, Vale, `check-claims.mjs`, `docs-decay.mjs`, `build-onepagers.mjs --check`); content/structure/findability fanned out across 4 fresh parallel `doc-auditor` agents, each treating this as an independent audit rather than a diff review of round 1's fixes

Status legend: `[ ]` open · `[x]` fixed and reverified

---

## Headline: Round 1's fixes hold up

All four agents independently re-checked round 1's fixes (the `Verify the Boundaries` restructuring, the `extend.mdx` `|| true` scoping, the `network-level-blocking.mdx` Checkpoint, the HaGeZi URL fix, the chained commands, etc.) and found them correct, well-integrated, and free of new regressions. One agent went tag-by-tag through the restructured `<Tabs>` nesting in `set-up.mdx`/`extend.mdx` and confirmed balanced nesting, correct depth, and no cross-branch bleed. `llms-full.txt` was independently confirmed to match the staged sources verbatim.

## Critical Issues

None.

## Structural Issues

- [ ] **Deferred to a separate follow-up session** (user's call: the fix is a bigger, hairier lift than round 1's, with real risk of introducing a quoting mistake in the heredoc and curl|jq pipeline; not worth rushing into this pass). **`extend.mdx` never got `cc-location` branching outside "Revoke Access"'s final verification step.** Confirmed directly: the file has exactly one `<Tabs syncKey="cc-location">` block (line 240, the part of "Revoke Access" fixed in round 1). Everything else - "Optional: Give Claude Code Write Access" (line 24), "Optional: Run Diagnostics That Need Root" (line 99), the main "Revoke Access" commands (line 195, before the fixed part), and "Alternative: The Pi-hole v6 API" (line 257) - only branches on `cc-identity` or not at all, and every code block in these sections says `title="From the Pi"` unconditionally. This means the two workstation one-pagers (`over-ssh.mdx`, `over-ssh-dedicated-user.mdx`) render most of `extend.mdx`'s content with bare "From the Pi" commands and no wrapping instruction - the same bug class fixed in round 1's "Verify the Boundaries," just larger in scope and pre-existing rather than introduced by that fix.
  - **One instance is worse than a translation gap**: "Alternative: The Pi-hole v6 API" has the reader `curl`ing `http://127.0.0.1/api/auth` and `http://127.0.0.1/api/queries`. On a workstation, `127.0.0.1` is the reader's own laptop, not the Pi - run verbatim as the page's "your workstation" framing implies, this doesn't reach Pi-hole at all.
  - This is substantially more work than round 1's fix: 4 sections, roughly 15+ code blocks, including a multi-line `sudo tee ... <<'EOF' ... EOF` heredoc (the diagnostics wrapper script) and a multi-line `curl | jq` pipeline, both of which get hairy to wrap in `ssh '...'` quoting without real risk of a quoting mistake.

- [x] **`tailscale.mdx` has no closing `## Checkpoint` section**, unlike its sibling how-to pages (`block-allow-lists.mdx`, `network-level-blocking.mdx`, `install-configure.mdx`, `pihole-install.mdx` all have one; `maintenance.mdx` is explicitly framed as reference/optional and reasonably has none). A reader who finishes the exit-node steps has no in-page confirmation they succeeded, only a link to Tailscale troubleshooting if something breaks.
  - Added, covering remote access, tailnet-wide DNS, and the exit node, each conditioned on whether the reader set that part up.

## Content Issues

- [x] **`index.mdx:52`** — "Raspberry Pi running Raspberry Pi OS (Bookworm)" is stale. `install-configure.mdx`'s own Imager step doesn't pin a codename ("Raspberry Pi OS (64-bit)"), and its example terminal output for confirming an existing Pi's version already shows Debian 13 (trixie), not Bookworm (Debian 12). A reader following the guide today via a current Imager download would very plausibly land on a newer release than what this line claims the guide was built against.
  - Dropped the codename, matched the version-agnostic "(64-bit)" phrasing `install-configure.mdx` already uses.

- [x] **`sudo reboot now` appears three times** (`maintenance.mdx:248`, `install-configure.mdx:484`, `install-configure.mdx:555`) — `reboot` doesn't take a time argument the way `shutdown -r now` does; `now` is likely just ignored. Not dangerous, just imprecise, and it's the same phrasing in all three spots so worth fixing everywhere at once rather than just where it was first noticed.
  - Fixed all three to `sudo reboot`.

## Style Issues

- [x] **`install-configure.mdx:229`** — heading "Set Up a Firewall on Your Pi With UFW" capitalizes "With," inconsistent with sibling headings that keep short prepositions lowercase (`### Protect SSH with Fail2Ban`, `## Optional: Monitor Pi-hole with Netdata`).
  - Fixed to lowercase "with."
- [x] **`index.mdx:95`** — "In This Guide" link text reads "Enable Network-wide DNS Blocking with Pi-hole" (lowercase "wide"), but the actual page title is "Enable Network-**Wide** DNS Blocking with Pi-hole." Minor, but it's the direct label for that page's link.
  - Fixed to match.

## Findability Issues

- [x] **`maintenance.mdx:8`** — `prev.label` reads "VPN with Tailscale" (the sidebar's short label), while every other prev/next label pair in the whole chain (`block-allow-lists` ↔ `pihole-install` ↔ `network-level-blocking` ↔ `tailscale` ↔ `maintenance` ↔ `troubleshooting` ↔ `claude-code-access`) matches the linked page's title verbatim. This is the one exception in an otherwise perfectly consistent chain.
  - Fixed to match `tailscale.mdx`'s full title, matching the chain-wide convention.
- [x] **`block-allow-lists.mdx`'s "Fix Streaming Services" section** has no fallback link for a reader whose service isn't one of the nine listed - the general query-log troubleshooting method is one section above (via "Add an Individual Domain to the Allowlist"), but a reader arriving via the top-of-page skip link jumps straight past it.
  - Added a one-line pointer to `troubleshooting.mdx#troubleshoot-a-broken-service` right at the top of the section.

## Fix Verification

`pnpm build`, `lint:onepagers`, `lint:links`, `markdownlint`, and `vale` all clean after every fix (same two pre-existing, unrelated errors as before). `public/llms-full.txt` resynced for all five changed pages (`index.mdx`, `install-configure.mdx`, `block-allow-lists.mdx`, `tailscale.mdx`, `maintenance.mdx`); confirmed no leftover `<Verified>`/`import`/`export` artifacts and that the new Checkpoint, the dropped codename, and the `reboot` fixes all landed in the synced file.

## Investigated and Resolved (No Action Needed)

- Decay flag on `_README.md` (now 17.3, up from 14.3): same false-positive pattern as round 1, confirmed again - generic backticked tokens (`title`, `index.mdx`, `astro.config.mjs`) match nearly every commit touching site infra. Re-read `_README.md` in full; it's still fully accurate to the current build script and file structure.
- `_README.md`'s sibling-repo reference: still an intentional non-issue, confirmed again.
- `troubleshooting.mdx:149-150`'s chained `systemctl status && pihole -g`: confirmed the chain is semantically correct for the failure mode it documents (a stopped/not-ready FTL correctly returns non-zero and short-circuits the chain, rather than silently swallowing a real failure).

## Mechanical Checks

- `markdownlint-cli2`: same 1 pre-existing, unrelated error (`maintenance.mdx:16`, `<redacted>` `MD033`).
- `vale`: 0 errors.
- `build-onepagers.mjs --check`: clean, one-pagers match staged pages.
- `check-links.mjs`: all 652 internal links and anchors resolve.

## Recommended Next Step

The `extend.mdx` gap is the one item worth a scoping conversation before touching it - it's a bigger, hairier lift than round 1's fix (heredocs and multi-line pipelines don't wrap cleanly in `ssh '...'` quoting). Everything else in this report is small and low-risk enough to just fix.
