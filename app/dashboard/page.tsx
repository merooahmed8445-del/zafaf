import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: invitations } = await supabase
    .from('invitations')
    .select('*')
    .eq('user_id', user.id);

  const { data: rsvps } = await supabase
    .from('rsvps')
    .select('*, invitation:invitations!inner(user_id)')
    .eq('invitation.user_id', user.id);

  const totalInvitations = invitations?.length || 0;
  const publishedInvitations = invitations?.filter(i => i.status === 'published').length || 0;
  const totalRsvps = rsvps?.length || 0;
  const attendingRsvps = rsvps?.filter(r => r.attendance_status === 'attending').length || 0;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-maroon-900 mb-2 font-display">
          أهلاً {profile?.full_name || 'بك'} 👋
        </h1>
        <p className="text-maroon-900/60">
          نظرة سريعة على دعواتك وإحصائياتك
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardBody className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-maroon-900/60">الدعوات</p>
              <span className="text-2xl">💌</span>
            </div>
            <p className="text-3xl font-bold text-maroon-900 font-display">
              {totalInvitations}
            </p>
            <p className="text-xs text-maroon-900/50 mt-1">
              {publishedInvitations} منشورة
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-maroon-900/60">الحضور</p>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-3xl font-bold text-emerald-700 font-display">
              {attendingRsvps}
            </p>
            <p className="text-xs text-maroon-900/50 mt-1">
              من {totalRsvps} رد
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-maroon-900/60">الخطة</p>
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-2xl font-bold text-gold-600 font-display capitalize">
              {profile?.plan || 'free'}
            </p>
            <p className="text-xs text-maroon-900/50 mt-1">
              {profile?.invitations_used || 0} / {profile?.invitations_limit || 1} مستخدمة
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-maroon-900/60">الزيارات</p>
              <span className="text-2xl">👁️</span>
            </div>
            <p className="text-3xl font-bold text-maroon-900 font-display">
              {invitations?.reduce((sum, i) => sum + (i.view_count || 0), 0) || 0}
            </p>
            <p className="text-xs text-maroon-900/50 mt-1">
              لكل الدعوات
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-maroon-900 mb-4 font-display">
          إجراءات سريعة
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/dashboard/invitations/new" className="group">
            <Card variant="luxury" className="hover:-translate-y-1 transition-all duration-300 h-full">
              <CardBody className="text-center py-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl gradient-gold text-maroon-950 flex items-center justify-center text-2xl shadow-md">
                  ➕
                </div>
                <h3 className="text-lg font-bold text-maroon-900 mb-1">
                  دعوة جديدة
                </h3>
                <p className="text-xs text-maroon-900/60">
                  ابدأ في تصميم دعوتك
                </p>
              </CardBody>
            </Card>
          </Link>

          <Link href="/dashboard/invitations" className="group">
            <Card className="hover:-translate-y-1 transition-all duration-300 h-full">
              <CardBody className="text-center py-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gold-100 border border-gold-300 flex items-center justify-center text-2xl">
                  📋
                </div>
                <h3 className="text-lg font-bold text-maroon-900 mb-1">
                  دعواتي
                </h3>
                <p className="text-xs text-maroon-900/60">
                  {totalInvitations} دعوة
                </p>
              </CardBody>
            </Card>
          </Link>

          <Link href="/dashboard/rsvps" className="group">
            <Card className="hover:-translate-y-1 transition-all duration-300 h-full">
              <CardBody className="text-center py-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gold-100 border border-gold-300 flex items-center justify-center text-2xl">
                  👥
                </div>
                <h3 className="text-lg font-bold text-maroon-900 mb-1">
                  تأكيدات الحضور
                </h3>
                <p className="text-xs text-maroon-900/60">
                  {totalRsvps} رد
                </p>
              </CardBody>
            </Card>
          </Link>
        </div>
      </div>

      {/* Empty state */}
      {totalInvitations === 0 && (
        <Card variant="luxury">
          <CardBody className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gold-100 border border-gold-300 flex items-center justify-center text-3xl animate-float">
              ✨
            </div>
            <h2 className="text-2xl font-bold text-maroon-900 mb-2 font-display">
              أنشئ دعوتك الأولى
            </h2>
            <p className="text-maroon-900/60 mb-6 max-w-md mx-auto">
              في أقل من 5 دقائق، ستكون دعوتك جاهزة للمشاركة مع ضيوفك
            </p>
            <ButtonLink href="/dashboard/invitations/new" variant="gold" size="lg">
              ابدأ الآن
            </ButtonLink>
          </CardBody>
        </Card>
      )}
    </div>
  );
}