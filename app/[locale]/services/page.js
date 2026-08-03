import { Suspense } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getLocalizedServices } from "../../../services/localized";
import { getAlternatesForLocale, localePath } from "../../../lib/i18n/config";

const ServicesList = dynamic(() => import("../../../components/ServicesList"), {
  ssr: true,
  loading: () => (
    <div className="animate-pulse h-96 bg-gray-100 rounded-md"></div>
  ),
});

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const ogLocale = locale === "it" ? "it_IT" : "bg_BG";

  return {
    title: t("servicesTitle"),
    description: t("servicesDescription"),
    openGraph: {
      title: t("servicesTitle"),
      description: t("servicesDescription"),
      locale: ogLocale,
      type: "website",
    },
    alternates: getAlternatesForLocale(locale, "/services", "/services"),
  };
}

export default async function Services({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

  try {
    const services = await getLocalizedServices(locale);

    if (!services || services.length === 0) {
      return (
        <p className="text-gray-600 text-center mt-10">{t("notFound")}</p>
      );
    }

    const servicesSchemaData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title,
          url: `https://www.findstaff.bg${localePath(locale, `/services/${service.slug}`)}`,
          description:
            (service.content || "")
              .replace(/<[^>]+>/g, "")
              .substring(0, 150) + "...",
          provider: {
            "@type": "Organization",
            name: "FindStaff",
            url: "https://www.findstaff.bg",
          },
        },
      })),
    };

    // Adapt shape for ServicesList (expects WP-like objects)
    const listItems = services.map((s) => ({
      id: s.id,
      slug: s.slug,
      title: { rendered: s.title },
      content: { rendered: s.content },
      excerpt: { rendered: s.excerpt },
      date: s.date,
      yoast_head_json: s.yoast_head_json,
    }));

    return (
      <>
        <Script
          id="services-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(servicesSchemaData),
          }}
        />
        <div className="bg-white">
          <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 text-center shadow-2xl sm:px-12">
              <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-300">
                {t("description")}
              </p>
              <svg
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                className="absolute -top-50 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              >
                <circle
                  r={512}
                  cx={512}
                  cy={512}
                  fill="url(#services-hero-grad)"
                  fillOpacity="0.7"
                />
                <defs>
                  <radialGradient id="services-hero-grad">
                    <stop stopColor="#005e9e" />
                    <stop offset={1} stopColor="#005e9e" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <Suspense
          fallback={
            <div className="animate-pulse h-96 bg-gray-100 rounded-md" />
          }
        >
          <ServicesList services={listItems} />
        </Suspense>
      </>
    );
  } catch (error) {
    console.error(error);
    return (
      <p className="text-gray-600 text-center mt-10">{t("notFound")}</p>
    );
  }
}
