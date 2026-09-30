'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardBody } from '@/components/ui/Card';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      setLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-parchment-50">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-2xl gradient-maroon flex items-center justify-center shadow-lg">
            <span className="text-gold-400 text-2xl font-display font-bold">Z</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-bold text-maroon-900 font-display">Zafaf</span>
            <span className="text-[10px] text-gold-600 tracking-wider">دعوات فاخرة</span>
          </div>
        </Link>

        <Card variant="luxury">
          <CardBody className="p-8">
            <h1 className="text-2xl font-bold text-maroon-900 mb-2 text-center font-display">
              مرحباً بعودتك
            </h1>
            <p className="text-sm text-maroon-900/60 text-center mb-6">
              سجّل دخولك لإدارة دعواتك
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="البريد الإلكتروني"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                dir="ltr"
                className="text-left"
              />

              <Input
                label="كلمة المرور"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                dir="ltr"
                className="text-left"
              />

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="gold"
                fullWidth
                loading={loading}
                size="lg"
              >
                تسجيل الدخول
              </Button>
            </form>

            <p className="text-center text-sm text-maroon-900/60 mt-6">
              ماعندكش حساب؟{' '}
              <Link href="/register" className="text-gold-600 hover:text-gold-700 font-bold">
                أنشئ حساب جديد
              </Link>
            </p>
          </CardBody>
        </Card>

        <p className="text-center text-xs text-maroon-900/40 mt-6">
          <Link href="/" className="hover:text-maroon-900">
            ← العودة للصفحة الرئيسية
          </Link>
        </p>
      </div>
    </div>
  );
}