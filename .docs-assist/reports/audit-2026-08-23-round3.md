# Pi-hole Guide: Full Docs Audit, Round 3

Date: 2026-08-23
Scope: `src/content/docs/pi-hole/**` (12 files, ~4,420 lines - down from 16/~6,780 after the one-pager removal)
Method: mechanical checks run directly (markdownlint, Vale, `check-claims.mjs`, `docs-decay.mjs`, `check-location-coverage.mjs --all`); content/structure/findability fanned out across 3 fresh parallel `doc-auditor` agents, each treating this as an independent audit

Status legend: `[ ]` open · `[x]` fixed and reverified

---

## Headline

Rounds 1 and 2's fixes all hold up (reboot chaining, tailscale.mdx Checkpoint, HaGeZi URL, orphaned frontmatter, maintenance.mdx's prev-label, the streaming fallback link). The one-pager removal and the location-coverage fix (all 27 restructured `<Tabs>` blocks) were independently re-verified command-by-command by a fresh agent, not just checked for tag balance - no regressions found there either. Two real, new findings this round, both in `network-level-blocking.mdx`, plus a batch of unchained-command instances round 2 didn't fully clear.

## Critical Issues

None.

## Structural Issues

None.

## Content Issues

- [x] **`network-level-blocking.mdx:23` vs `:65-115`** — internal contradiction, and it turned out to be worse than "missing precondition." Researched: the technique requires the box running iptables to *be* the network's gateway (confirmed against Pi-hole's own community forum, an OpenWrt forum thread, and a Firewalla writeup), which this guide's Pi never is. Worse, outright blocking the hardcoded address (the fallback that would otherwise work at the router) breaks Chromecast entirely rather than falling back. Removed the broken iptables instructions. Replaced with an honest explanation of the real limitation, plus a genuine fix for readers on a TP-Link Omada Gateway specifically: Omada's **DNS Override** feature (`Settings > Services > DNS Proxy`, controller v5.15.20+), confirmed via TP-Link's own documentation, transparently redirects hardcoded-DNS traffic at the router with no per-device config. Kept the existing anchor/heading so `block-allow-lists.mdx`'s Roku cross-reference still resolves, and updated that reference's wording too (`intercept... at the router or the Pi` → `requires a redirect at the router, not the Pi`).
- [x] **`network-level-blocking.mdx:83-84`** — the hardcoded `-i eth0` issue is moot; it lived entirely inside the iptables instructions removed above.
- [x] **`set-up.mdx`'s "Read Query History" workstation branches dropped the `WHERE` filter.** Restored across all three branches (On the Pi, workstation + login user, workstation + dedicated agent), and converted the hardcoded `192.168.0.22` to a proper `YOUR-DEVICE-IP` placeholder (matching the guide's fail-safe convention) in every place it's actually a run-command - here and in `extend.mdx`'s two API examples. Left the address alone where it's illustrative-only prose (`CLAUDE.md.example`, `troubleshooting.mdx`'s Tailscale peer example), since those already read as examples in context and don't ask the reader to run anything.
- [x] **`troubleshooting.mdx:94-97`** — chained.
- [x] **`troubleshooting.mdx:114-118`** — chained.
- [x] **`troubleshooting.mdx`'s "Troubleshoot a Broken Service" section has no link back to `block-allow-lists.mdx`'s streaming-service fixes.** Added a one-line pointer, naming all nine documented services, right at the top of the section.
- [x] **`pihole-install.mdx:104-105`** — chained. Checked first whether there was a reason not to (the page's own caution box a few lines later confirms `apt install unbound` reliably succeeds and auto-starts the service; the risk is the *delay* before stopping it grabs port 53, which chaining actually reduces rather than causes).
- [x] **`network-level-blocking.mdx:90-91`** — moot; lived inside the removed iptables instructions.

## Style Issues

- [x] **`maintenance.mdx:234`** — added `title="From the Pi"`.
- [x] **`troubleshooting.mdx:72-75`** — left as-is, per the auditor's own recommendation (chaining into an interactive `ssh` session reads oddly).

## Fix Verification

`pnpm build`, `lint:links`, `check-location-coverage.mjs --all`, `markdownlint`, and `vale` all clean after every fix (same two pre-existing, unrelated errors as before). `public/llms.txt` and `public/llms-full.txt` resynced for all seven changed pages (`block-allow-lists.mdx`, `network-level-blocking.mdx`, `pihole-install.mdx`, `maintenance.mdx`, `troubleshooting.mdx`, `claude-code-access/index.mdx`, `set-up.mdx`, `extend.mdx`).

## Findability Issues

None beyond the "Troubleshoot a Broken Service" back-link gap listed under Content Issues above (not double-counted).

## Investigated and Confirmed Clean

- All five `title="From the Pi (however you already connect)"` blocks in `index.mdx` (the pre-decision commands) read sensibly in context - by that point the reader has already established SSH access via earlier pages in the overall guide, so the phrase is accurate, not a cop-out.
- Both "log in first" patterns in `extend.mdx` (the heredoc, and the `curl|jq`/`excludeClients` commands) read clearly and each explains why it isn't inline-wrapped before instructing the reader to SSH in first.
- Every restructured `<Tabs syncKey="cc-location">` block was independently re-checked command-by-command (not just for tag balance) - "Create the Agent User," "Optional: Give Claude Code Write Access," "Optional: Run Diagnostics That Need Root," "Revoke Access," and "Alternative: The Pi-hole v6 API" all correctly translate their "On the Pi" command to a working, correctly-`-t`'d workstation equivalent, with one exception (the Read Query History filter, above).
- `_README.md` confirmed accurate against the current directory contents; its "missing" claim-checker hits are all intentional (own History section naming deleted files, and the previously-confirmed sibling-repo reference).
- `index.mdx`'s link to `claude-code-access/` and its description accurately reflect the current three-page, no-one-pager shape; the retired "staged walkthrough or single self-contained page" phrasing only survives, correctly, inside `_README.md`'s own History section.

## Mechanical Checks

- `markdownlint-cli2`: same 1 pre-existing, unrelated error.
- `vale`: 0 errors.
- `check-location-coverage.mjs --all`: 0 violations.
- `check-links.mjs`: all resolve.
- `docs-decay.mjs`: top-of-queue items are the same generic-token false-positive pattern confirmed twice already; not re-investigated this round.

## Recommendation

The `network-level-blocking.mdx` contradiction and the hardcoded `eth0` are the two items worth real attention - the `eth0` one is a genuine silent-failure trap for a meaningful fraction of readers (anyone on Wi-Fi). The unchained-command instances are all the same cheap, mechanical `&& \` fix already applied elsewhere; there just turned out to be more of them than round 2 caught in one pass.
