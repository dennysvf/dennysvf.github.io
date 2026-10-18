import rss from '@astrojs/rss';
import { SITE } from '../consts';
import { useTranslations } from '../i18n/ui';
import { localizeArticle, publishedArticles } from '../lib/content';

export async function GET(context) {
  const t = useTranslations('pt');
  const articles = await publishedArticles();
  return rss({
    title: `${t.articles.eyebrow} · ${SITE.name}`,
    description: t.siteDescription,
    site: context.site,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.pubDate,
      link: localizeArticle(a, 'pt').href,
      categories: a.data.tags,
    })),
  });
}
