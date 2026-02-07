import { NextRequest, NextResponse } from 'next/server';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, detectLanguageFromHeader } from './lib/i18n/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle www -> non-www redirect
  const hostname = request.headers.get('host');
  if (hostname?.startsWith('www.')) {
    const newUrl = request.nextUrl.clone();
    newUrl.host = hostname.replace('www.', '');
    return NextResponse.redirect(newUrl, 301);
  }

  // Redirect root to default language (with detection)
  if (pathname === '/') {
    const acceptLang = request.headers.get('accept-language');
    const detectedLang = detectLanguageFromHeader(acceptLang);
    return NextResponse.redirect(new URL(`/${detectedLang}`, request.url));
  }

  // Redirect /legal to /en/legal (canonical URL)
  if (pathname === '/legal') {
    return NextResponse.redirect(new URL('/en/legal', request.url), 301);
  }

  // Check if pathname has a language prefix
  const pathnameHasLang = SUPPORTED_LANGUAGES.some(
    lang => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  // If no language in pathname, redirect to detected language
  if (!pathnameHasLang && !pathname.startsWith('/_next') && !pathname.includes('.')) {
    const acceptLang = request.headers.get('accept-language');
    const detectedLang = detectLanguageFromHeader(acceptLang);
    return NextResponse.redirect(new URL(`/${detectedLang}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json)$).*)',
  ],
};
