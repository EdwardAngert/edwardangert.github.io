// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import catppuccin from '@catppuccin/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://edwardangert.com',
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
			tagline: 'Technical writer, team leader, relationship-builder',
			customCss: ['./src/styles/tables.css'],
			disable404Route: true,
			components: {
				PageTitle: './src/components/PageTitle.astro',
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
					dark: { flavor: "mocha", accent: "sky" },
					light: { flavor: "latte", accent: "sky" }
				}),
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
							label: 'Pi-hole Guide',
							collapsed: true,
							items: [
								{ label: 'Overview', link: '/docs/pi-hole/' },
								{ label: 'Installation', link: '/docs/pi-hole/install-configure/' },
								{ label: 'Block Lists', link: '/docs/pi-hole/block-allow-lists/' },
								{ label: 'Network Blocking', link: '/docs/pi-hole/network-level-blocking/' },
							],
						},
					],
				},
			],
		}),
	],
});
