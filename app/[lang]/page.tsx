import { Contact, SiteFooter } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MotionLayer } from "@/components/MotionLayer";
import { ProcessStory } from "@/components/ProcessStory";
import { Services } from "@/components/Services";
import { StructuredData } from "@/components/StructuredData";
import { Work } from "@/components/Work";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { whatsappHref } from "@/lib/content";

export default async function Home() {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <>
      <Header
        t={dict.nav}
        locale={locale}
        whatsapp={whatsappHref(dict.whatsappMessage)}
      />
      <main>
        <Hero />
        <Services />
        <ProcessStory t={dict.process} />
        <Work />
        <Contact />
      </main>
      <SiteFooter />
      <StructuredData />
      {/* Last, so every section's scroll triggers exist before positions are measured. */}
      <MotionLayer />
    </>
  );
}
