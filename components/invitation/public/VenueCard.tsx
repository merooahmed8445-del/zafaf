'use client';

interface VenueCardProps {
  venueName: string | null;
  venueAddress: string | null;
  mapsUrl: string | null;
  receptionTime: string;
  startTime: string;
  ceremonyTime: string;
}

export function VenueCard({
  venueName,
  venueAddress,
  mapsUrl,
  receptionTime,
  startTime,
  ceremonyTime,
}: VenueCardProps) {
  const schedule = [
    { label: 'استقبال الضيوف', time: receptionTime },
    { label: 'بدء الحفل', time: startTime },
    { label: 'الزفة', time: ceremonyTime },
  ].filter((item) => item.time);

  return (
    <div className="max-w-md mx-auto px-4 space-y-4">
      
      {/* Venue Info */}
      <div className="rounded-3xl bg-white border border-gold-300 shadow-lg overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

        <div className="p-6 sm:p-8 text-center">
          <div className="text-3xl mb-3">📍</div>
          <p className="text-xs text-gold-600 tracking-[0.3em] mb-1">LOCATION</p>
          <p className="text-sm text-maroon-900/60 font-display mb-4">مكان الحفل</p>

          {venueName && (
            <h3 className="font-display text-2xl font-bold text-maroon-900 mb-2">
              {venueName}
            </h3>
          )}

          {venueAddress && (
            <p className="text-sm text-maroon-900/60 leading-relaxed mb-6">
              {venueAddress}
            </p>
          )}

          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-gold text-maroon-950 font-bold text-sm hover:brightness-105 transition-all shadow-md"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              افتح على الخريطة
            </a>
          )}
        </div>

        <div className="h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
      </div>

      {/* Schedule */}
      {schedule.length > 0 && (
        <div className="rounded-3xl bg-white border border-gold-300 shadow-lg p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="text-3xl mb-3">⏰</div>
            <p className="text-xs text-gold-600 tracking-[0.3em] mb-1">SCHEDULE</p>
            <p className="text-sm text-maroon-900/60 font-display">الجدول الزمني</p>
          </div>

          <div className="space-y-3">
            {schedule.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-2xl bg-parchment-50 border border-parchment-200"
              >
                <span className="text-sm font-bold text-maroon-900">
                  {item.label}
                </span>
                <span className="font-display text-lg font-bold text-gold-600">
                  {formatTime(item.time)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
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