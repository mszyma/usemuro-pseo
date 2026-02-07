import { Metadata } from 'next';
import Link from 'next/link';
import { Language, SUPPORTED_LANGUAGES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { generateFAQSchema, generateOrganizationSchema } from '@/lib/blog/schema';
import Navigation from '../components/Navigation';
import FAQSection from '../components/FAQSection';
import styles from '../landing.module.css';

const SITE_URL = 'https://usemuro.com';

export async function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const title = `${dict.faqPage.title} | Muro`;
  const description = dict.faqPage.subtitle;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/faq`,
      siteName: 'Muro',
      locale: lang === 'en' ? 'en_US' : lang === 'de' ? 'de_DE' : 'pl_PL',
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/faq`,
      languages: {
        en: `${SITE_URL}/en/faq`,
        de: `${SITE_URL}/de/faq`,
        pl: `${SITE_URL}/pl/faq`,
      },
    },
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Generate schemas: Organization and FAQ
  const faqItems = dict.faq.questions.map((q: { q: string; a: string }) => ({
    question: q.q,
    answer: q.a,
  }));
  const schemas = [
    generateOrganizationSchema(`${SITE_URL}/${lang}/faq`),
    generateFAQSchema(faqItems),
  ];

  return (
    <>
      {/* Schema.org structured data - Organization and FAQ */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Navigation lang={lang} downloadText={dict.nav.download} />

      <main>
        {/* Header */}
        <section className={`${styles.section} ${styles.sectionCream}`} style={{ paddingTop: '140px' }}>
          <div className={`${styles.container} ${styles.containerNarrow}`}>
            <div className={styles.sectionHeader}>
              <h1>{dict.faqPage.title}</h1>
              <p>{dict.faqPage.subtitle}</p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <FAQSection title="" questions={dict.faq.questions} />

        {/* Contact CTA */}
        <section className={`${styles.section} ${styles.sectionCream}`}>
          <div className={`${styles.container} ${styles.containerNarrow}`} style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '16px' }}>{dict.faqPage.stillHaveQuestions}</h2>
            <a
              href="http://usemuro.com/support"
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              {dict.faqPage.contactUs}
            </a>
            <div style={{ marginTop: '24px' }}>
              <Link href={`/${lang}`} className={styles.btnSecondary} style={{ padding: '12px 24px', display: 'inline-block', textDecoration: 'none' }}>
                {dict.faqPage.backToHome}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerBottom}>
            <p>{dict.footer.copyright}</p>
            <div className={styles.footerLegal}>
              <Link href={`/${lang}/legal`}>{dict.footer.legal}</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
