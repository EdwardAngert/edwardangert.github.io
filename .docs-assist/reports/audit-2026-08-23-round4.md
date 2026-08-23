# Pi-hole Guide: Full Docs Audit, Round 4

Date: 2026-08-23
Scope: `src/content/docs/pi-hole/**` (12 files, ~4,420 lines)
Method: mechanical checks run directly (markdownlint, Vale, `check-claims.mjs`, `docs-decay.mjs`, `check-location-coverage.mjs --all`, `pnpm build`); content/structure/findability fanned out across 3 fresh parallel `doc-auditor` agents, briefed to do an exhaustive (not sampled) chaining pass and to manually re-verify Tabs-branch command content rather than trust the location-coverage checker's zero alone

Status legend: `[ ]` open · `[x]` fixed and reverified

---

## Headline

The lists/network/maintenance set (`block-allow-lists.mdx`, `tailscale.mdx`, `maintenance.mdx`, `troubleshooting.mdx`) came back fully clean after an exhaustive pass over all 36 shell code blocks - rounds 1-3's fixes hold, and every previously-flagged "unchained" instance was re-confirmed as a correct, intentional exception (interactive sessions, or diagnostic pairs where chaining would hide the second command's output on failure). The core-setup set had one small findability gap. The Claude Code access set is where the real find was: three verification/confirmation steps in `extend.mdx` that tested the wrong account entirely for the dedicated-agent-user identity, missed by the location-coverage checker because it only checks structure (is there a `cc-identity` branch), not whether the command inside actually targets the right account.

## Critical Issues

None.

## Structural Issues

None.

## Content Issues

- [x] **`extend.mdx:84-101` ("Confirm it works" for the cli_pw grant) tested the wrong account.** The grant above it correctly branches by both `cc-location` and `cc-identity`; this confirmation step only branched by `cc-location`, so for the "Dedicated agent user" combination it ran `pihole allow ads.example.com` as the admin/login account instead of `claude-agent` - meaning it never actually exercised the grant it claimed to confirm. Fixed by nesting `cc-identity` inside both location branches, using `sudo -u claude-agent`/`ssh pi-hole-agent` for that identity.
- [x] **`extend.mdx:301-339` ("Confirm the pin holds" for the diagnostics wrapper) had the same bug.** The sudoers rule installed two steps earlier is correctly scoped per identity (`$USER` vs. `claude-agent`), but both confirmation checks (the one that should succeed and the one that should be rejected) ran unconditionally as the admin/login account - meaningless for the dedicated-agent identity, since that sudoers rule grants `claude-agent`, not the admin account. Fixed the same way: `sudo -u claude-agent sudo -n ...` on the Pi, `ssh pi-hole-agent 'sudo -n ...'` from a workstation.
- [x] **`extend.mdx:129-148` (cli_pw revoke) was asymmetric.** The workstation branch told the reader to manually substitute `claude-agent` for `pi-admin` in a hardcoded command; the "On the Pi" branch had no equivalent note and just used `$USER` unconditionally, giving a dedicated-agent-user reader no signal they needed something else. Fixed by adding proper `cc-identity` branches to both locations, matching the grant step's structure.

## Style Issues

None.

## Findability Issues

- [x] **`index.mdx`'s "In This Guide" blurb for `network-level-blocking.mdx`** only mentioned "Configure router DHCP so every device uses Pi-hole for DNS," with no signal that the page also covers hardcoded-DNS devices (Chromecast, smart TVs) - a gap left over from this session's rewrite of that page's own description, which the index summary wasn't updated to match. Added a clause naming it.

## Investigated and Confirmed Clean

- **Exhaustive `&&`-chaining pass, all 36 shell blocks across `block-allow-lists.mdx`, `tailscale.mdx`, `maintenance.mdx`, `troubleshooting.mdx`**: every previously-accepted "unchained" instance re-confirmed correct on its own merits (independent diagnostic reads where chaining would suppress the second command's output in exactly the failure case a reader needs to see it; an interactive SSH session; explicitly alternative commands separated by "# or"). No new violations, no regressions from rounds 1-3.
- **Every `<Tabs syncKey="cc-location">` branch across `set-up.mdx` and `extend.mdx` re-checked command-by-command** (not just tag balance): agent user creation, ACL grants, "Read Query History" (including the round-3-restored `WHERE` filter, confirmed present and identical in all three branches), "Verify the Boundaries," the diagnostics heredoc/chown/chmod steps, the full Revoke Access flow, and the API alternative's port lookup/password storage/auth pipeline all correctly translate between locations. Only the three confirmation-step bugs above were found.
- `block-allow-lists.mdx`'s Roku cross-reference into the rewritten `network-level-blocking.mdx` section ("requires a redirect at the router, not the Pi") checked against the actual rewritten text - still accurate, stays appropriately vendor-neutral.
- The rewritten `network-level-blocking.mdx` "Force Devices" section read start to finish: states the constraint, states why the naive fix fails, gives concrete steps for the one router this guide assumes, correctly scopes out other routers without inventing steps, closes with the DoH caveat as a genuinely separate problem. Checkpoint bullet and frontmatter description both confirmed to match.
- `_README.md`'s description of `check-location-coverage.mjs`'s mechanism checked against the script as currently written - accurate, including the `{/* location-fixed: */}` exemption comment and the `pnpm lint:location-coverage`/`--all` commands.

## Mechanical Checks

- `markdownlint-cli2`: same 1 pre-existing, unrelated error.
- `vale`: 0 errors.
- `check-location-coverage.mjs --all`: 0 violations (expected - this checker structurally cannot catch the three bugs found this round, since all three already had *some* branching, just not branching on the right axis for that specific command's actual target).
- `check-links.mjs`: all resolve.
- Tab balance independently re-verified in rendered HTML after all three `extend.mdx` fixes (not just build success): 14/14 identity tabs, 15/15 location tabs.
- `docs-decay.mjs`: same generic-token false-positive pattern confirmed for a third time; not re-investigated.

## Fix Verification

`pnpm build`, `lint:links`, `check-location-coverage.mjs --all`, `markdownlint`, and `vale` all clean after every fix (same two pre-existing, unrelated errors as before). `public/llms-full.txt` resynced for `index.mdx` and `extend.mdx`.
