import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nusatechsolution.com"),
  title: "Nusantara Tech Solution | Transforming Ideas into Digital Success",
  description:
    "Custom web, mobile and cloud applications for universities, foundations and growing businesses. IT consulting and application development from Tangerang Selatan, Indonesia.",
  openGraph: {
    title: "Nusantara Tech Solution",
    description:
      "Your trusted partner for IT consulting and custom application development.",
    url: "/",
    siteName: "Nusantara Tech Solution",
    locale: "en_US",
    type: "website",
  },
};

// Opt in to motion before first paint so revealed elements don't flash.
// If the motion layer never starts, show everything after a short grace period.
const motionOptIn = `(function(d){d.classList.add('js-motion');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('js-motion')},2500)})(document.documentElement)`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionOptIn }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
