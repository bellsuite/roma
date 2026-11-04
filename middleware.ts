import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['it', 'en', 'fr', 'de', 'es', 'zh', 'ja'];
const defaultLocale = 'it';

function getLocale(request: NextRequest): string {
  // 1. Check cookie preference first (if user previously selected a language)
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (localeCookie && locales.includes(localeCookie)) {
    return localeCookie;
  }

  // 2. Fall back to browser Accept-Language header parsing with q-factors
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  const languages = acceptLanguage
    .split(',')
    .map((item) => {
      const parts = item.trim().split(';');
      const langTag = parts[0].trim();
      const langCode = langTag.substring(0, 2).toLowerCase();
      
      let q = 1.0;
      for (let i = 1; i < parts.length; i++) {
        const p = parts[i].trim();
        if (p.startsWith('q=')) {
          const parsedQ = parseFloat(p.substring(2));
          if (!isNaN(parsedQ)) q = parsedQ;
        }
      }
      return { langCode, q };
    })
    .sort((a, b) => b.q - a.q);

  for (const { langCode } of languages) {
    if (locales.includes(langCode)) {
      return langCode;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|foto-suites|icons|.*\\..*).*)',
  ],
};
