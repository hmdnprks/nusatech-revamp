export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];

/** Indonesian is the default and is served without a prefix: `/` is Indonesian, `/en` is English. */
export const defaultLocale: Locale = "id";

/** Remembers the language a visitor picked with the switcher. */
export const localeCookie = "NEXT_LOCALE";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const localePath = (locale: Locale) =>
  locale === defaultLocale ? "/" : `/${locale}`;
