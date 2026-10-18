import rss from '@astrojs/rss';
import { SITE } from '../consts';
import { articleHref, publishedArticles } from '../lib/content';

export async function GET(context) {
  const articles = await publishedArticles();
  return rss({
    title: `Artigos · ${SITE.name}`,
    description: SITE.description,
    site: context.site,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.pubDate,
      link: articleHref(a),
      categories: a.data.tags,
    })),
  });
}
