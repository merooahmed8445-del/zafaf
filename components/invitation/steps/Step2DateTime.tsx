'use client';

import { Input } from '@/components/ui/Input';
import { InvitationFormData } from '@/types/database';

interface Step2DateTimeProps {
  data: InvitationFormData;
  errors: Record<string, string>;
  onChange: (updates: Partial<InvitationFormData>) => void;
}

const TIMEZONES = [
  { value: 'Africa/Cairo', label: 'القاهرة (Africa/Cairo)' },
  { value: 'Asia/Riyadh', label: 'الرياض (Asia/Riyadh)' },
  { value: 'Asia/Dubai', label: 'دبي (Asia/Dubai)' },
  { value: 'Asia/Kuwait', label: 'الكويت (Asia/Kuwait)' },
  { value: 'Asia/Qatar', label: 'قطر (Asia/Qatar)' },
  { value: 'Africa/Casablanca', label: 'الدار البيضاء (Africa/Casablanca)' },
  { value: 'Europe/London', label: 'لندن (Europe/London)' },
  { value: 'America/New_York', label: 'نيويورك (America/New_York)' },
];

export function Step2DateTime({ data, errors, onChange }: Step2DateTimeProps) {
  // حساب التاريخ بصيغة عربية
  const getArabicDate = () => {
    if (!data.wedding_date) return null;
    try {
      const date = new Date(data.wedding_date + 'T12:00:00');
      const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
      const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
      return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    } catch {
      return null;
    }
  };

  const arabicDate = getArabicDate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pb-6 border-b border-parchment-200">
        <div className="text-5xl mb-3">📅</div>
        <h2 className="text-2xl font-bold text-maroon-900 mb-2 font-display">
          التاريخ والمكان
        </h2>
        <p className="text-sm text-maroon-900/60">
          متى وأين سيُقام الحفل؟
        </p>
      </div>

      {/* Date & Timezone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="تاريخ الزفاف *"
          name="wedding_date"
          type="date"
          value={data.wedding_date}
          onChange={(e) => onChange({ wedding_date: e.target.value })}
          error={errors.wedding_date}
          required
          dir="ltr"
          className="text-left"
        />

        <div>
          <label className="block text-sm font-bold text-maroon-900 mb-1.5">
            المنطقة الزمنية
          </label>
          <select
            name="timezone"
            value={data.timezone}
            onChange={(e) => onChange({ timezone: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-parchment-300 bg-parchment-50 text-maroon-950 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Arabic Date Preview */}
      {arabicDate && (
        <div className="p-4 rounded-2xl bg-gold-50 border border-gold-200 text-center">
          <p className="text-xs text-gold-700 mb-1">سيظهر التاريخ بالشكل ده في الدعوة:</p>
          <p className="text-lg font-bold text-maroon-900 font-display">{arabicDate}</p>
        </div>
      )}

      {/* Times */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Input
          label="وقت استقبال الضيوف"
          name="reception_time"
          type="time"
          value={data.reception_time}
          onChange={(e) => onChange({ reception_time: e.target.value })}
          dir="ltr"
          className="text-left"
        />
        <Input
          label="وقت بدء الحفل"
          name="start_time"
          type="time"
          value={data.start_time}
          onChange={(e) => onChange({ start_time: e.target.value })}
          dir="ltr"
          className="text-left"
        />
        <Input
          label="وقت الزفة"
          name="ceremony_time"
          type="time"
          value={data.ceremony_time}
          onChange={(e) => onChange({ ceremony_time: e.target.value })}
          dir="ltr"
          className="text-left"
        />
      </div>

      {/* Venue */}
      <div className="space-y-4">
        <Input
          label="اسم القاعة / الفندق *"
          name="venue_name"
          value={data.venue_name}
          onChange={(e) => onChange({ venue_name: e.target.value })}
          placeholder="مثال: فندق فورسيزونز نايل بلازا - قاعة بلازا"
          error={errors.venue_name}
          required
        />

        <Input
          label="العنوان التفصيلي"
          name="venue_address"
          value={data.venue_address}
          onChange={(e) => onChange({ venue_address: e.target.value })}
          placeholder="مثال: كورنيش النيل، جاردن سيتي، القاهرة"
          hint="سيظهر في صفحة الدعوة لمساعدة الضيوف"
        />

        <Input
          label="رابط Google Maps"
          name="maps_url"
          type="url"
          value={data.maps_url}
          onChange={(e) => onChange({ maps_url: e.target.value })}
          placeholder="https://maps.google.com/..."
          hint="الصق رابط الموقع من Google Maps"
          dir="ltr"
          className="text-left"
        />
      </div>

      {/* WhatsApp */}
      <Input
        label="رقم واتساب لتأكيدات الحضور"
        name="whatsapp_number"
        type="tel"
        value={data.whatsapp_number}
        onChange={(e) => onChange({ whatsapp_number: e.target.value })}
        placeholder="201012345678"
        hint="بالكود الدولي (بدون +). مثال: 20 لمصر"
        dir="ltr"
        className="text-left"
      />
    </div>
  );
}