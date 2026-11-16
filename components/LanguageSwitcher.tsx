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
      className={`flex rounded-[12px] border border-line bg-card p-1 text-[14px] ${className}`}
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
            className={`rounded-[9px] px-2.5 py-1.5 font-medium transition-colors ${
              active ? "bg-ink text-white" : "text-body hover:text-ink"
            }`}
          >
            {labels[locale].short}
          </a>
        );
      })}
    </div>
  );
}
