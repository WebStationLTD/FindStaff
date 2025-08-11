import { getAllSitemapUrls, generateSitemapXML } from '../../services/sitemap';

export async function GET(request) {
  try {
    const forwardedHost = request.headers.get('x-forwarded-host');
    const host = forwardedHost ?? request.headers.get('host') ?? 'localhost:3000';
    const forwardedProto = request.headers.get('x-forwarded-proto');
    const protocol = forwardedProto ?? (host.includes('localhost') ? 'http' : 'https');
    const baseUrl = `${protocol}://${host}`;

    // Get all sitemap data
    const sitemapData = await getAllSitemapUrls();
    
    // Generate sitemap XML
    const sitemap = generateSitemapXML(baseUrl, sitemapData);

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400', // 1 hour browser cache, 24 hours CDN cache
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Fallback sitemap with just static pages
    const forwardedHost2 = request.headers.get('x-forwarded-host');
    const host = forwardedHost2 ?? request.headers.get('host') ?? 'localhost:3000';
    const forwardedProto2 = request.headers.get('x-forwarded-proto');
    const protocol = forwardedProto2 ?? (host.includes('localhost') ? 'http' : 'https');
    const baseUrl = `${protocol}://${host}`;
    
    const fallbackData = {
      pages: [],
      services: [],
      posts: [],
      members: [],
      staticPages: [
        { slug: '', priority: '1.0', changefreq: 'daily' },
        { slug: 'about', priority: '0.8', changefreq: 'weekly' },
        { slug: 'services', priority: '0.9', changefreq: 'weekly' },
        { slug: 'team', priority: '0.8', changefreq: 'weekly' },
        { slug: 'blog', priority: '0.8', changefreq: 'daily' },
        { slug: 'contact', priority: '0.7', changefreq: 'monthly' },
        { slug: 'privacy-policy', priority: '0.3', changefreq: 'yearly' }
      ]
    };
    
    const fallbackSitemap = generateSitemapXML(baseUrl, fallbackData);

    return new Response(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  }
}
