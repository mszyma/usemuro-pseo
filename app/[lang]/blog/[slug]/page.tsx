import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Language, SUPPORTED_LANGUAGES } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import {
  getBlogPost,
  getAuthorById,
  getCategoryById,
  getRelatedPosts,
  getAllBlogSlugs,
  getTranslatedSlugs,
} from '@/lib/blog/loader';
import { generateBlogPageSchemas } from '@/lib/blog/schema';
import { addHeaderIds } from '@/lib/blog/toc';
import Navigation from '../../components/Navigation';
import TableOfContents from '../components/TableOfContents';
import ShareButtons from '../components/ShareButtons';
import AuthorCard from '../components/AuthorCard';
import RelatedPosts from '../components/RelatedPosts';
import styles from '../blog.module.css';
import landingStyles from '../../landing.module.css';

const SITE_URL = 'https://usemuro.com';

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map(({ lang, slug }) => ({ lang, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Language; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getBlogPost(slug, lang);

  if (!post) {
    return { title: 'Not Found' };
  }

  // Get translated slugs for proper hreflang tags
  const translations = await getTranslatedSlugs(slug, lang);

  const title = `${post.frontmatter.title} | Muro Blog`;
  const description = post.frontmatter.description;
  const url = `${SITE_URL}/${lang}/blog/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title: post.frontmatter.title,
      description,
      url,
      siteName: 'Muro',
      locale: lang === 'en' ? 'en_US' : lang === 'de' ? 'de_DE' : 'pl_PL',
      type: 'article',
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updated,
      images: post.frontmatter.image
        ? [{ url: `${SITE_URL}${post.frontmatter.image}`, alt: post.frontmatter.imageAlt || post.frontmatter.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description,
    },
    alternates: {
      canonical: url,
      languages: SUPPORTED_LANGUAGES.reduce((acc, l) => {
        acc[l] = `${SITE_URL}/${l}/blog/${translations[l]}`;
        return acc;
      }, {} as Record<string, string>),
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ lang: Language; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = await getBlogPost(slug, lang);

  if (!post) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const author = getAuthorById(post.frontmatter.author);
  const category = getCategoryById(post.frontmatter.category);
  const relatedPosts = await getRelatedPosts(
    slug,
    post.frontmatter.category,
    post.frontmatter.tags,
    lang,
    3
  );

  // Get translated slugs for language switcher
  const translations = await getTranslatedSlugs(slug, lang);

  if (!author || !category) {
    notFound();
  }

  const url = `${SITE_URL}/${lang}/blog/${slug}`;
  const htmlWithIds = addHeaderIds(post.htmlContent);

  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
    lang === 'en' ? 'en-US' : lang === 'de' ? 'de-DE' : 'pl-PL',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  // Generate all schemas: Organization, BlogPosting, and Breadcrumbs
  const schemas = generateBlogPageSchemas(post, author, lang, [
    { name: 'Muro', url: `${SITE_URL}/${lang}` },
    { name: dict.blog.title, url: `${SITE_URL}/${lang}/blog` },
    { name: category.name[lang], url: `${SITE_URL}/${lang}/blog/category/${category.slug}` },
    { name: post.frontmatter.title, url },
  ]);

  const blogDict = {
    minRead: dict.blog.minRead,
    readMore: dict.blog.readMore,
    featuredPost: dict.blog.featuredPost,
  };

  return (
    <>
      {/* Schema.org structured data - Organization, BlogPosting, and Breadcrumbs */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Navigation lang={lang} downloadText={dict.nav.download} translations={translations} />

      <header className={styles.articleHeader}>
        <div className={styles.articleHeaderInner}>
          <nav className={styles.articleBreadcrumb}>
            <Link href={`/${lang}/blog`}>{dict.blog.title}</Link>
            <span>/</span>
            <Link href={`/${lang}/blog/category/${category.slug}`}>
              {category.name[lang]}
            </Link>
          </nav>
          <span className={styles.articleCategory}>{category.name[lang]}</span>
          <h1 className={styles.articleTitle}>{post.frontmatter.title}</h1>
          <div className={styles.articleMeta}>
            <span className={styles.articleMetaItem}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formattedDate}
            </span>
            <span className={styles.articleMetaItem}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readingTime} {dict.blog.minRead}
            </span>
          </div>
        </div>
      </header>

      <div className={styles.articleLayout}>
        <aside>
          <TableOfContents items={post.toc} title={dict.blog.tableOfContents} />
        </aside>

        <main className={styles.articleContent}>
          {post.frontmatter.image && (
            <img
              src={post.frontmatter.image}
              alt={post.frontmatter.imageAlt || post.frontmatter.title}
              className={styles.articleHeroImage}
            />
          )}

          <article
            className={styles.articleBody}
            dangerouslySetInnerHTML={{ __html: htmlWithIds }}
          />

          <div className={styles.articleTags}>
            {post.frontmatter.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>

          <AuthorCard author={author} lang={lang} byLabel={dict.blog.byAuthor} />

          <ShareButtons
            url={url}
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            shareTitle={dict.blog.shareArticle}
            copyLinkLabel={dict.blog.copyLink}
            linkCopiedLabel={dict.blog.linkCopied}
            mobile
          />

          <RelatedPosts
            posts={relatedPosts}
            lang={lang}
            title={dict.blog.relatedPosts}
            dict={blogDict}
          />

          <div style={{ marginTop: '48px' }}>
            <Link href={`/${lang}/blog`} className={styles.blogCardLink}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ transform: 'rotate(180deg)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {dict.blog.backToBlog}
            </Link>
          </div>
        </main>

        <aside>
          <ShareButtons
            url={url}
            title={post.frontmatter.title}
            description={post.frontmatter.description}
            shareTitle={dict.blog.shareArticle}
            copyLinkLabel={dict.blog.copyLink}
            linkCopiedLabel={dict.blog.linkCopied}
          />
        </aside>
      </div>

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
