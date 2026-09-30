import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import { RSVPCard } from '@/components/dashboard/RSVPCard';
import { RSVPStats } from '@/components/dashboard/RSVPStats';
import { ExportButton } from '@/components/dashboard/ExportButton';

interface PageProps {
  searchParams: Promise<{ invitation?: string; status?: string }>;
}

export default async function RSVPsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // جلب كل دعوات العميل
  const { data: invitations } = await supabase
    .from('invitations')
    .select('id, slug, groom_name, bride_name')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (!invitations || invitations.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card variant="luxury">
          <CardBody className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gold-100 border border-gold-300 flex items-center justify-center text-4xl animate-float">
              📬
            </div>
            <h2 className="text-2xl font-bold text-maroon-900 mb-3 font-display">
              مفيش ردود لسه
            </h2>
            <p className="text-maroon-900/60 mb-8 max-w-md mx-auto">
              أنشئ دعوة الأولى، وابدأ في استقبال تأكيدات الحضور
            </p>
            <ButtonLink href="/dashboard/invitations/new" variant="gold" size="lg">
              ✨ أنشئ دعوة
            </ButtonLink>
          </CardBody>
        </Card>
      </div>
    );
  }

  const invitationIds = invitations.map((i) => i.id);

  // جلب كل RSVPs
  let query = supabase
    .from('rsvps')
    .select('*')
    .in('invitation_id', invitationIds)
    .order('created_at', { ascending: false });

  if (params.invitation) {
    query = query.eq('invitation_id', params.invitation);
  }

  if (params.status) {
    query = query.eq('attendance_status', params.status);
  }

  const { data: rsvps } = await query;

  // احسب الإحصائيات
  const allRsvps = rsvps || [];
  const totalAttending = allRsvps.filter((r) => r.attendance_status === 'attending').length;
  const totalApologize = allRsvps.filter((r) => r.attendance_status === 'apologize').length;
  const totalGuests = allRsvps
    .filter((r) => r.attendance_status === 'attending')
    .reduce((sum, r) => sum + (r.guest_count || 1), 0);
  const totalResponses = allRsvps.length;

  // خريطة الدعوات للوصول السريع
  const invitationsMap = Object.fromEntries(invitations.map((i) => [i.id, i]));

  // بيانات التصدير
  const exportData = allRsvps.map((r) => {
    const inv = invitationsMap[r.invitation_id];
    return {
      guest_name: r.guest_name,
      guest_phone: r.guest_phone,
      guest_count: r.guest_count,
      attendance_status: r.attendance_status,
      message: r.message,
      created_at: r.created_at,
      invitation_slug: inv?.slug || '',
      groom_name: inv?.groom_name || '',
      bride_name: inv?.bride_name || '',
    };
  });

  const currentInvitation = params.invitation
    ? invitationsMap[params.invitation]
    : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-maroon-900 mb-2 font-display">
            تأكيدات الحضور
          </h1>
          <p className="text-maroon-900/60 text-sm">
            {totalResponses > 0
              ? `${totalResponses} رد من الضيوف`
              : 'لسه مفيش ردود'}
          </p>
        </div>

        <ExportButton data={exportData} />
      </div>

      {/* Stats */}
      <RSVPStats
        totalAttending={totalAttending}
        totalApologize={totalApologize}
        totalGuests={totalGuests}
        totalResponses={totalResponses}
      />

      {/* Filters */}
      <Card>
        <CardBody className="p-4">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Invitation Filter */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-maroon-900/70">
                الدعوة:
              </label>
              <div className="flex flex-wrap gap-1">
                <Link
                  href="/dashboard/rsvps"
                  className={[
                    'px-3 py-1.5 rounded-lg text-xs font-bold border transition-all',
                    !params.invitation
                      ? 'bg-maroon-900 text-gold-200 border-maroon-900'
                      : 'bg-parchment-50 text-maroon-900/70 border-parchment-200 hover:border-gold-400',
                  ].join(' ')}
                >
                  الكل
                </Link>
                {invitations.map((inv) => (
                  <Link
                    key={inv.id}
                    href={`/dashboard/rsvps?invitation=${inv.id}${params.status ? `&status=${params.status}` : ''}`}
                    className={[
                      'px-3 py-1.5 rounded-lg text-xs font-bold border transition-all',
                      params.invitation === inv.id
                        ? 'bg-maroon-900 text-gold-200 border-maroon-900'
                        : 'bg-parchment-50 text-maroon-900/70 border-parchment-200 hover:border-gold-400',
                    ].join(' ')}
                  >
                    {inv.groom_name} & {inv.bride_name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden sm:block w-px h-6 bg-parchment-300" />

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-maroon-900/70">
                الحالة:
              </label>
              <div className="flex gap-1">
                <Link
                  href={params.invitation ? `/dashboard/rsvps?invitation=${params.invitation}` : '/dashboard/rsvps'}
                  className={[
                    'px-3 py-1.5 rounded-lg text-xs font-bold border transition-all',
                    !params.status
                      ? 'bg-maroon-900 text-gold-200 border-maroon-900'
                      : 'bg-parchment-50 text-maroon-900/70 border-parchment-200 hover:border-gold-400',
                  ].join(' ')}
                >
                  الكل
                </Link>
                <Link
                  href={`/dashboard/rsvps?status=attending${params.invitation ? `&invitation=${params.invitation}` : ''}`}
                  className={[
                    'px-3 py-1.5 rounded-lg text-xs font-bold border transition-all',
                    params.status === 'attending'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-400',
                  ].join(' ')}
                >
                  ✅ سأحضر
                </Link>
                <Link
                  href={`/dashboard/rsvps?status=apologize${params.invitation ? `&invitation=${params.invitation}` : ''}`}
                  className={[
                    'px-3 py-1.5 rounded-lg text-xs font-bold border transition-all',
                    params.status === 'apologize'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-rose-50 text-rose-700 border-rose-200 hover:border-rose-400',
                  ].join(' ')}
                >
                  ❌ اعتذر
                </Link>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* RSVPs List */}
      {allRsvps.length === 0 ? (
        <Card variant="luxury">
          <CardBody className="text-center py-16">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-maroon-900 mb-2 font-display">
              مفيش ردود في الفلتر ده
            </h3>
            <p className="text-maroon-900/60 text-sm">
              جرّب تغيّر الفلتر أو تختار دعوة تانية
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allRsvps.map((rsvp) => {
            const inv = invitationsMap[rsvp.invitation_id];
            if (!inv) return null;
            return (
              <RSVPCard
                key={rsvp.id}
                rsvp={rsvp}
                invitation={inv}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}