'use client';

import { useState, useRef, useEffect } from 'react';
import { EnvelopeCover } from './EnvelopeCover';
import { InvitationContent } from './InvitationContent';

interface InvitationViewProps {
  invitation: {
    id: string;
    groom_name: string;
    bride_name: string;
    groom_father: string | null;
    bride_father: string | null;
    seal_letters: string;
    wedding_date: string;
    start_time: string;
    reception_time: string;
    ceremony_time: string;
    venue_name: string | null;
    venue_address: string | null;
    maps_url: string | null;
    whatsapp_number: string | null;
    photo_url: string | null;
    audio_url: string | null;
    audio_volume: number;
    slug: string;
  };
}

export function InvitationView({ invitation }: InvitationViewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // شغّل الأغنية لما الدعوة تفتح
  useEffect(() => {
    if (isOpen && audioRef.current && invitation.audio_url && !invitation.audio_url.startsWith('preset:')) {
      audioRef.current.volume = invitation.audio_volume;
      audioRef.current.play().catch((err) => {
        console.log('Audio play failed:', err);
      });
    }
  }, [isOpen, invitation.audio_url, invitation.audio_volume]);

  function handleOpen() {
    // شغّل الأغنية فوراً (ده تفاعل مستخدم — مسموح)
    if (audioRef.current && invitation.audio_url && !invitation.audio_url.startsWith('preset:')) {
      audioRef.current.volume = invitation.audio_volume;
      audioRef.current.play().catch((err) => {
        console.log('Audio play failed:', err);
      });
    }
    setIsOpen(true);
  }

  return (
    <div className="relative min-h-screen">
      {/* Audio Element */}
      {invitation.audio_url && !invitation.audio_url.startsWith('preset:') && (
        <audio
          ref={audioRef}
          src={invitation.audio_url}
          loop
          preload="auto"
        />
      )}

      {!isOpen && (
        <EnvelopeCover
          groomName={invitation.groom_name}
          brideName={invitation.bride_name}
          sealLetters={invitation.seal_letters || 'M & Y'}
          onOpen={handleOpen}
        />
      )}

      <div
        className={[
          'min-h-screen transition-opacity duration-1000',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none h-screen overflow-hidden',
        ].join(' ')}
      >
        <InvitationContent
          invitationId={invitation.id}
          groomName={invitation.groom_name}
          brideName={invitation.bride_name}
          groomFather={invitation.groom_father}
          brideFather={invitation.bride_father}
          sealLetters={invitation.seal_letters}
          weddingDate={invitation.wedding_date}
          startTime={invitation.start_time}
          receptionTime={invitation.reception_time}
          ceremonyTime={invitation.ceremony_time}
          venueName={invitation.venue_name}
          venueAddress={invitation.venue_address}
          mapsUrl={invitation.maps_url}
          whatsappNumber={invitation.whatsapp_number}
          photoUrl={invitation.photo_url}
          audioUrl={invitation.audio_url}
          audioVolume={invitation.audio_volume}
          slug={invitation.slug}
        />
      </div>
    </div>
  );
}