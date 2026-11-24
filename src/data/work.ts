/**
 * The work samples, shared by the home page and the portfolio page so a
 * description is written once. `featured` tiles render larger.
 */
export interface WorkSample {
  title: string;
  href: string;
  /** What my part was, shown as a label above the title. */
  role: string;
  description: string;
  featured?: boolean;
}

export const workSamples: WorkSample[] = [
  {
    title: 'Pi-hole v6 setup guide',
    href: '/docs/pi-hole/',
    role: 'Built and maintained end to end',
    description:
      'A guide to running Pi-hole v6 on a Raspberry Pi, tested on my own network. Each section says when I last verified it and how, and an llms.txt index helps AI tools read it too.',
    featured: true,
  },
  {
    title: 'Docs Assist: a Claude Code plugin',
    href: '/portfolio/docs-assist-plugin/',
    role: 'Open-source tool I designed and built',
    description:
      'A Claude Code plugin for using AI carefully. It coaches experts through writing docs and checks claims against the source instead of guessing. In one 453-claim audit, it caught six places where the docs and the code disagreed.',
    featured: true,
  },
  {
    title: 'Coder quickstart',
    href: '/portfolio/coder-quickstart/',
    role: 'Quickstart and information architecture',
    description:
      'One of my first projects at Coder: a quickstart written from scratch, tested on a MacBook, a spare Raspberry Pi 4, and a Linode until it worked every time. It anchored a broader rework of the information architecture.',
  },
  {
    title: "Work on a contributor's PR in the docs repository",
    href: '/portfolio/contrib-pr/',
    role: 'Process documentation',
    description:
      'Steps for writers picking up an external contributor\'s pull request, written to fix a problem that kept blocking the team.',
  },
  {
    title: 'Make a GitLab contribution',
    href: '/portfolio/gitlab-first-contribution/',
    role: 'Tutorial overhaul for GitLab',
    description:
      "A rewrite of GitLab's first-contribution tutorial, built on what the contributor success team had heard from newcomers. It now runs in sequential steps and offers more than one way to contribute.",
  },
  {
    title: 'Configure WordPress to use a remote database',
    href: '/portfolio/linode-wp-remote-db/',
    role: 'Support outline to full guide',
    description:
      "A support engineer handed me an outline. I researched it, worked through it with them, and turned it into a complete guide.",
  },
  {
    title: 'Site multizone failover diagram',
    href: '/portfolio/site-mz-failover-diagram/',
    role: 'Diagram, with the design team',
    description:
      'A diagram made with the design team for an idea that was hard to explain in text alone.',
  },
];
