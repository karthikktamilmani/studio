'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig, type Locale } from '@/config/site';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, Globe } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  lang: Locale;
  navDictionary: {
    home: string;
    services: string;
    contact: string;
  };
  siteName: string;
  langSwitcherDictionary: {
    label: string;
    en: string;
    es: string;
  };
}

export default function Header({ lang, navDictionary, siteName, langSwitcherDictionary }: HeaderProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getLocalizedPath = (newLocale: Locale) => {
    if (!pathname) return `/${newLocale}`;
    const segments = pathname.split('/');
    segments[1] = newLocale; // Pathname will be /<lang>/...
    return segments.join('/');
  };

  const navLinks = [
    { href: `/${lang}`, label: navDictionary.home },
    { href: `/${lang}#services`, label: navDictionary.services },
    { href: `/${lang}#contact`, label: navDictionary.contact },
  ];

  if (!isMounted) { // Avoid hydration mismatch for mobile menu logic
    return (
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-bold hover:opacity-90 transition-opacity">
            {siteName}
          </Link>
          {/* Placeholder for nav during SSR to match client render initially */}
          <div className="hidden md:flex items-center space-x-6">
            <span className="opacity-0">Loading...</span> 
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu" className="opacity-0">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href={`/${lang}`} className="text-2xl font-bold hover:opacity-90 transition-opacity">
          {siteName}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-3 lg:space-x-4">
          {navLinks.map((link) => (
            <Button key={link.label} variant="ghost" asChild className="text-sm hover:bg-primary-foreground/10">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={langSwitcherDictionary.label} className="hover:bg-primary-foreground/10">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card text-card-foreground">
              {siteConfig.locales.map((locale) => (
                <DropdownMenuItem key={locale} asChild className="focus:bg-accent/50 focus:text-accent-foreground">
                  <Link href={getLocalizedPath(locale)} lang={locale} prefetch={false}>
                    {locale === 'en' ? langSwitcherDictionary.en : langSwitcherDictionary.es}
                    {lang === locale && <span className="ml-2 text-xs opacity-70">(Current)</span>}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={cn(
          "md:hidden fixed inset-x-0 top-16 bg-primary text-primary-foreground shadow-xl transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "transform translate-y-0" : "transform -translate-y-[150%]",
          "p-4 space-y-2"
        )}>
          {navLinks.map((link) => (
             <Button key={link.label} variant="ghost" asChild className="w-full justify-start text-base py-3 hover:bg-primary-foreground/10" onClick={() => setIsMobileMenuOpen(false)}>
                <Link href={link.href}>{link.label}</Link>
             </Button>
          ))}
          <div className="pt-2 border-t border-primary-foreground/20">
            <p className="px-3 py-2 text-sm font-medium">{langSwitcherDictionary.label}</p>
            {siteConfig.locales.map((locale) => (
              <Button key={locale} variant="ghost" asChild className="w-full justify-start text-base py-3 hover:bg-primary-foreground/10" onClick={() => setIsMobileMenuOpen(false)}>
                <Link href={getLocalizedPath(locale)} lang={locale} prefetch={false}>
                  {locale === 'en' ? langSwitcherDictionary.en : langSwitcherDictionary.es}
                  {lang === locale && <span className="ml-2 text-xs opacity-70">(Current)</span>}
                </Link>
              </Button>
            ))}
          </div>
      </div>
    </header>
  );
}
