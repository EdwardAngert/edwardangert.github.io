// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import catppuccin from '@catppuccin/starlight';
import starlightBlog from 'starlight-blog';
import starlightFullViewMode from 'starlight-fullview-mode'
import { remarkVerified } from './src/plugins/remark-verified.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://edwardangert.com',
	markdown: {
		// Collects <Verified> badges into page frontmatter and fails the build on
		// future dates, bad methods, or a page that authors `last-verified` by hand
		// while also carrying badges.
		remarkPlugins: [remarkVerified],
	},
	redirects: {
		'/about-me/resume': '/about/resume',
		'/docs/gitlab-first-contribution': '/portfolio/gitlab-first-contribution',
		'/docs/linode-wp-remote-db': '/portfolio/linode-wp-remote-db',
		'/docs/site-mz-failover-diagram': '/portfolio/site-mz-failover-diagram',
		'/docs/contrib-pr': '/portfolio/contrib-pr',
	},
	integrations: [
		starlight({
			title: 'Edward Angert',
			favicon: '/favicon.ico',
			// Page-level "last touched", derived from git. Distinct from the
			// <Verified> badges, which are per-section claims about when the
			// content was last confirmed and how. Editing a typo moves this;
			// it does not move a badge.
			lastUpdated: true,
			tagline: 'Technical writer, team leader, relationship-builder',
			customCss: ['./src/styles/tables.css', './src/styles/frosted-glass.css', './src/styles/images.css'],
			disable404Route: true,
			expressiveCode: {
				shiki: {
					// Allow using the alias 'mjs' for the 'javascript' language
					langAlias: {
						url: 'txt',
					},
				},
			},
			components: {
				PageTitle: './src/components/PageTitle.astro',
				Head: './src/components/Head.astro',
			},
			editLink: {
				baseUrl: 'https://github.com/EdwardAngert/edwardangert.github.io/edit/main/',
			},
			social: [
				{
					icon: 'linkedin',
					label: 'LinkedIn',
					href: 'https://www.linkedin.com/in/edward-angert/',
				},
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/EdwardAngert',
				},
			],
			plugins: [
				catppuccin({
					dark: { flavor: "mocha", accent: "mauve" },
					light: { flavor: "latte", accent: "lavender" }
				}),
				starlightBlog({
					navigation: "header-start",
					metrics: {
						readingTime: true,
						words: 'total',
					},
				}),
				starlightFullViewMode({})
			],
			sidebar: [
				{
					label: 'About',
					items: [
						{ label: 'Resume', link: 'about/resume/' },
					],
				},
				{
					label: 'Portfolio',
					items: [
						{ label: 'Overview', link: 'portfolio/' },
						{ label: 'Docs Assist Plugin', link: 'portfolio/docs-assist-plugin/' },
						{ label: 'Coder Quickstart', link: 'portfolio/coder-quickstart/' },
						{ label: 'Contributing to GitLab', link: 'portfolio/gitlab-first-contribution/' },
						{ label: 'WordPress Remote DB', link: 'portfolio/linode-wp-remote-db/' },
						{ label: 'Site Architecture', link: 'portfolio/site-mz-failover-diagram/' },
						{ label: 'Contributor PR Workflow', link: 'portfolio/contrib-pr/' },
					],
				},
				{
					label: 'Documentation',
					items: [
						{
							label: 'Set Up Pi-hole v6',
							collapsed: true,
							items: [
								{ label: 'Overview', link: '/docs/pi-hole/' },
								{ label: 'OS Setup', link: '/docs/pi-hole/install-configure/' },
								{ label: 'Install Pi-hole', link: '/docs/pi-hole/pihole-install/' },
								{ label: 'Block and Allow Lists', link: '/docs/pi-hole/block-allow-lists/' },
								{ label: 'Network Blocking', link: '/docs/pi-hole/network-level-blocking/' },
								{ label: 'VPN with Tailscale', link: '/docs/pi-hole/tailscale/' },
								{ label: 'Maintenance', link: '/docs/pi-hole/maintenance/' },
								{ label: 'Troubleshooting', link: '/docs/pi-hole/troubleshooting/' },
								{
									label: 'Claude Code Access',
									items: [
										{ label: 'Overview and setup choices', link: '/docs/pi-hole/claude-code-access/' },
										{ label: 'Set up read-only access', link: '/docs/pi-hole/claude-code-access/set-up/' },
										{ label: 'Extend, revoke, alternatives', link: '/docs/pi-hole/claude-code-access/extend/' },
										{
											label: 'One-pagers',
											items: [
												{ label: 'Over SSH, dedicated user', link: '/docs/pi-hole/claude-code-access/over-ssh-dedicated-user/' },
											],
										},
									],
								},
							],
						},
					],
				},
			],
		}),
	],
});
