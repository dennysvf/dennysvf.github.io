import { getCollection, type CollectionEntry } from 'astro:content';

// Rascunhos aparecem no `npm run dev`, mas nunca no build de produção.
export async function publishedArticles() {
  const articles = await getCollection('artigos', ({ data }) => import.meta.env.DEV || !data.draft);
  return articles.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function articleHref(article: CollectionEntry<'artigos'>): string {
  return article.data.externalUrl ?? `/artigos/${article.id}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
