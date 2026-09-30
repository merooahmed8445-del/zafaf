'use client';

import { useState } from 'react';

interface EnvelopeCoverProps {
  groomName: string;
  brideName: string;
  sealLetters: string;
  onOpen: () => void;
}

export function EnvelopeCover({ groomName, brideName, sealLetters, onOpen }: EnvelopeCoverProps) {
  const [isOpening, setIsOpening] = useState(false);

  function handleOpen() {
    if (isOpening) return;
    setIsOpening(true);

    setTimeout(() => {
      onOpen();
    }, 1400);
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-4"
      style={{
        background: 'radial-gradient(circle at 50% 32%, #550c1a 0%, #30050d 60%, #150205 100%)',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Envelope */}
      <div
        className={[
          'relative w-full max-w-[420px] aspect-[9/16] max-h-[85vh] rounded-3xl overflow-hidden',
          'shadow-[0_25px_65px_-10px_rgba(0,0,0,0.95)] border border-gold-500/35',
          'transition-all duration-1000',
          isOpening ? 'opacity-0 scale-110' : 'opacity-100 scale-100',
        ].join(' ')}
        style={{
          backgroundColor: '#380610',
          backgroundImage: `
            radial-gradient(#d4af37 0.4px, transparent 0.4px),
            radial-gradient(#630f1e 0.4px, #30050d 0.4px)
          `,
          backgroundSize: '18px 18px',
          backgroundPosition: '0 0, 9px 9px',
        }}
      >
        {/* Top Flap */}
        <div
          className={[
            'absolute top-0 left-0 right-0 h-1/2 z-20 pointer-events-none origin-top',
            'transition-transform duration-[1250ms] ease-in-out',
            isOpening ? '[transform:rotateX(180deg)]' : '',
          ].join(' ')}
        >
          <svg viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_14px_16px_rgba(0,0,0,0.75)]">
            <path d="M0 0 L420 0 L210 240 Z" fill="#480a15" stroke="#caa237" strokeWidth="1.5" opacity="0.97"/>
            <path d="M25 10 L395 10 L210 220 Z" stroke="#e0b74b" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.6"/>
            <path d="M195 200 L210 216 L225 200" stroke="#f7ecc4" strokeWidth="1.5" opacity="0.8"/>
          </svg>
        </div>

        {/* Envelope Geometry */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-80" viewBox="0 0 420 740" fill="none">
          <path d="M0 0 L180 370 L0 740 Z" fill="#2d050d" opacity="0.7"/>
          <line x1="0" y1="0" x2="180" y2="370" stroke="#caa237" strokeWidth="0.8" opacity="0.35"/>
          <path d="M420 0 L240 370 L420 740 Z" fill="#24030a" opacity="0.8"/>
          <line x1="420" y1="0" x2="240" y2="370" stroke="#caa237" strokeWidth="0.8" opacity="0.35"/>
          <path d="M0 740 L210 390 L420 740 Z" fill="#3f0812" opacity="0.9"/>
          <line x1="0" y1="740" x2="210" y2="390" stroke="#caa237" strokeWidth="1" opacity="0.5"/>
          <line x1="420" y1="740" x2="210" y2="390" stroke="#caa237" strokeWidth="1" opacity="0.5"/>
        </svg>

        {/* Center Seal + Names */}
        <div className="relative z-30 flex-1 flex flex-col items-center justify-center h-full">
          <button
            type="button"
            onClick={handleOpen}
            onTouchEnd={(e) => {
              e.preventDefault();
              handleOpen();
            }}
            disabled={isOpening}
            className="group cursor-pointer relative flex items-center justify-center transition-all duration-300 disabled:cursor-wait select-none"
            style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}
            aria-label="افتح الدعوة"
          >
            {/* Outer Wax Ring */}
            <div
              className={[
                'w-28 h-28 sm:w-36 sm:h-36 rounded-full',
                'bg-gradient-to-br from-amber-700 via-gold-500 to-amber-900 p-1.5',
                'flex items-center justify-center transition-transform',
                'group-hover:scale-105 active:scale-95',
                isOpening ? 'scale-125 brightness-150' : '',
              ].join(' ')}
              style={{
                animation: 'seal-pulse 2.6s infinite ease-in-out',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.45), inset 0 -3px 6px rgba(0,0,0,0.65), 0 10px 25px rgba(0,0,0,0.8)',
              }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#7c1421] via-[#5c0d18] to-[#3a060d] border-2 border-gold-400/85 flex flex-col items-center justify-center relative shadow-inner p-2">
                <div className="absolute inset-1.5 rounded-full border border-dashed border-gold-300/40 pointer-events-none" />

                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gold-300 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L12 22"/>
                  <path d="M17 5C15 7 13 8 12 8C11 8 9 7 7 5"/>
                  <path d="M19 10C16.5 12 14 13 12 13C10 13 7.5 12 5 10"/>
                  <path d="M18 16C16 17.5 14 18 12 18C10 18 8 17.5 6 16"/>
                  <circle cx="12" cy="4" r="1.5" fill="currentColor"/>
                </svg>

                <span className="text-gold-200 text-xs font-serif tracking-widest uppercase mt-0.5 font-bold">
                  {sealLetters}
                </span>
              </div>
            </div>

            {!isOpening && (
              <div className="absolute -inset-4 rounded-full border border-gold-400/30 animate-ping pointer-events-none opacity-40" />
            )}
          </button>

          {/* Tap Label */}
          {!isOpening && (
            <div className="mt-6 text-center px-4">
              <p className="text-gold-200 font-sans tracking-wide text-sm font-semibold flex items-center justify-center gap-2 drop-shadow">
                <span>✨</span>
                <span>اضغط لفتح الدعوة</span>
                <span>✨</span>
              </p>
              <span className="text-xs text-gold-400/70 tracking-widest font-light block mt-1">
                Tap to open the invitation
              </span>
            </div>
          )}
        </div>

        {/* Names at Bottom */}
        {!isOpening && (
          <div className="absolute bottom-0 left-0 right-0 z-30 pb-5 text-center pointer-events-none">
            <p className="font-display text-lg sm:text-xl text-gold-300 font-bold tracking-wider">
              {groomName} <span className="text-gold-500 text-sm">&</span> {brideName}
            </p>
          </div>
        )}
      </div>

      {/* Light Burst */}
      {isOpening && (
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full pointer-events-none z-50"
          style={{
            background: 'radial-gradient(circle, #fcf7e6 0%, #dfbe5d 40%, transparent 70%)',
            animation: 'golden-burst 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        />
      )}
    </div>
  );
}