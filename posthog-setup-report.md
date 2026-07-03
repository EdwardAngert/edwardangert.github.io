# PostHog post-wizard report

The wizard has completed a PostHog analytics integration for edwardangert.github.io. A new `src/components/posthog.astro` component was created with the PostHog web snippet and global click event delegation to capture key engagement actions. It is imported and rendered inside the existing custom `src/components/Head.astro` component (alongside Microsoft Clarity and Google Analytics), so PostHog loads on every page of the Starlight site. Environment variables for the public token and host were written to `.env`.

| Event name | Description | File |
|---|---|---|
| `contact_link_clicked` | User clicked a contact link (LinkedIn or cal.com scheduling) from the About or Resume page. | `src/components/posthog.astro` |
| `portfolio_item_clicked` | User clicked a portfolio item card from the portfolio overview page. | `src/components/posthog.astro` |
| `pdf_downloaded` | User clicked a PDF download link on a portfolio sample page. | `src/components/posthog.astro` |
| `github_project_link_clicked` | User clicked a link to one of Edward's GitHub projects mentioned in blog posts or the resume. | `src/components/posthog.astro` |
| `external_docs_link_clicked` | User clicked a link to view an external documentation sample (GitLab, Coder, Linode). | `src/components/posthog.astro` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/495920/dashboard/1793985)
- [All engagement actions over time](https://us.posthog.com/project/495920/insights/wbS1PAsH)
- [Contact link clicks](https://us.posthog.com/project/495920/insights/f8VR4cAa)
- [Portfolio item clicks](https://us.posthog.com/project/495920/insights/CwCpgzX6)
- [GitHub project interest (by link text)](https://us.posthog.com/project/495920/insights/NvLik6DW)
- [External docs and PDF engagement](https://us.posthog.com/project/495920/insights/inJPaH3Z)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` to `.env.example` (or any bootstrap scripts) so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
