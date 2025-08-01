// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://edwardangert.com',
	integrations: [
		starlight({
			title: 'Edward Angert',
			tagline: 'Technical writer, team leader, relationship-builder',
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
			customCss: ['./src/styles/catppuccin.css'],
			sidebar: [
				{
					label: 'About Me',
					items: [
						{ label: 'Resume', link: '/about-me/resume/' },
					],
				},
				{
					label: 'Work Samples',
					items: [
						{ label: 'Portfolio Overview', link: '/samples/' },
					],
				},
				{
					label: 'Pi-hole Setup',
					items: [
						{ label: 'Overview', link: '/pi-hole/' },
						{ label: 'Installation', link: '/pi-hole/install-configure/' },
						{ label: 'Block Lists', link: '/pi-hole/block-allow-lists/' },
						{ label: 'Network Blocking', link: '/pi-hole/network-level-blocking/' },
					],
				},
				{
					label: 'Documentation',
					items: [
						{ label: 'Contributing to GitLab', link: '/docs/gitlab-first-contribution/' },
						{ label: 'WordPress Remote DB', link: '/docs/linode-wp-remote-db/' },
						{ label: 'Site Architecture', link: '/docs/site-mz-failover-diagram/' },
					],
				},
			],
		}),
	],
});
