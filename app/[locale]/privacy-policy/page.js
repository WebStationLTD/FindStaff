import { setRequestLocale, getTranslations } from "next-intl/server";
import { getLocalizedPageById } from "../../../services/localized";
import { getAlternatesForLocale } from "../../../lib/i18n/config";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const page = await getLocalizedPageById(3, locale, "privacy-policy");
  const ogLocale = locale === "it" ? "it_IT" : "bg_BG";

  return {
    title: page?.yoast_head_json?.title || t("privacyTitle"),
    description:
      page?.yoast_head_json?.description || t("privacyDescription"),
    openGraph: {
      title: page?.yoast_head_json?.og_title || t("privacyTitle"),
      description:
        page?.yoast_head_json?.og_description || t("privacyDescription"),
      locale: ogLocale,
      type: "website",
    },
    alternates: getAlternatesForLocale(
      locale,
      "/privacy-policy",
      "/privacy-policy"
    ),
  };
}

export default async function PrivacyPolicyPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });
  const page = await getLocalizedPageById(3, locale, "privacy-policy");

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 text-center shadow-2xl sm:px-12">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {page?.title?.rendered || t("title")}
            </h1>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <article className="mx-auto max-w-3xl w-full">
          <div
            className="wordpress-content prose max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: page?.content?.rendered || "",
            }}
          />
        </article>
      </div>
    </>
  );
}
