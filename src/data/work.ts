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
    title: 'Pi-hole v6 documentation',
    href: '/docs/pi-hole/',
    role: 'Built and maintained end to end',
    description:
      'A Pi-hole v6 guide tested on my own network, with per-section verification badges and an llms.txt index for AI tools. AI answer engines have cited it thousands of times (Clarity AI visibility tracking). Comparing those citations with PostHog click data, I found that install and troubleshooting questions are answered inside AI tools, while the allowlist page draws about 95% of AI-referred visits.',
    featured: true,
  },
  {
    title: 'Docs Assist: a Claude Code plugin',
    href: '/portfolio/docs-assist-plugin/',
    role: 'Open-source tool I designed and built',
    description:
      'A Claude Code plugin built for calibrated AI use: it coaches SMEs through writing docs and verifies claims against source rather than guessing. Exercised across four codebases, including a 453-claim audit that caught 6 real doc/code drifts.',
    featured: true,
  },
  {
    title: 'Coder quickstart documentation',
    href: '/portfolio/coder-quickstart/',
    role: 'Quickstart and information architecture',
    description:
      'Created a quickstart guide to unlock Coder for new users. Part of a broader information architecture effort to define user journeys and personas.',
  },
  {
    title: "Work on a contributor's PR in the docs repository",
    href: '/portfolio/contrib-pr/',
    role: 'Process documentation',
    description:
      'Created clear steps for technical writers working with external contributors, solving a recurring problem that was blocking the team.',
  },
  {
    title: 'GitLab: make a GitLab contribution',
    href: '/portfolio/gitlab-first-contribution/',
    role: 'Tutorial overhaul',
    description:
      "Overhauled GitLab's contributor tutorial after working with the contributor success team to identify pain points. Reorganized into sequential steps and added multiple contribution methods.",
  },
  {
    title: 'Configure WordPress to use a remote database',
    href: '/portfolio/linode-wp-remote-db/',
    role: 'Support outline to full guide',
    description:
      "Took a support engineer's outline and turned it into a comprehensive guide through research and collaboration.",
  },
  {
    title: 'Site multizone failover diagram',
    href: '/portfolio/site-mz-failover-diagram/',
    role: 'Diagram, with the design team',
    description:
      'Worked with the design team to create a visual solution for a complex technical concept that was hard to explain with just text.',
  },
];
