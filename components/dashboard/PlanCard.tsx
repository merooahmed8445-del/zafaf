import { ButtonLink } from '@/components/ui/Button';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';

interface PlanCardProps {
  profile: {
    plan: 'free' | 'basic' | 'premium' | 'business';
    invitations_used: number;
    invitations_limit: number;
  };
  stats: {
    totalInvitations: number;
    totalRsvps: number;
    totalViews: number;
  };
}

const planInfo = {
  free: {
    name: 'المجانية',
    icon: '🆓',
    color: 'text-slate-600',
    bg: 'bg-slate-50 border-slate-200',
    features: ['دعوة واحدة', 'تصميم أساسي'],
  },
  basic: {
    name: 'الأساسية',
    icon: '⭐',
    color: 'text-blue-600',
    bg: 'bg-blue-50 border-blue-200',
    features: ['3 دعوات', 'كل التصميمات', 'موسيقى'],
  },
  premium: {
    name: 'المميزة',
    icon: '💎',
    color: 'text-gold-600',
    bg: 'bg-gold-50 border-gold-300',
    features: ['10 دعوات', 'كل المميزات', 'دعم فني'],
  },
  business: {
    name: 'الاحترافية',
    icon: '👑',
    color: 'text-maroon-900',
    bg: 'bg-maroon-50 border-maroon-300',
    features: ['دعوات غير محدودة', 'كل المميزات', 'دومين مخصص'],
  },
};

export function PlanCard({ profile, stats }: PlanCardProps) {
  const plan = planInfo[profile.plan] || planInfo.free;
  const usagePercent = Math.min(100, Math.round((profile.invitations_used / profile.invitations_limit) * 100));

  return (
    <Card variant="luxury">
      <CardHeader>
        <h2 className="text-base font-bold text-maroon-900 flex items-center gap-2">
          <span>⭐</span>
          <span>خطتك الحالية</span>
        </h2>
      </CardHeader>
      <CardBody>
        {/* Plan Badge */}
        <div className={`p-4 rounded-2xl border ${plan.bg} text-center mb-5`}>
          <div className="text-4xl mb-2">{plan.icon}</div>
          <p className={`text-lg font-bold ${plan.color} font-display`}>
            الخطة {plan.name}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
            {plan.features.map((f) => (
              <span
                key={f}
                className="text-[10px] px-2 py-1 rounded-full bg-white/60 border border-current/20 font-semibold"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Usage */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-maroon-900/70">
              الدعوات المستخدمة
            </span>
            <span className="text-xs font-bold text-maroon-900">
              {profile.invitations_used} / {profile.invitations_limit}
            </span>
          </div>
          <div className="w-full h-2 bg-parchment-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                usagePercent >= 80 ? 'bg-rose-500' : 'bg-gradient-to-r from-gold-400 to-gold-600'
              }`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="text-center p-2 rounded-lg bg-parchment-50 border border-parchment-200">
            <p className="text-[10px] text-maroon-900/50">الدعوات</p>
            <p className="text-base font-bold text-maroon-900">{stats.totalInvitations}</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-parchment-50 border border-parchment-200">
            <p className="text-[10px] text-maroon-900/50">RSVP</p>
            <p className="text-base font-bold text-emerald-700">{stats.totalRsvps}</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-parchment-50 border border-parchment-200">
            <p className="text-[10px] text-maroon-900/50">الزيارات</p>
            <p className="text-base font-bold text-gold-600">{stats.totalViews}</p>
          </div>
        </div>

        {/* Upgrade Button */}
        {profile.plan !== 'business' && (
          <ButtonLink href="#upgrade" variant="gold" fullWidth>
            ⬆️ ارتقِ لخطة أعلى
          </ButtonLink>
        )}

        {profile.plan === 'business' && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <p className="text-xs text-emerald-700 font-bold">
              👑 أنت في أعلى خطة!
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  );
}