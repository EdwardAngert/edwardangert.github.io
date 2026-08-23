#!/usr/bin/env node
/**
 * Checks that every `title="From the Pi"` code block in the staged
 * claude-code-access pages is actually location-safe: either nested inside a
 * `<Tabs syncKey="cc-location">` branch (so a workstation reader gets a
 * different, correctly wrapped command), or explicitly marked as
 * intentionally location-fixed.
 *
 * Why this exists: the page composes for two independent axes (cc-location,
 * cc-identity), and it's easy to remember to branch a command on identity
 * (does it need `sudo -u claude-agent`) while forgetting the orthogonal
 * location axis (does it need an `ssh` wrapper for a workstation reader).
 * `pnpm lint:onepagers` catches a hand-edited one-pager drifting from its
 * staged source, but nothing previously caught a staged page failing to
 * cover a combination in the first place. This does.
 *
 * Diff-scoped by design: this repo's staged pages already carry known,
 * documented debt (see .docs-assist/reports/audit-2026-08-22-round2.md).
 * Re-flagging all of it on every run would make the check noise, not
 * signal, and there'd be no way to land an unrelated edit without also
 * fixing unrelated debt. So this only reports a violation whose code block
 * overlaps a changed line in the diff against `--base` (default `HEAD`,
 * i.e. "did my current uncommitted edit introduce or touch a location gap").
 * Use `--all` to see the full, undiffed backlog (for a dedicated cleanup
 * pass, not for routine use).
 *
 * Marking a block as intentionally location-fixed (rare - most things that
 * say "From the Pi" really do need the other branch): put a comment on the
 * line immediately before it,
 *
 *   {/* location-fixed: reason * /}
 *   ```shell title="From the Pi"
 *   ...
 *   ```
 *
 *   pnpm lint:location-coverage             # diff against HEAD
 *   node scripts/check-location-coverage.mjs --base origin/main
 *   node scripts/check-location-coverage.mjs --all   # full backlog, no diff scoping
 */
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const FILES = [
	'src/content/docs/pi-hole/claude-code-access/index.mdx',
	'src/content/docs/pi-hole/claude-code-access/set-up.mdx',
	'src/content/docs/pi-hole/claude-code-access/extend.mdx',
];

const args = process.argv.slice(2);
const all = args.includes('--all');
const baseIdx = args.indexOf('--base');
const base = baseIdx !== -1 ? args[baseIdx + 1] : 'HEAD';

/** Find the matching close tag for a tag opened at `from`, honouring nesting. */
function matchClose(text, from, open, close) {
	let depth = 0;
	let i = from;
	while (i < text.length) {
		const o = text.indexOf(open, i);
		const c = text.indexOf(close, i);
		if (c === -1) return -1;
		if (o !== -1 && o < c) {
			depth++;
			i = o + open.length;
		} else {
			depth--;
			i = c + close.length;
			if (depth === 0) return i;
		}
	}
	return -1;
}

/** Line ranges (1-indexed, inclusive) covered by <Tabs syncKey="cc-location"> blocks. */
function locationTabRanges(text) {
	const ranges = [];
	const open = /<Tabs syncKey="cc-location">/g;
	let m;
	while ((m = open.exec(text))) {
		const end = matchClose(text, m.index, '<Tabs', '</Tabs>');
		if (end === -1) throw new Error('Unclosed <Tabs syncKey="cc-location"> in source');
		const startLine = text.slice(0, m.index).split('\n').length;
		const endLine = text.slice(0, end).split('\n').length;
		ranges.push([startLine, endLine]);
	}
	return ranges;
}

function inRanges(line, ranges) {
	return ranges.some(([s, e]) => line >= s && line <= e);
}

/** Lines changed by the diff against `base`, or null to mean "all lines" (--all). */
function changedLines(file) {
	if (all) return null;
	let diff;
	try {
		diff = execFileSync('git', ['diff', '--unified=0', base, '--', file], { encoding: 'utf8' });
	} catch {
		return new Set(); // file has no history against base, or git failed; report nothing rather than crash
	}
	const lines = new Set();
	for (const hunk of diff.matchAll(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm)) {
		const start = Number(hunk[1]);
		const count = hunk[2] === undefined ? 1 : Number(hunk[2]);
		for (let i = 0; i < count; i++) lines.add(start + i);
	}
	return lines;
}

function findViolations(file) {
	const text = readFileSync(file, 'utf8');
	const lines = text.split('\n');
	const locRanges = locationTabRanges(text);
	const changed = changedLines(file);
	const violations = [];

	for (let i = 0; i < lines.length; i++) {
		const lineNo = i + 1;
		if (!/title="From the Pi"/.test(lines[i])) continue;
		if (!/^\s*```/.test(lines[i])) continue; // only fenced code block openers
		if (inRanges(lineNo, locRanges)) continue; // already location-branched

		const prev = lines[i - 1]?.trim() ?? '';
		if (/^\{\/\*\s*location-fixed:/.test(prev)) continue; // explicitly exempted

		if (changed !== null && !changed.has(lineNo)) continue; // out of diff scope

		violations.push(lineNo);
	}
	return violations;
}

let failed = false;
for (const file of FILES) {
	const violations = findViolations(file);
	if (violations.length === 0) continue;
	failed = true;
	console.error(`✗ ${file}`);
	for (const line of violations) {
		console.error(
			`    ${file}:${line} - "From the Pi" code block outside a cc-location Tabs branch`
		);
	}
}

if (failed) {
	console.error(
		'\nEach block above claims to run "From the Pi" but isn\'t branched on cc-location, ' +
			'so a workstation reader gets the same command unwrapped. Either nest it in a ' +
			'<Tabs syncKey="cc-location"> branch with a workstation-safe version, or mark it ' +
			'{/* location-fixed: <reason> */} on the line above if it genuinely only applies on the Pi.'
	);
	if (!all) {
		console.error(
			`(Scoped to lines changed since ${base}. Run with --all to see the full backlog.)`
		);
	}
	process.exit(1);
}

console.log(
	all
		? 'No location-coverage violations found.'
		: `No location-coverage violations in lines changed since ${base}.`
);
