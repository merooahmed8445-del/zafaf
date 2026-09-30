import { createClient } from '@/lib/supabase-server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { InvitationForm } from '@/components/invitation/InvitationForm';
import { InvitationFormData } from '@/types/database';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditInvitationPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: invitation, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', slug)
    .eq('user_id', user.id)
    .single();

  if (error || !invitation) notFound();

  // حوّل البيانات لشكل InvitationFormData
  const initialData: Partial<InvitationFormData> = {
    groom_name: invitation.groom_name,
    bride_name: invitation.bride_name,
    seal_letters: invitation.seal_letters || 'M & Y',
    groom_father: invitation.groom_father || '',
    bride_father: invitation.bride_father || '',
    wedding_date: invitation.wedding_date,
    start_time: invitation.start_time,
    reception_time: invitation.reception_time,
    ceremony_time: invitation.ceremony_time,
    timezone: invitation.timezone,
    venue_name: invitation.venue_name || '',
    venue_address: invitation.venue_address || '',
    maps_url: invitation.maps_url || '',
    whatsapp_number: invitation.whatsapp_number || '',
    photo_url: invitation.photo_url || '',
    audio_url: invitation.audio_url || '',
    audio_volume: invitation.audio_volume ?? 0.8,
    slug: invitation.slug,
    status: invitation.status,
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/invitations"
          className="inline-flex items-center gap-1 text-sm text-maroon-900/60 hover:text-maroon-900 mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          العودة للدعوات
        </Link>
        <h1 className="text-3xl font-bold text-maroon-900 mb-2 font-display">
          تعديل الدعوة
        </h1>
        <p className="text-maroon-900/60">
          {invitation.groom_name} & {invitation.bride_name}
        </p>
      </div>

      {/* Form */}
      <InvitationForm
        userId={user.id}
        mode="edit"
        invitationId={invitation.id}
        initialData={initialData}
      />
    </div>
  );
}