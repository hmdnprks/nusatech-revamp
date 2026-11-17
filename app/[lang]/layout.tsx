import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { locales, localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { siteName, siteUrl } from "@/lib/site";
import "../globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { meta } = await getDictionary();
  const other = locales.filter((l) => l !== locale);
  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    applicationName: siteName,
    authors: [{ name: siteName, url: siteUrl }],
    publisher: siteName,
    category: "technology",
    robots: { index: true, follow: true },
    alternates: {
      canonical: localePath(locale),
      languages: {
        id: localePath("id"),
        en: localePath("en"),
        "x-default": localePath("id"),
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.ogDescription,
      url: localePath(locale),
      siteName,
      locale: meta.ogLocale,
      alternateLocale: other.map((l) => (l === "id" ? "id_ID" : "en_US")),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.ogDescription,
    },
  };
}

// Opt in to motion before first paint so revealed elements don't flash.
// If the motion layer never starts, show everything after a short grace period.
const motionOptIn = `(function(d){d.classList.add('js-motion');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('js-motion')},2500)})(document.documentElement)`;

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  return (
    <html
      lang={await getLocale()}
      className={outfit.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionOptIn }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
