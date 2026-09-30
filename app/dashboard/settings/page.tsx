import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/dashboard/ProfileForm';
import { PasswordForm } from '@/components/dashboard/PasswordForm';
import { PlanCard } from '@/components/dashboard/PlanCard';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // جلب البروفايل
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) redirect('/login');

  // جلب الإحصائيات
  const { data: invitations } = await supabase
    .from('invitations')
    .select('id, view_count')
    .eq('user_id', user.id);

  const invitationIds = (invitations || []).map((i) => i.id);

  const { data: rsvps } = invitationIds.length > 0
    ? await supabase.from('rsvps').select('id').in('invitation_id', invitationIds)
    : { data: [] };

  const totalViews = (invitations || []).reduce((sum, i) => sum + (i.view_count || 0), 0);

  const stats = {
    totalInvitations: invitations?.length || 0,
    totalRsvps: rsvps?.length || 0,
    totalViews,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-maroon-900 mb-2 font-display">
          الإعدادات
        </h1>
        <p className="text-maroon-900/60 text-sm">
          إدارة حسابك وخطتك
        </p>
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <ProfileForm
            profile={{
              id: profile.id,
              email: profile.email,
              full_name: profile.full_name,
              phone: profile.phone,
            }}
          />

          <PasswordForm />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1">
          <PlanCard
            profile={{
              plan: profile.plan,
              invitations_used: profile.invitations_used,
              invitations_limit: profile.invitations_limit,
            }}
            stats={stats}
          />
        </div>
      </div>
    </div>
  );
}