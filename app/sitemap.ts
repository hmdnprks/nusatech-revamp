import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { localeUrl } from "@/lib/site";

const languages = {
  ...Object.fromEntries(locales.map((l) => [l, localeUrl(l)])),
  "x-default": localeUrl("id"),
};

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: localeUrl(locale),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
