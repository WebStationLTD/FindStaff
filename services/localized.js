import { getPageById, getPageBySlug } from "./pages";
import { getServices, getServicesNav, getServiceBySlug } from "./services";
import { getPostBySlug, getLatestPosts, getAllPosts } from "./posts";
import { getMembers, getMemberInfo } from "./members";
import {
  getItalianPage,
  getItalianService,
  getAllItalianServices,
  getItalianPost,
  getItalianPostByItSlug,
  getAllItalianPosts,
  getItalianMember,
  getAllItalianMembers,
  resolveServiceSourceSlug,
  getServiceSlugForLocale,
  getPostSlugForLocale,
} from "../lib/i18n/content";
import { syncMissingItalianPostsOnce } from "../lib/i18n/sync-it-posts.mjs";

async function ensureItalianPostsSynced() {
  try {
    await syncMissingItalianPostsOnce({ log: false });
  } catch (error) {
    console.error("[i18n] IT post sync failed:", error?.message || error);
  }
}

function stripHtml(html = "") {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Normalize WP service into a common shape */
function mapWpService(service, locale = "bg") {
  if (!service) return null;
  const meta = service.yoast_head_json || {};
  return {
    id: service.id,
    sourceSlug: service.slug,
    slug: getServiceSlugForLocale(service.slug, locale),
    title: service.title?.rendered || service.title || "",
    excerpt: service.excerpt?.rendered || "",
    content: service.content?.rendered || "",
    date: service.date,
    metaTitle: meta.title || service.title?.rendered || "",
    metaDescription:
      meta.description ||
      stripHtml(service.excerpt?.rendered || service.content?.rendered || "").slice(
        0,
        160
      ),
    ogTitle: meta.og_title || meta.title || "",
    ogDescription: meta.og_description || meta.description || "",
    ogImage: meta.og_image?.[0]?.url || "",
    yoast_head_json: meta,
    raw: service,
  };
}

function mapItService(it) {
  if (!it) return null;
  return {
    id: it.id,
    sourceSlug: it.sourceSlug,
    slug: it.slugIt,
    title: it.title,
    excerpt: it.excerpt,
    content: it.contentHtml,
    date: it.date,
    metaTitle: it.metaTitle,
    metaDescription: it.metaDescription,
    ogTitle: it.ogTitle || it.metaTitle,
    ogDescription: it.ogDescription || it.metaDescription,
    ogImage: it.ogImage || "",
    yoast_head_json: {
      title: it.metaTitle,
      description: it.metaDescription,
      og_title: it.ogTitle || it.metaTitle,
      og_description: it.ogDescription || it.metaDescription,
      og_image: it.ogImage ? [{ url: it.ogImage }] : [],
    },
  };
}

function mapWpPost(post, locale = "bg") {
  if (!post) return null;
  const meta = post.yoast_head_json || {};
  const sourceSlug = decodeURIComponent(post.slug);
  return {
    id: post.id,
    sourceSlug,
    slug: getPostSlugForLocale(sourceSlug, locale),
    title: post.title?.rendered || post.title || "",
    excerpt: post.excerpt?.rendered || "",
    content: post.content?.rendered || "",
    date: post.date,
    metaTitle: meta.title || post.title?.rendered || "",
    metaDescription: meta.description || "",
    ogTitle: meta.og_title || meta.title || "",
    ogDescription: meta.og_description || meta.description || "",
    ogImage: meta.og_image?.[0]?.url || "",
    yoast_head_json: meta,
    raw: post,
  };
}

function mapItPost(it) {
  if (!it) return null;
  return {
    id: it.id,
    sourceSlug: it.sourceSlug,
    slug: it.slugIt,
    title: it.title,
    excerpt: it.excerpt,
    content: it.contentHtml,
    date: it.date,
    metaTitle: it.metaTitle,
    metaDescription: it.metaDescription,
    ogTitle: it.ogTitle || it.metaTitle,
    ogDescription: it.ogDescription || it.metaDescription,
    ogImage: it.ogImage || "",
    yoast_head_json: {
      title: it.metaTitle,
      description: it.metaDescription,
      og_title: it.ogTitle || it.metaTitle,
      og_description: it.ogDescription || it.metaDescription,
      og_image: it.ogImage ? [{ url: it.ogImage }] : [],
    },
  };
}

export async function getLocalizedServices(locale) {
  if (locale === "it") {
    const itServices = getAllItalianServices();
    if (itServices.length > 0) return itServices.map(mapItService);
  }
  const services = (await getServices()) || [];
  return services.map((s) => mapWpService(s, locale));
}

export async function getLocalizedServicesNav(locale) {
  if (locale === "it") {
    const itServices = getAllItalianServices();
    if (itServices.length > 0) {
      return itServices.map((s) => ({
        id: s.id,
        slug: s.slugIt,
        sourceSlug: s.sourceSlug,
        title: { rendered: s.title },
        yoast_head_json: {
          og_image: s.ogImage ? [{ url: s.ogImage }] : [],
        },
      }));
    }
  }
  return (await getServicesNav()) || [];
}

export async function getLocalizedServiceBySlug(slug, locale) {
  if (locale === "it") {
    const sourceSlug = resolveServiceSourceSlug(slug, "it");
    const it = getItalianService(sourceSlug);
    if (it) return [mapItService(it)];
  }
  const sourceSlug = resolveServiceSourceSlug(slug, locale);
  return getServiceBySlug(sourceSlug);
}

export async function getLocalizedPageById(id, locale, sourceSlug) {
  if (locale === "it" && sourceSlug) {
    const it = getItalianPage(sourceSlug);
    if (it) {
      return {
        id: it.id,
        slug: it.sourceSlug,
        title: { rendered: it.title },
        content: { rendered: it.contentHtml },
        excerpt: { rendered: it.excerpt },
        yoast_head_json: {
          title: it.metaTitle,
          description: it.metaDescription,
          og_title: it.ogTitle || it.metaTitle,
          og_description: it.ogDescription || it.metaDescription,
          og_image: it.ogImage ? [{ url: it.ogImage }] : [],
        },
      };
    }
  }
  return getPageById(id);
}

export async function getLocalizedPostBySlug(slug, locale) {
  if (locale === "it") {
    let it =
      getItalianPostByItSlug(slug) || getItalianPost(decodeURIComponent(slug));
    if (!it) {
      await ensureItalianPostsSynced();
      it =
        getItalianPostByItSlug(slug) || getItalianPost(decodeURIComponent(slug));
    }
    if (it) return [mapItPost(it)];
    return [];
  }
  return getPostBySlug(slug);
}

export async function getLocalizedLatestPosts(locale) {
  if (locale === "it") {
    await ensureItalianPostsSynced();
    const posts = getAllItalianPosts().slice(0, 3);
    if (posts.length > 0) return posts.map(mapItPost);
  }
  const posts = (await getLatestPosts()) || [];
  return posts.map((p) => mapWpPost(p, locale));
}

export async function getLocalizedAllPosts(locale) {
  if (locale === "it") {
    await ensureItalianPostsSynced();
    const posts = getAllItalianPosts();
    if (posts.length > 0) return posts.map(mapItPost);
  }
  const posts = (await getAllPosts()) || [];
  return posts.map((p) => mapWpPost(p, locale));
}

export async function getLocalizedMembers(locale) {
  const members = (await getMembers()) || [];
  if (locale !== "it") return members;

  return members.map((m) => {
    const it = getItalianMember(m.slug);
    if (!it) return m;
    return {
      ...m,
      name: it.name || m.name,
      position: it.position || m.position,
      description: it.description || m.description,
    };
  });
}

export async function getLocalizedMemberInfo(slug, locale) {
  const member = await getMemberInfo(slug);
  if (!member || locale !== "it") return member;
  const it = getItalianMember(slug);
  if (!it) return member;
  return {
    ...member,
    name: it.name || member.name,
    position: it.position || member.position,
    description: it.description || member.description,
  };
}

export { getServiceSlugForLocale, resolveServiceSourceSlug, getPostSlugForLocale };
