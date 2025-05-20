
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

  // Use theme colors from globals.css
  const headerBaseClasses = "bg-background text-foreground shadow-lg sticky top-0 z-50";
  const buttonClasses = "text-foreground hover:bg-accent/10 focus-visible:ring-primary";


  if (!isMounted) { 
    return (
      <header className={headerBaseClasses}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-bold hover:opacity-90 transition-opacity">
            {siteName}
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <span className="opacity-0">Loading...</span> 
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu" className={cn("opacity-0", buttonClasses)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={headerBaseClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href={`/${lang}`} className="text-2xl font-bold hover:opacity-90 transition-opacity text-primary">
          {siteName}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <Button key={link.label} variant="ghost" asChild className={cn("text-sm", buttonClasses)}>
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={langSwitcherDictionary.label} className={buttonClasses}>
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card text-card-foreground border-border">
              {siteConfig.locales.map((locale) => (
                <DropdownMenuItem key={locale} asChild className="focus:bg-accent focus:text-accent-foreground">
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
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} className={buttonClasses}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={cn(
          "md:hidden fixed inset-x-0 top-16 shadow-xl transition-transform duration-300 ease-in-out",
          "bg-background text-foreground", // Ensure mobile menu also uses theme colors
          isMobileMenuOpen ? "transform translate-y-0" : "transform -translate-y-[150%]",
          "p-4 space-y-2 border-t border-border"
        )}>
          {navLinks.map((link) => (
             <Button key={link.label} variant="ghost" asChild className={cn("w-full justify-start text-base py-3", buttonClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                <Link href={link.href}>{link.label}</Link>
             </Button>
          ))}
          <div className="pt-2 border-t border-border/50">
            <p className="px-3 py-2 text-sm font-medium">{langSwitcherDictionary.label}</p>
            {siteConfig.locales.map((locale) => (
              <Button key={locale} variant="ghost" asChild className={cn("w-full justify-start text-base py-3", buttonClasses)} onClick={() => setIsMobileMenuOpen(false)}>
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
