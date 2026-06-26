import type { Metadata } from "next";
import translations, { languages, type Lang } from "@/lib/medicine/translations";
import MediBridgePage from "@/components/MediBridgePage";

export function generateStaticParams() {
  return languages.map(l => ({ lang: l.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const validLang = languages.find(l => l.code === lang) ? lang : 'en';
  const t = translations[validLang as Lang] || translations.en;

  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: {
      canonical: `https://has88888888.com/medicine/${validLang}`,
      languages: Object.fromEntries(
        languages.map(l => [l.code, `https://has88888888.com/medicine/${l.code}`])
      ),
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDesc,
      url: `https://has88888888.com/medicine/${validLang}`,
      siteName: t.brandName,
      locale: validLang === 'zh' ? 'zh_CN' : validLang === 'ar' ? 'ar_SA' : validLang === 'ru' ? 'ru_RU' : validLang === 'fr' ? 'fr_FR' : validLang === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
  };
}

export default async function MedicineLangPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const validLang = (languages.find(l => l.code === lang) ? lang : 'en') as Lang;
  const t = translations[validLang] || translations.en;

  return <MediBridgePage lang={validLang} t={t} />;
}
