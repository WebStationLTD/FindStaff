import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import { Roboto } from "next/font/google";
import Navigation from "../../components/nav";
import CookieConsentBanner from "../../components/cookieConsentBanner";
import Footer from "../../components/footer";
import ImagePreloader from "../../components/ImagePreloader";
import ClientBackToTop from "../../components/ClientBackToTop";
import { CriticalCSS } from "../critical-css";
import { routing } from "../../i18n/routing";
import "../../styles/globals.css";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const host = (await headers()).get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const ogLocale = locale === "it" ? "it_IT" : "bg_BG";

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title: {
      template: t("titleTemplate"),
      default: t("defaultTitle"),
    },
    description: t("defaultDescription"),
    openGraph: {
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      images: "/hero-image-desktop-new.jpg",
      type: "website",
      locale: ogLocale,
      siteName: "FindStaff",
    },
    twitter: {
      card: "summary_large_image",
      title: "FindStaff",
      description: t("defaultDescription"),
      images: ["/hero-image-desktop-new.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: locale === "it" ? "/it" : "/",
      languages: {
        bg: "/",
        it: "/it",
        "x-default": "/",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const lang = locale === "it" ? "it" : "bg";

  return (
    <html lang={lang}>
      <head>
        <CriticalCSS />
        <link
          rel="preconnect"
          href="https://findstaff.admin-panels.com/"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://findstaff.admin-panels.com/" />
        <link
          rel="preload"
          as="image"
          href="/hero-image-mobile-new.jpg"
          type="image/jpg"
          media="(max-width: 640px)"
        />
        <link
          rel="preload"
          as="image"
          href="/hero-image-desktop-new.jpg"
          type="image/jpg"
          media="(min-width: 641px)"
        />
      </head>
      <body className={roboto.className}>
        <NextIntlClientProvider messages={messages}>
          <NextTopLoader showSpinner={false} />
          <ImagePreloader />
          <Navigation />
          <main>{children}</main>
          <CookieConsentBanner />
          <Footer />
          <ClientBackToTop />
        </NextIntlClientProvider>

        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "FindStaff",
                url: "https://www.findstaff.bg",
                logo: "https://www.findstaff.bg/find-staff-logo.svg",
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+359 88 7458463",
                  email: "office@findstaff.com",
                  contactType: "customer service",
                  areaServed: ["BG", "IT"],
                  availableLanguage: ["bg", "it"],
                },
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "ул. Рачо Димчев 2",
                  addressLocality: "София",
                  postalCode: "1000",
                  addressCountry: "BG",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "FindStaff",
                url: "https://www.findstaff.bg",
                inLanguage: ["bg", "it"],
              },
            ]),
          }}
        />
      </body>
    </html>
  );
}
