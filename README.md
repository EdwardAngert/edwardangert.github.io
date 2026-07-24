# edwardangert.com

My personal site: technical writing samples, an independently maintained documentation set, and a blog.

I bought the domain. Might as well use it.

## What's here

- **Portfolio** ([`/portfolio/`](https://edwardangert.com/portfolio/)) - Documentation samples across Coder, GitLab, Linode, Pantheon, and an open-source Claude Code plugin.
- **Pi-hole v6 Setup Guide** ([`/docs/pi-hole/`](https://edwardangert.com/docs/pi-hole/)) - A complete, independently maintained guide: OS setup and hardening, installation, blocklists and allowlists, network-wide DNS enforcement, Tailscale remote access, maintenance, and troubleshooting. It's become a heavily cited AI grounding source for Pi-hole questions.
- **Blog** ([`/blog/`](https://edwardangert.com/blog/)) - Essays on documentation, AI, and the fundamentals that outlast the hype.
- **About** ([`/about/resume/`](https://edwardangert.com/about/resume/)) - Resume and professional background.

## Built with

- [Astro](https://astro.build) - Static site framework
- [Starlight](https://starlight.astro.build) - Documentation theme
- [starlight-blog](https://github.com/HiDeoo/starlight-blog) - Blog plugin
- [starlight-fullview-mode](https://github.com/trueberryless-org/starlight-fullview-mode) - Full-view reading mode
- [Catppuccin](https://catppuccin.com) - Color scheme (Mocha dark, Latte light)
- [PostHog](https://posthog.com) - Site analytics

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Linting

The docs are linted for structure (markdownlint) and prose (Vale), configured in `.markdownlint.jsonc` and `.vale.ini`.

```bash
# Structural rules
pnpm lint:md

# Prose rules (fetches a local vale binary and the Google/write-good/alex
# style packages on first run if they aren't already present)
pnpm lint:vale

# Both
pnpm lint
```

## Agent-ready

[`llms.txt`](https://edwardangert.com/llms.txt) and [`llms-full.txt`](https://edwardangert.com/llms-full.txt) give AI tools a map of the site and the full text of the Pi-hole guide.

## Live site

Visit [edwardangert.com](https://edwardangert.com)
