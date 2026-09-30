'use client';

import { useState, FormEvent } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'كلمة المرور الجديدة قصيرة (6 أحرف على الأقل)' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'كلمتا المرور غير متطابقتين' });
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: '✅ تم تغيير كلمة المرور بنجاح' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-bold text-maroon-900 flex items-center gap-2">
          <span>🔒</span>
          <span>كلمة المرور</span>
        </h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="كلمة المرور الحالية"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            dir="ltr"
            className="text-left"
          />

          <Input
            label="كلمة المرور الجديدة"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            hint="6 أحرف على الأقل"
            dir="ltr"
            className="text-left"
          />

          <Input
            label="تأكيد كلمة المرور"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
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

          <Button type="submit" variant="primary" loading={loading} fullWidth>
            🔐 تغيير كلمة المرور
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}