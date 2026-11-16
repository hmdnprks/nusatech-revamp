import { defaultLocale, type Locale } from "@/i18n/config";

/** Production origin. Vercel redirects the bare domain to `www`, so `www` is canonical. */
export const siteUrl = "https://www.nusatechsolution.com";

export const siteName = "Nusantara Tech Solution";

/** Absolute URL of a locale's home page: `/` for Indonesian, `/en` for English. */
export const localeUrl = (locale: Locale) =>
  locale === defaultLocale ? siteUrl : `${siteUrl}/${locale}`;
