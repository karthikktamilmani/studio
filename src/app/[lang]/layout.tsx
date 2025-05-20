import type { Metadata } from 'next';
import { siteConfig, type Locale } from '@/config/site';
import { getDictionary, type Dictionary } from '@/lib/get-dictionary';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: `${dictionary.organizationName} | ${dictionary.hero.title}`,
    description: dictionary.hero.subtitle,
  };
}

export default async function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary: Dictionary = await getDictionary(lang);
  return (
    <>
      <Header 
        lang={lang} 
        navDictionary={dictionary.nav} 
        siteName={dictionary.organizationName} 
        langSwitcherDictionary={dictionary.languageSwitcher} 
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer 
        footerDictionary={dictionary.footer} 
        organizationName={dictionary.organizationName} 
      />
    </>
  );
}
