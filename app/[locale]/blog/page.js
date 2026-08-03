import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "../../../i18n/navigation";
import { getLocalizedAllPosts } from "../../../services/localized";
import { getAlternatesForLocale } from "../../../lib/i18n/config";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const ogLocale = locale === "it" ? "it_IT" : "bg_BG";

  return {
    title: t("blogTitle"),
    description: t("blogDescription"),
    openGraph: {
      title: t("blogTitle"),
      description: t("blogDescription"),
      locale: ogLocale,
      type: "website",
    },
    alternates: getAlternatesForLocale(locale, "/blog", "/blog"),
  };
}

export default async function Blog({ params, searchParams }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const page = (await searchParams).page;
  const currentPage = parseInt(page) || 1;
  const perPage = 9;
  const dateLocale = locale === "it" ? "it-IT" : "bg-BG";

  let posts = [];
  let totalPages = 1;

  if (locale === "it") {
    const all = await getLocalizedAllPosts("it");
    totalPages = Math.max(1, Math.ceil(all.length / perPage));
    posts = all.slice((currentPage - 1) * perPage, currentPage * perPage);
  } else {
    const response = await fetch(
      `https://findstaff.admin-panels.com/wp-json/wp/v2/posts?page=${currentPage}&per_page=${perPage}&_fields=id,yoast_head_json,date,slug,title,content`,
      { next: { revalidate: 120 } }
    );

    if (!response.ok) {
      return (
        <p className="text-gray-600 text-center mt-10">{t("notFound")}</p>
      );
    }

    const raw = await response.json();
    posts = raw.map((p) => ({
      id: p.id,
      slug: decodeURIComponent(p.slug),
      title: p.title?.rendered || "",
      content: p.content?.rendered || "",
      date: p.date,
      ogImage: p.yoast_head_json?.og_image?.[0]?.url || "/placeholder.webp",
    }));
    totalPages = Number(response.headers.get("x-wp-totalpages")) || 1;
  }

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 text-center shadow-2xl sm:px-12">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-4 text-gray-300">{t("description")}</p>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute -top-50 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            >
              <circle
                r={512}
                cx={512}
                cy={512}
                fill="url(#blog-hero-grad)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="blog-hero-grad">
                  <stop stopColor="#005e9e" />
                  <stop offset={1} stopColor="#005e9e" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => {
              const title = post.title?.rendered || post.title || "";
              const content = post.content?.rendered || post.content || "";
              const image =
                post.ogImage ||
                post.yoast_head_json?.og_image?.[0]?.url ||
                "/placeholder.webp";

              return (
                <article
                  key={post.id}
                  className="flex flex-col items-start justify-between"
                >
                  <div className="relative w-full">
                    <Image
                      width={400}
                      height={225}
                      alt={title}
                      src={image}
                      className="aspect-video w-full rounded-2xl bg-gray-100 object-cover"
                    />
                  </div>
                  <div className="max-w-xl">
                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                      <time dateTime={post.date} className="text-gray-500">
                        {post.date
                          ? new Date(post.date).toLocaleDateString(dateLocale)
                          : ""}
                      </time>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                        <Link href={`/blog/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {title}
                        </Link>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                        {content
                          .replace(/<\/?[^>]+(>|$)/g, "")
                          .substring(0, 150)}
                        ...
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={p === 1 ? "/blog" : `/blog?page=${p}`}
                  className={`px-3 py-1 rounded ${
                    p === currentPage
                      ? "bg-[#005e9e] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
