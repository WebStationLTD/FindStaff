export async function GET(request) {
  const forwardedHost = request.headers.get('x-forwarded-host');
  const host = forwardedHost ?? request.headers.get('host') ?? 'localhost:3000';
  const forwardedProto = request.headers.get('x-forwarded-proto');
  const protocol = forwardedProto ?? (host.includes('localhost') ? 'http' : 'https');
  const baseUrl = `${protocol}://${host}`;

  const robotsTxt = `# FindStaff Robots.txt
# https://www.robotstxt.org/

User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-index.xml

# Disallow admin and private areas
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /wp-includes/

# Allow important pages
Allow: /
Allow: /about
Allow: /services
Allow: /team
Allow: /blog
Allow: /contact
Allow: /privacy-policy

# Crawl delay (optional)
Crawl-delay: 1

# Additional sitemaps if needed
# Sitemap: ${baseUrl}/sitemap-index.xml`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400', // 1 hour browser cache, 24 hours CDN cache
    },
  });
}
