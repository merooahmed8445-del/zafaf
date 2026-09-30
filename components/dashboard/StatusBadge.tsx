interface StatusBadgeProps {
  status: 'draft' | 'published' | 'expired' | 'disabled';
}

const config = {
  draft: {
    label: 'مسودة',
    icon: '📝',
    classes: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  published: {
    label: 'منشورة',
    icon: '✅',
    classes: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  expired: {
    label: 'منتهية',
    icon: '⏰',
    classes: 'bg-rose-100 text-rose-800 border-rose-300',
  },
  disabled: {
    label: 'معطّلة',
    icon: '🚫',
    classes: 'bg-slate-100 text-slate-800 border-slate-300',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const c = config[status] || config.draft;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${c.classes}`}>
      <span>{c.icon}</span>
      <span>{c.label}</span>
    </span>
  );
}