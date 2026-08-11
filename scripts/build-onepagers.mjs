#!/usr/bin/env node
/**
 * Generates the self-contained one-pager versions of the Claude Code access
 * guide from the staged pages.
 *
 * The staged pages are the source of truth. Each one-pager is the same
 * content with the two tab axes resolved to one fixed combination, so the
 * two published shapes cannot drift apart.
 *
 * Run with --check to verify the committed output matches the source without
 * writing anything. That is what stops someone editing a generated page by
 * hand.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'src/content/docs/pi-hole/claude-code-access');

/** Staged pages, in reading order. */
const STAGES = ['index.mdx', 'set-up.mdx', 'extend.mdx'];

/** The four published combinations. */
const COMBOS = [
	{
		file: 'on-the-pi.mdx',
		slug: 'docs/pi-hole/claude-code-access/on-the-pi',
		location: 'On the Pi',
		identity: 'Your login user',
		title: 'Give Claude Code Pi-hole Access on the Raspberry Pi',
		description:
			'Run Claude Code on the Pi itself and grant it read-only access to the Pi-hole query database and logs with POSIX ACLs. Complete single-page setup.',
		summary:
			'This page covers running Claude Code **on the Pi itself**, as **your own login account**.',
	},
	{
		file: 'on-the-pi-dedicated-user.mdx',
		slug: 'docs/pi-hole/claude-code-access/on-the-pi-dedicated-user',
		location: 'On the Pi',
		identity: 'Dedicated agent user',
		title: 'Run Claude Code on Pi-hole Under a Dedicated Read-Only User',
		description:
			'Run Claude Code on the Pi under a dedicated unprivileged account that can read Pi-hole query data and nothing else. Complete single-page setup.',
		summary:
			'This page covers running Claude Code **on the Pi itself**, as a **dedicated unprivileged account** that can read Pi-hole data and nothing else.',
	},
	{
		file: 'over-ssh.mdx',
		slug: 'docs/pi-hole/claude-code-access/over-ssh',
		location: 'From a workstation',
		identity: 'Your login user',
		title: 'Give Claude Code Pi-hole Access Over SSH',
		description:
			'Run Claude Code on your laptop and reach Pi-hole over SSH, with read-only access granted by POSIX ACLs. Works with any Raspberry Pi. Complete single-page setup.',
		summary:
			'This page covers running Claude Code **on your workstation**, reaching the Pi over SSH as **your own login account**.',
	},
	{
		file: 'over-ssh-dedicated-user.mdx',
		slug: 'docs/pi-hole/claude-code-access/over-ssh-dedicated-user',
		location: 'From a workstation',
		identity: 'Dedicated agent user',
		title: 'Give Claude Code Pi-hole Access Over SSH With a Dedicated User',
		description:
			'Run Claude Code on your laptop and reach Pi-hole over SSH as a dedicated unprivileged account, enforced by sshd. Works with any Raspberry Pi. Complete single-page setup.',
		summary:
			'This page covers running Claude Code **on your workstation**, reaching the Pi over SSH as a **dedicated unprivileged account** that sshd enforces for every command.',
	},
];

const AXIS = { 'cc-location': 'location', 'cc-identity': 'identity' };

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

/** Replace every <Tabs syncKey="..."> block with the branch matching `combo`. */
function resolveTabs(text, combo) {
	const open = /<Tabs syncKey="([^"]+)">/;
	for (;;) {
		const m = open.exec(text);
		if (!m) return text;
		const start = m.index;
		const end = matchClose(text, start, '<Tabs', '</Tabs>');
		if (end === -1) throw new Error(`Unclosed <Tabs> near: ${text.slice(start, start + 80)}`);

		const axis = AXIS[m[1]];
		if (!axis) throw new Error(`Unknown syncKey "${m[1]}"`);
		const want = combo[axis];

		const inner = text.slice(start + m[0].length, end - '</Tabs>'.length);
		let chosen = null;
		let i = 0;
		const itemOpen = /<TabItem label="([^"]+)">/g;
		for (;;) {
			itemOpen.lastIndex = i;
			const im = itemOpen.exec(inner);
			if (!im) break;
			const bodyStart = im.index + im[0].length;
			const bodyEnd = matchClose(inner, im.index, '<TabItem', '</TabItem>');
			if (bodyEnd === -1) throw new Error('Unclosed <TabItem>');
			if (im[1] === want) chosen = inner.slice(bodyStart, bodyEnd - '</TabItem>'.length);
			i = bodyEnd;
		}
		if (chosen === null) throw new Error(`No TabItem labelled "${want}" for axis ${axis}`);

		// Splice the branch in place. The branch body already carries the right
		// indentation for its context, so drop any indentation sitting in front
		// of the <Tabs> tag or the fence ends up doubly indented.
		let from = start;
		const lineStart = text.lastIndexOf('\n', start) + 1;
		if (/^[ \t]*$/.test(text.slice(lineStart, start))) from = lineStart;
		text = text.slice(0, from) + chosen.replace(/^\n+|\n+$/g, '') + text.slice(end);
	}
}

/**
 * Drop `## sections` flagged with `onepager:skip`.
 *
 * Works on whole sections rather than scanning forward from each marker: a
 * forward scan ends inside the *next* section's marker line and swallows it,
 * so two adjacent skipped sections would only drop the first.
 */
function dropSkipped(text) {
	const lines = text.split('\n');

	// Index every H2, then walk backwards over blank lines and comments to find
	// where the section really starts, so a marker above it belongs to it.
	const starts = [];
	for (let i = 0; i < lines.length; i++) {
		if (!lines[i].startsWith('## ')) continue;
		let s = i;
		while (s > 0 && (lines[s - 1].trim() === '' || /^\{\/\*/.test(lines[s - 1].trim()))) s--;
		starts.push({ headingAt: i, from: s });
	}

	const drop = new Set();
	starts.forEach((sec, n) => {
		const end = n + 1 < starts.length ? starts[n + 1].from : lines.length;
		const header = lines.slice(sec.from, sec.headingAt).join('\n');
		if (!/\{\/\*\s*onepager:skip/.test(header)) return;
		for (let k = sec.from; k < end; k++) drop.add(k);
	});

	return lines.filter((_, i) => !drop.has(i)).join('\n');
}

function stageBody(file) {
	const raw = readFileSync(join(DIR, file), 'utf8');
	let body = raw.replace(/^---\n[\s\S]*?\n---\n/, '');
	body = body.replace(/^import .*\n/gm, '');
	// Drop the staged-guide navigation notes; a one-pager has no siblings.
	body = body.replace(/^This is step two of the staged guide\.\n.*\n/m, '');
	body = body.replace(/^Everything on this page is optional[\s\S]*?set up access yet\.\n/m, '');
	return body.trim();
}

function render(combo) {
	const parts = STAGES.map(stageBody).join('\n\n');
	let resolved = resolveTabs(dropSkipped(parts), combo);
	// A one-pager holds every section, so links between staged pages become
	// same-page anchors.
	resolved = resolved.replace(
		/\(\/docs\/pi-hole\/claude-code-access\/(?:set-up|extend)\/(#[^)]+)\)/g,
		'($1)'
	);
	// Splicing leaves whitespace-only lines and blank runs behind. Normalise
	// last, so nothing downstream reintroduces them.
	resolved = resolved
		.split('\n')
		.map((line) => line.replace(/[ \t]+$/, ''))
		.join('\n')
		.replace(/\n{3,}/g, '\n\n')
		.trim();

	const fm = [
		'---',
		`slug: ${combo.slug}`,
		`title: ${JSON.stringify(combo.title)}`,
		`description: ${JSON.stringify(combo.description)}`,
		'category: "Personal Reference Documentation"',
		'applies-to:',
		'  pihole: "v6"',
		'head:',
		'  - tag: link',
		'    attrs:',
		'      rel: canonical',
		`      href: https://edwardangert.com/${combo.slug}/`,
		'---',
	].join('\n');

	const imports = [
		"import { Steps, Tabs, TabItem, Code } from '@astrojs/starlight/components';",
		"import Verified from '../../../../components/Verified.astro';",
		"import claudeMd from '../CLAUDE.md.example?raw';",
	].join('\n');

	const banner = [
		'{/*GENERATED FILE. Do not edit.',
		'   Source: index.mdx, set-up.mdx, extend.mdx in this directory.',
		'   Regenerate with `pnpm build:onepagers`.*/}',
	].join('\n');

	const orientation = [
		combo.summary,
		'',
		'It is complete on its own. For the other setups, or to work through this in stages, see',
		'[Give Claude Code Access to Pi-hole](/docs/pi-hole/claude-code-access/).',
	].join('\n');

	return `${fm}\n\n${imports}\n\n${banner}\n\n${orientation}\n\n${resolved}\n`;
}

const check = process.argv.includes('--check');
let failed = 0;

for (const combo of COMBOS) {
	const want = render(combo);
	const path = join(DIR, combo.file);
	const have = existsSync(path) ? readFileSync(path, 'utf8') : null;
	if (check) {
		if (have !== want) {
			console.error(`✗ ${combo.file} is out of date with the staged pages`);
			failed++;
		}
	} else if (have !== want) {
		writeFileSync(path, want);
		console.log(`  wrote ${combo.file}`);
	} else {
		console.log(`  ${combo.file} up to date`);
	}
}

if (check) {
	if (failed) {
		console.error(`\n${failed} one-pager(s) out of date. Run \`pnpm build:onepagers\`.`);
		console.error('Never edit a generated one-pager directly; edit the staged pages.');
		process.exit(1);
	}
	console.log('One-pagers match the staged pages.');
}
