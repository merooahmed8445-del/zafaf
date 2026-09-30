'use client';

import { useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { InvitationFormData } from '@/types/database';

interface Step1CoupleInfoProps {
  data: InvitationFormData;
  errors: Record<string, string>;
  onChange: (updates: Partial<InvitationFormData>) => void;
}

// دالة لتحويل الاسم العربي لـ slug
function generateSlug(groomName: string, brideName: string): string {
  // لو مفيش اسم، رجّع فاضي
  if (!groomName && !brideName) return '';

  // خد أول كلمة من كل اسم
  const groom = groomName.trim().split(' ')[0] || '';
  const bride = brideName.trim().split(' ')[0] || '';

  // حوّل العربية للإنجليزية (transliteration بسيط)
  const transliterate = (text: string): string => {
    const map: Record<string, string> = {
      'ا': 'a', 'أ': 'a', 'إ': 'e', 'آ': 'aa', 'ب': 'b', 'ت': 't', 'ث': 'th',
      'ج': 'g', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'z', 'ر': 'r', 'ز': 'z',
      'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': 'a',
      'غ': 'gh', 'ف': 'f', 'ق': 'k', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n',
      'ه': 'h', 'و': 'w', 'ي': 'y', 'ى': 'a', 'ة': 'a', 'ء': '', 'ئ': 'e',
      'ؤ': 'o', ' ': '-', 'َ': '', 'ُ': '', 'ِ': '', 'ْ': '', 'ّ': '', 'ً': '',
      'ٌ': '', 'ٍ': '',
    };
    return text.split('').map((char) => map[char] || char).join('');
  };

  let slug = `${transliterate(groom)}-${transliterate(bride)}`;
  slug = slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return slug;
}

export function Step1CoupleInfo({ data, errors, onChange }: Step1CoupleInfoProps) {
  // توليد slug تلقائياً عند تغيير الأسماء (لو المستخدم لسه ما عدّلش slug يدوياً)
  useEffect(() => {
    if (data.groom_name || data.bride_name) {
      const autoSlug = generateSlug(data.groom_name, data.bride_name);
      if (autoSlug && autoSlug !== data.slug) {
        // لو الـ slug فاضي، أو لو بيطابق آخر auto-generated
        onChange({ slug: autoSlug });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.groom_name, data.bride_name]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pb-6 border-b border-parchment-200">
        <div className="text-5xl mb-3">💑</div>
        <h2 className="text-2xl font-bold text-maroon-900 mb-2 font-display">
          بيانات العروسين
        </h2>
        <p className="text-sm text-maroon-900/60">
          الاسم اللي هيتكتب على الدعوة بأحلى خط
        </p>
      </div>

      {/* Names */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="اسم العريس *"
          name="groom_name"
          value={data.groom_name}
          onChange={(e) => onChange({ groom_name: e.target.value })}
          placeholder="مثال: مُصْطَفَى"
          error={errors.groom_name}
          required
        />
        <Input
          label="اسم العروسة *"
          name="bride_name"
          value={data.bride_name}
          onChange={(e) => onChange({ bride_name: e.target.value })}
          placeholder="مثال: يَارَا"
          error={errors.bride_name}
          required
        />
      </div>

      {/* Parents */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="اسم والد العريس"
          name="groom_father"
          value={data.groom_father}
          onChange={(e) => onChange({ groom_father: e.target.value })}
          placeholder="مثال: محمد كامل"
        />
        <Input
          label="اسم والد العروسة"
          name="bride_father"
          value={data.bride_father}
          onChange={(e) => onChange({ bride_father: e.target.value })}
          placeholder="مثال: أحمد ياسر"
        />
      </div>

      {/* Seal Letters + Slug */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="حروف ختم الشمع"
          name="seal_letters"
          value={data.seal_letters}
          onChange={(e) => onChange({ seal_letters: e.target.value.toUpperCase() })}
          placeholder="M & Y"
          hint="حروف اختصار الأسماء (بحد أقصى 6 حروف)"
          maxLength={6}
          dir="ltr"
          className="text-center font-bold tracking-widest"
        />
        <Input
          label="رابط الدعوة *"
          name="slug"
          value={data.slug}
          onChange={(e) => onChange({ slug: e.target.value })}
          placeholder="mostafa-yara"
          error={errors.slug}
          hint={`رابط دعوتك: zafaf.com/invitation/${data.slug || 'your-link'}`}
          dir="ltr"
          className="text-left"
        />
      </div>

      {/* Preview */}
      {(data.groom_name || data.bride_name) && (
        <div className="mt-6 p-6 rounded-2xl gradient-maroon text-center">
          <p className="text-xs text-gold-400/80 mb-2 tracking-wider">معاينة سريعة</p>
          <div className="font-display text-3xl text-gold-200 font-bold">
            {data.groom_name || '...'} <span className="text-gold-500 text-xl">&</span> {data.bride_name || '...'}
          </div>
          <div className="mt-2 text-xs text-gold-400 font-serif tracking-widest">
            {data.seal_letters || 'M & Y'}
          </div>
        </div>
      )}
    </div>
  );
}