import { getPages } from './pages.js';
import { getServices } from './services.js';
import { getAllPosts } from './posts.js';
import { getMembers } from './members.js';

/**
 * Get all URLs for sitemap generation
 * @returns {Promise<Object>} Object containing all URLs organized by type
 */
export const getAllSitemapUrls = async () => {
  try {
    const [pages, services, posts, members] = await Promise.all([
      getPages(),
      getServices(),
      getAllPosts(),
      getMembers()
    ]);

    return {
      pages: pages || [],
      services: services || [],
      posts: posts || [],
      members: members || [],
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
  } catch (error) {
    console.error('Error fetching sitemap data:', error);
    return {
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
  }
};

/**
 * Generate sitemap XML content
 * @param {string} baseUrl - Base URL of the website
 * @param {Object} data - Sitemap data
 * @returns {string} XML content
 */
export const generateSitemapXML = (baseUrl, data) => {
  const { staticPages, services, posts, members } = data;
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages
  staticPages.forEach(page => {
    const url = page.slug ? `${baseUrl}/${page.slug}` : baseUrl;
    xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Add services
  if (services && services.length > 0) {
    services.forEach(service => {
      xml += `
  <url>
    <loc>${baseUrl}/services/${service.slug}</loc>
    <lastmod>${new Date(service.date || Date.now()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });
  }

  // Add blog posts
  if (posts && posts.length > 0) {
    posts.forEach(post => {
      xml += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date || Date.now()).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });
  }

  // Add team members
  if (members && members.length > 0) {
    members.forEach(member => {
      xml += `
  <url>
    <loc>${baseUrl}/team/${member.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });
  }

  xml += '\n</urlset>';
  return xml;
};
