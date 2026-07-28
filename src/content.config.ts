import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { blogSchema } from 'starlight-blog/schema';

/**
 * The environment a page's `<Verified method="tested">` claims were confirmed
 * in. Optional, because most pages claim nothing volatile.
 *
 * Deliberately the only verification field in the schema. Dates and methods
 * live in the body, next to the claims they describe, where they render into
 * the HTML a reader or a retriever actually receives. Page-level `last-verified`
 * and `verification-method` fields were tried and removed: the first duplicated
 * a rollup that turned out to be actively misleading, and the second flattened
 * per-section methods into one value that could not be true of a whole page.
 */
const verificationSchema = z.object({
	'applies-to': z
		.object({
			pihole: z.string().optional(),
			devices: z.array(z.string()).optional(),
		})
		.catchall(z.unknown())
		.optional(),
});

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: (context) => blogSchema(context).extend(verificationSchema.shape),
		}),
	}),
};
