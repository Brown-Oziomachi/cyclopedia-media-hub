export async function GET() {
    const robotsTxt = `# Allow all crawlers by default
User-agent: *
Allow: /

# Disallow admin and private pages
Disallow: /admin
Disallow: /api/
Disallow: /profile
Disallow: /subscriber-profile

# Optional: specific bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Sitemap
Sitemap: https://www.thecyclopedia.com.ng/sitemap.xml
`;

    return new Response(robotsTxt, {
        status: 200,
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=86400, s-maxage=86400", // Cache for 24 hours
        },
    });
}
