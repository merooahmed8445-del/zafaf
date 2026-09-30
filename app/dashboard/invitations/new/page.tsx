import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { InvitationCard } from '@/components/dashboard/InvitationCard';

export default async function InvitationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // جلب الدعوات
  const { data: invitations } = await supabase
    .from('invitations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // جلب عدد RSVP لكل دعوة
  const invitationIds = (invitations || []).map((i) => i.id);

  const { data: rsvps } = invitationIds.length > 0
    ? await supabase
        .from('rsvps')
        .select('invitation_id')
        .in('invitation_id', invitationIds)
    : { data: [] };

  const { data: wishes } = invitationIds.length > 0
    ? await supabase
        .from('wishes')
        .select('invitation_id')
        .in('invitation_id', invitationIds)
    : { data: [] };

  // احسب العد لكل دعوة
  const rsvpCountByInvitation: Record<string, number> = {};
  const wishCountByInvitation: Record<string, number> = {};

  (rsvps || []).forEach((r) => {
    rsvpCountByInvitation[r.invitation_id] = (rsvpCountByInvitation[r.invitation_id] || 0) + 1;
  });

  (wishes || []).forEach((w) => {
    wishCountByInvitation[w.invitation_id] = (wishCountByInvitation[w.invitation_id] || 0) + 1;
  });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const totalInvitations = invitations?.length || 0;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-maroon-900 mb-2 font-display">
            دعواتي
          </h1>
          <p className="text-maroon-900/60 text-sm">
            {totalInvitations > 0
              ? `لديك ${totalInvitations} ${totalInvitations === 1 ? 'دعوة' : 'دعوات'}`
              : 'ابدأ في إنشاء دعوتك الأولى'}
          </p>
        </div>

        <ButtonLink href="/dashboard/invitations/new" variant="gold" size="md">
          ➕ دعوة جديدة
        </ButtonLink>
      </div>

      {/* Empty State */}
      {totalInvitations === 0 ? (
        <Card variant="luxury">
          <CardBody className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gold-100 border border-gold-300 flex items-center justify-center text-4xl animate-float">
              💌
            </div>
            <h2 className="text-2xl font-bold text-maroon-900 mb-3 font-display">
              ابدأ رحلتك
            </h2>
            <p className="text-maroon-900/60 mb-8 max-w-md mx-auto">
              أنشئ أول دعوة زفاف رقمية، وشاركها مع ضيوفك في دقائق
            </p>
            <ButtonLink href="/dashboard/invitations/new" variant="gold" size="lg">
              ✨ أنشئ دعوتك الأولى
            </ButtonLink>
          </CardBody>
        </Card>
      ) : (
        <>
          {/* Invitations Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(invitations || []).map((invitation) => (
              <InvitationCard
                key={invitation.id}
                invitation={invitation}
                rsvpCount={rsvpCountByInvitation[invitation.id] || 0}
                wishCount={wishCountByInvitation[invitation.id] || 0}
                appUrl={appUrl}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}