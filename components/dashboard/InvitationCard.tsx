'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CopyButton } from './CopyButton';
import { StatusBadge } from './StatusBadge';
import { createClient } from '@/lib/supabase-browser';

interface InvitationCardProps {
  invitation: {
    id: string;
    slug: string;
    status: 'draft' | 'published' | 'expired' | 'disabled';
    groom_name: string;
    bride_name: string;
    wedding_date: string;
    venue_name: string | null;
    photo_url: string | null;
    view_count: number;
    created_at: string;
  };
  rsvpCount: number;
  wishCount: number;
  appUrl: string;
}

export function InvitationCard({
  invitation,
  rsvpCount,
  wishCount,
  appUrl,
}: InvitationCardProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const invitationUrl = `${appUrl}/invitation/${invitation.slug}`;

  const date = new Date(invitation.wedding_date + 'T12:00:00');
  const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  async function handleDelete() {
    setDeleting(true);
    const supabase = createClient();
    const { error } = await supabase
      .from('invitations')
      .delete()
      .eq('id', invitation.id);

    if (error) {
      alert('فشل الحذف: ' + error.message);
      setDeleting(false);
      return;
    }

    router.refresh();
  }

  async function toggleStatus() {
    const supabase = createClient();
    const newStatus = invitation.status === 'published' ? 'draft' : 'published';
    await supabase
      .from('invitations')
      .update({ status: newStatus })
      .eq('id', invitation.id);
    router.refresh();
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-parchment-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
        
        {/* Cover */}
        <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-maroon-900 to-maroon-800 overflow-hidden">
          {invitation.photo_url ? (
            <img
              src={invitation.photo_url}
              alt={`${invitation.groom_name} & ${invitation.bride_name}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gold-400/40 text-5xl">
              💍
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-maroon-950/30 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
            <p className="font-display text-xl font-bold text-gold-200 leading-tight">
              {invitation.groom_name} <span className="text-gold-500 text-sm">&</span> {invitation.bride_name}
            </p>
            <p className="text-[10px] text-gold-400/80 mt-0.5">{dateStr}</p>
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <StatusBadge status={invitation.status} />
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          
          {/* Venue */}
          {invitation.venue_name && (
            <div className="flex items-center gap-2 text-xs text-maroon-900/70">
              <span>📍</span>
              <span className="truncate">{invitation.venue_name}</span>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 rounded-lg bg-parchment-50 border border-parchment-200">
              <p className="text-[10px] text-maroon-900/50">الزيارات</p>
              <p className="text-sm font-bold text-maroon-900">{invitation.view_count}</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-parchment-50 border border-parchment-200">
              <p className="text-[10px] text-maroon-900/50">الحضور</p>
              <p className="text-sm font-bold text-emerald-700">{rsvpCount}</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-parchment-50 border border-parchment-200">
              <p className="text-[10px] text-maroon-900/50">التهاني</p>
              <p className="text-sm font-bold text-gold-600">{wishCount}</p>
            </div>
          </div>

          {/* Link + Copy */}
          <div className="flex items-center gap-2">
            <div className="flex-1 px-3 py-2 rounded-lg bg-parchment-50 border border-parchment-200 text-[10px] text-maroon-900/60 truncate dir-ltr text-left font-mono">
              /invitation/{invitation.slug}
            </div>
            <CopyButton text={invitationUrl} />
          </div>

          {/* Actions - Primary */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-parchment-200">
            <Link
              href={`/invitation/${invitation.slug}`}
              target="_blank"
              className="text-center py-2 rounded-lg bg-maroon-900 text-gold-200 text-xs font-bold hover:bg-maroon-800 transition-all"
            >
              👁️ معاينة
            </Link>

            <Link
              href={`/dashboard/invitations/${invitation.id}/edit`}
              className="text-center py-2 rounded-lg bg-gold-500 text-maroon-950 text-xs font-bold hover:bg-gold-400 transition-all"
            >
              ✏️ تعديل
            </Link>
          </div>

          {/* Actions - Secondary */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={toggleStatus}
              className="flex-1 text-center py-2 rounded-lg border border-parchment-300 text-maroon-900 text-xs font-bold hover:bg-parchment-100 transition-all"
            >
              {invitation.status === 'published' ? '⏸️ إيقاف' : '▶️ نشر'}
            </button>

            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="px-3 py-2 rounded-lg text-rose-600 border border-rose-200 hover:bg-rose-50 transition-all text-xs"
              aria-label="حذف"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Delete Modal - خارج البطاقة */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="text-lg font-bold text-maroon-900 mb-2">
              حذف الدعوة؟
            </h3>
            <p className="text-sm text-maroon-900/60 mb-6">
              هيتم حذف الدعوة وكل بياناتها (RSVP + التهاني). مش ممكن الرجوع.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
                className="flex-1 py-2 rounded-xl border border-parchment-300 text-maroon-900 font-bold text-sm"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2 rounded-xl bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 disabled:opacity-50"
              >
                {deleting ? 'جاري الحذف...' : 'حذف نهائي'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}