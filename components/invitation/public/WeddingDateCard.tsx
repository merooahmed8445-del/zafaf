'use client';

interface WeddingDateCardProps {
  weddingDate: string;
  startTime: string;
}

export function WeddingDateCard({ weddingDate, startTime }: WeddingDateCardProps) {
  const date = new Date(weddingDate + 'T12:00:00');
  const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const englishMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const monthAr = months[date.getMonth()];
  const monthEn = englishMonths[date.getMonth()];
  const year = date.getFullYear();

  const formattedTime = formatTime(startTime);

  return (
    <div className="relative max-w-md mx-auto px-4">
      <div className="relative rounded-3xl overflow-hidden bg-white border border-gold-300 shadow-xl">
        
        {/* Top Decoration */}
        <div className="h-2 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

        <div className="p-6 sm:p-8">
          {/* Title */}
          <div className="text-center mb-6">
            <p className="text-xs text-gold-600 tracking-[0.3em] mb-1">SAVE THE DATE</p>
            <p className="text-sm text-maroon-900/60 font-display">موعد الزفاف</p>
          </div>

          {/* Date Grid */}
          <div className="grid grid-cols-3 items-center gap-4">
            {/* Right: Day Name */}
            <div className="text-center">
              <p className="text-xs text-maroon-900/50 mb-1">اليوم</p>
              <p className="font-display text-xl font-bold text-maroon-900">
                {dayName}
              </p>
            </div>

            {/* Center: Big Day Number */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-20 h-20 rounded-full gradient-maroon flex items-center justify-center border-2 border-gold-400 shadow-lg">
                  <span className="font-display text-3xl font-bold text-gold-200">
                    {day}
                  </span>
                </div>
                <div className="absolute -inset-1 rounded-full border border-dashed border-gold-400/40 animate-spin-slow" />
              </div>
            </div>

            {/* Left: Month + Year */}
            <div className="text-center">
              <p className="text-xs text-maroon-900/50 mb-1">الشهر</p>
              <p className="font-display text-xl font-bold text-maroon-900">
                {monthAr}
              </p>
              <p className="text-xs text-gold-600 font-serif tracking-wider">
                {monthEn} {year}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 my-6">
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold-500" />
            <span className="text-gold-500">◈</span>
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold-500" />
          </div>

          {/* Time */}
          <div className="text-center">
            <p className="text-xs text-maroon-900/50 mb-1">الساعة</p>
            <p className="font-display text-2xl font-bold text-maroon-900">
              {formattedTime}
            </p>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="h-2 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
      </div>
    </div>
  );
}

function formatTime(time: string): string {
  if (!time) return '—';
  const [h, m] = time.split(':');
  const hour = parseInt(h);
  const period = hour >= 12 ? 'مساءً' : 'صباحاً';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${m} ${period}`;
}