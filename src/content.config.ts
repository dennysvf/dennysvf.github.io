import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Projetos ficam em uma pasta por idioma: projetos/pt/gcli.md, projetos/en/gcli.md...
// O id da entrada é "pt/gcli".
const projetos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projetos' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    summary: z.string(),
    repo: z.url(),
    demo: z.url().optional(),
    stack: z.array(z.string()),
    status: z.enum(['em andamento', 'concluído', 'pausado']),
    // Projeto feito 100% por IA, sem edição manual de código.
    aiOnly: z.boolean().default(true),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    startedAt: z.coerce.date(),
    order: z.number().default(99),
    featured: z.boolean().default(false),
  }),
});

const translation = z.object({
  title: z.string(),
  description: z.string(),
  url: z.url().optional(),
});

// Artigos são escritos em português; os outros idiomas entram em `translations`.
const artigos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artigos' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Artigos publicados fora (ex.: LinkedIn): a listagem aponta para cá e não gera página local.
    externalUrl: z.url().optional(),
    // Título/descrição nos outros idiomas. `url` só existe quando há uma versão publicada naquele idioma;
    // sem ela, o link aponta para o original, com o idioma indicado.
    translations: z
      .object({ en: translation.optional(), es: translation.optional() })
      .default({}),
  }),
});

export const collections = { projetos, artigos };
