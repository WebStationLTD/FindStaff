import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getLocalizedPageById } from "../../../services/localized";
import { getAlternatesForLocale } from "../../../lib/i18n/config";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const page = await getLocalizedPageById(18, locale, "about");
  const ogLocale = locale === "it" ? "it_IT" : "bg_BG";

  if (!page) {
    return {
      title: t("aboutTitle"),
      description: t("aboutDescription"),
      openGraph: {
        title: t("aboutTitle"),
        description: t("aboutDescription"),
        locale: ogLocale,
        type: "website",
      },
      alternates: getAlternatesForLocale(locale, "/about", "/about"),
    };
  }

  const meta = page.yoast_head_json || {};
  const ogImage =
    meta.og_image && meta.og_image.length > 0 ? meta.og_image[0].url : "";
  const fallbackDescription =
    meta?.description && meta.description.trim().length > 0
      ? meta.description
      : (page?.excerpt?.rendered || page?.content?.rendered || "")
          .replace(/<[^>]+>/g, "")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 160);

  return {
    title: meta.title || t("aboutTitle"),
    description: fallbackDescription || t("aboutDescription"),
    openGraph: {
      title: meta.og_title || t("aboutTitle"),
      description:
        meta.og_description && meta.og_description.trim().length > 0
          ? meta.og_description
          : fallbackDescription,
      images: ogImage ? [{ url: ogImage }] : [],
      locale: ogLocale,
      type: "website",
    },
    alternates: getAlternatesForLocale(locale, "/about", "/about"),
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const page = await getLocalizedPageById(18, locale, "about");

  if (!page) {
    return (
      <div className="container mx-auto p-6 max-w-5xl bg-white py-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 border-b pb-2">
          {t("title")}
        </h1>
        <p className="text-gray-700">{t("loadError")}</p>
      </div>
    );
  }

  const meta = page.yoast_head_json || {};
  const ogImage =
    meta.og_image && meta.og_image.length > 0 ? meta.og_image[0].url : "";

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 text-center shadow-2xl sm:px-12">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {page.title.rendered}
              </h1>
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
                fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="#005e9e" />
                  <stop offset={1} stopColor="#005e9e" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <article className="mx-auto max-w-8xl w-full">
          {ogImage && (
            <Image
              src={ogImage}
              alt={meta.og_title || page.title?.rendered || t("title")}
              width={1200}
              height={630}
              className="w-full h-auto mb-8 rounded-xl shadow-lg"
              priority={false}
            />
          )}
          <div
            className="wordpress-content prose max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        </article>
      </div>
    </>
  );
}
