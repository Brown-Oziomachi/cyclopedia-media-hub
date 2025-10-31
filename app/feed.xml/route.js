import { db1 } from "@/lib/firebaseConfig";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";

// Fetch recent articles (last 50)
async function getRecentArticles() {
    const q = query(
        collection(db1, "blogs"),
        orderBy("createdAt", "desc"),
        limit(50)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}

// Format date to RFC 822 format (required by RSS)
function formatRssDate(date) {
    if (!date) return new Date().toUTCString();
    if (date.toDate) return date.toDate().toUTCString();
    return new Date(date).toUTCString();
}

// Escape XML special characters
function escapeXml(text) {
    if (!text) return "";
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

// Strip HTML tags for description
function stripHtml(html) {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "").substring(0, 300) + "...";
}

// Detect image type from URL
function getImageType(url) {
    if (!url) return "image/jpeg";
    if (url.endsWith(".png")) return "image/png";
    if (url.endsWith(".avif")) return "image/avif";
    if (url.endsWith(".webp")) return "image/webp";
    return "image/jpeg";
}

export async function GET() {
    try {
        const articles = await getRecentArticles();

        const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>The Cyclopedia</title>
    <link>https://www.thecyclopedia.com.ng</link>
    <description>Your trusted source for global news, in-depth analysis, and diverse perspectives on world events, culture, and society.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://www.thecyclopedia.com.ng/feed.xml" rel="self" type="application/rss+xml"/>
    <copyright>Copyright ${new Date().getFullYear()} The Cyclopedia. All rights reserved.</copyright>
    <managingEditor>editor@thecyclopedia.com.ng (The Cyclopedia Editorial Team)</managingEditor>
    <webMaster>webmaster@thecyclopedia.com.ng (The Cyclopedia Web Team)</webMaster>
    <category>News</category>
    <category>Politics</category>
    <category>Sports</category>
    <category>Technology</category>
    <category>Health</category>
    <category>Education</category>
    <image>
      <url>https://www.thecyclopedia.com.ng/truth.png</url>
      <title>The Cyclopedia</title>
      <link>https://www.thecyclopedia.com.ng</link>
    </image>

${articles
                .map(
                    (article) => `    <item>
      <title><![CDATA[${article.title || "Untitled"}]]></title>
      <link>https://www.thecyclopedia.com.ng/news/${article.id}</link>
      <guid isPermaLink="true">https://www.thecyclopedia.com.ng/news/${article.id}</guid>
      <pubDate>${formatRssDate(article.createdAt || article.updatedAt)}</pubDate>
      <description><![CDATA[${stripHtml(article.description || article.content)}]]></description>
      ${article.content ? `<content:encoded><![CDATA[${article.content}]]></content:encoded>` : ""}
      ${article.author ? `<dc:creator><![CDATA[${article.author}]]></dc:creator>` : ""}
      ${article.category ? `<category><![CDATA[${article.category}]]></category>` : ""}
      ${article.imageUrl ? `<media:content url="${escapeXml(article.imageUrl)}" medium="image"/>` : ""}
      ${article.imageUrl ? `<media:thumbnail url="${escapeXml(article.imageUrl)}"/>` : ""}
      ${article.imageUrl ? `<enclosure url="${escapeXml(article.imageUrl)}" type="${getImageType(article.imageUrl)}" length="1" />` : ""}
    </item>`
                )
                .join("\n")}

  </channel>
</rss>`;

        return new Response(rss, {
            status: 200,
            headers: {
                "Content-Type": "application/xml; charset=utf-8",
                "Cache-Control": "public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600", // Cache for 30 minutes
            },
        });
    } catch (error) {
        console.error("RSS feed generation error:", error);
        return new Response("Error generating RSS feed", { status: 500 });
    }
}
