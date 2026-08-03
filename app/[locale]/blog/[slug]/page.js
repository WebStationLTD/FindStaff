import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "../../../../i18n/navigation";
import { getLocalizedPostBySlug } from "../../../../services/localized";
import { getItalianPost } from "../../../../lib/i18n/content";
import { getAlternatesForLocale } from "../../../../lib/i18n/config";

function normalizePost(raw) {
  if (!raw) return null;
  // Already normalized (IT / mapped WP) — content already EUR-converted upstream
  if (typeof raw.title === "string") return raw;
  const meta = raw.yoast_head_json || {};
  return {
    id: raw.id,
    sourceSlug: decodeURIComponent(raw.slug),
    slug: decodeURIComponent(raw.slug),
    title: raw.title?.rendered || "",
    content: raw.content?.rendered || "",
    date: raw.date,
    metaTitle: meta.title || "",
    metaDescription: meta.description || "",
    ogTitle: meta.og_title || "",
    ogDescription: meta.og_description || "",
    ogImage: meta.og_image?.[0]?.url || "",
  };
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const result = await getLocalizedPostBySlug(slug, locale);
  const post = normalizePost(result?.[0]);
  if (!post) return { title: "Post" };

  const sourceSlug = post.sourceSlug || slug;
  const itPost = getItalianPost(sourceSlug);
  const itAlternate = itPost?.slugIt ? `/blog/${itPost.slugIt}` : null;
  const ogLocale = locale === "it" ? "it_IT" : "bg_BG";

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.ogTitle || post.title,
      description: post.ogDescription || post.metaDescription,
      images: post.ogImage ? [{ url: post.ogImage }] : [],
      locale: ogLocale,
    },
    alternates: getAlternatesForLocale(
      locale,
      `/blog/${sourceSlug}`,
      itAlternate
    ),
  };
}

export default async function PostPage({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const dateLocale = locale === "it" ? "it-IT" : "bg-BG";

  try {
    const result = await getLocalizedPostBySlug(slug, locale);
    const post = normalizePost(result?.[0]);

    if (!post) {
      return (
        <p className="text-gray-600 text-center mt-10">{t("notFound")}</p>
      );
    }

    return (
      <div className="bg-white py-12">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Link
            href="/blog"
            className="text-sm font-medium text-[#005e9e] hover:underline"
          >
            {t("backToBlog")}
          </Link>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900">
            {post.title}
          </h1>
          {post.date && (
            <p className="mt-4 text-sm text-gray-500">
              {t("publishedOn")}{" "}
              {new Date(post.date).toLocaleDateString(dateLocale)}
            </p>
          )}
          <div
            className="wordpress-content prose max-w-none mt-10 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <p className="text-gray-600 text-center mt-10">{t("notFound")}</p>
    );
  }
}
