import { Language } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import Link from 'next/link';

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href={`/${lang}`} className="text-2xl font-bold text-orange-600">
            {dict.brandName}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Legal Information</h1>

        <div className="prose max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms of Service</h2>
            <p className="text-gray-600 mb-4">
              By using Muro, you agree to these terms of service. Muro is provided "as is" without warranties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Policy</h2>
            <p className="text-gray-600 mb-4">
              We respect your privacy. We do not sell your personal information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-600 mb-4">
              For legal inquiries, please contact us at:{' '}
              <a href="mailto:legal@usemuro.com" className="text-orange-600 hover:text-orange-500">
                legal@usemuro.com
              </a>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">{dict.footer.copyright}</p>
            <div className="flex gap-6">
              <Link
                href={`/${lang}`}
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Home
              </Link>
              <a
                href="http://usemuro.com/support"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                {dict.footer.support}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
