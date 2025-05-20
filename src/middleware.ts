import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';

const { defaultLocale, locales } = siteConfig;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  // If running locally (npm run dev), assets like /favicon.ico might be requested without locale.
  // Check for common asset extensions or paths that should not be redirected.
  if (pathname.includes('.') || pathname.startsWith('/api/')) {
    return;
  }
  
  // Redirect to the default locale
  // Kept it simple for now, could use Accept-Language header for locale detection
  const localeToRedirect = defaultLocale; 
  
  request.nextUrl.pathname = `/${localeToRedirect}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static assets (images, favicon)
    '/((?!_next|images|favicon.ico|api).*)',
    // Optional: only run on root (/) URL if you want to be more restrictive
    // '/' 
  ],
};
