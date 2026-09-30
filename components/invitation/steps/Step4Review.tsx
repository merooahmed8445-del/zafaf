'use client';

import { InvitationFormData } from '@/types/database';
import { Card, CardBody } from '@/components/ui/Card';

interface Step4ReviewProps {
  data: InvitationFormData;
  onGoToStep: (step: number) => void;
}

export function Step4Review({ data, onGoToStep }: Step4ReviewProps) {
  const getArabicDate = () => {
    if (!data.wedding_date) return 'لم يُحدد';
    try {
      const date = new Date(data.wedding_date + 'T12:00:00');
      const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
      const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
      return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    } catch {
      return 'تاريخ غير صالح';
    }
  };

  const formatTime = (time: string) => {
    if (!time) return '—';
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const period = hour >= 12 ? 'مساءً' : 'صباحاً';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${m} ${period}`;
  };

  const sections = [
    {
      step: 1,
      title: 'بيانات العروسين',
      icon: '💑',
      items: [
        { label: 'اسم العريس', value: data.groom_name },
        { label: 'اسم العروسة', value: data.bride_name },
        { label: 'اسم والد العريس', value: data.groom_father || '—' },
        { label: 'اسم والد العروسة', value: data.bride_father || '—' },
        { label: 'حروف الختم', value: data.seal_letters },
        { label: 'رابط الدعوة', value: `/invitation/${data.slug}` },
      ],
    },
    {
      step: 2,
      title: 'التاريخ والمكان',
      icon: '📅',
      items: [
        { label: 'التاريخ', value: getArabicDate() },
        { label: 'استقبال الضيوف', value: formatTime(data.reception_time) },
        { label: 'بدء الحفل', value: formatTime(data.start_time) },
        { label: 'الزفة', value: formatTime(data.ceremony_time) },
        { label: 'القاعة', value: data.venue_name },
        { label: 'العنوان', value: data.venue_address || '—' },
        { label: 'رقم واتساب', value: data.whatsapp_number || '—' },
      ],
    },
    {
      step: 3,
      title: 'الصورة والموسيقى',
      icon: '🎵',
      items: [
        { label: 'الصورة', value: data.photo_url ? '✅ مرفوعة' : '— بدون صورة' },
        { label: 'الموسيقى', value: data.audio_url ? '✅ مرفوعة' : '— بدون موسيقى' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pb-6 border-b border-parchment-200">
        <div className="text-5xl mb-3">✨</div>
        <h2 className="text-2xl font-bold text-maroon-900 mb-2 font-display">
          المراجعة والنشر
        </h2>
        <p className="text-sm text-maroon-900/60">
          راجع بيانات دعوتك قبل النشر
        </p>
      </div>

      {/* Live Preview Card */}
      <div className="rounded-3xl overflow-hidden border-2 border-gold-300 shadow-xl">
        {/* Cover Image */}
        {data.photo_url && (
          <div className="relative w-full aspect-[4/3]">
            <img
              src={data.photo_url}
              alt="صورة العروسين"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-transparent to-transparent" />
          </div>
        )}

        {/* Details */}
        <div className="gradient-maroon p-6 text-center">
          <p className="text-xs text-gold-400/80 mb-2 tracking-wider">
            دعوة زفاف
          </p>
          <h3 className="text-3xl font-display font-bold text-gold-200 mb-2">
            {data.groom_name || '...'} <span className="text-gold-500 text-xl">&</span> {data.bride_name || '...'}
          </h3>
          <p className="text-sm text-gold-300/90 mb-1">{getArabicDate()}</p>
          <p className="text-xs text-gold-400/80">{data.venue_name || '...'}</p>

          <div className="mt-4 pt-4 border-t border-gold-500/30 flex items-center justify-center gap-2 text-xs text-gold-300">
            <span>🔗</span>
            <span className="dir-ltr font-mono">
              zafaf.com/invitation/{data.slug || 'your-link'}
            </span>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <Card key={section.step}>
            <CardBody className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-maroon-900 flex items-center gap-2">
                  <span>{section.icon}</span>
                  {section.title}
                </h3>
                <button
                  type="button"
                  onClick={() => onGoToStep(section.step)}
                  className="text-xs font-bold text-gold-600 hover:text-gold-700"
                >
                  تعديل ←
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-parchment-50 border border-parchment-200"
                  >
                    <span className="text-xs text-maroon-900/60">{item.label}</span>
                    <span className="text-sm font-semibold text-maroon-900 truncate dir-auto text-left">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Final Note */}
      <div className="p-4 rounded-2xl bg-gold-50 border border-gold-200 text-center">
        <p className="text-sm text-maroon-900/80">
          🎉 <strong>كل حاجة جاهزة!</strong> 
        </p>
      </div>
    </div>
  );
}