import type { Locale } from "../config";
import type { Dictionary } from "./en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  id: () => import("./id").then((m) => m.default),
  en: () => import("./en").then((m) => m.default),
};

/** Load a locale's copy directly, for places without root params (e.g. metadata images). */
export function getDictionaryFor(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export type { Dictionary };
