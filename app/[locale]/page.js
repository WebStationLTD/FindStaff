import HeroSection from "../../components/hero";
import { WebVitals } from "../web-vitals";
import dynamic from "next/dynamic";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getAlternatesForLocale } from "../../lib/i18n/config";

const Incentives = dynamic(() => import("../../components/incentives"), {
  ssr: true,
});
const Team = dynamic(() => import("../../components/team"), { ssr: true });
const CTA = dynamic(() => import("../../components/cta"), { ssr: true });
const Clients = dynamic(() => import("../../components/clients"), { ssr: true });
const Newsletter = dynamic(() => import("../../components/newsletter"), {
  ssr: true,
});
const Testimonial = dynamic(() => import("../../components/testimonial"), {
  ssr: true,
});
const Lastestposts = dynamic(() => import("../../components/latestposts"), {
  ssr: true,
});

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const ogLocale = locale === "it" ? "it_IT" : "bg_BG";

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      images: [
        {
          url: "/hero-image-desktop-new.jpg",
          width: 1200,
          height: 630,
          alt: "FindStaff",
        },
      ],
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("homeTitle"),
      description: t("homeDescription"),
      images: ["/hero-image-desktop-new.jpg"],
    },
    alternates: getAlternatesForLocale(locale, "/", "/"),
  };
}

export default async function Home({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <WebVitals />
      <HeroSection />
      <Incentives />
      <Team />
      <CTA />
      <Clients />
      <Newsletter />
      <Testimonial />
      <Lastestposts />
    </>
  );
}
