import { getPages } from "./pages.js";
import { getServices } from "./services.js";
import { getAllPosts } from "./posts.js";
import { getMembers } from "./members.js";
import {
  getAllItalianServices,
  getAllItalianPosts,
} from "../lib/i18n/content.js";
import { getServiceSlugForLocale } from "../lib/i18n/config.js";

export const getAllSitemapUrls = async () => {
  try {
    const [pages, services, posts, members] = await Promise.all([
      getPages(),
      getServices(),
      getAllPosts(),
      getMembers(),
    ]);

    return {
      pages: pages || [],
      services: services || [],
      posts: posts || [],
      members: members || [],
      itServices: getAllItalianServices(),
      itPosts: getAllItalianPosts(),
      staticPages: [
        { slug: "", priority: "1.0", changefreq: "daily" },
        { slug: "about", priority: "0.8", changefreq: "weekly" },
        { slug: "services", priority: "0.9", changefreq: "weekly" },
        { slug: "team", priority: "0.8", changefreq: "weekly" },
        { slug: "blog", priority: "0.8", changefreq: "daily" },
        { slug: "contact", priority: "0.7", changefreq: "monthly" },
        { slug: "privacy-policy", priority: "0.3", changefreq: "yearly" },
      ],
    };
  } catch (error) {
    console.error("Error fetching sitemap data:", error);
    return {
      pages: [],
      services: [],
      posts: [],
      members: [],
      itServices: getAllItalianServices(),
      itPosts: getAllItalianPosts(),
      staticPages: [
        { slug: "", priority: "1.0", changefreq: "daily" },
        { slug: "about", priority: "0.8", changefreq: "weekly" },
        { slug: "services", priority: "0.9", changefreq: "weekly" },
        { slug: "team", priority: "0.8", changefreq: "weekly" },
        { slug: "blog", priority: "0.8", changefreq: "daily" },
        { slug: "contact", priority: "0.7", changefreq: "monthly" },
        { slug: "privacy-policy", priority: "0.3", changefreq: "yearly" },
      ],
    };
  }
};

function urlEntry(loc, changefreq, priority, lastmod) {
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod || new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const generateSitemapXML = (baseUrl, data) => {
  const {
    staticPages,
    services,
    posts,
    members,
    itServices = [],
    itPosts = [],
  } = data;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  staticPages.forEach((page) => {
    const bgUrl = page.slug ? `${baseUrl}/${page.slug}` : baseUrl;
    const itUrl = page.slug ? `${baseUrl}/it/${page.slug}` : `${baseUrl}/it`;
    xml += `
  <url>
    <loc>${bgUrl}</loc>
    <xhtml:link rel="alternate" hreflang="bg" href="${bgUrl}" />
    <xhtml:link rel="alternate" hreflang="it" href="${itUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${bgUrl}" />
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    xml += urlEntry(itUrl, page.changefreq, page.priority);
  });

  if (services && services.length > 0) {
    services.forEach((service) => {
      const bgUrl = `${baseUrl}/services/${service.slug}`;
      const itSlug = getServiceSlugForLocale(service.slug, "it");
      const itUrl = `${baseUrl}/it/services/${itSlug}`;
      xml += `
  <url>
    <loc>${bgUrl}</loc>
    <xhtml:link rel="alternate" hreflang="bg" href="${bgUrl}" />
    <xhtml:link rel="alternate" hreflang="it" href="${itUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${bgUrl}" />
    <lastmod>${new Date(service.date || Date.now()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      xml += urlEntry(
        itUrl,
        "weekly",
        "0.8",
        new Date(service.date || Date.now()).toISOString()
      );
    });
  }

  if (posts && posts.length > 0) {
    posts.forEach((post) => {
      const sourceSlug = decodeURIComponent(post.slug);
      const bgUrl = `${baseUrl}/blog/${sourceSlug}`;
      const itPost = (itPosts || []).find((p) => p.sourceSlug === sourceSlug);
      // Only emit IT hreflang/URL when a real IT translation exists (protects BG SEO)
      const itUrl = itPost
        ? `${baseUrl}/it/blog/${itPost.slugIt}`
        : null;
      xml += `
  <url>
    <loc>${bgUrl}</loc>
    <xhtml:link rel="alternate" hreflang="bg" href="${bgUrl}" />
    ${
      itUrl
        ? `<xhtml:link rel="alternate" hreflang="it" href="${itUrl}" />`
        : ""
    }
    <xhtml:link rel="alternate" hreflang="x-default" href="${bgUrl}" />
    <lastmod>${new Date(post.date || Date.now()).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
      if (itUrl) {
        xml += urlEntry(
          itUrl,
          "monthly",
          "0.6",
          new Date(post.date || Date.now()).toISOString()
        );
      }
    });
  }

  if (members && members.length > 0) {
    members.forEach((member) => {
      const bgUrl = `${baseUrl}/team/${member.slug}`;
      const itUrl = `${baseUrl}/it/team/${member.slug}`;
      xml += `
  <url>
    <loc>${bgUrl}</loc>
    <xhtml:link rel="alternate" hreflang="bg" href="${bgUrl}" />
    <xhtml:link rel="alternate" hreflang="it" href="${itUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${bgUrl}" />
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
      xml += urlEntry(itUrl, "monthly", "0.6");
    });
  }

  xml += "\n</urlset>";
  return xml;
};
