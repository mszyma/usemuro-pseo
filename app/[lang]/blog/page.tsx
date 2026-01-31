import { Metadata } from 'next';
import { Language, LOCALIZED_ROUTES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getAllBlogPosts, getCategories } from '@/lib/blog/loader';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import BlogCard from './components/BlogCard';
import CategoryFilter from './components/CategoryFilter';
import styles from './blog.module.css';
import landingStyles from '../landing.module.css';

const SITE_URL = 'https://usemuro.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const title = `${dict.blog.title} | Muro`;
  const description = dict.blog.subtitle;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/blog`,
      siteName: 'Muro',
      locale: lang === 'en' ? 'en_US' : lang === 'de' ? 'de_DE' : 'pl_PL',
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog`,
      languages: {
        en: `${SITE_URL}/en/blog`,
        de: `${SITE_URL}/de/blog`,
        pl: `${SITE_URL}/pl/blog`,
      },
    },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const posts = await getAllBlogPosts(lang);
  const categories = getCategories();
  const colorRoute = LOCALIZED_ROUTES[lang].colors;

  // Separate featured post from others
  const featuredPost = posts.find((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  const blogDict = {
    minRead: dict.blog.minRead,
    readMore: dict.blog.readMore,
    featuredPost: dict.blog.featuredPost,
  };

  return (
    <>
      <Navigation lang={lang} downloadText={dict.nav.download} />

      <header className={styles.blogHeader}>
        <div className={styles.blogHeaderInner}>
          <h1 className={styles.blogTitle}>{dict.blog.title}</h1>
          <p className={styles.blogSubtitle}>{dict.blog.subtitle}</p>
          <CategoryFilter
            categories={categories}
            currentCategory={null}
            lang={lang}
            allLabel={dict.blog.allPosts}
          />
        </div>
      </header>

      <main className={styles.blogContent}>
        {posts.length > 0 ? (
          <div className={styles.blogGrid}>
            {featuredPost && (
              <BlogCard
                post={featuredPost}
                lang={lang}
                dict={blogDict}
                featured
              />
            )}
            {regularPosts.map((post) => (
              <BlogCard key={post.slug} post={post} lang={lang} dict={blogDict} />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <h2 className={styles.noResultsTitle}>{dict.blog.noResults}</h2>
            <p className={styles.noResultsText}>Check back soon for new articles!</p>
          </div>
        )}
      </main>

      <footer className={landingStyles.footer}>
        <div className={landingStyles.container}>
          <div className={landingStyles.footerTop}>
            <div className={landingStyles.footerBrand}>
              <Link href={`/${lang}`} className={landingStyles.footerLogo}>
                muro
              </Link>
              <p>{dict.footer.tagline}</p>
            </div>
            <div className={landingStyles.footerLinks}>
              <div className={landingStyles.footerColumn}>
                <h4>{dict.footer.product}</h4>
                <ul>
                  <li><Link href={`/${lang}#features`}>{dict.footer.features}</Link></li>
                  <li><Link href={`/${lang}#how-it-works`}>{dict.footer.howItWorks}</Link></li>
                  <li><Link href={`/${lang}/${colorRoute}`}>{dict.footer.browseColors}</Link></li>
                </ul>
              </div>
              <div className={landingStyles.footerColumn}>
                <h4>{dict.footer.resources}</h4>
                <ul>
                  <li><Link href={`/${lang}/blog`}>{dict.footer.blog}</Link></li>
                  <li><Link href={`/${lang}/faq`}>{dict.footer.faq}</Link></li>
                </ul>
              </div>
              <div className={landingStyles.footerColumn}>
                <h4>{dict.footer.support}</h4>
                <ul>
                  <li><a href="http://usemuro.com/support">{dict.footer.supportForm}</a></li>
                  <li><a href="mailto:support@usemuro.com">{dict.footer.contactUs}</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className={landingStyles.footerBottom}>
            <p>{dict.footer.copyright}</p>
            <div className={landingStyles.footerLegal}>
              <Link href={`/${lang}/legal`}>{dict.footer.legal}</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
