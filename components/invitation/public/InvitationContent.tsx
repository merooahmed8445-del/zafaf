'use client';

import { WeddingDateCard } from './WeddingDateCard';
import { CountdownTimer } from './CountdownTimer';
import { VenueCard } from './VenueCard';
import { RSVPForm } from './RSVPForm';
import { WishesBoard } from './WishesBoard';

interface InvitationContentProps {
  invitationId: string;
  groomName: string;
  brideName: string;
  groomFather: string | null;
  brideFather: string | null;
  sealLetters: string;
  weddingDate: string;
  startTime: string;
  receptionTime: string;
  ceremonyTime: string;
  venueName: string | null;
  venueAddress: string | null;
  mapsUrl: string | null;
  whatsappNumber: string | null;
  photoUrl: string | null;
  audioUrl: string | null;
  audioVolume: number;
  slug: string;
}

export function InvitationContent({
  invitationId,
  groomName,
  brideName,
  groomFather,
  brideFather,
  weddingDate,
  startTime,
  receptionTime,
  ceremonyTime,
  venueName,
  venueAddress,
  mapsUrl,
  whatsappNumber,
  photoUrl,
}: InvitationContentProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-parchment-50 via-white to-parchment-100 relative overflow-x-hidden">
      
      {/* ============ Photo + Names Section ============ */}
      <section className="relative pt-12 pb-8 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-md mx-auto">
          
          {/* Photo */}
          {photoUrl && (
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-gold-300 mb-8">
              <img
                src={photoUrl}
                alt={`${groomName} & ${brideName}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/40 via-transparent to-transparent" />
              
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full gradient-gold border-4 border-white shadow-lg flex items-center justify-center">
                <span className="text-maroon-950 text-lg">❤️</span>
              </div>
            </div>
          )}

          {/* Bismillah */}
          <div className="text-center mt-12 mb-6">
            <p className="text-gold-600 text-sm font-display">﷽</p>
          </div>

          {/* Quranic Verse */}
          <div className="text-center px-4 mb-8">
            <p className="text-sm text-maroon-900/70 leading-relaxed font-display italic">
              «وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً»
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-gold-500" />
            <span className="text-gold-500 text-xl">❦</span>
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gold-500" />
          </div>

          {/* Groom Name */}
          <div className="text-center mb-2">
            <p className="text-xs text-maroon-900/50 mb-1 tracking-widest">العريس</p>
            <h2 className="font-display text-5xl font-bold text-maroon-900 mb-2">
              {groomName}
            </h2>
            {groomFather && (
              <p className="text-xs text-maroon-900/50">
                نجل الأستاذ / {groomFather}
              </p>
            )}
          </div>

          {/* Ampersand */}
          <div className="flex items-center justify-center gap-4 my-6">
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold-500" />
            <span className="font-serif italic text-3xl text-gold-500">&</span>
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold-500" />
          </div>

          {/* Bride Name */}
          <div className="text-center mb-8">
            <p className="text-xs text-maroon-900/50 mb-1 tracking-widest">العروسة</p>
            <h2 className="font-display text-5xl font-bold text-maroon-900 mb-2">
              {brideName}
            </h2>
            {brideFather && (
              <p className="text-xs text-maroon-900/50">
                نجلة الأستاذ / {brideFather}
              </p>
            )}
          </div>

          {/* Invitation Text */}
          <div className="text-center px-4 py-6 bg-gradient-to-r from-transparent via-gold-50/50 to-transparent rounded-2xl">
            <p className="text-sm text-maroon-900/70 leading-loose font-display">
              يتشرفان بدعوتكم لحضور حفل زفافهما
              <br />
              ومشاركتهما فرحة العمر
            </p>
          </div>

          {/* Date Card */}
          <div className="mt-12">
            <WeddingDateCard
              weddingDate={weddingDate}
              startTime={startTime}
            />
          </div>

          {/* Countdown */}
          <div className="mt-8">
            <CountdownTimer
              weddingDate={weddingDate}
              startTime={startTime}
            />
          </div>

          {/* Venue + Schedule */}
          <div className="mt-8">
            <VenueCard
              venueName={venueName}
              venueAddress={venueAddress}
              mapsUrl={mapsUrl}
              receptionTime={receptionTime}
              startTime={startTime}
              ceremonyTime={ceremonyTime}
            />
          </div>

          {/* RSVP */}
          <div className="mt-12">
            <RSVPForm
              invitationId={invitationId}
              whatsappNumber={whatsappNumber}
              groomName={groomName}
              brideName={brideName}
            />
          </div>

          {/* Wishes */}
          <div className="mt-8 pb-16">
            <WishesBoard invitationId={invitationId} />
          </div>

        </div>
      </section>
    </main>
  );
}