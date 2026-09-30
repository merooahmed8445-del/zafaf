export function getArabicDate(dateStr: string): string {
  try {
    const date = new Date(dateStr + 'T12:00:00');
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch {
    return '';
  }
}

export function formatTime(time: string): string {
  if (!time) return '—';
  const [h, m] = time.split(':');
  const hour = parseInt(h);
  const period = hour >= 12 ? 'مساءً' : 'صباحاً';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${m} ${period}`;
}