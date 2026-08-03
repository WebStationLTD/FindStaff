"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../i18n/navigation";
import {
  getServiceSlugForLocale,
  serviceSlugMap,
  serviceSlugMapReverse,
} from "../lib/i18n/config";
import postSlugMap from "../content/it/post-slug-map.json";

const postSlugMapReverse = Object.fromEntries(
  Object.entries(postSlugMap).map(([bg, it]) => [it, bg])
);

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (nextLocale) => {
    if (nextLocale === locale) return;

    let href = pathname || "/";
    const parts = href.split("/").filter(Boolean);

    if (parts[0] === "services" && parts[1]) {
      const sourceSlug =
        serviceSlugMapReverse[parts[1]] ||
        (serviceSlugMap[parts[1]] ? parts[1] : parts[1]);
      const targetSlug = getServiceSlugForLocale(sourceSlug, nextLocale);
      href = `/services/${targetSlug}`;
    }

    if (parts[0] === "blog" && parts[1]) {
      const currentSlug = decodeURIComponent(parts[1]);
      if (nextLocale === "it") {
        const itSlug = postSlugMap[currentSlug];
        href = itSlug ? `/blog/${itSlug}` : "/blog";
      } else {
        const bgSlug = postSlugMapReverse[currentSlug] || currentSlug;
        href = `/blog/${bgSlug}`;
      }
    }

    router.replace(href, { locale: nextLocale });
  };

  return (
    <div className="flex items-center gap-1 text-sm" aria-label="Language">
      <button
        type="button"
        onClick={() => switchTo("bg")}
        className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
          locale === "bg"
            ? "font-semibold text-[#005e9e]"
            : "text-gray-600 hover:text-[#005e9e]"
        }`}
        aria-pressed={locale === "bg"}
      >
        BG
      </button>
      <span className="text-gray-300" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        onClick={() => switchTo("it")}
        className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
          locale === "it"
            ? "font-semibold text-[#005e9e]"
            : "text-gray-600 hover:text-[#005e9e]"
        }`}
        aria-pressed={locale === "it"}
      >
        IT
      </button>
    </div>
  );
}
