import { Suspense } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import { setRequestLocale } from "next-intl/server";
import ServiceForm from "@/components/ServiceForm";
import {
  getLocalizedServiceBySlug,
  getServiceSlugForLocale,
  resolveServiceSourceSlug,
} from "../../../../services/localized";
import {
  getAlternatesForLocale,
  localePath,
} from "../../../../lib/i18n/config";

const ServiceContent = dynamic(
  () => import("../../../../components/ServiceContent"),
  {
    ssr: true,
    loading: () => (
      <div className="animate-pulse h-96 bg-gray-100 rounded-md"></div>
    ),
  }
);

export const revalidate = 3600;

function normalizeService(raw, locale) {
  if (!raw) return null;
  // Already normalized (IT map)
  if (typeof raw.title === "string") {
    return raw;
  }
  const meta = raw.yoast_head_json || {};
  return {
    id: raw.id,
    sourceSlug: raw.slug,
    slug: getServiceSlugForLocale(raw.slug, locale),
    title: raw.title?.rendered || "",
    excerpt: raw.excerpt?.rendered || "",
    content: raw.content?.rendered || "",
    date: raw.date,
    metaTitle: meta.title || raw.title?.rendered || "",
    metaDescription: meta.description || "",
    ogTitle: meta.og_title || meta.title || "",
    ogDescription: meta.og_description || meta.description || "",
    ogImage: meta.og_image?.[0]?.url || "",
    yoast_head_json: meta,
  };
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const result = await getLocalizedServiceBySlug(slug, locale);
  const service = normalizeService(result?.[0], locale);

  if (!service) {
    return { title: "Service" };
  }

  const sourceSlug = resolveServiceSourceSlug(slug, locale);
  const bgSlug = sourceSlug;
  const itSlug = getServiceSlugForLocale(sourceSlug, "it");
  const ogLocale = locale === "it" ? "it_IT" : "bg_BG";

  return {
    title: service.metaTitle || service.title,
    description:
      service.metaDescription ||
      service.content.replace(/<[^>]+>/g, "").slice(0, 160),
    openGraph: {
      title: service.ogTitle || service.title,
      description: service.ogDescription || service.metaDescription,
      images: service.ogImage
        ? [{ url: service.ogImage, width: 1200, height: 630, alt: service.title }]
        : [],
      type: "article",
      locale: ogLocale,
    },
    alternates: getAlternatesForLocale(
      locale,
      `/services/${bgSlug}`,
      `/services/${itSlug}`
    ),
  };
}

export default async function ServicePage({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  try {
    const result = await getLocalizedServiceBySlug(slug, locale);
    const service = normalizeService(result?.[0], locale);

    if (!service) {
      throw new Error("Service not found");
    }

    const sourceSlug = resolveServiceSourceSlug(slug, locale);
    const serviceSchemaData = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description:
        service.content.replace(/<[^>]+>/g, "").substring(0, 200) + "...",
      url: `https://www.findstaff.bg${localePath(locale, `/services/${service.slug}`)}`,
      provider: {
        "@type": "Organization",
        name: "FindStaff",
        url: "https://www.findstaff.bg",
        logo: "https://www.findstaff.bg/find-staff-logo.svg",
      },
      image: service.ogImage || "https://www.findstaff.bg/placeholder.webp",
      inLanguage: locale === "it" ? "it" : "bg",
    };

    return (
      <>
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchemaData),
          }}
        />

        <div className="bg-white">
          <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-23 text-center shadow-2xl sm:px-23">
              <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                {service.title}
              </h1>
              <svg
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                className="absolute -top-50 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              >
                <circle
                  r={512}
                  cx={512}
                  cy={512}
                  fill="url(#service-detail-grad)"
                  fillOpacity="0.7"
                />
                <defs>
                  <radialGradient id="service-detail-grad">
                    <stop stopColor="#005e9e" />
                    <stop offset={1} stopColor="#005e9e" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white py-12 sm:py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Suspense
              fallback={
                <div className="animate-pulse h-96 bg-gray-100 rounded-md"></div>
              }
            >
              <ServiceContent content={service.content} />
            </Suspense>

            <div className="mt-16">
              <Suspense
                fallback={
                  <div className="animate-pulse h-96 bg-gray-100 rounded-md"></div>
                }
              >
                <ServiceForm
                  serviceId={service.id}
                  serviceSlug={sourceSlug}
                  serviceName={service.title.replace(/<[^>]*>/g, "")}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    return <p>Error: {error.message}</p>;
  }
}
