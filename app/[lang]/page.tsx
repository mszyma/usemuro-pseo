import { Language } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { generateHomepageMetadata } from '@/lib/seo/metadata';
import { generateHomepageSchemas } from '@/lib/blog/schema';
import { getColorStats } from '@/lib/colors/loader';
import Link from 'next/link';
import styles from './landing.module.css';
import FAQSection from './components/FAQSection';
import Navigation from './components/Navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  return generateHomepageMetadata(lang);
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const stats = getColorStats();
  const schemas = generateHomepageSchemas(lang);

  return (
    <>
      {/* Schema.org structured data - Organization, WebSite, and App schemas */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Navigation */}
      <Navigation lang={lang} downloadText={dict.nav.download} />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>{dict.hero.badge}</div>
              <h1 className={styles.heroTitle} dangerouslySetInnerHTML={{ __html: dict.hero.title }} />
              <p className={styles.heroSubtitle}>
                {dict.hero.subtitle}
              </p>
              <div className={styles.heroCtas}>
                <a
                  href="https://testflight.apple.com/join/x27fAsVs"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  target="_blank"
                  rel="noopener"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  {dict.hero.downloadBtn}
                </a>
                <a href="#how-it-works" className={`${styles.btn} ${styles.btnSecondary}`}>
                  {dict.hero.howItWorksBtn}
                </a>
              </div>
            </div>
            <div className={styles.heroVisual}>
              {/* Floating Badge - AI Processing */}
              <div className={styles.floatingBadge1}>
                <div className={styles.floatingIcon}>✨</div>
                <div>
                  <div className={styles.floatingTitle}>{dict.hero.aiProcessing}</div>
                  <div className={styles.floatingSubtitle}>{dict.hero.looksReal}</div>
                </div>
              </div>

              {/* Phone Mockup */}
              <div className={styles.phoneMockup}>
                <div className={styles.phoneMockupScreen}>
                  <img
                    src="/app-screenshot.png"
                    alt="Muro app showing before and after wall color transformation"
                    className={styles.phoneMockupImage}
                  />
                </div>
              </div>

              {/* Floating Badge - Color Sample */}
              <div className={styles.floatingBadge2}>
                <div className={styles.colorSwatch}></div>
                <div>
                  <div className={styles.floatingTitle}>{dict.hero.emeraldGreen}</div>
                  <div className={styles.floatingSubtitle}>#50C878</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Muro? */}
      <section className={`${styles.section} ${styles.sectionWhite}`}>
        <div className={`${styles.container} ${styles.containerNarrow}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionHeaderLabel}>{dict.about.label}</span>
            <h2>{dict.about.title}</h2>
          </div>
          <div className={styles.aboutContent}>
            <p dangerouslySetInnerHTML={{
              __html: dict.about.description.replace('{{totalColors}}', stats.totalColors.toLocaleString())
            }} />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`${styles.section} ${styles.sectionCream}`} id="how-it-works">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionHeaderLabel}>{dict.howItWorks.label}</span>
            <h2>{dict.howItWorks.title}</h2>
            <p>{dict.howItWorks.subtitle}</p>
          </div>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="32" height="32">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <h3>{dict.howItWorks.step1Title}</h3>
              <p>{dict.howItWorks.step1Desc}</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="32" height="32">
                  <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
                  <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
                  <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
                  <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
                </svg>
              </div>
              <h3>{dict.howItWorks.step2Title}</h3>
              <p>{dict.howItWorks.step2Desc.replace('{{totalColors}}', stats.totalColors.toLocaleString())}</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="32" height="32">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="12" y1="3" x2="12" y2="21" />
                </svg>
              </div>
              <h3>{dict.howItWorks.step3Title}</h3>
              <p>{dict.howItWorks.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={`${styles.section} ${styles.sectionWhite}`} id="features">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionHeaderLabel}>{dict.features.label}</span>
            <h2>{dict.features.title}</h2>
          </div>
          <div className={styles.featuresGrid}>
            <div className={`${styles.featureCard} ${styles.featureCardHighlight}`}>
              <div className={styles.featureCardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
                  <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
                  <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
                  <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
                  <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
                </svg>
              </div>
              <div className={styles.featureCardStat}>{dict.features.realColors.stat.replace('{{count}}', stats.totalColors.toLocaleString())}</div>
              <h3>{dict.features.realColors.title}</h3>
              <p>{dict.features.realColors.desc}</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <h3>{dict.features.matchPhotos.title}</h3>
              <p>{dict.features.matchPhotos.desc}</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </div>
              <h3>{dict.features.looksReal.title}</h3>
              <p>{dict.features.looksReal.desc}</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="12" y1="3" x2="12" y2="21" />
                </svg>
              </div>
              <h3>{dict.features.compare.title}</h3>
              <p>{dict.features.compare.desc}</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
              </div>
              <h3>{dict.features.save.title}</h3>
              <p>{dict.features.save.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Muro? */}
      <section className={`${styles.section} ${styles.sectionCream}`}>
        <div className={`${styles.container} ${styles.containerNarrow}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionHeaderLabel}>{dict.whyMuro.label}</span>
            <h2>{dict.whyMuro.title}</h2>
          </div>
          <ul className={styles.whyList}>
            <li className={styles.whyListItem} dangerouslySetInnerHTML={{ __html: dict.whyMuro.reason1 }} />
            <li className={styles.whyListItem} dangerouslySetInnerHTML={{ __html: dict.whyMuro.reason2 }} />
            <li className={styles.whyListItem} dangerouslySetInnerHTML={{ __html: dict.whyMuro.reason3 }} />
            <li className={styles.whyListItem} dangerouslySetInnerHTML={{ __html: dict.whyMuro.reason4 }} />
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection title={dict.faq.title} questions={dict.faq.questions} />

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>{dict.cta.title}</h2>
          <p>{dict.cta.subtitle}</p>
          <a
            href="https://testflight.apple.com/join/x27fAsVs"
            className={`${styles.btn} ${styles.btnPrimary}`}
            target="_blank"
            rel="noopener"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            {dict.cta.downloadBtn}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Link href={`/${lang}`} className={styles.footerLogo}>
                muro
              </Link>
              <p>{dict.footer.tagline}</p>
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.footerColumn}>
                <h4>{dict.footer.product}</h4>
                <ul>
                  <li><a href="#features">{dict.footer.features}</a></li>
                  <li><a href="#how-it-works">{dict.footer.howItWorks}</a></li>
                  <li><Link href={`/${lang}/colors`}>{dict.footer.browseColors}</Link></li>
                </ul>
              </div>
              <div className={styles.footerColumn}>
                <h4>{dict.footer.resources}</h4>
                <ul>
                  <li><Link href={`/${lang}/blog`}>{dict.footer.blog}</Link></li>
                  <li><Link href={`/${lang}/faq`}>{dict.footer.faq}</Link></li>
                </ul>
              </div>
              <div className={styles.footerColumn}>
                <h4>{dict.footer.support}</h4>
                <ul>
                  <li><a href="http://usemuro.com/support">{dict.footer.supportForm}</a></li>
                  <li><a href="mailto:support@usemuro.com">{dict.footer.contactUs}</a></li>
                </ul>
              </div>
            </div>
          </div>
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
