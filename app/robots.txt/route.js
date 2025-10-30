export async function GET() {
    const robotsTxt = `# *
User-agent: *
Allow: /

# Disallow admin and private pages
User-agent: *
Disallow: /admin
Disallow: /api/
Disallow: /profile
Disallow: /subscriber-profile

# Googlebot specific
User-agent: Googlebot
Allow: /

# Bingbot specific
User-agent: Bingbot
Allow: /

# Host
Host: https://www.thecyclopedia.com.ng

# Sitemaps
Sitemap: https://www.thecyclopedia.com.ng/sitemap.xml

# Crawl delay (optional - helps prevent server overload)
Crawl-delay: 1`;

    return new Response(robotsTxt, {
        status: 200,
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=86400, s-maxage=86400", // Cache for 24 hours
        },
    });
}