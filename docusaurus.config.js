// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config
// comment line

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Edward Angert',
  tagline: 'Documentation Team Lead / Technical Writer',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://edwardangert.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'EdwardAngert', // Usually your GitHub org/user name.
  projectName: 'edwardangert.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // start from /docs
          sidebarPath: './sidebars.js',
          breadcrumbs: true,
        },
        blog: false, // remove and uncomment the blog section to reenable
        /* blog: {
          showReadingTime: true,
          blogTitle: "Blog",
          blogDescription: "Edward's blog, mostly about documentation and knowledge sharing.",
          postsPerPage: 'ALL',
        }, */
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Edward',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            label: 'About me',
            to: '/',
            position: 'left',
          },
          {
            label: 'Resume',
            to: 'about-me/resume',
            position: 'left',
          },
          {
            label: 'Docs',
            to: 'category/documentation',
            position: 'left',
          },
          //{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/EdwardAngert/',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://www.linkedin.com/in/edward-angert/',
            label: 'LinkedIn',
            position: 'right',
          },
        ],
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      footer: {
        style: 'dark' ,
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'About Me',
                to: '/',
              },
              {
                label: 'Resume',
                to: '/about-me/resume/',
              },
              /*{
              label: 'Blog',
              to: '/blog',
              },*/
            ],
          },
          {
            title: 'Social',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/EdwardAngert/',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/edward-angert/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Edward. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
