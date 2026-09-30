'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  weddingDate: string;
  startTime: string;
}

export function CountdownTimer({ weddingDate, startTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    // نظّف startTime: من "18:00:00" لـ "18:00"
const cleanTime = startTime.includes(':') 
  ? startTime.split(':').slice(0, 2).join(':') 
  : '18:00';
const target = new Date(`${weddingDate}T${cleanTime}:00`).getTime();

    function tick() {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setIsPast(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [weddingDate, startTime]);

  if (isPast) {
    return (
      <div className="max-w-md mx-auto px-4">
        <div className="text-center p-8 rounded-3xl gradient-maroon border border-gold-400">
          <div className="text-4xl mb-3">🎊</div>
          <p className="text-gold-200 font-display text-xl font-bold">
            تم الزفاف بحمد الله
          </p>
        </div>
      </div>
    );
  }

  const items = [
    { label: 'يوم', value: timeLeft.days },
    { label: 'ساعة', value: timeLeft.hours },
    { label: 'دقيقة', value: timeLeft.minutes },
    { label: 'ثانية', value: timeLeft.seconds },
  ];

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="rounded-3xl gradient-maroon p-6 sm:p-8 border border-gold-400/40 shadow-2xl">
        {/* Title */}
        <div className="text-center mb-6">
          <p className="text-xs text-gold-400/80 tracking-[0.3em] mb-1">COUNTDOWN</p>
          <p className="text-sm text-gold-200/90 font-display">متبقي على الفرحة</p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {items.map((item, idx) => (
            <div key={item.label} className="relative">
              <div className="bg-black/40 rounded-2xl p-3 sm:p-4 border border-gold-500/30 text-center">
                <span className="font-display text-2xl sm:text-3xl font-bold text-gold-200 block tabular-nums">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-gold-400/80 mt-1 block">
                  {item.label}
                </span>
              </div>
              {/* Separator dots */}
              {idx < items.length - 1 && (
                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 text-gold-500/40 text-xs hidden sm:block">
                  •
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}