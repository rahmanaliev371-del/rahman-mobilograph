import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Marquee } from "@/components/ui/Marquee";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { categories } from "@/lib/data";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getDictionary(lang);

  return (
    <MotionProvider>
      <Header t={t} locale={lang} />
      <main>
        <Hero t={t} />
        <Marquee
          items={categories.map((c) => t.portfolio.categories[c])}
          className="border-y border-line py-5 font-display text-2xl text-paper/80 uppercase md:py-7 md:text-4xl"
        />
        <About t={t} />
        <Portfolio t={t} locale={lang} />
        <Services t={t} />
        <Process t={t} />
        <Pricing t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </MotionProvider>
  );
}
