import { createClient } from '@/lib/supabase-server';
import { redirect, notFound } from 'next/navigation';
import { ButtonLink } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SuccessPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', slug)
    .eq('user_id', user.id)
    .single();

  if (!invitation) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <Card variant="luxury">
        <CardBody className="p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-gold flex items-center justify-center shadow-xl animate-float">
            <span className="text-4xl">🎉</span>
          </div>

          <h1 className="text-3xl font-bold text-maroon-900 mb-2 font-display">
            {invitation.status === 'published' ? 'مبروك! دعوتك منشورة' : 'تم الحفظ كمسودة'}
          </h1>
          <p className="text-maroon-900/60 mb-8">
            {invitation.status === 'published'
              ? 'دعوتك جاهزة للمشاركة مع ضيوفك'
              : 'تقدر تكمل التعديل وترجع تنشر بعدين'}
          </p>

          {/* Invitation Link */}
          <div className="p-4 rounded-2xl bg-parchment-50 border border-parchment-200 mb-6">
            <p className="text-xs text-maroon-900/60 mb-2">رابط دعوتك:</p>
            <p className="text-sm font-mono text-maroon-900 dir-ltr break-all">
              /invitation/{invitation.slug}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <ButtonLink
              href={`/invitation/${invitation.slug}`}
              variant="gold"
              size="lg"
              fullWidth
            >
              👁️ معاينة الدعوة
            </ButtonLink>

            <div className="grid grid-cols-2 gap-3">
              <ButtonLink
                href={`/dashboard/invitations/${invitation.id}/edit`}
                variant="outline"
                size="md"
                fullWidth
              >
                ✏️ تعديل
              </ButtonLink>
              <ButtonLink
                href="/dashboard/invitations"
                variant="outline"
                size="md"
                fullWidth
              >
                📋 كل الدعوات
              </ButtonLink>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}