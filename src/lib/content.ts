import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, localizedPath, type Locale } from '../i18n/ui';

export async function getProjects(locale: Locale) {
  const projects = await getCollection('projetos', ({ id }) => id.startsWith(`${locale}/`));
  return projects.sort((a, b) => a.data.order - b.data.order);
}

// "pt/gcli" → "gcli"
export function projectSlug(project: CollectionEntry<'projetos'>): string {
  return project.id.split('/').slice(1).join('/');
}

// Rascunhos aparecem no `npm run dev`, mas nunca no build de produção.
export async function publishedArticles() {
  const articles = await getCollection('artigos', ({ data }) => import.meta.env.DEV || !data.draft);
  return articles.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export interface LocalizedArticle {
  title: string;
  description: string;
  href: string;
  external: boolean;
  // Idioma do texto para onde `href` leva.
  hrefLocale: Locale;
  // Outra versão publicada que vale oferecer como link secundário.
  alternate?: { locale: Locale; href: string };
}

export function localizeArticle(article: CollectionEntry<'artigos'>, locale: Locale): LocalizedArticle {
  const { data } = article;
  const original = data.externalUrl ?? localizedPath(DEFAULT_LOCALE, 'articles', article.id);
  const tr = locale === DEFAULT_LOCALE ? undefined : data.translations[locale];
  const translatedUrl = tr?.url;
  const englishUrl = data.translations.en?.url;

  return {
    title: tr?.title ?? data.title,
    description: tr?.description ?? data.description,
    href: translatedUrl ?? original,
    external: Boolean(translatedUrl ?? data.externalUrl),
    hrefLocale: translatedUrl ? locale : DEFAULT_LOCALE,
    alternate: englishUrl && locale !== 'en' ? { locale: 'en', href: englishUrl } : undefined,
  };
}
