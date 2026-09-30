'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase-browser';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardBody } from '@/components/ui/Card';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-parchment-50">
      <div className="w-full max-w-md">
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
              ابدأ رحلتك مجاناً
            </h1>
            <p className="text-sm text-maroon-900/60 text-center mb-6">
              أنشئ حسابك وابدأ في تصميم دعوتك
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="الاسم الكامل"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="محمد أحمد"
                required
              />

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
                hint="6 أحرف على الأقل"
                required
                minLength={6}
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
                إنشاء الحساب
              </Button>
            </form>

            <p className="text-center text-sm text-maroon-900/60 mt-6">
              عندك حساب بالفعل؟{' '}
              <Link href="/login" className="text-gold-600 hover:text-gold-700 font-bold">
                سجّل دخول
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