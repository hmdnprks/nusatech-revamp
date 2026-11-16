import { Contact } from "@/components/Contact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MotionLayer } from "@/components/MotionLayer";
import { ProcessStory } from "@/components/ProcessStory";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <ProcessStory />
        <Work />
        <Contact />
      </main>
      {/* Last, so every section's scroll triggers exist before positions are measured. */}
      <MotionLayer />
    </>
  );
}
