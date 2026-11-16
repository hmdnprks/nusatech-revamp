import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale, type Locale } from "./config";
import { getDictionaryFor, type Dictionary } from "./dictionaries";

/** The current route's locale, read from the `[lang]` root segment. */
export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return locale;
}

export async function getDictionary(): Promise<Dictionary> {
  return getDictionaryFor(await getLocale());
}

export type { Dictionary };
