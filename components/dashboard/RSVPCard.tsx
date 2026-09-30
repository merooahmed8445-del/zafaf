interface RSVPCardProps {
  rsvp: {
    id: string;
    guest_name: string;
    guest_phone: string | null;
    guest_count: number;
    attendance_status: 'attending' | 'apologize';
    message: string | null;
    created_at: string;
  };
  invitation: {
    slug: string;
    groom_name: string;
    bride_name: string;
  };
}

export function RSVPCard({ rsvp, invitation }: RSVPCardProps) {
  const isAttending = rsvp.attendance_status === 'attending';
  const date = new Date(rsvp.created_at);
  const dateStr = date.toLocaleDateString('ar-EG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const timeStr = date.toLocaleTimeString('ar-EG', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="p-4 rounded-2xl bg-white border border-parchment-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        {/* Avatar + Name */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className={[
              'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm shrink-0',
              isAttending
                ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
                : 'bg-rose-100 text-rose-800 border-2 border-rose-300',
            ].join(' ')}
          >
            {rsvp.guest_name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-maroon-900 truncate">
              {rsvp.guest_name}
            </p>
            {rsvp.guest_phone && (
              <p className="text-[11px] text-maroon-900/50 dir-ltr text-left">
                {rsvp.guest_phone}
              </p>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={[
            'px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0',
            isAttending
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : 'bg-rose-100 text-rose-800 border-rose-300',
          ].join(' ')}
        >
          {isAttending ? '✅ سأحضر' : '❌ اعتذر'}
        </span>
      </div>

      {/* Details Row */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-parchment-50 border border-parchment-200 text-[11px] text-maroon-900/70">
          👥 {rsvp.guest_count} {rsvp.guest_count === 1 ? 'شخص' : 'أشخاص'}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-parchment-50 border border-parchment-200 text-[11px] text-maroon-900/70">
          💌 {invitation.groom_name} & {invitation.bride_name}
        </span>
      </div>

      {/* Message */}
      {rsvp.message && (
        <div className="p-3 rounded-xl bg-gold-50 border border-gold-200 mb-3">
          <p className="text-xs text-maroon-900/80 leading-relaxed">
            💬 {rsvp.message}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-[10px] text-maroon-900/50 pt-2 border-t border-parchment-200">
        <span>📅 {dateStr}</span>
        <span>🕐 {timeStr}</span>
      </div>
    </div>
  );
}