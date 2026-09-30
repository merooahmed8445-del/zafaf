'use client';

import { useState, useEffect, FormEvent } from 'react';

interface Wish {
  id: string;
  guest_name: string;
  message: string;
  created_at: string;
}

interface WishesBoardProps {
  invitationId: string;
}

export function WishesBoard({ invitationId }: WishesBoardProps) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadWishes();
  }, [invitationId]);

  async function loadWishes() {
    try {
      const res = await fetch(`/api/wishes?invitation_id=${invitationId}`);
      const data = await res.json();
      if (data.wishes) setWishes(data.wishes);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      invitation_id: invitationId,
      guest_name: (formData.get('guest_name') as string || '').trim(),
      message: (formData.get('message') as string || '').trim(),
    };

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result.wish) {
        setWishes([result.wish, ...wishes]);
        setShowForm(false);
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  }

  function getTimeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'الآن';
    if (mins < 60) return `منذ ${mins} دقيقة`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `منذ ${hours} ساعة`;
    const days = Math.floor(hours / 24);
    return `منذ ${days} يوم`;
  }

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="rounded-3xl bg-white border border-gold-300 shadow-xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-3xl mb-2">💌</div>
            <p className="text-xs text-gold-600 tracking-[0.3em] mb-1">WISHES</p>
            <h3 className="font-display text-xl font-bold text-maroon-900">
              دفتر التهاني
            </h3>
            <p className="text-xs text-maroon-900/60 mt-2">
              شاركونا كلماتكم الجميلة
            </p>
          </div>

          {/* Add Button */}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-3 rounded-xl gradient-gold text-maroon-950 font-bold text-sm mb-4 shadow-md hover:brightness-105 transition-all"
            >
              ✍️ أضف تهنئتك
            </button>
          )}

          {/* Form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-3 mb-6 p-4 rounded-2xl bg-parchment-50 border border-parchment-200">
              <input
                type="text"
                name="guest_name"
                required
                placeholder="اسمك الكريم"
                className="w-full px-4 py-2.5 rounded-xl border border-parchment-300 bg-white text-maroon-950 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
              <textarea
                name="message"
                required
                maxLength={500}
                rows={3}
                placeholder="اكتب كلمة للعروسين..."
                className="w-full px-4 py-2.5 rounded-xl border border-parchment-300 bg-white text-maroon-950 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2 rounded-xl border border-parchment-300 text-maroon-900/70 text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2 rounded-xl gradient-gold text-maroon-950 text-xs font-bold disabled:opacity-50"
                >
                  {submitting ? 'جاري الإرسال...' : 'إرسال'}
                </button>
              </div>
            </form>
          )}

          {/* Wishes List */}
          {loading ? (
            <div className="text-center py-8 text-maroon-900/40 text-sm">
              جاري التحميل...
            </div>
          ) : wishes.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">🌹</div>
              <p className="text-sm text-maroon-900/60">
                كن أول من يترك كلمة جميلة
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {wishes.map((wish) => (
                <div
                  key={wish.id}
                  className="p-4 rounded-2xl bg-parchment-50 border border-parchment-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-maroon-900">
                      {wish.guest_name}
                    </span>
                    <span className="text-[10px] text-maroon-900/40">
                      {getTimeAgo(wish.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-maroon-900/70 leading-relaxed">
                    {wish.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
      </div>
    </div>
  );
}