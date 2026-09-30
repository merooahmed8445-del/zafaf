import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      title: 'المنتج',
      links: [
        { label: 'المميزات', href: '#features' },
        { label: 'الأسعار', href: '#pricing' },
        { label: 'قوالب الدعوات', href: '#templates' },
      ],
    },
    {
      title: 'الشركة',
      links: [
        { label: 'من نحن', href: '/about' },
        { label: 'تواصل معنا', href: '/contact' },
        { label: 'المدونة', href: '/blog' },
      ],
    },
    {
      title: 'الدعم',
      links: [
        { label: 'الأسئلة الشائعة', href: '#faq' },
        { label: 'سياسة الخصوصية', href: '/privacy' },
        { label: 'الشروط والأحكام', href: '/terms' },
      ],
    },
  ];

  return (
    <footer className="bg-maroon-950 text-parchment-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
                <span className="text-maroon-950 text-xl font-display font-bold">Z</span>
              </div>
              <span className="text-xl font-bold font-display">Zafaf</span>
            </Link>
            <p className="text-sm text-parchment-200/70 leading-relaxed">
              دعوات زفاف رقمية فاخرة، مصممة بحب لتخليد أجمل لحظاتكم.
            </p>
          </div>

          {/* Links */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-bold text-gold-400 mb-4 text-sm tracking-wider">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-parchment-200/70 hover:text-gold-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gold-500/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-parchment-200/50">
            © {currentYear} Zafaf. جميع الحقوق محفوظة.
          </p>
          <p className="text-xs text-parchment-200/50">
            صُنع بـ ❤️ في مصر
          </p>
        </div>
      </div>
    </footer>
  );
}