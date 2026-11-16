import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { locales, localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
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
  return {
    metadataBase: new URL("https://nusatechsolution.com"),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: localePath(locale),
      languages: {
        id: localePath("id"),
        en: localePath("en"),
        "x-default": localePath("id"),
      },
    },
    openGraph: {
      title: "Nusantara Tech Solution",
      description: meta.ogDescription,
      url: localePath(locale),
      siteName: "Nusantara Tech Solution",
      locale: meta.ogLocale,
      type: "website",
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
