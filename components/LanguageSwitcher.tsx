"use client";

import { localeCookie, localePath, locales, type Locale } from "@/i18n/config";

const labels: Record<Locale, { short: string; name: string }> = {
  id: { short: "ID", name: "Bahasa Indonesia" },
  en: { short: "EN", name: "English" },
};

/**
 * ID / EN toggle. Remembers the choice in a cookie so `/` sends returning
 * English readers to `/en`, and keeps the reader on the same section.
 */
export function LanguageSwitcher({
  current,
  label,
  className = "",
}: {
  current: Locale;
  label: string;
  className?: string;
}) {
  const choose = (locale: Locale) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
    if (locale === current) return;
    window.location.assign(localePath(locale) + window.location.hash);
  };

  return (
    <div
      role="group"
      aria-label={label}
      className={`flex rounded-[14px] border border-line bg-card p-0.5 text-[14px] ${className}`}
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <a
            key={locale}
            href={localePath(locale)}
            hrefLang={locale}
            lang={locale}
            title={labels[locale].name}
            aria-label={labels[locale].name}
            aria-current={active ? "true" : undefined}
            onClick={choose(locale)}
            className={`grid min-h-11 min-w-11 place-items-center rounded-[11px] px-2.5 font-medium underline-offset-4 transition-colors ${
              active
                ? "bg-ink text-white"
                : "text-body hover:text-ink hover:underline"
            }`}
          >
            {labels[locale].short}
          </a>
        );
      })}
    </div>
  );
}
