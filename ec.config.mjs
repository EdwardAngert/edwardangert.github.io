import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

/** @type {import('astro-expressive-code').AstroExpressiveCodeOptions} */
export default {
	plugins: [pluginLineNumbers()],
	defaultProps: {
		// Disable line numbers by default
		showLineNumbers: false,
		overridesByLang: {
			// Enable line numbers for certain languages
			'text,toml,yaml': {
				showLineNumbers: true,
			},
			// Wrap long lines for shell and text
			'shell,url': {
				wrap: true,
			},
		},
	},
};
