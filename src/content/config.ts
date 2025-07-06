import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.string().transform((str) => new Date(str)),
    slug: z.string(),
    img: z.object({
      src: z.string(),
      alt: z.string().optional(),
      caption: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};