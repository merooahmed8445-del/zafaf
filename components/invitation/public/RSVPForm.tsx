'use client';

import { useState, FormEvent } from 'react';

interface RSVPFormProps {
  invitationId: string;
  whatsappNumber: string | null;
  groomName: string;
  brideName: string;
}

export function RSVPForm({ invitationId, whatsappNumber, groomName, brideName }: RSVPFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      invitation_id: invitationId,
      guest_name: (formData.get('guest_name') as string || '').trim(),
      guest_phone: (formData.get('guest_phone') as string || '').trim(),
      guest_count: parseInt(formData.get('guest_count') as string) || 1,
      attendance_status: formData.get('attendance_status') as string,
      message: (formData.get('message') as string || '').trim(),
    };

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || 'حدث خطأ');
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError('فشل الاتصال بالخادم');
      setLoading(false);
    }
  }

  function handleWhatsApp() {
    const form = document.querySelector('#rsvp-form') as HTMLFormElement;
    if (!form) return;
    const formData = new FormData(form);
    const name = formData.get('guest_name') as string || 'ضيف كريم';
    const count = formData.get('guest_count') as string || '1';

    const message = `السلام عليكم،%0Aأتقدم بتأكيد حضوري لحفل زفاف (${groomName} %26 ${brideName})%0Aالاسم: ${encodeURIComponent(name)}%0Aعدد الحضور: ${count}%0Aألف مبروك!`;

    const url = whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${message}`
      : `https://wa.me/?text=${message}`;
    window.open(url, '_blank');
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-br from-gold-50 to-parchment-50 border-2 border-gold-400 p-8 text-center shadow-xl">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="font-display text-2xl font-bold text-maroon-900 mb-3">
            تم تسجيل حضورك!
          </h3>
          <p className="text-sm text-maroon-900/70 leading-relaxed mb-6">
            شكراً لتأكيدك. ننتظر تشريفك بفارغ الصبر لمشاركتنا فرحة العمر ❤️
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs text-gold-600 hover:text-gold-700 font-semibold"
          >
            تسجيل رد آخر
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="rounded-3xl bg-white border border-gold-300 shadow-xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="text-3xl mb-2">✉️</div>
            <p className="text-xs text-gold-600 tracking-[0.3em] mb-1">RSVP</p>
            <h3 className="font-display text-xl font-bold text-maroon-900">
              تأكيد الحضور
            </h3>
            <p className="text-xs text-maroon-900/60 mt-2">
              يشرفنا تأكيد حضوركم
            </p>
          </div>

          <form id="rsvp-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-maroon-900 mb-1.5">
                الاسم الكريم *
              </label>
              <input
                type="text"
                name="guest_name"
                required
                placeholder="مثال: د. إبراهيم محمود"
                className="w-full px-4 py-2.5 rounded-xl border border-parchment-300 bg-parchment-50 text-maroon-950 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-maroon-900 mb-1.5">
                  الهاتف
                </label>
                <input
                  type="tel"
                  name="guest_phone"
                  placeholder="010..."
                  dir="ltr"
                  className="w-full px-4 py-2.5 rounded-xl border border-parchment-300 bg-parchment-50 text-maroon-950 text-sm text-left focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-maroon-900 mb-1.5">
                  عدد الحضور
                </label>
                <select
                  name="guest_count"
                  defaultValue="1"
                  className="w-full px-4 py-2.5 rounded-xl border border-parchment-300 bg-parchment-50 text-maroon-950 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-maroon-900 mb-2">
                حالة الحضور
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 p-3 rounded-xl border-2 border-gold-400 bg-gold-50 cursor-pointer">
                  <input
                    type="radio"
                    name="attendance_status"
                    value="attending"
                    defaultChecked
                    className="text-gold-500"
                  />
                  <span className="text-xs font-semibold text-maroon-900">
                    سأحضر ❤
                  </span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded-xl border-2 border-parchment-300 bg-parchment-50 cursor-pointer">
                  <input
                    type="radio"
                    name="attendance_status"
                    value="apologize"
                    className="text-gold-500"
                  />
                  <span className="text-xs font-semibold text-maroon-900/70">
                    أعتذر
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-maroon-900 mb-1.5">
                كلمة للعروسين (اختياري)
              </label>
              <textarea
                name="message"
                rows={2}
                maxLength={500}
                placeholder="بارك الله لكما..."
                className="w-full px-4 py-2.5 rounded-xl border border-parchment-300 bg-parchment-50 text-maroon-950 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl gradient-gold text-maroon-950 font-bold text-sm shadow-md hover:brightness-105 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-maroon-950/30 border-t-maroon-950 rounded-full animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>📩 تأكيد الحضور</>
              )}
            </button>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
            >
              💬 تأكيد عبر واتساب
            </button>
          </form>
        </div>

        <div className="h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
      </div>
    </div>
  );
}