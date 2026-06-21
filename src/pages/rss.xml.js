import { publishedStories } from '../utils/content';

export async function GET({ site: _site }) {
  const stories = await publishedStories();
  const base = 'https://nilatales.com';

  const items = stories.map(story => {
    const title = story.data.title;
    const link = `${base}${story.url}`;
    const description = story.data.summary || '';
    const pubDate = story.data.pubDate.toUTCString();
    return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${link}</link>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid>${link}</guid>
    </item>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>நிலா கதைகள் · NilaTales</title>
    <link>${base}</link>
    <description>Illustrated Tamil bedtime stories for children. Moral tales, Thirukkural, Panchatantra, comics, lullabies, and activities.</description>
    <language>ta</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}