import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Language } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import {
  getPostsByCategory,
  getCategories,
  getCategoryBySlug,
  getAllCategorySlugs,
} from '@/lib/blog/loader';
import Navigation from '../../../components/Navigation';
import BlogCard from '../../components/BlogCard';
import CategoryFilter from '../../components/CategoryFilter';
import styles from '../../blog.module.css';
import landingStyles from '../../../landing.module.css';

const SITE_URL = 'https://usemuro.com';

export async function generateStaticParams() {
  return getAllCategorySlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language; category: string }>;
}): Promise<Metadata> {
  const { lang, category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return { title: 'Not Found' };
  }

  const title = `${category.name[lang]} | Muro Blog`;
  const description = category.description[lang];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/blog/category/${categorySlug}`,
      siteName: 'Muro',
      locale: lang === 'en' ? 'en_US' : lang === 'de' ? 'de_DE' : 'pl_PL',
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog/category/${categorySlug}`,
      languages: {
        en: `${SITE_URL}/en/blog/category/${categorySlug}`,
        de: `${SITE_URL}/de/blog/category/${categorySlug}`,
        pl: `${SITE_URL}/pl/blog/category/${categorySlug}`,
      },
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: Language; category: string }>;
}) {
  const { lang, category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const posts = await getPostsByCategory(categorySlug, lang);
  const categories = getCategories();

  const blogDict = {
    minRead: dict.blog.minRead,
    readMore: dict.blog.readMore,
    featuredPost: dict.blog.featuredPost,
  };

  return (
    <>
      <Navigation lang={lang} downloadText={dict.nav.download} />

      <header className={styles.categoryHeader}>
        <h1 className={styles.categoryTitle}>{category.name[lang]}</h1>
        <p className={styles.categoryDescription}>{category.description[lang]}</p>
        <p className={styles.categoryCount}>
          {posts.length} {dict.blog.postsInCategory.replace('{{category}}', category.name[lang])}
        </p>
        <CategoryFilter
          categories={categories}
          currentCategory={categorySlug}
          lang={lang}
          allLabel={dict.blog.allPosts}
        />
      </header>

      <main className={styles.blogContent}>
        {posts.length > 0 ? (
          <div className={styles.blogGrid}>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} lang={lang} dict={blogDict} />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <h2 className={styles.noResultsTitle}>{dict.blog.noResults}</h2>
            <p className={styles.noResultsText}>
              Check back soon for new articles in this category!
            </p>
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
                  <li><Link href={`/${lang}/colors`}>{dict.footer.browseColors}</Link></li>
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
