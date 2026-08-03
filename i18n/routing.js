import { defineRouting } from "next-intl/routing";

export const locales = ["bg", "it"];
export const defaultLocale = "bg";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: false,
});
