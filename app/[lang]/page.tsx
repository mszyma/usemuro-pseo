import { Language, LOCALIZED_ROUTES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { generateHomepageMetadata } from '@/lib/seo/metadata';
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

  const colorRoute = LOCALIZED_ROUTES[lang].colors;

  return (
    <>
      {/* Navigation */}
      <Navigation lang={lang} />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>AI Wall Visualizer</div>
              <h1 className={styles.heroTitle}>
                See it <em>before</em> you paint it
              </h1>
              <p className={styles.heroSubtitle}>
                Pick a color. Point your phone. See it on your wall. No painting required.
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
                  Download on App Store
                </a>
                <a href="#how-it-works" className={`${styles.btn} ${styles.btnSecondary}`}>
                  See How It Works
                </a>
              </div>
            </div>
            <div className={styles.heroVisual}>
              {/* Floating Badge - AI Processing */}
              <div className={styles.floatingBadge1}>
                <div className={styles.floatingIcon}>✨</div>
                <div>
                  <div className={styles.floatingTitle}>AI Processing</div>
                  <div className={styles.floatingSubtitle}>Looks real</div>
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
                  <div className={styles.floatingTitle}>Emerald Green</div>
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
            <span className={styles.sectionHeaderLabel}>About</span>
            <h2>What is Muro?</h2>
          </div>
          <div className={styles.aboutContent}>
            <p>
              <strong>Muro shows you exactly how any paint color will look in your room before you buy a single can.</strong>{' '}
              Take a photo, pick a color from {stats.totalColors.toLocaleString()}+ options (from brands like Sherwin-Williams, Benjamin Moore, Behr, Farrow & Ball),
              and see your wall transform in seconds. We preserve the shadows, the way light hits your wall, all of it.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`${styles.section} ${styles.sectionCream}`} id="how-it-works">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionHeaderLabel}>How It Works</span>
            <h2>Three steps to your perfect color</h2>
            <p>Transform your space with our AI-powered visualization.</p>
          </div>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="32" height="32">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <h3>Snap a photo</h3>
              <p>Point your phone at the wall. That&apos;s it. Doesn&apos;t matter if it&apos;s bright, dim, or whatever.</p>
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
              <h3>Pick a color</h3>
              <p>Browse {stats.totalColors.toLocaleString()}+ real paint colors from Sherwin-Williams, Benjamin Moore, Behr. All the brands you know.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="32" height="32">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="12" y1="3" x2="12" y2="21" />
                </svg>
              </div>
              <h3>See it instantly</h3>
              <p>Your wall transforms in seconds. Swipe to compare before and after. It actually looks real.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={`${styles.section} ${styles.sectionWhite}`} id="features">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionHeaderLabel}>Features</span>
            <h2>Everything you need to choose with confidence</h2>
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
              <div className={styles.featureCardStat}>{stats.totalColors.toLocaleString()}+</div>
              <h3>Real paint colors</h3>
              <p>Every color has a name and code you can buy at the store. No more guessing which &quot;sage green&quot; you saw online.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <h3>Match colors from photos</h3>
              <p>Saw a color in a magazine or on Pinterest? Upload it. We&apos;ll find the closest real paint you can actually buy.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </div>
              <h3>Looks like the real thing</h3>
              <p>We keep the shadows, the light, all of it. Other apps just slap a filter on. Not us.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="12" y1="3" x2="12" y2="21" />
                </svg>
              </div>
              <h3>Compare instantly</h3>
              <p>Swipe to see before and after. Makes it easy to decide if you really want that bold color.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="26" height="26">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
              </div>
              <h3>Save everything</h3>
              <p>Save your favorites. Compare options. Show your partner. You know, the important stuff.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Muro? */}
      <section className={`${styles.section} ${styles.sectionCream}`}>
        <div className={`${styles.container} ${styles.containerNarrow}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionHeaderLabel}>Why Muro?</span>
            <h2>Why choose Muro over other paint visualizers?</h2>
          </div>
          <ul className={styles.whyList}>
            <li className={styles.whyListItem}>
              <strong>It actually looks real.</strong> Other apps just slap a color filter on your photo. We preserve the shadows, the way light hits your wall, all of it.
            </li>
            <li className={styles.whyListItem}>
              <strong>Real paint you can buy.</strong> Every color has an actual name and code from brands like Sherwin-Williams, Benjamin Moore, Behr. No more guessing which &quot;warm gray&quot; you saw online.
            </li>
            <li className={styles.whyListItem}>
              <strong>See it in seconds.</strong> Not tomorrow. Not in an hour. Right now. Your wall transforms instantly.
            </li>
            <li className={styles.whyListItem}>
              <strong>Skip the sample pots.</strong> Test as many colors as you want without buying a single sample. Way cheaper, way faster.
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection title={dict.faq.title} questions={dict.faq.questions} />

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>Ready to stop guessing?</h2>
          <p>Download Muro and start visualizing. See what that &quot;moody blue&quot; actually looks like before you commit.</p>
          <a
            href="https://testflight.apple.com/join/x27fAsVs"
            className={`${styles.btn} ${styles.btnPrimary}`}
            target="_blank"
            rel="noopener"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download on App Store
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
              <p>AI-powered wall color visualization. See it before you paint it.</p>
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.footerColumn}>
                <h4>Product</h4>
                <ul>
                  <li><a href="#features">Features</a></li>
                  <li><a href="#how-it-works">How It Works</a></li>
                  <li><Link href={`/${lang}/${colorRoute}`}>Browse Colors</Link></li>
                </ul>
              </div>
              <div className={styles.footerColumn}>
                <h4>Support</h4>
                <ul>
                  <li><a href="http://usemuro.com/support">Support Form</a></li>
                  <li><a href="mailto:support@usemuro.com">Contact Us</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2026 Muro.</p>
            <div className={styles.footerLegal}>
              <Link href={`/${lang}/legal`}>Terms & Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
