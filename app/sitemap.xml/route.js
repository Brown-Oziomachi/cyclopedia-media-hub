import { db1 } from "@/lib/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

// Fetch all articles
async function getAllArticles() {
    const q = query(collection(db1, "blogs"), orderBy("updatedAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

// Fetch all videos
async function getAllVideos() {
    const q = query(collection(db1, "videos"), orderBy("updatedAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

// Format date to ISO 8601 format (required by Google)
function formatDate(date) {
    if (!date) return new Date().toISOString();

    // If it's a Firestore Timestamp
    if (date.toDate) {
        return date.toDate().toISOString();
    }

    // If it's already a string or Date object
    return new Date(date).toISOString();
}

// Escape XML special characters
function escapeXml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export async function GET() {
    try {
        const articles = await getAllArticles();
        const videos = await getAllVideos();

        // Static pages
        const staticPages = [
            { url: '', priority: '1.0', changefreq: 'daily' },
            { url: 'about', priority: '0.8', changefreq: 'monthly' },
            { url: 'contact', priority: '0.7', changefreq: 'monthly' },
            { url: 'news', priority: '0.9', changefreq: 'hourly' },
            { url: 'politics', priority: '0.9', changefreq: 'daily' },
            { url: 'sports', priority: '0.9', changefreq: 'daily' },
            { url: 'technology', priority: '0.9', changefreq: 'daily' },
            { url: 'health', priority: '0.8', changefreq: 'daily' },
            { url: 'education', priority: '0.8', changefreq: 'daily' },
            { url: 'law-justice', priority: '0.8', changefreq: 'daily' },
            { url: 'live', priority: '0.9', changefreq: 'always' },
        ];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  
  <!-- Static Pages -->
  ${staticPages
                .map(
                    (page) => `
  <url>
    <loc>https://www.thecyclopedia.com.ng/${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
                )
                .join("")}

  <!-- Articles/News -->
  ${articles
                .map(
                    (article) => `
  <url>
    <loc>https://www.thecyclopedia.com.ng/${article.id}</loc>
    <lastmod>${formatDate(article.updatedAt)}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <news:news>
      <news:publication>
        <news:name>The Cyclopedia</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${formatDate(article.createdAt || article.updatedAt)}</news:publication_date>
      <news:title><![CDATA[${article.title}]]></news:title>
    </news:news>
  </url>`
                )
                .join("")}

  <!-- Videos -->
  ${videos
                .map(
                    (video) => `
  <url>
    <loc>https://www.thecyclopedia.com.ng/video/${video.id}</loc>
    <lastmod>${formatDate(video.updatedAt)}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <video:video>
      <video:content_loc>${escapeXml(video.videoUrl)}</video:content_loc>
      <video:thumbnail_loc>${escapeXml(video.thumbnailUrl)}</video:thumbnail_loc>
      <video:title><![CDATA[${video.title}]]></video:title>
      <video:description><![CDATA[${video.description || ''}]]></video:description>
      <video:publication_date>${formatDate(video.createdAt || video.updatedAt)}</video:publication_date>
    </video:video>
  </url>`
                )
                .join("")}
</urlset>`;

        return new Response(sitemap, {
            status: 200,
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (error) {
        console.error("Sitemap generation error:", error);
        return new Response("Error generating sitemap", { status: 500 });
    }
}