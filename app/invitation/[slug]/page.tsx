import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { InvitationView } from '@/components/invitation/public/InvitationView';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: invitation } = await supabase
    .from('invitations')
    .select('groom_name, bride_name, wedding_date, venue_name')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!invitation) return { title: 'الدعوة غير موجودة' };

  return {
    title: `دعوة زفاف ${invitation.groom_name} & ${invitation.bride_name}`,
    description: `يتشرفان بدعوتكم لحضور حفل زفافهما - ${invitation.venue_name || ''}`,
  };
}

export default async function InvitationPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: invitation, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !invitation) notFound();

  // Draft check
  if (invitation.status !== 'published') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-maroon-950">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-2xl font-bold text-gold-200 mb-3 font-display">
            الدعوة غير متاحة حالياً
          </h1>
          <p className="text-gold-400/80 text-sm">
            هذه الدعوة لم تُنشر بعد.
          </p>
        </div>
      </div>
    );
  }

  // Expired check
  if (invitation.expires_at && new Date(invitation.expires_at) < new Date()) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-maroon-950">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-6">⏰</div>
          <h1 className="text-2xl font-bold text-gold-200 mb-3 font-display">
            انتهت صلاحية هذه الدعوة
          </h1>
        </div>
      </div>
    );
  }

  // Track view
  try {
    await supabase.from('analytics').insert({
      invitation_id: invitation.id,
      event_type: 'view',
    });
  } catch (e) {
    // ignore
  }

    return <InvitationView invitation={invitation} />;
}