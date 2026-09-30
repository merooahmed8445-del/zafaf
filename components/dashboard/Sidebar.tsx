'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface SidebarProps {
  profile: {
    full_name?: string | null;
    email?: string;
    plan?: string;
  } | null;
}

export function DashboardSidebar({ profile }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'الرئيسية', icon: '🏠' },
    { href: '/dashboard/invitations', label: 'دعواتي', icon: '💌' },
    { href: '/dashboard/invitations/new', label: 'دعوة جديدة', icon: '➕' },
    { href: '/dashboard/rsvps', label: 'تأكيدات الحضور', icon: '👥' },
    { href: '/dashboard/settings', label: 'الإعدادات', icon: '⚙️' },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-parchment-200">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-maroon flex items-center justify-center shadow-md">
            <span className="text-gold-400 text-xl font-display font-bold">Z</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold text-maroon-900 font-display">Zafaf</span>
            <span className="text-[10px] text-gold-600 tracking-wider">لوحة التحكم</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={[
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                active
                  ? 'bg-maroon-900 text-gold-200 shadow-md'
                  : 'text-maroon-900/70 hover:bg-parchment-100 hover:text-maroon-900',
              ].join(' ')}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Plan Badge */}
      <div className="p-4 border-t border-parchment-200">
        <div className="bg-gradient-to-br from-gold-100 to-gold-200 border border-gold-300 rounded-xl p-3 text-center">
          <p className="text-[10px] text-gold-800 uppercase tracking-wider mb-1">خطتك</p>
          <p className="text-lg font-bold text-maroon-900 font-display capitalize">
            {profile?.plan || 'free'}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:right-0 lg:w-64 bg-white border-l border-parchment-200 z-30">
        {SidebarContent}
      </aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full gradient-maroon text-gold-300 flex items-center justify-center shadow-2xl"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden fixed inset-y-0 right-0 w-64 bg-white z-50 animate-fade-in">
            {SidebarContent}
          </aside>
        </>
      )}
    </>
  );
}