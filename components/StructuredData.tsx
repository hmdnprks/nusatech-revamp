import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { contact } from "@/lib/content";
import { localeUrl, siteName, siteUrl } from "@/lib/site";

/**
 * schema.org description of the business for search engines. Only facts the
 * company has published: name, contact details, address and services.
 */
export async function StructuredData() {
  const locale = await getLocale();
  const { meta } = await getDictionary();

  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    legalName: "CV Nusantara Tech Solution",
    alternateName: "Nusatech",
    url: localeUrl(locale),
    description: meta.description,
    slogan: "Transforming Ideas into Digital Success",
    email: contact.email,
    telephone: "+62-877-7733-1908",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Kunir No. 53, Pondok Cabe Udik",
      addressLocality: "Pamulang",
      addressRegion: "Banten",
      postalCode: "15418",
      addressCountry: "ID",
    },
    areaServed: { "@type": "Country", name: "Indonesia" },
    knowsLanguage: ["id", "en"],
    inLanguage: locale,
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: every value is our own static copy.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
