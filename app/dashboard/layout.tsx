import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/Sidebar';
import { DashboardTopBar } from '@/components/dashboard/TopBar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <div className="min-h-screen bg-parchment-50 flex" dir="rtl">
      {/* Sidebar */}
      <DashboardSidebar profile={profile} />

      {/* Main */}
      <div className="flex-1 lg:mr-64">
        <DashboardTopBar profile={profile} email={user.email} />
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}