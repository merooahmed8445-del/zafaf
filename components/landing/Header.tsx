'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#features', label: 'المميزات' },
    { href: '#how', label: 'كيف يعمل' },
    { href: '#pricing', label: 'الأسعار' },
    { href: '#faq', label: 'الأسئلة' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-parchment-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-maroon flex items-center justify-center shadow-md">
              <span className="text-gold-400 text-lg font-display font-bold">Z</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold text-maroon-900 font-display">Zafaf</span>
              <span className="text-[10px] text-gold-600 tracking-wider">دعوات فاخرة</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-maroon-900/80 hover:text-maroon-900 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ButtonLink href="/login" variant="ghost" size="sm">
              دخول
            </ButtonLink>
            <ButtonLink href="/register" variant="gold" size="sm">
              ابدأ الآن
            </ButtonLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-lg bg-parchment-100 flex items-center justify-center text-maroon-900"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-parchment-200 animate-fade-in">
            <nav className="flex flex-col gap-3 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-semibold text-maroon-900 py-2"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
              <ButtonLink href="/login" variant="outline" size="sm" fullWidth>
                دخول
              </ButtonLink>
              <ButtonLink href="/register" variant="gold" size="sm" fullWidth>
                ابدأ الآن
              </ButtonLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}