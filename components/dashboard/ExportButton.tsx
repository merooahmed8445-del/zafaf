'use client';

interface RSVPRecord {
  guest_name: string;
  guest_phone: string | null;
  guest_count: number;
  attendance_status: string;
  message: string | null;
  created_at: string;
  invitation_slug: string;
  groom_name: string;
  bride_name: string;
}

interface ExportButtonProps {
  data: RSVPRecord[];
}

export function ExportButton({ data }: ExportButtonProps) {
  function handleExport() {
    if (data.length === 0) {
      alert('مفيش بيانات للتصدير');
      return;
    }

    const headers = [
      'الاسم',
      'الهاتف',
      'عدد الحضور',
      'الحالة',
      'الرسالة',
      'التاريخ',
      'الدعوة',
    ];

    const rows = data.map((r) => [
      r.guest_name,
      r.guest_phone || '',
      r.guest_count.toString(),
      r.attendance_status === 'attending' ? 'سأحضر' : 'اعتذر',
      r.message || '',
      new Date(r.created_at).toLocaleString('ar-EG'),
      `${r.groom_name} & ${r.bride_name}`,
    ]);

    // BOM لدعم العربي في Excel
    const BOM = '\uFEFF';
    const csvContent =
      BOM +
      [headers, ...rows]
        .map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rsvps-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={data.length === 0}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold shadow-md hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      تصدير CSV
    </button>
  );
}