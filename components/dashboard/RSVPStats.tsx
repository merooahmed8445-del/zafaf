interface RSVPStatsProps {
  totalAttending: number;
  totalApologize: number;
  totalGuests: number;
  totalResponses: number;
}

export function RSVPStats({
  totalAttending,
  totalApologize,
  totalGuests,
  totalResponses,
}: RSVPStatsProps) {
  const stats = [
    {
      label: 'سأحضر',
      value: totalAttending,
      icon: '✅',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-200',
    },
    {
      label: 'اعتذر',
      value: totalApologize,
      icon: '❌',
      color: 'text-rose-700',
      bg: 'bg-rose-50 border-rose-200',
    },
    {
      label: 'إجمالي الضيوف',
      value: totalGuests,
      icon: '👥',
      color: 'text-maroon-900',
      bg: 'bg-parchment-50 border-parchment-200',
    },
    {
      label: 'إجمالي الردود',
      value: totalResponses,
      icon: '📬',
      color: 'text-gold-700',
      bg: 'bg-gold-50 border-gold-200',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`p-4 rounded-2xl border ${stat.bg} text-center`}
        >
          <div className="text-2xl mb-1">{stat.icon}</div>
          <p className={`text-3xl font-bold ${stat.color} font-display tabular-nums`}>
            {stat.value}
          </p>
          <p className="text-[11px] text-maroon-900/60 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}