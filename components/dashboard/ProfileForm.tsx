'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface ProfileFormProps {
  profile: {
    id: string;
    email: string;
    full_name: string | null;
    phone: string | null;
  };
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState(profile.full_name || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'حدث خطأ' });
      } else {
        setMessage({ type: 'success', text: '✅ تم حفظ التعديلات بنجاح' });
        router.refresh();
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'فشل الاتصال بالخادم' });
    }
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-bold text-maroon-900 flex items-center gap-2">
          <span>👤</span>
          <span>المعلومات الشخصية</span>
        </h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="البريد الإلكتروني"
            type="email"
            value={profile.email}
            disabled
            hint="لا يمكن تعديل البريد الإلكتروني"
            dir="ltr"
            className="text-left opacity-60 cursor-not-allowed"
          />

          <Input
            label="الاسم الكامل"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="مثال: محمد أحمد"
          />

          <Input
            label="رقم الهاتف"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+20 100 000 0000"
            dir="ltr"
            className="text-left"
          />

          {message && (
            <div
              className={[
                'p-3 rounded-xl text-sm text-center font-semibold border',
                message.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-rose-50 border-rose-200 text-rose-700',
              ].join(' ')}
            >
              {message.text}
            </div>
          )}

          <Button type="submit" variant="gold" loading={loading} fullWidth>
            💾 حفظ التعديلات
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}