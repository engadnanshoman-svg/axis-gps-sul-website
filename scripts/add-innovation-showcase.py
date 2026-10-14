#!/usr/bin/env python3
"""Script to inject the InnovationShowcase component and translations into page.tsx"""

import re

with open('/home/z/my-project/src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Step 1: Add innovation translations to Arabic and English sections
# Find the Arabic section's end (right before 'en: {')
arabic_marker = "    'testimonials.testimonialAria': 'شهادة',\n  },"
arabic_innovation_block = """    'testimonials.testimonialAria': 'شهادة',
    'innovation.label': 'إنجازات مبهرة',
    'innovation.headingPrefix': 'إنجازات',
    'innovation.headingHighlight': 'اكسيس المبهرة',
    'innovation.subheading': 'رحلة افتراضية ثلاثية الأبعاد في أحدث مشاريعنا التقنية عبر المسح الضوئي والواقع الرقمي',
    'innovation.cta': 'استكشف المشروع',
    'innovation.card1Title': 'مسح محكمة نابلس بالليزر',
    'innovation.card1Desc': 'مسح ثلاثي الأبعاد كامل لمحكمة الاستئناف في نابلس باستخدام Trimble X7 بدقة ميليمترية',
    'innovation.card1Tag': 'محكمة نابلس',
    'innovation.card1Year': '2026',
    'innovation.card2Title': 'TAJ MALL بالليزر ثلاثي الأبعاد',
    'innovation.card2Desc': 'نمذجة كاملة لمجمع تجاري بمساحة 30,000 م² باستخدام Trimble X7 وتحويلها إلى BIM',
    'innovation.card2Tag': 'مجمع تجاري',
    'innovation.card2Year': '2025',
    'innovation.card3Title': 'مسح موقع بيت لحم',
    'innovation.card3Desc': 'توثيق دقيق لموقع أثري في بيت لحم عبر المسح الليزري ثلاثي الأبعاد بجهاز Trimble X7',
    'innovation.card3Tag': 'موقع أثري',
    'innovation.card3Year': '2026',
    'innovation.card4Title': 'NavVis VLX3 — الواقع الرقمي',
    'innovation.card4Desc': 'التقاط الواقع المحيط عبر ماسح NavVis VLX3 المحمول لتوليد نموذج رقمي كامل خلال ساعات',
    'innovation.card4Tag': 'واقع افتراضي',
    'innovation.card4Year': '2026',
    'innovation.card5Title': 'Trimble X9 — مشاريع الطرق',
    'innovation.card5Desc': 'مسح ليزري عالي السرعة لشبكة طرق بطول 12 كم بجهاز Trimble X9 المتطور',
    'innovation.card5Tag': 'بنية تحتية',
    'innovation.card5Year': '2025',
    'innovation.card6Title': 'Vidoc RTK — المسح بالهاتف',
    'innovation.card6Desc': 'تقنية ثورية لتحويل الهواتف الذكية إلى محطات مسح RTK متكاملة بدقة سنتيمترية',
    'innovation.card6Tag': 'تقنية متقدمة',
    'innovation.card6Year': '2026',
    'innovation.controls.prev': 'السابق',
    'innovation.controls.next': 'التالي',
    'innovation.controls.autoplay': 'تشغيل تلقائي',
  },"""

if arabic_marker in content:
    content = content.replace(arabic_marker, arabic_innovation_block, 1)
    print("✓ Added Arabic innovation translations")
else:
    print("✗ Arabic marker not found")

# Find the English section's end
english_marker = "    'testimonials.testimonialAria': 'Testimonial',\n  },"
english_innovation_block = """    'testimonials.testimonialAria': 'Testimonial',
    'innovation.label': 'Stunning Achievements',
    'innovation.headingPrefix': 'Stunning',
    'innovation.headingHighlight': 'Axis Achievements',
    'innovation.subheading': 'A virtual 3D journey through our latest technical projects in laser scanning and digital reality',
    'innovation.cta': 'Explore Project',
    'innovation.card1Title': 'Nablus Court Laser Scan',
    'innovation.card1Desc': 'Complete 3D scanning of the Court of Appeal in Nablus using Trimble X7 with millimeter precision',
    'innovation.card1Tag': 'Nablus Court',
    'innovation.card1Year': '2026',
    'innovation.card2Title': 'TAJ MALL in 3D Laser',
    'innovation.card2Desc': 'Full modeling of a 30,000 m² commercial complex using Trimble X7 and conversion to BIM',
    'innovation.card2Tag': 'Commercial Mall',
    'innovation.card2Year': '2025',
    'innovation.card3Title': 'Bethlehem Site Survey',
    'innovation.card3Desc': 'Precise documentation of an archaeological site in Bethlehem via 3D laser scanning with Trimble X7',
    'innovation.card3Tag': 'Archaeological Site',
    'innovation.card3Year': '2026',
    'innovation.card4Title': 'NavVis VLX3 — Digital Reality',
    'innovation.card4Desc': 'Capturing surrounding reality via the wearable NavVis VLX3 scanner to generate a complete digital model in hours',
    'innovation.card4Tag': 'Virtual Reality',
    'innovation.card4Year': '2026',
    'innovation.card5Title': 'Trimble X9 — Road Projects',
    'innovation.card5Desc': 'High-speed laser scanning of a 12 km road network using the advanced Trimble X9',
    'innovation.card5Tag': 'Infrastructure',
    'innovation.card5Year': '2025',
    'innovation.card6Title': 'Vidoc RTK — Mobile Survey',
    'innovation.card6Desc': 'Revolutionary technology turning smartphones into complete RTK surveying stations with centimeter accuracy',
    'innovation.card6Tag': 'Advanced Tech',
    'innovation.card6Year': '2026',
    'innovation.controls.prev': 'Previous',
    'innovation.controls.next': 'Next',
    'innovation.controls.autoplay': 'Auto-play',
  },"""

if english_marker in content:
    content = content.replace(english_marker, english_innovation_block, 1)
    print("✓ Added English innovation translations")
else:
    print("✗ English marker not found")

# Step 2: Add the InnovationShowcase component before Footer
innovation_component = '''/* ───────── AXIS Innovation Showcase — REVOLUTIONARY 3D CAROUSEL ───────── */
function InnovationShowcase() {
  const { t } = useLang()
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  const innovations = [
    {
      title: t('innovation.card1Title'),
      desc: t('innovation.card1Desc'),
      tag: t('innovation.card1Tag'),
      year: t('innovation.card1Year'),
      gradient: 'from-[oklch(0.78_0.16_175)] via-[oklch(0.72_0.18_220)] to-[oklch(0.65_0.20_300)]',
      stats: ['+50K', '+12K', '2026'],
      statsLabels: ['نقطة', 'م²', 'سنة'],
    },
    {
      title: t('innovation.card2Title'),
      desc: t('innovation.card2Desc'),
      tag: t('innovation.card2Tag'),
      year: t('innovation.card2Year'),
      gradient: 'from-[oklch(0.72_0.18_220)] via-[oklch(0.82_0.16_90)] to-[oklch(0.72_0.22_50)]',
      stats: ['30K', '+500', '2025'],
      statsLabels: ['م²', 'نقطة', 'سنة'],
    },
    {
      title: t('innovation.card3Title'),
      desc: t('innovation.card3Desc'),
      tag: t('innovation.card3Tag'),
      year: t('innovation.card3Year'),
      gradient: 'from-[oklch(0.65_0.20_300)] via-[oklch(0.68_0.22_350)] to-[oklch(0.72_0.22_50)]',
      stats: ['+8K', '+150', '2026'],
      statsLabels: ['نقطة', 'سطح', 'سنة'],
    },
    {
      title: t('innovation.card4Title'),
      desc: t('innovation.card4Desc'),
      tag: t('innovation.card4Tag'),
      year: t('innovation.card4Year'),
      gradient: 'from-[oklch(0.82_0.16_90)] via-[oklch(0.78_0.16_175)] to-[oklch(0.72_0.18_220)]',
      stats: ['+24', '5x', '2026'],
      statsLabels: ['ساعة', 'أسرع', 'سنة'],
    },
    {
      title: t('innovation.card5Title'),
      desc: t('innovation.card5Desc'),
      tag: t('innovation.card5Tag'),
      year: t('innovation.card5Year'),
      gradient: 'from-[oklch(0.62_0.22_280)] via-[oklch(0.68_0.22_350)] to-[oklch(0.65_0.20_300)]',
      stats: ['12km', '4h', '2025'],
      statsLabels: ['طريق', 'ساعات', 'سنة'],
    },
    {
      title: t('innovation.card6Title'),
      desc: t('innovation.card6Desc'),
      tag: t('innovation.card6Tag'),
      year: t('innovation.card6Year'),
      gradient: 'from-[oklch(0.72_0.22_50)] via-[oklch(0.82_0.16_90)] to-[oklch(0.78_0.16_175)]',
      stats: ['±2cm', '+5x', '2026'],
      statsLabels: ['دقة', 'أسرع', 'سنة'],
    },
  ]

  // Auto-play rotation
  useEffect(() => {
    if (!autoplay || !mounted) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % innovations.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [autoplay, mounted, innovations.length])

  const getCardTransform = (i: number) => {
    const total = innovations.length
    const offset = (i - activeIndex + total) % total
    const isActive = offset === 0
    return {
      transform: `rotateY(${(offset / total) * 360}deg) translateZ(${isActive ? '180px' : '120px'}) scale(${isActive ? 1 : 0.85})`,
      opacity: isActive ? 1 : 0.4,
      zIndex: isActive ? 10 : 5 - offset,
      filter: isActive ? 'blur(0px)' : 'blur(2px)',
    }
  }

  return (
    <Section id="innovation" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Aurora blobs background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="aurora-blob" style={{ top: '10%', right: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, oklch(0.78 0.16 175 / 0.3), transparent 70%)' }} />
        <div className="aurora-blob" style={{ bottom: '10%', left: '5%', width: '350px', height: '350px', background: 'radial-gradient(circle, oklch(0.65 0.20 300 / 0.25), transparent 70%)', animationDelay: '3s' }} />
        <div className="aurora-blob" style={{ top: '40%', left: '50%', width: '250px', height: '250px', background: 'radial-gradient(circle, oklch(0.72 0.18 220 / 0.2), transparent 70%)', animationDelay: '6s' }} />
      </div>

      <div ref={sectionRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 badge-aurora">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--aurora-c1)' }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--aurora-c1)' }} />
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase">{t('innovation.label')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            {t('innovation.headingPrefix')} <span className="gradient-text">{t('innovation.headingHighlight')}</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            {t('innovation.subheading')}
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <div
          className="innovation-3d relative h-[500px] sm:h-[560px] flex items-center justify-center"
          style={{ perspective: '1200px' }}
        >
          {/* Center glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-30 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, var(--aurora-c1) 0%, transparent 70%)',
              filter: 'blur(40px)',
              animation: 'pulse-glow 3s ease-in-out infinite',
            }}
          />

          {/* Cards */}
          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            {innovations.map((inn, i) => {
              const transform = getCardTransform(i)
              const isActive = i === activeIndex
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    transform: transform.transform,
                    opacity: transform.opacity,
                    zIndex: transform.zIndex,
                    filter: transform.filter,
                    transformStyle: 'preserve-3d',
                    transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    width: '320px',
                    height: '440px',
                    left: '50%',
                    top: '50%',
                    marginLeft: '-160px',
                    marginTop: '-220px',
                  }}
                >
                  <div
                    className={`relative w-full h-full rounded-3xl overflow-hidden glass-card lift-glow group cursor-pointer ${isActive ? 'aurora-sweep' : ''}`}
                    onClick={() => !isActive && setActiveIndex(i)}
                  >
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${inn.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />

                    {/* Top decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 -translate-y-12 translate-x-12 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-700"
                      style={{ background: 'radial-gradient(circle, var(--aurora-c1) 0%, transparent 70%)' }}
                    />
                    <div className="absolute bottom-0 left-0 w-24 h-24 translate-y-8 -translate-x-8 rounded-full opacity-20 group-hover:opacity-50 transition-opacity duration-700"
                      style={{ background: 'radial-gradient(circle, var(--aurora-c3) 0%, transparent 70%)' }}
                    />

                    {/* Content */}
                    <div className="relative h-full p-6 flex flex-col">
                      {/* Year badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="badge-aurora text-xs">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                            <rect x="3" y="4" width="18" height="18" rx="2"/>
                            <path d="M16 2v4M8 2v4M3 10h18"/>
                          </svg>
                          {inn.year}
                        </span>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[oklch(0.78_0.16_175_/_0.15)] text-[oklch(0.82_0.16_175)] border border-[oklch(0.78_0.16_175_/_0.3)]">
                          {inn.tag}
                        </span>
                      </div>

                      {/* Icon — aurora container */}
                      <div className="icon-aurora w-20 h-20 mb-5">
                        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-10 h-10" style={{ color: 'var(--aurora-c1)' }}>
                          <circle cx="32" cy="32" r="3" fill="currentColor"/>
                          <circle cx="32" cy="32" r="12" strokeOpacity="0.4" strokeDasharray="2 3"/>
                          <circle cx="32" cy="32" r="22" strokeOpacity="0.2" strokeDasharray="1 4"/>
                          <circle cx="32" cy="6" r="2.5" fill="currentColor"/>
                          <circle cx="58" cy="32" r="2.5" fill="currentColor" opacity="0.7"/>
                          <circle cx="32" cy="58" r="2.5" fill="currentColor" opacity="0.5"/>
                          <circle cx="6" cy="32" r="2.5" fill="currentColor" opacity="0.6"/>
                        </svg>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[var(--t-1)] group-hover:text-[var(--aurora-c1)] transition-colors duration-500">
                        {inn.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[var(--t-7)] leading-relaxed mb-5 flex-1">
                        {inn.desc}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-5">
                        {inn.stats.map((stat, idx) => (
                          <div key={idx} className="text-center p-2 rounded-lg bg-[oklch(0.78_0.16_175_/_0.05)] border border-[oklch(0.78_0.16_175_/_0.15)]">
                            <div className="text-base font-bold gradient-text">{stat}</div>
                            <div className="text-[10px] text-[var(--t-8)] mt-0.5">{inn.statsLabels[idx]}</div>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <button className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-500 group-hover:scale-[1.03] active:scale-[0.98] overflow-hidden relative"
                        style={{
                          background: 'linear-gradient(135deg, var(--aurora-c1), var(--aurora-c2), var(--aurora-c3))',
                          color: 'oklch(0.10 0.02 270)',
                          boxShadow: '0 4px 20px oklch(0.78 0.16 175 / 0.3)',
                        }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {t('innovation.cta')}
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <span className="absolute inset-0 sweep-shimmer"></span>
                      </button>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ borderColor: 'var(--aurora-c1)' }}
                    />
                    <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 rounded-br-lg opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ borderColor: 'var(--aurora-c3)' }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + innovations.length) % innovations.length)}
            className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group"
            aria-label={t('innovation.controls.prev')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[var(--aurora-c1)] group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {innovations.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`transition-all duration-500 rounded-full ${
                  i === activeIndex ? 'w-8 h-2' : 'w-2 h-2 bg-[var(--t-8)] hover:bg-[var(--aurora-c1)]'
                }`}
                style={{
                  background: i === activeIndex ? 'linear-gradient(90deg, var(--aurora-c1), var(--aurora-c2), var(--aurora-c3))' : undefined,
                }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % innovations.length)}
            className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group"
            aria-label={t('innovation.controls.next')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[var(--aurora-c1)] group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            onClick={() => setAutoplay(!autoplay)}
            className="ml-4 px-4 py-2 rounded-full glass-card text-xs font-semibold flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300"
            aria-label={t('innovation.controls.autoplay')}
          >
            {autoplay ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[var(--aurora-c1)]">
                <rect x="6" y="4" width="4" height="16" rx="1"/>
                <rect x="14" y="4" width="4" height="16" rx="1"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[var(--aurora-c1)]">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
            <span className="text-[var(--t-7)]">{t('innovation.controls.autoplay')}</span>
          </button>
        </div>

        {/* Counter */}
        <div className="text-center mt-6 text-sm text-[var(--t-7)]">
          <span className="gradient-text font-bold text-lg">{activeIndex + 1}</span>
          <span className="mx-2 opacity-50">/</span>
          <span className="opacity-70">{innovations.length}</span>
        </div>
      </div>
    </Section>
  )
}

'''

# Insert before Footer function
footer_marker = "/* ───────── footer ───────── */\nfunction Footer() {"
if footer_marker in content:
    content = content.replace(footer_marker, innovation_component + footer_marker)
    print("✓ Added InnovationShowcase component")
else:
    print("✗ Footer marker not found")

# Step 3: Add <InnovationShowcase /> to the page render
home_marker = "        <SocialFeed />\n        <Gallery />"
innovation_render = "        <InnovationShowcase />\n        <SocialFeed />\n        <Gallery />"
if home_marker in content:
    content = content.replace(home_marker, innovation_render, 1)
    print("✓ Added InnovationShowcase to page render")
else:
    print("✗ Home marker not found")

with open('/home/z/my-project/src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("\nFile saved successfully")
