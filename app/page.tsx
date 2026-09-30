import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { ButtonLink } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-parchment-50 to-white pt-20 pb-32">
          {/* Decorative */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold-200/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-100 border border-gold-300 text-gold-800 text-xs font-bold mb-6 animate-fade-in-up">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
              جديد — دعوات تفاعلية بموسيقى وعد تنازلي
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-maroon-900 leading-tight mb-6 animate-fade-in-up font-display">
              دعوة زفافك الرقمية
              <br />
              <span className="text-gradient-gold">بلمسة ملكية فاخرة</span>
            </h1>

            <p className="text-lg text-maroon-900/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up">
              أنشئ دعوة زفاف رقمية أنيقة في دقائق. شاركها مع ضيوفك عبر رابط واحد،
              واجمع تأكيدات الحضور والتهاني — كل ذلك بضغطة زر.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12 animate-fade-in-up">
              <ButtonLink href="/register" variant="gold" size="lg">
                ابدأ مجاناً
              </ButtonLink>
              <ButtonLink href="#how" variant="outline" size="lg">
                شاهد كيف يعمل
              </ButtonLink>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto animate-fade-in-up">
              {[
                { value: '+500', label: 'دعوة ناجحة' },
                { value: '4.9', label: 'تقييم العملاء' },
                { value: '5 دقائق', label: 'وقت الإنشاء' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gradient-gold font-display">
                    {stat.value}
                  </div>
                  <div className="text-xs text-maroon-900/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FEATURES ============ */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-maroon-900 mb-4 font-display">
                كل ما تحتاجه في دعوة واحدة
              </h2>
              <p className="text-lg text-maroon-900/60 max-w-2xl mx-auto">
                مميزات مصممة خصيصاً لتناسب حفلات الزفاف العربية
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: '✨',
                  title: 'تصميمات فاخرة',
                  desc: 'قوالب احترافية بألوان ملكية تناسب ذوقك الرفيع.',
                },
                {
                  icon: '🎵',
                  title: 'موسيقى خلفية',
                  desc: 'اختر أغنيتك المفضلة أو ارفع مقطوعتك الخاصة.',
                },
                {
                  icon: '⏰',
                  title: 'عد تنازلي حي',
                  desc: 'عد تنازلي لموعد الزفاف بتوقيتك المحلي بدقة.',
                },
                {
                  icon: '📸',
                  title: 'صور العروسين',
                  desc: 'ارفع أجمل صورة لكما وستظهر بأسلوب أنيق.',
                },
                {
                  icon: '✅',
                  title: 'تأكيد حضور',
                  desc: 'نموذج RSVP يجمع الردود مباشرة إلى لوحة تحكمك.',
                },
                {
                  icon: '💌',
                  title: 'دفتر التهاني',
                  desc: 'دع ضيوفك يتركون كلماتهم الجميلة لكما.',
                },
              ].map((feature) => (
                <Card key={feature.title} variant="luxury" className="hover:-translate-y-1 transition-transform duration-300">
                  <CardBody className="text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gold-100 border border-gold-300 flex items-center justify-center text-2xl">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold text-maroon-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-maroon-900/60 leading-relaxed">{feature.desc}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section id="how" className="py-24 bg-parchment-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-maroon-900 mb-4 font-display">
                ابدأ في 3 خطوات بسيطة
              </h2>
              <p className="text-lg text-maroon-900/60">
                مفيش حاجة معقدة — من التسجيل للنشر في دقائق
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { num: '01', title: 'سجّل حساب', desc: 'أنشئ حسابك المجاني في 30 ثانية.' },
                { num: '02', title: 'خصّص دعوتك', desc: 'أضف أسماءكما، التاريخ، الصورة، والأغنية.' },
                { num: '03', title: 'شارك الرابط', desc: 'انسخ رابط دعوتك وابعته لضيوفك عبر واتساب.' },
              ].map((step) => (
                <div key={step.num} className="relative text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-maroon text-gold-400 flex items-center justify-center text-2xl font-bold font-display shadow-xl">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-maroon-900 mb-2">{step.title}</h3>
                  <p className="text-maroon-900/60">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PRICING ============ */}
        <section id="pricing" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-maroon-900 mb-4 font-display">
                خطط تناسب الجميع
              </h2>
              <p className="text-lg text-maroon-900/60">
                ابدأ مجاناً، وارتقِ لما تحتاج
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: 'مجاني',
                  price: '0',
                  features: ['دعوة واحدة', 'تصميم أساسي', 'بدون موسيقى', 'صالح 3 شهور'],
                  cta: 'ابدأ مجاناً',
                  featured: false,
                },
                {
                  name: 'مميز',
                  price: '399',
                  features: ['دعوة واحدة', 'كل التصميمات', 'موسيقى مخصصة', 'بدون تاريخ انتهاء', 'دفتر التهاني', 'دعم فني'],
                  cta: 'اشترك الآن',
                  featured: true,
                },
                {
                  name: 'احترافي',
                  price: '999',
                  features: ['3 دعوات', 'كل المميزات', 'دومين مخصص', 'إحصائيات تفصيلية', 'دعم VIP'],
                  cta: 'تواصل معنا',
                  featured: false,
                },
              ].map((plan) => (
                <Card
                  key={plan.name}
                  variant={plan.featured ? 'luxury' : 'default'}
                  className={`relative ${plan.featured ? 'md:scale-105 border-2 border-gold-400' : ''}`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-gold text-maroon-950 text-xs font-bold shadow-md">
                      الأكثر طلباً
                    </div>
                  )}
                  <CardBody className="text-center pt-8">
                    <h3 className="text-lg font-bold text-maroon-900 mb-4">{plan.name}</h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gradient-gold font-display">{plan.price}</span>
                      <span className="text-maroon-900/60 text-sm mr-2">ج.م</span>
                    </div>
                    <ul className="space-y-2.5 text-right mb-8">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-maroon-900/80">
                          <span className="text-gold-500 font-bold">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <ButtonLink
                      href="/register"
                      variant={plan.featured ? 'gold' : 'outline'}
                      fullWidth
                    >
                      {plan.cta}
                    </ButtonLink>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="py-24 gradient-maroon relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-parchment-100 mb-6 font-display">
              جاهز لتبدأ قصة حبكما الرقمية؟
            </h2>
            <p className="text-lg text-parchment-200/80 mb-8">
              انضم لمئات العرسان الذين اختاروا Zafaf ليكونوا جزءاً من فرحتهم
            </p>
            <ButtonLink href="/register" variant="gold" size="lg">
              أنشئ دعوتك مجاناً
            </ButtonLink>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-maroon-900 mb-4 font-display">
                الأسئلة الشائعة
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { q: 'هل الدعوة تعمل على الموبايل؟', a: 'نعم، كل الدعوات مصممة لتعمل بشكل مثالي على جميع الأجهزة.' },
                { q: 'هل يمكنني استخدام أغنيتي الخاصة؟', a: 'بالتأكيد! يمكنك رفع أي ملف صوتي أو وضع رابط أغنية.' },
                { q: 'كم تستغرق مدة التسليم؟', a: 'فورياً! بمجرد الانتهاء من التخصيص، تصبح دعوتك جاهزة.' },
                { q: 'هل يمكنني تجربة قبل الدفع؟', a: 'نعم، الخطة المجانية تتيح لك إنشاء دعوة كاملة.' },
              ].map((item, i) => (
                <details key={i} className="group bg-parchment-50 rounded-2xl border border-parchment-200 p-5 cursor-pointer">
                  <summary className="font-bold text-maroon-900 flex items-center justify-between">
                    {item.q}
                    <span className="text-gold-500 group-open:rotate-45 transition-transform text-xl">+</span>
                  </summary>
                  <p className="text-maroon-900/70 mt-3 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}