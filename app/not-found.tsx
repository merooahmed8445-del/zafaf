import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-maroon-950">
      <div className="max-w-md text-center">
        <div className="text-7xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold text-gold-200 mb-3 font-display">
          الدعوة غير موجودة
        </h1>
        <p className="text-gold-400/80 text-sm mb-8">
          الرابط اللي بتحاول تفتحه غير صحيح أو الدعوة اتحذفت.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl gradient-gold text-maroon-950 font-bold hover:brightness-105 transition-all"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}