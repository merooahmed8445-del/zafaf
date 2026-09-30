'use client';

import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TopBarProps {
  profile: {
    full_name?: string | null;
    email?: string;
  } | null;
  email?: string;
}

export function DashboardTopBar({ profile, email }: TopBarProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  const initials = (profile?.full_name || email || '؟')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-md border-b border-parchment-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left: Empty (for balance in RTL) */}
        <div></div>

        {/* Right: User + Actions */}
        <div className="flex items-center gap-3">
          {/* User Info */}
          <div className="hidden sm:flex flex-col items-end leading-tight">
            <span className="text-sm font-bold text-maroon-900">
              {profile?.full_name || 'مستخدم'}
            </span>
            <span className="text-xs text-maroon-900/50">{email}</span>
          </div>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full gradient-maroon flex items-center justify-center shadow-md">
            <span className="text-gold-300 text-sm font-bold">{initials}</span>
          </div>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="px-3 py-2 rounded-lg text-xs font-bold text-maroon-900/70 hover:bg-parchment-100 hover:text-maroon-900 transition-all disabled:opacity-50"
          >
            {loading ? '...' : 'خروج'}
          </button>
        </div>
      </div>
    </header>
  );
}