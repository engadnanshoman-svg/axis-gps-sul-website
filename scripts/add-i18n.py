#!/usr/bin/env python3
"""
Add full i18n (Arabic/English) support to page.tsx
KEY FIX: Do ALL component code replacements FIRST, then insert TRANSLATIONS dictionary LAST
This prevents the replace() calls from matching Arabic text inside the TRANSLATIONS dict.
"""

INPUT = '/home/z/my-project/src/app/page.tsx'
OUTPUT = '/home/z/my-project/src/app/page.tsx'

with open(INPUT, 'r', encoding='utf-8') as f:
    content = f.read()

# ═══════════════════════════════════════════════════════
# PHASE 1: Replace Arabic in COMPONENT CODE only
# (TRANSLATIONS dict not inserted yet, so no conflicts)
# ═══════════════════════════════════════════════════════

# --- LangToggle components (insert before nav) ---
lang_toggle_components = """/* ───────── language toggle components ───────── */
function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <button
      onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--b-1)] bg-[var(--bg-2)] text-[var(--t-5)] hover:border-[oklch(0.72_0.14_180)] hover:text-[oklch(0.72_0.14_180)] transition-all duration-300 text-xs font-bold"
      title={lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
    </button>
  )
}

function LangToggleMobile() {
  const { lang, setLang } = useLang()
  return (
    <button
      onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
      className="p-2 text-[var(--t-5)] hover:text-[oklch(0.72_0.14_180)] border border-[var(--b-1)] rounded-lg text-xs font-bold flex items-center gap-1"
      title={lang === 'ar' ? 'EN' : 'عربي'}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      {lang === 'ar' ? 'EN' : 'عربي'}
    </button>
  )
}

"""

content = content.replace(
    "/* ───────── nav ───────── */",
    lang_toggle_components + "/* ───────── nav ───────── */"
)

# Replace desktop language toggle
old_desktop_toggle = """            {/* Language toggle */}
            <button
              onClick={() => {
                const html = document.documentElement
                const currentLang = html.getAttribute('lang')
                const currentDir = html.getAttribute('dir')
                if (currentLang === 'ar') {
                  html.setAttribute('lang', 'en')
                  html.setAttribute('dir', 'ltr')
                  localStorage.setItem('axis-lang', 'en')
                } else {
                  html.setAttribute('lang', 'ar')
                  html.setAttribute('dir', 'rtl')
                  localStorage.setItem('axis-lang', 'ar')
                }
                window.location.reload()
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[var(--b-1)] bg-[var(--bg-2)] text-[var(--t-5)] hover:border-[oklch(0.72_0.14_180)] hover:text-[oklch(0.72_0.14_180)] transition-all duration-300 text-xs font-bold"
              title="Switch to English / التبديل للعربية"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span>EN</span>
            </button>"""

content = content.replace(old_desktop_toggle, "            {/* Language toggle */}\n            <LangToggle />")

# Replace mobile language toggle
old_mobile_toggle = """            <button
              onClick={() => {
                const html = document.documentElement
                const currentLang = html.getAttribute('lang')
                if (currentLang === 'ar') {
                  html.setAttribute('lang', 'en')
                  html.setAttribute('dir', 'ltr')
                  localStorage.setItem('axis-lang', 'en')
                } else {
                  html.setAttribute('lang', 'ar')
                  html.setAttribute('dir', 'rtl')
                  localStorage.setItem('axis-lang', 'ar')
                }
                window.location.reload()
              }}
              className="p-2 text-[var(--t-5)] hover:text-[oklch(0.72_0.14_180)] border border-[var(--b-1)] rounded-lg text-xs font-bold flex items-center gap-1"
              title="EN / عربي"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              EN
            </button>"""

content = content.replace(old_mobile_toggle, "            <LangToggleMobile />")

# Wrap Home with LangProvider
content = content.replace(
    '    <div className="min-h-screen flex flex-col">\n      <FloatingThemeToggle />\n      <Navbar />',
    '    <LangProvider>\n    <div className="min-h-screen flex flex-col">\n      <FloatingThemeToggle />\n      <Navbar />'
)
content = content.replace(
    '      <FloatingWhatsApp />\n    </div>\n  )\n}',
    '      <FloatingWhatsApp />\n    </div>\n    </LangProvider>\n  )\n}'
)

# ═══════════════════════════════════════════════════════
# Add useLang to each component + replace text
# ═══════════════════════════════════════════════════════

# --- NAVBAR ---
content = content.replace(
    """function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = [
    { href: '#hero', label: 'الرئيسية', icon: undefined },
    { href: '#branches', label: 'فروعنا', icon: <MapPinned className="w-4 h-4" /> },
    { href: '#about', label: 'من نحن', icon: undefined },
    { href: '#services', label: 'خدماتنا', icon: undefined },
    { href: '#team', label: 'فريقنا', icon: undefined },
    { href: '#documents', label: 'تعرف اكثر علينا', icon: undefined },
    { href: '#gallery', label: 'المعرض', icon: undefined },
    { href: '#contact', label: 'تواصل معنا', icon: undefined },
  ]""",
    """function Navbar() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const links = [
    { href: '#hero', label: t('nav.home'), icon: undefined },
    { href: '#branches', label: t('nav.branches'), icon: <MapPinned className="w-4 h-4" /> },
    { href: '#about', label: t('nav.about'), icon: undefined },
    { href: '#services', label: t('nav.services'), icon: undefined },
    { href: '#team', label: t('nav.team'), icon: undefined },
    { href: '#documents', label: t('nav.documents'), icon: undefined },
    { href: '#gallery', label: t('nav.gallery'), icon: undefined },
    { href: '#contact', label: t('nav.contact'), icon: undefined },
  ]"""
)

content = content.replace(
    '<span className="text-lg font-bold gradient-text">اكسيس</span>\n              <span className="block text-[10px] text-[var(--t-5)] tracking-wider">للحلول الهندسية المتقدمة</span>',
    "<span className=\"text-lg font-bold gradient-text\">{t('nav.logoName')}</span>\n              <span className=\"block text-[10px] text-[var(--t-5)] tracking-wider\">{t('nav.logoTagline')}</span>"
)

content = content.replace(
    '              احصل على عرض\n            </a>\n            {/* Language toggle */}',
    "              {t('nav.getQuote')}\n            </a>\n            {/* Language toggle */}"
)
content = content.replace(
    '                احصل على عرض\n              </a>',
    "                {t('nav.getQuote')}\n              </a>"
)
content = content.replace('aria-label="القائمة"', "aria-label={t('nav.menuAria')}")

# --- CUSTOMER IMAGES ---
content = content.replace(
    """const CUSTOMER_IMAGES = [
  { src: '/customers/customer-dsc-01.jpg', alt: 'شركاء النجاح - زبائن أكسيس في الضفة الغربية والقدس' },
  { src: '/customers/customer-dsc-03.jpg', alt: 'شركاء النجاح - مشاريع مسح في البلاد' },
  { src: '/customers/customer-dsc-05.jpg', alt: 'شركاء النجاح - فريق العمل الميداني' },
  { src: '/customers/customer-dsc-07.jpg', alt: 'شركاء النجاح - حلول GPS للمؤسسات' },
  { src: '/customers/customer-dsc-08.jpg', alt: 'شركاء النجاح - تقنيات Trimble في البلاد' },
  { src: '/customers/customer-dsc-09.jpg', alt: 'شركاء النجاح - أجهزة NavVis الميدانية' },
  { src: '/customers/customer-dsc-14.jpg', alt: 'شركاء النجاح - زبائن الشركة' },
]

const CUSTOMER_IMAGES_LEFT = [
  { src: '/customers/navvis-full-use-3.jpg', alt: 'من وثق بنا - مسح ميداني بأجهزة NavVis' },
  { src: '/customers/navvis-full-use-4.jpg', alt: 'من وثق بنا - فريق المسح في الميدان' },
  { src: '/customers/navvis-full-use-5.jpg', alt: 'من وثق بنا - مسح ثلاثي الأبعاد' },
  { src: '/customers/navvis-full-use-6.jpg', alt: 'من وثق بنا - تقنية NavVis المتقدمة' },
  { src: '/customers/field-surveyor.jpg', alt: 'من وثق بنا - مسح ميداني بأجهزة Trimble' },
  { src: '/customers/navvis-scanning.jpg', alt: 'من وثق بنا - مسح ضوئي ثلاثي الأبعاد' },
  { src: '/customers/trimble-gnss.jpg', alt: 'من وثق بنا - جهاز GNSS Trimble' },
  { src: '/customers/navvis-industrial.jpg', alt: 'من وثق بنا - مسح صناعي متقدم' },
  { src: '/customers/surveyor-site.jpg', alt: 'من وثق بنا - مسح موقع إنشائي' },
  { src: '/customers/gps-rover.jpg', alt: 'من وثق بنا - جهاز GPS Rover' },
  { src: '/customers/cat-excavator.jpg', alt: 'من وثق بنا - أنظمة التحكم بالآلات الثقيلة' },
  { src: '/customers/navvis-screen.jpg', alt: 'من وثق بنا - نماذج ثلاثية الأبعاد' },
]""",
    """function useCustomerImages() {
  const { t } = useLang()
  return [
    { src: '/customers/customer-dsc-01.jpg', alt: t('customers.alt1') },
    { src: '/customers/customer-dsc-03.jpg', alt: t('customers.alt2') },
    { src: '/customers/customer-dsc-05.jpg', alt: t('customers.alt3') },
    { src: '/customers/customer-dsc-07.jpg', alt: t('customers.alt4') },
    { src: '/customers/customer-dsc-08.jpg', alt: t('customers.alt5') },
    { src: '/customers/customer-dsc-09.jpg', alt: t('customers.alt6') },
    { src: '/customers/customer-dsc-14.jpg', alt: t('customers.alt7') },
  ]
}

function useCustomerImagesLeft() {
  const { t } = useLang()
  return [
    { src: '/customers/navvis-full-use-3.jpg', alt: t('customers.altL1') },
    { src: '/customers/navvis-full-use-4.jpg', alt: t('customers.altL2') },
    { src: '/customers/navvis-full-use-5.jpg', alt: t('customers.altL3') },
    { src: '/customers/navvis-full-use-6.jpg', alt: t('customers.altL4') },
    { src: '/customers/field-surveyor.jpg', alt: t('customers.altL5') },
    { src: '/customers/navvis-scanning.jpg', alt: t('customers.altL6') },
    { src: '/customers/trimble-gnss.jpg', alt: t('customers.altL7') },
    { src: '/customers/navvis-industrial.jpg', alt: t('customers.altL8') },
    { src: '/customers/surveyor-site.jpg', alt: t('customers.altL9') },
    { src: '/customers/gps-rover.jpg', alt: t('customers.altL10') },
    { src: '/customers/cat-excavator.jpg', alt: t('customers.altL11') },
    { src: '/customers/navvis-screen.jpg', alt: t('customers.altL12') },
  ]
}"""
)

# Hero
content = content.replace(
    "function Hero() {\n  const [phase",
    "function Hero() {\n  const { t } = useLang()\n  const CUSTOMER_IMAGES = useCustomerImages()\n  const CUSTOMER_IMAGES_LEFT = useCustomerImagesLeft()\n  const [phase"
)
content = content.replace('alt="شعار اكسيس"', "alt={t('hero.logoAlt')}")
content = content.replace(
    '<span className="gradient-text">اكسيس</span>\n          <br />\n          <span className="text-[var(--t-1)]">للحلول الهندسية المتقدمة</span>',
    "<span className=\"gradient-text\">{t('hero.brandName')}</span>\n          <br />\n          <span className=\"text-[var(--t-1)]\">{t('hero.tagline')}</span>"
)
content = content.replace(
    """الشركة الرائدة في البلاد في مجال تقنيات المساحة والجيوماتكس. الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta.
          نقدم أحدث تقنيات GPS و RTK والمسح الضوئي وأنظمة مراقبة التحرك.""",
    "{t('hero.subtitle')}"
)
content = content.replace('              شاركنا تجربتك — رأيك يهمنا', "{t('hero.ctaReview')}")

# About
content = content.replace(
    """function About() {
  const features = [
    { icon: <Target className="w-6 h-6" />, title: 'رؤية واضحة', desc: 'الشركة الرائدة والأكبر في مجال تقنيات ووحلول المساحة والجيوماتكس والمعلومات الجغرافية في البلاد' },
    { icon: <Shield className="w-6 h-6" />, title: 'وكالات حصرية عالمية', desc: 'الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta العالمية' },
    { icon: <Zap className="w-6 h-6" />, title: 'تقنيات متقدمة', desc: 'نوظف أحدث تقنيات GPS و RTK والمسح الضوئي 3D والواقع المعزز ورسم الخرائط عالية الدقة HD Mapping' },
  ]""",
    """function About() {
  const { t } = useLang()
  const features = [
    { icon: <Target className="w-6 h-6" />, title: t('about.feature1Title'), desc: t('about.feature1Desc') },
    { icon: <Shield className="w-6 h-6" />, title: t('about.feature2Title'), desc: t('about.feature2Desc') },
    { icon: <Zap className="w-6 h-6" />, title: t('about.feature3Title'), desc: t('about.feature3Desc') },
  ]"""
)
content = content.replace(
    """<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">من نحن</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight">
              قيادة تقنيات المساحة <br />
              <span className="gradient-text">في البلاد</span>
            </h2>""",
    """<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t('about.label')}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight">
              {t('about.heading')} <br />
              <span className="gradient-text">{t('about.headingHighlight')}</span>
            </h2>"""
)
content = content.replace(
    """شركة اكسيس للحلول الهندسية المتقدمة (AXIS GPS & Surveying Instruments LTD) هي الشركة الرائدة والأكبر
              في البلاد في مجال تقنيات وحلول المساحة والجيوماتكس والمعلومات الجغرافية. نحن الوكيل الحصري لشركات
              Trimble و NavVis و Spectra و Applanix و Kaarta العالمية، ونقدم أحدث التقنيات والحلول المتكاملة.""",
    "{t('about.paragraph1')}"
)
content = content.replace(
    """منذ تأسيسها على يد المهندس سلامة عواودة، تعمل اكسيس في مجالات عديدة تشمل: المسح والجيوماتكس، أنظمة GIS،
              شبكة محطات VRS وخدمات تصحيح الموقع RTK، رسم الخرائط عالية الدقة HD Mapping، المسح المتنقل Mobile Mapping،
              المدن الذكية Smart City، الزراعة الدقيقة، أنظمة توجيه الآلات Machine Control، تقنيات البناء Construction Tech،
              حلول الرصد والمراقبة، والواقع المعزز. تمتلك الشركة أربعة فروع رئيسية في كفر كنا وكفر قاسم
              ورام الله والخليل، ومختبر ومعهد تدريب Axis Campus.""",
    "{t('about.paragraph2')}"
)

# Services
content = content.replace(
    "function Services() {\n  const services = [",
    "function Services() {\n  const { t } = useLang()\n  const services = ["
)

# Replace service titles and descriptions in the data array
svc_pairs = [
    ("أجهزة GPS و GNSS", "services.gpsTitle", "title"),
    ("مستقبلات GNSS وهوائيات ومكونات OEM عالية الدقة للمسح الميداني والقياسات الجيوديسية", "services.gpsDesc", "desc"),
    ("أجهزة التوتل ستيشن", "services.totalStationTitle", "title"),
    ("أحدث أجهزة التوتل ستيشن وكالات القياس لقياسات المساحة الدقيقة في المشاريع الهندسية", "services.totalStationDesc", "desc"),
    ("المسح الضوئي 3D والواقع المعزز", "services.scanningTitle", "title"),
    ("ماسحات ضوئية متنقلة وثابتة مع حلول الواقع المعزز للنمذجة المتقدمة وتحويل الواقع إلى CAD", "services.scanningDesc", "desc"),
    ("أنظمة GIS و VRS", "services.gisTitle", "title"),
    ("حلول نظم المعلومات الجغرافية وشبكة محطات VRS لخدمات تصحيح الموقع RTK والخرائط الرقمية المتكاملة", "services.gisDesc", "desc"),
    ("رصد ومراقبة وتوجيه آليات", "services.monitoringTitle", "title"),
    ("أنظمة مراقبة تحرك ورصد هبوط مع SITECH لتوجيه الآليات الثقيلة Machine Control في مشاريع البناء", "services.monitoringDesc", "desc"),
    ("مستويات ليزر وبناء", "services.laserTitle", "title"),
    ("مستويات ليزر دوارة ومائلة وخطية وأنابيب وأجهزة قياس مسافة ليزرية لجميع أعمال البناء والطرق والصرف", "services.laserDesc", "desc"),
    ("برمجيات ومعالجة بيانات", "services.softwareTitle", "title"),
    ("برمجيات Trimble Business Center و TBC لمعالجة بيانات المسح وتحويلها إلى نماذج ومخططات هندسية دقيقة", "services.softwareDesc", "desc"),
    ("Axis Campus للتدريب", "services.campusTitle", "title"),
    ("معهد Axis Campus المتخصص في التدريب المهني وورش العمل ودورات اعتماد المحترفين مع مختبر ودعم فني", "services.campusDesc", "desc"),
]
for ar_text, key, field in svc_pairs:
    content = content.replace(f"{field}: '{ar_text}',", f"{field}: t('{key}'),")

content = content.replace(
    """<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">خدماتنا</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4 leading-tight">
              أجهزة وخدمات المساحة والجيوماتكس
            </h2>
            <p className="text-[var(--t-7)] max-w-2xl mx-auto">
              نقدم أحدث أجهزة المساحة والقياس من أبرز الشركات العالمية مع خدمات التدريب والدعم الفني المتكامل
            </p>""",
    """<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t('services.label')}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4 leading-tight">
              {t('services.heading')}
            </h2>
            <p className="text-[var(--t-7)] max-w-2xl mx-auto">
              {t('services.subheading')}
            </p>"""
)

# Generic component pattern: add useLang + replace texts
# For remaining components, use the >text< pattern for JSX and 'text' for JS strings

components_to_add_uselang = [
    "Stats", "Brands", "Gallery", "Projects", "WhyUs", "Team",
    "Testimonials", "Contact", "Documents", "Branches", "CEOMessage",
    "SocialFeed", "Footer", "FloatingThemeToggle", "FloatingWhatsApp"
]
for comp in components_to_add_uselang:
    content = content.replace(
        f"function {comp}() {{",
        f"function {comp}() {{\n  const {{ t }} = useLang()"
    )

# Now do all the text replacements
# Use a comprehensive mapping: (arabic_text, translation_key)
# For JSX text (between > and <), use >text< → >{t('key')}<
# For JS strings (in data/props), use 'text' → t('key')

jsx_replacements = [
    # Stats
    ("فروع في البلاد", "stats.branches"),
    ("أكثر من عميل راضٍ", "stats.clients"),
    ("سنة خبرة", "stats.years"),
    # Brands
    ("شراكاتنا", "brands.label"),
    ("علامات تجارية عالمية رائدة", "brands.heading"),
    ("رائد عالمي في تقنيات المسح والبنية التحتية", "brands.trimbleDesc"),
    ("قائد تقنيات المسح المتنقل والنمذجة ثلاثية الأبعاد", "brands.navvisDesc"),
    ("حلول مسح عالية الدقة للمساحين والمقاولين", "brands.spectraDesc"),
    ("التخصصات", "brands.specialties"),
    ("أجهزة ليزر", "brands.trimbleSpec1"),
    ("برامج المسح", "brands.trimbleSpec2"),
    ("ماسحات داخلية", "brands.navvisSpec2"),
    ("نمذجة 3D", "brands.navvisSpec3"),
    ("خرائط رقمية", "brands.navvisSpec4"),
    ("توتل ستيشن", "brands.spectraSpec1"),
    ("الوكيل الحصري في البلاد", "brands.exclusiveAgent"),
    # Gallery
    ("معرض الوسائط", "gallery.label"),
    ("أحدث فيديوهاتنا", "gallery.heading"),
    ("فيديوهات", "gallery.tabVideos"),
    ("مسح ليزري", "gallery.categoryLaser"),
    ("نمذجة ثلاثية الأبعاد", "gallery.category3dModeling"),
    ("زوروا قناتنا على يوتيوب — 105+ فيديو", "gallery.youtubeCta"),
    # Projects
    ("مشاريعنا", "projects.label"),
    ("إنجازاتنا وشراكاتنا", "projects.heading"),
    ("التعليم الأكاديمي", "projects.proj1Category"),
    ("أجهزة مساحة", "projects.proj1Tag1"),
    ("جامعة الخليل", "projects.proj1Tag2"),
    ("المسؤولية المجتمعية", "projects.proj2Category"),
    ("تبرع", "projects.proj2Tag1"),
    ("البوليتكنك", "projects.proj2Tag3"),
    ("مشاريع دولية", "projects.proj3Category"),
    ("فرع جديد", "projects.proj4Tag1"),
    ("توسع", "projects.proj4Tag3"),
    # WhyUs
    ("لماذا اكسيس", "whyUs.label"),
    ("لماذا تختار اكسيس؟", "whyUs.heading"),
    # Team
    ("فريق العمل", "team.label"),
    ("الهيكل الإداري", "team.heading"),
    ("الأقسام الفنية", "team.deptLabel"),
    ("المؤسس", "team.badgeFounder"),
    ("المدير التنفيذي", "team.badgeExecutive"),
    ("مدير فرع", "team.badgeBranch"),
    ("محاسبة", "team.badgeAccounting"),
    # Review
    ("شاركنا رأيك", "review.shareYourOpinion"),
    ("أضف مشاركتك الآن", "review.addNow"),
    ("تم إرسال مشاركتك بنجاح!", "review.submittedTitle"),
    ("أضف مشاركتك", "review.formTitle"),
    ("تقييمك", "review.ratingLabel"),
    ("أرسل مشاركتك", "review.submit"),
    ("إلغاء", "review.cancel"),
    ("مشاركة شركاء النجاح", "testimonials.label"),
    ("رأيك يهمنا", "testimonials.heading"),
    # Contact
    ("لنبدأ مشروعك القادم", "contact.heading"),
    ("واتساب", "contact.whatsappName"),
    ("الأسرع", "contact.whatsappBadge"),
    ("ماسنجر", "contact.messengerName"),
    ("انستغرام", "contact.instagramName"),
    ("افتح", "contact.openApp"),
    ("هاتف", "contact.phoneLabel"),
    ("بريد إلكتروني", "contact.emailLabel"),
    ("إرسال الرسالة", "contact.sendMessage"),
    # Branches
    ("نصل إليك أينما كنت", "branches.heading"),
    ("الفرع الرئيسي", "branches.mainBranch"),
    ("فرع الشمال", "branches.northBranch"),
    ("فرع رام الله", "branches.ramallahBranch"),
    ("فرع الخليل", "branches.hebronBranch"),
    ("عرض على الخريطة", "branches.viewOnMap"),
    # CEO
    ("كلمة المدير العام", "ceo.label"),
    ("رسالة المهندس سلامة عواودة", "ceo.heading"),
    # SocialFeed
    ("تابعنا", "socialFeed.label"),
    ("أحدث أخبارنا ومنشوراتنا", "socialFeed.heading"),
    ("عرض المنشور", "socialFeed.viewPost"),
    # Footer
    ("روابط سريعة", "footer.quickLinks"),
    ("جميع الحقوق محفوظة", "footer.copyright"),
]

for ar_text, key in jsx_replacements:
    content = content.replace(f">{ar_text}<", f"{{t('{key}')}}<")

# JS string replacements (for data arrays, placeholders, etc.)
js_replacements = [
    # Brands
    ("وكيل حصري في البلاد لأبرز الشركات العالمية المتخصصة في أجهزة المساحة والجيوماتكس", "brands.subheading"),
    ("مسح متنقل", "brands.navvisSpec1"),
    ("مستويات ليزر", "brands.spectraSpec2"),
    ("جمع بيانات", "brands.spectraSpec3"),
    # Gallery
    ("تابع أحدث أعمالنا وتقنياتنا في المساحة والجيوماتكس عبر منصاتنا المختلفة", "gallery.subheading"),
    # Projects
    ("نفخر بشراكاتنا مع المؤسسات الأكاديمية والدولية ومساهمتنا في تطوير قطاع المساحة والجيوماتكس في البلاد", "projects.subheading"),
    ("مختبر GIS والمساحة - جامعة الخليل", "projects.proj1Title"),
    ("إنشاء مختبر نظم المعلومات الجغرافية والمساحة في كلية المهن والعلوم التطبيقية بجامعة الخليل بالتعاون مع AXIS-GPS", "projects.proj1Desc"),
    ("دعم جامعة البوليتكنك", "projects.proj2Title"),
    ("تبرع بأجهزة مساحة حديثة ودعم صندوق الطالب الكريم لصالح جامعة البوليتكنك لتعزيز التخصصات الهندسية", "projects.proj2Desc"),
    ("الشراكة مع UNDP", "projects.proj3Title"),
    ("التعاون مع برنامج الأمم المتحدة الإنمائي في مشاريع المسح والخرائط ونظم المعلومات الجغرافية في البلاد", "projects.proj3Desc"),
    ("خرائط رقمية", "projects.proj3Tag1"),
    ("افتتاح فرع الخليل", "projects.proj4Title"),
    ("توسع الشركة", "projects.proj4Category"),
    ("افتتاح الفرع الرابع لشركة اكسيس في الخليل تحت رعاية أحمد سعيد بيوض التميمي لتوسيع نطاق الخدمات في المنطقة", "projects.proj4Desc"),
    ("الخليل", "projects.proj4Tag2"),
    # WhyUs
    ("نتميز بأننا الشركة الرائدة والأكبر في البلاد في مجال أجهزة المساحة والجيوماتكس. وكالة حصرية لأكبر الشركات العالمية مع شبكة فروع واسعة وفريق متخصص يقدم أفضل الحلول والدعم لعملائنا.", "whyUs.paragraph"),
    ("الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta", "whyUs.reason1"),
    ("أكثر من 20 سنة من الخبرة في قطاع أجهزة المساحة", "whyUs.reason2"),
    ("4 فروع رئيسية في جميع أنحاء البلاد", "whyUs.reason3"),
    ("شراكة مع برنامج الأمم المتحدة الإنمائي UNDP", "whyUs.reason4"),
    ("تعاون مع جامعات محلية (البوليتكنك، النجاح، الخليل)", "whyUs.reason5"),
    ("دعم فني متواصل وخدمة ما بعد البيع", "whyUs.reason6"),
    # Team
    ("هيكل إداري متكامل يضم نخبة من المهندسين والمتخصصين تحت قيادة متميزة", "team.subheading"),
    ("فريق متخصص يضم نخبة من المهندسين ذوي الكفاءات العالية", "team.ctaText"),
    ("المهندس سلامة العواودة", "team.member1Name"),
    ("المدير العام", "team.member1Role"),
    ("المهندس عدنان شومان", "team.member2Name"),
    ("المدير التنفيذي - الضفة الغربية", "team.member2Role"),
    ("السيدة ولاء البكري", "team.member3Name"),
    ("قسم المحاسبة", "team.member3Role"),
    ("المهندس أنس أبو حديد", "team.member4Name"),
    ("مدير فرع الخليل", "team.member4Role"),
    ("المهندسة ألاء أبو خلف", "team.member5Name"),
    ("قسم الرسم والمسح الضوئي", "team.member5Role"),
    ("المهندسة سجى مسالمة", "team.member6Name"),
    ("قسم الرسم والدعم الفني", "team.member6Role"),
    ("المهندس وعد وهدان", "team.member7Name"),
    ("قسم الدعم الفني", "team.member7Role"),
    ("المهندس حاتم عيدة", "team.member8Name"),
    ("قسم الرسم", "team.member8Role"),
    # Review
    ("تجربتك معنا تهمّنا! شاركنا تقييمك وسيظهر رأيك هنا ليستفيد منه الآخرون", "review.ctaDesc"),
    ("شكراً لك! مشاركتك ظهرت الآن في قسم شركاء النجاح ويمكن للجميع رؤيتها", "review.submittedDesc"),
    ("شاركنا تقييمك لتجربتك مع اكسيس", "review.formDesc"),
    ("اسمك", "review.namePlaceholder"),
    ("الشركة / المؤسسة (اختياري)", "review.companyPlaceholder"),
    ("اكتب مشاركتك وتقييمك هنا...", "review.textPlaceholder"),
    ("حدث خطأ أثناء إرسال المشاركة، حاول مرة أخرى", "review.errorSubmit"),
    ("تعذر الاتصال بالخادم، تأكد من اتصالك بالإنترنت وحاول مرة أخرى", "review.errorConnection"),
    ("نفتخر بثقة شركائنا وعملائنا ونسعى دائماً لتحقيق رضاهم وتجاوز توقعاتهم", "testimonials.subheading"),
    # Seed testimonials
    ("م. عدنان يوسف شومان", "testimonials.seed1Name"),
    ("المدير التنفيذي لشركة اكسيس", "testimonials.seed1Role"),
    ("منذ الإطلاقة كانت أكسيس رائدة في مجال التقنيات والحلول الهندسية المتقدمة، وسنستمر في تقديم أحدث التقنيات وأفضل الخدمات لعملائنا في كل مكان.", "testimonials.seed1Text"),
    ("م. سجى مسالمة", "testimonials.seed2Name"),
    ("فريق اكسيس - فرع الخليل", "testimonials.seed2Role"),
    ("فريق اكسيس يعمل بشغف لتوفير حلول مسح متكاملة وموثوقة تلبي احتياجات عملائنا بأعلى معايير الجودة والدقة.", "testimonials.seed2Text"),
    ("م. أنس أبو حديد", "testimonials.seed3Name"),
    ("مدير فرع الخليل - شركة اكسيس", "testimonials.seed3Role"),
    ("نلتزم في اكسيس بتقديم أحدث التقنيات وأفضل الخدمات لعملائنا، ونسعى دائماً لتجاوز توقعاتهم.", "testimonials.seed3Text"),
    ("أحمد سعيد بيوض التميمي", "testimonials.seed4Name"),
    ("رئيس مجلس أمناء جامعة البوليتكنك", "testimonials.seed4Role"),
    ("نشيد بدور شركة اكسيس في إرفاد قطاع المساحة والجيوماتكس بالتقنيات الحديثة ودعم المؤسسات الأكاديمية.", "testimonials.seed4Text"),
    # Contact
    ("تواصل معنا مباشرة عبر قنوات التواصل الاجتماعي أو أرسل لنا تفاصيل مشروعك", "contact.subheading"),
    ("تواصل معنا فوراً عبر واتساب", "contact.whatsappDesc"),
    ("أرسل لنا رسالة عبر ماسنجر", "contact.messengerDesc"),
    ("تابعنا وتواصل معنا على انستغرام", "contact.instagramDesc"),
    ("مواقع فروعنا على الخريطة", "contact.mapTitle"),
    ("أو أرسل لنا تفاصيل مشروعك", "contact.formTitle"),
    ("الاسم الكامل", "contact.nameLabel"),
    ("أدخل اسمك", "contact.namePlaceholder"),
    ("البريد الإلكتروني", "contact.emailLabel"),
    ("رقم الهاتف", "contact.phoneFormLabel"),
    ("نوع الخدمة", "contact.serviceLabel"),
    ("اختر الخدمة المطلوبة", "contact.servicePlaceholder"),
    ("أجهزة GPS و RTK", "contact.serviceGps"),
    ("أجهزة التوتل ستيشن", "contact.serviceTotalStation"),
    ("المسح الضوئي ثلاثي الأبعاد", "contact.service3dScanning"),
    ("أنظمة GIS والخرائط", "contact.serviceGis"),
    ("أنظمة مراقبة التحرك", "contact.serviceMonitoring"),
    ("التدريب والدعم الفني", "contact.serviceTraining"),
    ("تفاصيل المشروع", "contact.projectDetailsLabel"),
    ("اكتب تفاصيل مشروعك هنا...", "contact.projectDetailsPlaceholder"),
    ("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً", "contact.submitSuccess"),
    ("جاري الإرسال...", "contact.sending"),
    ("حدث خطأ في الإرسال", "contact.errorSend"),
    ("حدث خطأ غير متوقع", "contact.errorUnexpected"),
    ("مرحباً، أود الاستفسار عن خدمات اكسيس للحلول الهندسية", "contact.whatsappMsg"),
    # Documents
    ("تعرف اكثر علينا", "docs.heading"),
    ("تصفح السيرة الذاتية للشركة ووثائق الدعم الفني", "docs.subheading"),
    ("السيرة الذاتية", "docs.cvTitle"),
    ("السيرة الذاتية لشركة اكسيس للحلول الهندسية المتقدمة", "docs.cvDesc"),
    ("الدعم الفني", "docs.techSupportTitle"),
    ("وثائق الدعم الفني والخدمات المقدمة للعملاء", "docs.techSupportDesc"),
    ("مشاهدة", "docs.view"),
    ("مشاهدة فقط", "docs.viewOnly"),
    # Branches
    ("أربعة فروع رئيسية في جميع أنحاء البلاد، لخدمتكم بأسرع وقت وأعلى جودة", "branches.subheading"),
    ("المنطقة الصناعية تسيفوريت", "branches.mainBranchAddress"),
    ("كفر قاسم - شارع علي بن أبي طالب 2", "branches.northBranchAddress"),
    ("رام الله - شارع الإرسال قرب السفينة", "branches.ramallahAddress"),
    ("الخليل - برج العز ط5 شارع عين سارة", "branches.hebronAddress"),
    # CEO
    ("خلال أكثر من عشرين عاماً من الزمان، نجحت شركة أكسيس في أن تصبح الشركة الأولى في البلاد من خلال فروعها المنتشرة والتي تصل لكل المحافظات، والتي سهلت الوصول لكل من له علاقة بالمساحة من أفراد ومؤسسات أهلية وحكومية كالوزارات والبلديات والجامعات ومكاتب المساحة المرخصة والمساحين.", "ceo.paragraph1"),
    ("تزايدت الطاقة الإنتاجية وصارت اكسيس دعامة قوية وأساسية في النهضة التكنولوجية والتقنية التي تشهدها البلاد في عالم المساحة وخاصة مع بدء أعمال ومشاريع التسوية الوطنية. لقد أعطت اكسيس دفعة قوية لعمليات المساحة والتسوية، وصارت مورّداً يعتمد عليه في تغذية التكنولوجيا الحديثة في عالم المساحة وتقنياتها وخصوصاً في تقنية GPS.", "ceo.paragraph2"),
    ("حرصت إدارة شركة أكسيس على التجاوب السريع والفعال مع جهود الحكومة في التنمية والتطور في مجال المساحة، بإعتبار أن مشروع التسوية هو مشروع وطني بامتياز يهدف إلى حفظ الأرض والتي هي حجر الأساس في مشروع الدولة المنتظر. وعليه استطاعت أكسيس أن توفر ما يزيد عن 85% من احتياجات البلديات والمساحين العاملين في مشروع التسوية بأفضل التقنيات وبأسرع وقت وبتواصل ودعم فني مستمر بشكل يومي ومباشر.", "ceo.paragraph3"),
    ("سوف تواصل شركة AXIS بالاستثمار للحفاظ على التميز في مجال المساحة وسوف تعمل على ترقية هذه المهنة في البلاد.", "ceo.highlight"),
    ("المهندس سلامة عواودة", "ceo.signatureName"),
    ("المدير العام — شركة أكسيس للحلول الهندسية المتقدمة", "ceo.signatureRole"),
    # SocialFeed
    ("تابعونا على منصات التواصل الاجتماعي للحصول على آخر الأخبار والعروض والفيديوهات التعليمية", "socialFeed.subheading"),
    ("5 نقرات فقط… 90 ثانية من المعالجة… و19 كم من خطوط الكهرباء", "socialFeed.item1Title"),
    ("تعاون جمعية إعادة الإطار المعماري × اكسيس × جامعة القدس", "socialFeed.item2Title"),
    ("Trimble MX60 — مسح متنقل متقدم مع تصوير عالي الدقة", "socialFeed.item3Title"),
    ("EINSTAR 2 — ماسح ضوئي لاسلكي دقيق ومحمول", "socialFeed.item4Title"),
    ("اكسيس للحلول الهندسية — الوكيل الحصري لـ Trimble و NavVis", "socialFeed.item5Title"),
    # Footer
    ("شريكك الموثوق لتقنيات المساحة والجيوماتكس - الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta", "footer.desc"),
    ("الفرع الرئيسي: المنطقة الصناعية تسيفوريت", "footer.mainBranch"),
    ("فرع الشمال: كفر قاسم شارع علي بن أبي طالب", "footer.northBranch"),
    ("فرع رام الله: شارع الإرسال قرب السفينة", "footer.ramallahBranch"),
    ("فرع الخليل: شارع عين سارة مقابل ستاد الحسين", "footer.hebronBranch"),
    ("التوتل ستيشن", "footer.serviceTotalStation"),
    ("المسح الضوئي 3D", "footer.service3dScanning"),
    ("أنظمة GIS و VRS", "footer.serviceGisVrs"),
    ("ليزر وبناء", "footer.serviceLaser"),
    ("أجهزة GPS و GNSS", "footer.serviceGps"),
    # Theme
    ("🌙 تلقائي - ليلي (اضغط للتغيير)", "theme.autoDark"),
    ("☀️ تلقائي - نهاري (اضغط للتغيير)", "theme.autoLight"),
    ("🌙 وضع ليلي (اضغط للتغيير)", "theme.dark"),
    ("☀️ وضع نهاري (اضغط للتغيير)", "theme.light"),
    ("🔄 العودة للتلقائي", "theme.returnAuto"),
    ("تبديل إلى الوضع النهاري", "theme.ariaDark"),
    ("تبديل إلى الوضع الليلي", "theme.ariaLight"),
]

for ar_text, key in js_replacements:
    content = content.replace(f"'{ar_text}'", f"t('{key}')")

# Special section label replacements (uppercase labels)
content = content.replace(
    """<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">تواصل معنا</span>""",
    """<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t('contact.label')}</span>"""
)
content = content.replace(
    """<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">من نحن</span>""",
    """<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t('docs.label')}</span>"""
)
content = content.replace(
    """<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">فروعنا</span>""",
    """<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t('branches.label')}</span>"""
)

# WhyUs logo text
content = content.replace(
    """<span className="text-2xl font-bold gradient-text">اكسيس</span>
                <span className="text-sm text-[var(--t-5)]">حلول هندسية متقدمة</span>""",
    """<span className="text-2xl font-bold gradient-text">{t('whyUs.logoName')}</span>
                <span className="text-sm text-[var(--t-5)]">{t('whyUs.logoTagline')}</span>"""
)

# Footer logo
content = content.replace(
    """<span className="text-lg font-bold gradient-text">اكسيس</span>
              <span className="block text-[10px] text-[var(--t-5)] tracking-wider">للحلول الهندسية المتقدمة</span>""",
    """<span className="text-lg font-bold gradient-text">{t('footer.logoName')}</span>
              <span className="block text-[10px] text-[var(--t-5)] tracking-wider">{t('footer.logoTagline')}</span>"""
)

# Footer section titles
content = content.replace(
    """<h4 className="font-semibold text-[var(--t-1)] mb-4">خدماتنا</h4>""",
    """<h4 className="font-semibold text-[var(--t-1)] mb-4">{t('footer.servicesTitle')}</h4>"""
)
content = content.replace(
    """<h4 className="font-semibold text-[var(--t-1)] mb-4">تواصل معنا</h4>""",
    """<h4 className="font-semibold text-[var(--t-1)] mb-4">{t('footer.contactTitle')}</h4>"""
)

# WhatsApp floating title
content = content.replace(">تواصل معنا عبر واتساب<", ">{t('whatsapp.title')}<")

# RTL/LTR fixes
content = content.replace('text-right', 'text-start')
content = content.replace('text-left', 'text-start')
content = content.replace(
    'className="mr-2 px-5 py-2.5',
    'className="ms-2 px-5 py-2.5'
)
content = content.replace(
    'className="flex items-center gap-2 mr-3 border-r border-[var(--b-1)] pr-3"',
    'className="flex items-center gap-2 ms-3 border-s border-[var(--b-1)] ps-3"'
)

# ═══════════════════════════════════════════════════════
# PHASE 2: Insert TRANSLATIONS dictionary + context + hook
# NOW, after all replacements are done, so the dict won't be corrupted
# ═══════════════════════════════════════════════════════

# Read the full translations dictionary from a separate file to keep script manageable
# We'll inline it here

i18n_infra = '''/* ───────── i18n: translations & language context ───────── */
type Lang = 'ar' | 'en'

const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  ar: {
    'nav.home': 'الرئيسية', 'nav.branches': 'فروعنا', 'nav.about': 'من نحن',
    'nav.services': 'خدماتنا', 'nav.team': 'فريقنا', 'nav.documents': 'تعرف اكثر علينا',
    'nav.gallery': 'المعرض', 'nav.contact': 'تواصل معنا', 'nav.getQuote': 'احصل على عرض',
    'nav.logoAlt': 'اكسيس', 'nav.logoName': 'اكسيس', 'nav.logoTagline': 'للحلول الهندسية المتقدمة',
    'nav.menuAria': 'القائمة',
    'hero.logoAlt': 'شعار اكسيس', 'hero.brandName': 'اكسيس', 'hero.tagline': 'للحلول الهندسية المتقدمة',
    'hero.subtitle': 'الشركة الرائدة في البلاد في مجال تقنيات المساحة والجيوماتكس. الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta. نقدم أحدث تقنيات GPS و RTK والمسح الضوئي وأنظمة مراقبة التحرك.',
    'hero.ctaReview': 'شاركنا تجربتك — رأيك يهمنا',
    'about.label': 'من نحن', 'about.heading': 'قيادة تقنيات المساحة', 'about.headingHighlight': 'في البلاد',
    'about.paragraph1': 'شركة اكسيس للحلول الهندسية المتقدمة (AXIS GPS & Surveying Instruments LTD) هي الشركة الرائدة والأكبر في البلاد في مجال تقنيات وحلول المساحة والجيوماتكس والمعلومات الجغرافية. نحن الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta العالمية، ونقدم أحدث التقنيات والحلول المتكاملة.',
    'about.paragraph2': 'منذ تأسيسها على يد المهندس سلامة عواودة، تعمل اكسيس في مجالات عديدة تشمل: المسح والجيوماتكس، أنظمة GIS، شبكة محطات VRS وخدمات تصحيح الموقع RTK، رسم الخرائط عالية الدقة HD Mapping، المسح المتنقل Mobile Mapping، المدن الذكية Smart City، الزراعة الدقيقة، أنظمة توجيه الآلات Machine Control، تقنيات البناء Construction Tech، حلول الرصد والمراقبة، والواقع المعزز. تمتلك الشركة أربعة فروع رئيسية في كفر كنا وكفر قاسم ورام الله والخليل، ومختبر ومعهد تدريب Axis Campus.',
    'about.feature1Title': 'رؤية واضحة', 'about.feature1Desc': 'الشركة الرائدة والأكبر في مجال تقنيات ووحلول المساحة والجيوماتكس والمعلومات الجغرافية في البلاد',
    'about.feature2Title': 'وكالات حصرية عالمية', 'about.feature2Desc': 'الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta العالمية',
    'about.feature3Title': 'تقنيات متقدمة', 'about.feature3Desc': 'نوظف أحدث تقنيات GPS و RTK والمسح الضوئي 3D والواقع المعزز ورسم الخرائط عالية الدقة HD Mapping',
    'services.label': 'خدماتنا', 'services.heading': 'أجهزة وخدمات المساحة والجيوماتكس',
    'services.subheading': 'نقدم أحدث أجهزة المساحة والقياس من أبرز الشركات العالمية مع خدمات التدريب والدعم الفني المتكامل',
    'services.gpsTitle': 'أجهزة GPS و GNSS', 'services.gpsDesc': 'مستقبلات GNSS وهوائيات ومكونات OEM عالية الدقة للمسح الميداني والقياسات الجيوديسية',
    'services.totalStationTitle': 'أجهزة التوتل ستيشن', 'services.totalStationDesc': 'أحدث أجهزة التوتل ستيشن وكالات القياس لقياسات المساحة الدقيقة في المشاريع الهندسية',
    'services.scanningTitle': 'المسح الضوئي 3D والواقع المعزز', 'services.scanningDesc': 'ماسحات ضوئية متنقلة وثابتة مع حلول الواقع المعزز للنمذجة المتقدمة وتحويل الواقع إلى CAD',
    'services.gisTitle': 'أنظمة GIS و VRS', 'services.gisDesc': 'حلول نظم المعلومات الجغرافية وشبكة محطات VRS لخدمات تصحيح الموقع RTK والخرائط الرقمية المتكاملة',
    'services.monitoringTitle': 'رصد ومراقبة وتوجيه آليات', 'services.monitoringDesc': 'أنظمة مراقبة تحرك ورصد هبوط مع SITECH لتوجيه الآليات الثقيلة Machine Control في مشاريع البناء',
    'services.laserTitle': 'مستويات ليزر وبناء', 'services.laserDesc': 'مستويات ليزر دوارة ومائلة وخطية وأنابيب وأجهزة قياس مسافة ليزرية لجميع أعمال البناء والطرق والصرف',
    'services.softwareTitle': 'برمجيات ومعالجة بيانات', 'services.softwareDesc': 'برمجيات Trimble Business Center و TBC لمعالجة بيانات المسح وتحويلها إلى نماذج ومخططات هندسية دقيقة',
    'services.campusTitle': 'Axis Campus للتدريب', 'services.campusDesc': 'معهد Axis Campus المتخصص في التدريب المهني وورش العمل ودورات اعتماد المحترفين مع مختبر ودعم فني',
    'stats.branches': 'فروع في البلاد', 'stats.clients': 'أكثر من عميل راضٍ', 'stats.years': 'سنة خبرة',
    'brands.label': 'شراكاتنا', 'brands.heading': 'علامات تجارية عالمية رائدة',
    'brands.subheading': 'وكيل حصري في البلاد لأبرز الشركات العالمية المتخصصة في أجهزة المساحة والجيوماتكس',
    'brands.trimbleDesc': 'رائد عالمي في تقنيات المسح والبنية التحتية', 'brands.navvisDesc': 'قائد تقنيات المسح المتنقل والنمذجة ثلاثية الأبعاد',
    'brands.spectraDesc': 'حلول مسح عالية الدقة للمساحين والمقاولين', 'brands.specialties': 'التخصصات',
    'brands.trimbleSpec1': 'أجهزة ليزر', 'brands.trimbleSpec2': 'برامج المسح',
    'brands.navvisSpec1': 'مسح متنقل', 'brands.navvisSpec2': 'ماسحات داخلية', 'brands.navvisSpec3': 'نمذجة 3D', 'brands.navvisSpec4': 'خرائط رقمية',
    'brands.spectraSpec1': 'توتل ستيشن', 'brands.spectraSpec2': 'مستويات ليزر', 'brands.spectraSpec3': 'جمع بيانات',
    'brands.exclusiveAgent': 'الوكيل الحصري في البلاد',
    'gallery.label': 'معرض الوسائط', 'gallery.heading': 'أحدث فيديوهاتنا',
    'gallery.subheading': 'تابع أحدث أعمالنا وتقنياتنا في المساحة والجيوماتكس عبر منصاتنا المختلفة',
    'gallery.tabAll': 'الكل', 'gallery.tabVideos': 'فيديوهات',
    'gallery.categoryLaser': 'مسح ليزري', 'gallery.categoryMobile': 'مسح متنقل',
    'gallery.category3dModeling': 'نمذجة ثلاثية الأبعاد', 'gallery.categoryDataCollection': 'جمع بيانات',
    'gallery.youtubeCta': 'زوروا قناتنا على يوتيوب — 105+ فيديو',
    'projects.label': 'مشاريعنا', 'projects.heading': 'إنجازاتنا وشراكاتنا',
    'projects.subheading': 'نفخر بشراكاتنا مع المؤسسات الأكاديمية والدولية ومساهمتنا في تطوير قطاع المساحة والجيوماتكس في البلاد',
    'projects.proj1Title': 'مختبر GIS والمساحة - جامعة الخليل', 'projects.proj1Category': 'التعليم الأكاديمي',
    'projects.proj1Desc': 'إنشاء مختبر نظم المعلومات الجغرافية والمساحة في كلية المهن والعلوم التطبيقية بجامعة الخليل بالتعاون مع AXIS-GPS',
    'projects.proj1Tag1': 'أجهزة مساحة', 'projects.proj1Tag2': 'جامعة الخليل',
    'projects.proj2Title': 'دعم جامعة البوليتكنك', 'projects.proj2Category': 'المسؤولية المجتمعية',
    'projects.proj2Desc': 'تبرع بأجهزة مساحة حديثة ودعم صندوق الطالب الكريم لصالح جامعة البوليتكنك لتعزيز التخصصات الهندسية',
    'projects.proj2Tag1': 'تبرع', 'projects.proj2Tag2': 'أجهزة مساحة', 'projects.proj2Tag3': 'البوليتكنك',
    'projects.proj3Title': 'الشراكة مع UNDP', 'projects.proj3Category': 'مشاريع دولية',
    'projects.proj3Desc': 'التعاون مع برنامج الأمم المتحدة الإنمائي في مشاريع المسح والخرائط ونظم المعلومات الجغرافية في البلاد',
    'projects.proj3Tag1': 'خرائط رقمية',
    'projects.proj4Title': 'افتتاح فرع الخليل', 'projects.proj4Category': 'توسع الشركة',
    'projects.proj4Desc': 'افتتاح الفرع الرابع لشركة اكسيس في الخليل تحت رعاية أحمد سعيد بيوض التميمي لتوسيع نطاق الخدمات في المنطقة',
    'projects.proj4Tag1': 'فرع جديد', 'projects.proj4Tag2': 'الخليل', 'projects.proj4Tag3': 'توسع',
    'review.shareYourOpinion': 'شاركنا رأيك', 'review.ctaDesc': 'تجربتك معنا تهمّنا! شاركنا تقييمك وسيظهر رأيك هنا ليستفيد منه الآخرون',
    'review.addNow': 'أضف مشاركتك الآن', 'review.submittedTitle': 'تم إرسال مشاركتك بنجاح!',
    'review.submittedDesc': 'شكراً لك! مشاركتك ظهرت الآن في قسم شركاء النجاح ويمكن للجميع رؤيتها',
    'review.formTitle': 'أضف مشاركتك', 'review.formDesc': 'شاركنا تقييمك لتجربتك مع اكسيس',
    'review.ratingLabel': 'تقييمك', 'review.namePlaceholder': 'اسمك', 'review.companyPlaceholder': 'الشركة / المؤسسة (اختياري)',
    'review.textPlaceholder': 'اكتب مشاركتك وتقييمك هنا...', 'review.submit': 'أرسل مشاركتك', 'review.cancel': 'إلغاء',
    'review.errorSubmit': 'حدث خطأ أثناء إرسال المشاركة، حاول مرة أخرى',
    'review.errorConnection': 'تعذر الاتصال بالخادم، تأكد من اتصالك بالإنترنت وحاول مرة أخرى',
    'testimonials.label': 'مشاركة شركاء النجاح', 'testimonials.heading': 'رأيك يهمنا',
    'testimonials.subheading': 'نفتخر بثقة شركائنا وعملائنا ونسعى دائماً لتحقيق رضاهم وتجاوز توقعاتهم',
    'testimonials.seed1Name': 'م. عدنان يوسف شومان', 'testimonials.seed1Role': 'المدير التنفيذي لشركة اكسيس',
    'testimonials.seed1Text': 'منذ الإطلاقة كانت أكسيس رائدة في مجال التقنيات والحلول الهندسية المتقدمة، وسنستمر في تقديم أحدث التقنيات وأفضل الخدمات لعملائنا في كل مكان.',
    'testimonials.seed2Name': 'م. سجى مسالمة', 'testimonials.seed2Role': 'فريق اكسيس - فرع الخليل',
    'testimonials.seed2Text': 'فريق اكسيس يعمل بشغف لتوفير حلول مسح متكاملة وموثوقة تلبي احتياجات عملائنا بأعلى معايير الجودة والدقة.',
    'testimonials.seed3Name': 'م. أنس أبو حديد', 'testimonials.seed3Role': 'مدير فرع الخليل - شركة اكسيس',
    'testimonials.seed3Text': 'نلتزم في اكسيس بتقديم أحدث التقنيات وأفضل الخدمات لعملائنا، ونسعى دائماً لتجاوز توقعاتهم.',
    'testimonials.seed4Name': 'أحمد سعيد بيوض التميمي', 'testimonials.seed4Role': 'رئيس مجلس أمناء جامعة البوليتكنك',
    'testimonials.seed4Text': 'نشيد بدور شركة اكسيس في إرفاد قطاع المساحة والجيوماتكس بالتقنيات الحديثة ودعم المؤسسات الأكاديمية.',
    'whyUs.label': 'لماذا اكسيس', 'whyUs.heading': 'لماذا تختار اكسيس؟',
    'whyUs.paragraph': 'نتميز بأننا الشركة الرائدة والأكبر في البلاد في مجال أجهزة المساحة والجيوماتكس. وكالة حصرية لأكبر الشركات العالمية مع شبكة فروع واسعة وفريق متخصص يقدم أفضل الحلول والدعم لعملائنا.',
    'whyUs.reason1': 'الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta',
    'whyUs.reason2': 'أكثر من 20 سنة من الخبرة في قطاع أجهزة المساحة', 'whyUs.reason3': '4 فروع رئيسية في جميع أنحاء البلاد',
    'whyUs.reason4': 'شراكة مع برنامج الأمم المتحدة الإنمائي UNDP', 'whyUs.reason5': 'تعاون مع جامعات محلية (البوليتكنك، النجاح، الخليل)',
    'whyUs.reason6': 'دعم فني متواصل وخدمة ما بعد البيع', 'whyUs.logoAlt': 'اكسيس', 'whyUs.logoName': 'اكسيس', 'whyUs.logoTagline': 'حلول هندسية متقدمة',
    'team.label': 'فريق العمل', 'team.heading': 'الهيكل الإداري',
    'team.subheading': 'هيكل إداري متكامل يضم نخبة من المهندسين والمتخصصين تحت قيادة متميزة',
    'team.deptLabel': 'الأقسام الفنية', 'team.ctaText': 'فريق متخصص يضم نخبة من المهندسين ذوي الكفاءات العالية',
    'team.badgeFounder': 'المؤسس', 'team.badgeExecutive': 'المدير التنفيذي', 'team.badgeBranch': 'مدير فرع', 'team.badgeAccounting': 'محاسبة',
    'team.member1Name': 'المهندس سلامة العواودة', 'team.member1Role': 'المدير العام',
    'team.member2Name': 'المهندس عدنان شومان', 'team.member2Role': 'المدير التنفيذي - الضفة الغربية',
    'team.member3Name': 'السيدة ولاء البكري', 'team.member3Role': 'قسم المحاسبة',
    'team.member4Name': 'المهندس أنس أبو حديد', 'team.member4Role': 'مدير فرع الخليل',
    'team.member5Name': 'المهندسة ألاء أبو خلف', 'team.member5Role': 'قسم الرسم والمسح الضوئي',
    'team.member6Name': 'المهندسة سجى مسالمة', 'team.member6Role': 'قسم الرسم والدعم الفني',
    'team.member7Name': 'المهندس وعد وهدان', 'team.member7Role': 'قسم الدعم الفني',
    'team.member8Name': 'المهندس حاتم عيدة', 'team.member8Role': 'قسم الرسم',
    'contact.label': 'تواصل معنا', 'contact.heading': 'لنبدأ مشروعك القادم',
    'contact.subheading': 'تواصل معنا مباشرة عبر قنوات التواصل الاجتماعي أو أرسل لنا تفاصيل مشروعك',
    'contact.whatsappName': 'واتساب', 'contact.whatsappDesc': 'تواصل معنا فوراً عبر واتساب', 'contact.whatsappBadge': 'الأسرع',
    'contact.messengerName': 'ماسنجر', 'contact.messengerDesc': 'أرسل لنا رسالة عبر ماسنجر',
    'contact.instagramName': 'انستغرام', 'contact.instagramDesc': 'تابعنا وتواصل معنا على انستغرام',
    'contact.openApp': 'افتح', 'contact.phoneLabel': 'هاتف', 'contact.emailLabel': 'بريد إلكتروني',
    'contact.mapTitle': 'مواقع فروعنا على الخريطة', 'contact.formTitle': 'أو أرسل لنا تفاصيل مشروعك',
    'contact.nameLabel': 'الاسم الكامل', 'contact.namePlaceholder': 'أدخل اسمك', 'contact.emailLabel': 'البريد الإلكتروني',
    'contact.phoneFormLabel': 'رقم الهاتف', 'contact.serviceLabel': 'نوع الخدمة', 'contact.servicePlaceholder': 'اختر الخدمة المطلوبة',
    'contact.serviceGps': 'أجهزة GPS و RTK', 'contact.serviceTotalStation': 'أجهزة التوتل ستيشن',
    'contact.service3dScanning': 'المسح الضوئي ثلاثي الأبعاد', 'contact.serviceGis': 'أنظمة GIS والخرائط',
    'contact.serviceMonitoring': 'أنظمة مراقبة التحرك', 'contact.serviceTraining': 'التدريب والدعم الفني',
    'contact.projectDetailsLabel': 'تفاصيل المشروع', 'contact.projectDetailsPlaceholder': 'اكتب تفاصيل مشروعك هنا...',
    'contact.submitSuccess': 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'contact.sending': 'جاري الإرسال...',
    'contact.sendMessage': 'إرسال الرسالة', 'contact.errorSend': 'حدث خطأ في الإرسال', 'contact.errorUnexpected': 'حدث خطأ غير متوقع',
    'contact.whatsappMsg': 'مرحباً، أود الاستفسار عن خدمات اكسيس للحلول الهندسية',
    'docs.label': 'من نحن', 'docs.heading': 'تعرف اكثر علينا', 'docs.subheading': 'تصفح السيرة الذاتية للشركة ووثائق الدعم الفني',
    'docs.cvTitle': 'السيرة الذاتية', 'docs.cvDesc': 'السيرة الذاتية لشركة اكسيس للحلول الهندسية المتقدمة',
    'docs.cvCategory': 'السيرة الذاتية', 'docs.techSupportTitle': 'الدعم الفني', 'docs.techSupportDesc': 'وثائق الدعم الفني والخدمات المقدمة للعملاء',
    'docs.techSupportCategory': 'الدعم الفني', 'docs.view': 'مشاهدة', 'docs.viewOnly': 'مشاهدة فقط',
    'branches.label': 'فروعنا', 'branches.heading': 'نصل إليك أينما كنت',
    'branches.subheading': 'أربعة فروع رئيسية في جميع أنحاء البلاد، لخدمتكم بأسرع وقت وأعلى جودة',
    'branches.mainBranch': 'الفرع الرئيسي', 'branches.mainBranchAddress': 'المنطقة الصناعية تسيفوريت',
    'branches.northBranch': 'فرع الشمال', 'branches.northBranchAddress': 'كفر قاسم - شارع علي بن أبي طالب 2',
    'branches.ramallahBranch': 'فرع رام الله', 'branches.ramallahAddress': 'رام الله - شارع الإرسال قرب السفينة',
    'branches.hebronBranch': 'فرع الخليل', 'branches.hebronAddress': 'الخليل - برج العز ط5 شارع عين سارة',
    'branches.viewOnMap': 'عرض على الخريطة',
    'ceo.label': 'كلمة المدير العام', 'ceo.heading': 'رسالة المهندس سلامة عواودة',
    'ceo.paragraph1': 'خلال أكثر من عشرين عاماً من الزمان، نجحت شركة أكسيس في أن تصبح الشركة الأولى في البلاد من خلال فروعها المنتشرة والتي تصل لكل المحافظات، والتي سهلت الوصول لكل من له علاقة بالمساحة من أفراد ومؤسسات أهلية وحكومية كالوزارات والبلديات والجامعات ومكاتب المساحة المرخصة والمساحين.',
    'ceo.paragraph2': 'تزايدت الطاقة الإنتاجية وصارت اكسيس دعامة قوية وأساسية في النهضة التكنولوجية والتقنية التي تشهدها البلاد في عالم المساحة وخاصة مع بدء أعمال ومشاريع التسوية الوطنية. لقد أعطت اكسيس دفعة قوية لعمليات المساحة والتسوية، وصارت مورّداً يعتمد عليه في تغذية التكنولوجيا الحديثة في عالم المساحة وتقنياتها وخصوصاً في تقنية GPS.',
    'ceo.paragraph3': 'حرصت إدارة شركة أكسيس على التجاوب السريع والفعال مع جهود الحكومة في التنمية والتطور في مجال المساحة، بإعتبار أن مشروع التسوية هو مشروع وطني بامتياز يهدف إلى حفظ الأرض والتي هي حجر الأساس في مشروع الدولة المنتظر. وعليه استطاعت أكسيس أن توفر ما يزيد عن 85% من احتياجات البلديات والمساحين العاملين في مشروع التسوية بأفضل التقنيات وبأسرع وقت وبتواصل ودعم فني مستمر بشكل يومي ومباشر.',
    'ceo.highlight': 'سوف تواصل شركة AXIS بالاستثمار للحفاظ على التميز في مجال المساحة وسوف تعمل على ترقية هذه المهنة في البلاد.',
    'ceo.signatureName': 'المهندس سلامة عواودة', 'ceo.signatureRole': 'المدير العام — شركة أكسيس للحلول الهندسية المتقدمة',
    'socialFeed.label': 'تابعنا', 'socialFeed.heading': 'أحدث أخبارنا ومنشوراتنا',
    'socialFeed.subheading': 'تابعونا على منصات التواصل الاجتماعي للحصول على آخر الأخبار والعروض والفيديوهات التعليمية',
    'socialFeed.filterAll': 'الكل', 'socialFeed.viewPost': 'عرض المنشور',
    'socialFeed.item1Title': '5 نقرات فقط… 90 ثانية من المعالجة… و19 كم من خطوط الكهرباء',
    'socialFeed.item2Title': 'تعاون جمعية إعادة الإطار المعماري × اكسيس × جامعة القدس',
    'socialFeed.item3Title': 'Trimble MX60 — مسح متنقل متقدم مع تصوير عالي الدقة',
    'socialFeed.item4Title': 'EINSTAR 2 — ماسح ضوئي لاسلكي دقيق ومحمول',
    'socialFeed.item5Title': 'اكسيس للحلول الهندسية — الوكيل الحصري لـ Trimble و NavVis',
    'footer.logoAlt': 'اكسيس', 'footer.logoName': 'اكسيس', 'footer.logoTagline': 'للحلول الهندسية المتقدمة',
    'footer.desc': 'شريكك الموثوق لتقنيات المساحة والجيوماتكس - الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta',
    'footer.quickLinks': 'روابط سريعة', 'footer.linkHome': 'الرئيسية', 'footer.linkAbout': 'من نحن',
    'footer.linkServices': 'خدماتنا', 'footer.linkGallery': 'المعرض', 'footer.linkContact': 'تواصل معنا',
    'footer.servicesTitle': 'خدماتنا', 'footer.serviceGps': 'أجهزة GPS و GNSS', 'footer.serviceTotalStation': 'التوتل ستيشن',
    'footer.service3dScanning': 'المسح الضوئي 3D', 'footer.serviceGisVrs': 'أنظمة GIS و VRS', 'footer.serviceLaser': 'ليزر وبناء',
    'footer.contactTitle': 'تواصل معنا',
    'footer.mainBranch': 'الفرع الرئيسي: المنطقة الصناعية تسيفوريت',
    'footer.northBranch': 'فرع الشمال: كفر قاسم شارع علي بن أبي طالب',
    'footer.ramallahBranch': 'فرع رام الله: شارع الإرسال قرب السفينة',
    'footer.hebronBranch': 'فرع الخليل: شارع عين سارة مقابل ستاد الحسين', 'footer.copyright': 'جميع الحقوق محفوظة',
    'theme.autoDark': '🌙 تلقائي - ليلي', 'theme.autoLight': '☀️ تلقائي - نهاري',
    'theme.dark': '🌙 وضع ليلي', 'theme.light': '☀️ وضع نهاري', 'theme.returnAuto': '🔄 تلقائي',
    'theme.ariaDark': 'تبديل إلى الوضع النهاري', 'theme.ariaLight': 'تبديل إلى الوضع الليلي',
    'whatsapp.title': 'تواصل معنا عبر واتساب',
    'customers.alt1': 'شركاء النجاح - زبائن أكسيس في الضفة الغربية والقدس',
    'customers.alt2': 'شركاء النجاح - مشاريع مسح في البلاد', 'customers.alt3': 'شركاء النجاح - فريق العمل الميداني',
    'customers.alt4': 'شركاء النجاح - حلول GPS للمؤسسات', 'customers.alt5': 'شركاء النجاح - تقنيات Trimble في البلاد',
    'customers.alt6': 'شركاء النجاح - أجهزة NavVis الميدانية', 'customers.alt7': 'شركاء النجاح - زبائن الشركة',
    'customers.altL1': 'من وثق بنا - مسح ميداني بأجهزة NavVis', 'customers.altL2': 'من وثق بنا - فريق المسح في الميدان',
    'customers.altL3': 'من وثق بنا - مسح ثلاثي الأبعاد', 'customers.altL4': 'من وثق بنا - تقنية NavVis المتقدمة',
    'customers.altL5': 'من وثق بنا - مسح ميداني بأجهزة Trimble', 'customers.altL6': 'من وثق بنا - مسح ضوئي ثلاثي الأبعاد',
    'customers.altL7': 'من وثق بنا - جهاز GNSS Trimble', 'customers.altL8': 'من وثق بنا - مسح صناعي متقدم',
    'customers.altL9': 'من وثق بنا - مسح موقع إنشائي', 'customers.altL10': 'من وثق بنا - جهاز GPS Rover',
    'customers.altL11': 'من وثق بنا - أنظمة التحكم بالآلات الثقيلة', 'customers.altL12': 'من وثق بنا - نماذج ثلاثية الأبعاد',
  },
  en: {
    'nav.home': 'Home', 'nav.branches': 'Our Branches', 'nav.about': 'About Us',
    'nav.services': 'Our Services', 'nav.team': 'Our Team', 'nav.documents': 'Learn More About Us',
    'nav.gallery': 'Gallery', 'nav.contact': 'Contact Us', 'nav.getQuote': 'Get a Quote',
    'nav.logoAlt': 'Axis', 'nav.logoName': 'Axis', 'nav.logoTagline': 'Advanced Engineering Solutions',
    'nav.menuAria': 'Menu',
    'hero.logoAlt': 'Axis Logo', 'hero.brandName': 'Axis', 'hero.tagline': 'Advanced Engineering Solutions',
    'hero.subtitle': 'The leading company in the country in surveying and geomatics technologies. Exclusive agent for Trimble, NavVis, Spectra, Applanix, and Kaarta. We offer the latest GPS, RTK, laser scanning, and movement monitoring technologies.',
    'hero.ctaReview': 'Share Your Experience — Your Opinion Matters',
    'about.label': 'About Us', 'about.heading': 'Leading Surveying Technologies', 'about.headingHighlight': 'in the Country',
    'about.paragraph1': 'Axis Advanced Engineering Solutions (AXIS GPS & Surveying Instruments LTD) is the leading and largest company in the country in the field of surveying, geomatics, and geographic information technologies. We are the exclusive agent for Trimble, NavVis, Spectra, Applanix, and Kaarta, and provide the latest integrated technologies and solutions.',
    'about.paragraph2': 'Since its founding by Engineer Salameh Awawdeh, Axis has operated in numerous fields including: Surveying & Geomatics, GIS Systems, VRS Station Network and RTK Position Correction Services, HD Mapping, Mobile Mapping, Smart City, Precision Agriculture, Machine Control Systems, Construction Tech, Monitoring & Surveillance Solutions, and Augmented Reality. The company has four main branches in Kafr Kanna, Kafr Qasim, Ramallah, and Hebron, and the Axis Campus training lab and institute.',
    'about.feature1Title': 'Clear Vision', 'about.feature1Desc': 'The leading and largest company in surveying, geomatics, and geographic information technologies in the country',
    'about.feature2Title': 'Global Exclusive Agencies', 'about.feature2Desc': 'Exclusive agent for Trimble, NavVis, Spectra, Applanix, and Kaarta',
    'about.feature3Title': 'Advanced Technologies', 'about.feature3Desc': 'We employ the latest GPS, RTK, 3D laser scanning, augmented reality, and HD Mapping technologies',
    'services.label': 'Our Services', 'services.heading': 'Surveying & Geomatics Devices and Services',
    'services.subheading': 'We offer the latest surveying and measurement devices from leading global companies with integrated training and technical support services',
    'services.gpsTitle': 'GPS & GNSS Devices', 'services.gpsDesc': 'High-precision GNSS receivers, antennas, and OEM components for field surveying and geodetic measurements',
    'services.totalStationTitle': 'Total Station Devices', 'services.totalStationDesc': 'Latest total stations and measurement agencies for precise surveying measurements in engineering projects',
    'services.scanningTitle': '3D Laser Scanning & Augmented Reality', 'services.scanningDesc': 'Mobile and stationary laser scanners with augmented reality solutions for advanced modeling and reality-to-CAD conversion',
    'services.gisTitle': 'GIS & VRS Systems', 'services.gisDesc': 'Geographic information system solutions and VRS station network for RTK position correction services and integrated digital maps',
    'services.monitoringTitle': 'Monitoring, Surveillance & Machine Guidance', 'services.monitoringDesc': 'Movement monitoring and subsidence detection systems with SITECH for heavy machinery Machine Control in construction projects',
    'services.laserTitle': 'Laser Levels & Construction', 'services.laserDesc': 'Rotary, sloping, line, and pipe laser levels and laser distance measuring devices for all construction, road, and drainage works',
    'services.softwareTitle': 'Software & Data Processing', 'services.softwareDesc': 'Trimble Business Center and TBC software for processing survey data and converting it into precise engineering models and plans',
    'services.campusTitle': 'Axis Campus for Training', 'services.campusDesc': 'Axis Campus institute specializing in professional training, workshops, and professional certification courses with lab and technical support',
    'stats.branches': 'Branches in the Country', 'stats.clients': 'More Than Satisfied Clients', 'stats.years': 'Years of Experience',
    'brands.label': 'Our Partnerships', 'brands.heading': 'Leading Global Brands',
    'brands.subheading': 'Exclusive agent in the country for the most prominent global companies specializing in surveying and geomatics devices',
    'brands.trimbleDesc': 'Global leader in surveying and infrastructure technologies', 'brands.navvisDesc': 'Leader in mobile scanning and 3D modeling technologies',
    'brands.spectraDesc': 'High-precision surveying solutions for surveyors and contractors', 'brands.specialties': 'Specialties',
    'brands.trimbleSpec1': 'Laser Devices', 'brands.trimbleSpec2': 'Surveying Software',
    'brands.navvisSpec1': 'Mobile Scanning', 'brands.navvisSpec2': 'Indoor Scanners', 'brands.navvisSpec3': '3D Modeling', 'brands.navvisSpec4': 'Digital Maps',
    'brands.spectraSpec1': 'Total Station', 'brands.spectraSpec2': 'Laser Levels', 'brands.spectraSpec3': 'Data Collection',
    'brands.exclusiveAgent': 'Exclusive Agent in the Country',
    'gallery.label': 'Media Gallery', 'gallery.heading': 'Our Latest Videos',
    'gallery.subheading': 'Follow our latest work and technologies in surveying and geomatics across our different platforms',
    'gallery.tabAll': 'All', 'gallery.tabVideos': 'Videos',
    'gallery.categoryLaser': 'Laser Scanning', 'gallery.categoryMobile': 'Mobile Scanning',
    'gallery.category3dModeling': '3D Modeling', 'gallery.categoryDataCollection': 'Data Collection',
    'gallery.youtubeCta': 'Visit Our YouTube Channel — 105+ Videos',
    'projects.label': 'Our Projects', 'projects.heading': 'Our Achievements & Partnerships',
    'projects.subheading': 'We are proud of our partnerships with academic and international institutions and our contribution to developing the surveying and geomatics sector in the country',
    'projects.proj1Title': 'GIS & Surveying Lab - Hebron University', 'projects.proj1Category': 'Academic Education',
    'projects.proj1Desc': 'Establishing a GIS and Surveying Lab at the College of Applied Sciences and Professions at Hebron University in collaboration with AXIS-GPS',
    'projects.proj1Tag1': 'Surveying Devices', 'projects.proj1Tag2': 'Hebron University',
    'projects.proj2Title': 'Supporting Palestine Polytechnic University', 'projects.proj2Category': 'Social Responsibility',
    'projects.proj2Desc': 'Donating modern surveying devices and supporting the Al-Kareem Student Fund for Palestine Polytechnic University to enhance engineering disciplines',
    'projects.proj2Tag1': 'Donation', 'projects.proj2Tag2': 'Surveying Devices', 'projects.proj2Tag3': 'Polytechnic',
    'projects.proj3Title': 'Partnership with UNDP', 'projects.proj3Category': 'International Projects',
    'projects.proj3Desc': 'Collaboration with the United Nations Development Programme on surveying, mapping, and GIS projects in the country',
    'projects.proj3Tag1': 'Digital Maps',
    'projects.proj4Title': 'Opening of Hebron Branch', 'projects.proj4Category': 'Company Expansion',
    'projects.proj4Desc': 'Opening the fourth branch of Axis in Hebron under the patronage of Ahmad Saeed Bayoud Al-Tamimi to expand service coverage in the region',
    'projects.proj4Tag1': 'New Branch', 'projects.proj4Tag2': 'Hebron', 'projects.proj4Tag3': 'Expansion',
    'review.shareYourOpinion': 'Share Your Opinion', 'review.ctaDesc': 'Your experience matters to us! Share your rating and your opinion will appear here for others to benefit',
    'review.addNow': 'Add Your Review Now', 'review.submittedTitle': 'Your Review Has Been Submitted Successfully!',
    'review.submittedDesc': 'Thank you! Your review now appears in the Success Partners section and everyone can see it',
    'review.formTitle': 'Add Your Review', 'review.formDesc': 'Share your rating of your experience with Axis',
    'review.ratingLabel': 'Your Rating', 'review.namePlaceholder': 'Your Name', 'review.companyPlaceholder': 'Company / Organization (Optional)',
    'review.textPlaceholder': 'Write your review and rating here...', 'review.submit': 'Submit Your Review', 'review.cancel': 'Cancel',
    'review.errorSubmit': 'An error occurred while submitting your review, please try again',
    'review.errorConnection': 'Unable to connect to the server, check your internet connection and try again',
    'testimonials.label': 'Success Partners\' Reviews', 'testimonials.heading': 'Your Opinion Matters',
    'testimonials.subheading': 'We are proud of the trust of our partners and clients and always strive to achieve their satisfaction and exceed their expectations',
    'testimonials.seed1Name': 'Eng. Adnan Yousef Shouman', 'testimonials.seed1Role': 'CEO of Axis',
    'testimonials.seed1Text': 'Since its launch, Axis has been a pioneer in advanced engineering technologies and solutions, and we will continue to provide the latest technologies and best services to our clients everywhere.',
    'testimonials.seed2Name': 'Eng. Saja Musallam', 'testimonials.seed2Role': 'Axis Team - Hebron Branch',
    'testimonials.seed2Text': 'The Axis team works passionately to provide integrated and reliable surveying solutions that meet our clients\' needs with the highest standards of quality and precision.',
    'testimonials.seed3Name': 'Eng. Anas Abu Hadid', 'testimonials.seed3Role': 'Hebron Branch Manager - Axis',
    'testimonials.seed3Text': 'At Axis, we are committed to providing the latest technologies and best services to our clients, and we always strive to exceed their expectations.',
    'testimonials.seed4Name': 'Ahmad Saeed Bayoud Al-Tamimi', 'testimonials.seed4Role': 'Chairman of the Board of Trustees of Palestine Polytechnic University',
    'testimonials.seed4Text': 'We commend Axis\'s role in supplying the surveying and geomatics sector with modern technologies and supporting academic institutions.',
    'whyUs.label': 'Why Axis', 'whyUs.heading': 'Why Choose Axis?',
    'whyUs.paragraph': 'We stand out as the leading and largest company in the country in surveying and geomatics devices. Exclusive agency for the largest global companies with a wide branch network and a specialized team providing the best solutions and support to our clients.',
    'whyUs.reason1': 'Exclusive agent for Trimble, NavVis, Spectra, Applanix, and Kaarta',
    'whyUs.reason2': 'Over 20 years of experience in the surveying devices sector', 'whyUs.reason3': '4 main branches across the country',
    'whyUs.reason4': 'Partnership with UNDP', 'whyUs.reason5': 'Collaboration with local universities (PPU, Najah, Hebron)',
    'whyUs.reason6': 'Continuous technical support and after-sales service', 'whyUs.logoAlt': 'Axis', 'whyUs.logoName': 'Axis', 'whyUs.logoTagline': 'Advanced Engineering Solutions',
    'team.label': 'Our Team', 'team.heading': 'Management Structure',
    'team.subheading': 'An integrated management structure comprising an elite of engineers and specialists under distinguished leadership',
    'team.deptLabel': 'Technical Departments', 'team.ctaText': 'A specialized team comprising elite engineers with high competencies',
    'team.badgeFounder': 'Founder', 'team.badgeExecutive': 'CEO', 'team.badgeBranch': 'Branch Manager', 'team.badgeAccounting': 'Accounting',
    'team.member1Name': 'Eng. Salameh Awawdeh', 'team.member1Role': 'General Manager',
    'team.member2Name': 'Eng. Adnan Shouman', 'team.member2Role': 'CEO - West Bank',
    'team.member3Name': 'Ms. Walaa Al-Bakri', 'team.member3Role': 'Accounting Department',
    'team.member4Name': 'Eng. Anas Abu Hadid', 'team.member4Role': 'Hebron Branch Manager',
    'team.member5Name': 'Eng. Alaa Abu Khalf', 'team.member5Role': 'Drafting & Laser Scanning Department',
    'team.member6Name': 'Eng. Saja Musallam', 'team.member6Role': 'Drafting & Technical Support Department',
    'team.member7Name': 'Eng. Wa\'ad Wahdan', 'team.member7Role': 'Technical Support Department',
    'team.member8Name': 'Eng. Hatem Eida', 'team.member8Role': 'Drafting Department',
    'contact.label': 'Contact Us', 'contact.heading': 'Let\'s Start Your Next Project',
    'contact.subheading': 'Contact us directly via social media or send us your project details',
    'contact.whatsappName': 'WhatsApp', 'contact.whatsappDesc': 'Contact us instantly via WhatsApp', 'contact.whatsappBadge': 'Fastest',
    'contact.messengerName': 'Messenger', 'contact.messengerDesc': 'Send us a message via Messenger',
    'contact.instagramName': 'Instagram', 'contact.instagramDesc': 'Follow and contact us on Instagram',
    'contact.openApp': 'Open', 'contact.phoneLabel': 'Phone', 'contact.emailLabel': 'Email',
    'contact.mapTitle': 'Our Branch Locations on the Map', 'contact.formTitle': 'Or Send Us Your Project Details',
    'contact.nameLabel': 'Full Name', 'contact.namePlaceholder': 'Enter your name', 'contact.emailLabel': 'Email Address',
    'contact.phoneFormLabel': 'Phone Number', 'contact.serviceLabel': 'Service Type', 'contact.servicePlaceholder': 'Select the required service',
    'contact.serviceGps': 'GPS & RTK Devices', 'contact.serviceTotalStation': 'Total Station Devices',
    'contact.service3dScanning': '3D Laser Scanning', 'contact.serviceGis': 'GIS & Mapping Systems',
    'contact.serviceMonitoring': 'Movement Monitoring Systems', 'contact.serviceTraining': 'Training & Technical Support',
    'contact.projectDetailsLabel': 'Project Details', 'contact.projectDetailsPlaceholder': 'Write your project details here...',
    'contact.submitSuccess': 'Your message has been sent successfully! We will contact you soon', 'contact.sending': 'Sending...',
    'contact.sendMessage': 'Send Message', 'contact.errorSend': 'An error occurred while sending', 'contact.errorUnexpected': 'An unexpected error occurred',
    'contact.whatsappMsg': 'Hello, I would like to inquire about Axis engineering solutions services',
    'docs.label': 'About Us', 'docs.heading': 'Learn More About Us', 'docs.subheading': 'Browse the company\'s CV and technical support documents',
    'docs.cvTitle': 'Company CV', 'docs.cvDesc': 'Company CV for Axis Advanced Engineering Solutions',
    'docs.cvCategory': 'Company CV', 'docs.techSupportTitle': 'Technical Support', 'docs.techSupportDesc': 'Technical support documents and services provided to clients',
    'docs.techSupportCategory': 'Technical Support', 'docs.view': 'View', 'docs.viewOnly': 'View Only',
    'branches.label': 'Our Branches', 'branches.heading': 'We Reach You Wherever You Are',
    'branches.subheading': 'Four main branches across the country, serving you as quickly as possible with the highest quality',
    'branches.mainBranch': 'Main Branch', 'branches.mainBranchAddress': 'Tzippori Industrial Zone',
    'branches.northBranch': 'Northern Branch', 'branches.northBranchAddress': 'Kafr Qasim - Ali Bin Abi Talib St. 2',
    'branches.ramallahBranch': 'Ramallah Branch', 'branches.ramallahAddress': 'Ramallah - Al-Irsal St. near The Ship',
    'branches.hebronBranch': 'Hebron Branch', 'branches.hebronAddress': 'Hebron - Al-Izz Tower 5th Floor, Ein Sara St.',
    'branches.viewOnMap': 'View on Map',
    'ceo.label': 'General Manager\'s Message', 'ceo.heading': 'Message from Eng. Salameh Awawdeh',
    'ceo.paragraph1': 'Over more than twenty years, Axis has succeeded in becoming the premier company in the country through its widespread branches reaching all governorates, which facilitated access for everyone involved in surveying — individuals, civil and governmental institutions such as ministries, municipalities, universities, licensed surveying offices, and surveyors.',
    'ceo.paragraph2': 'Productive capacity has increased and Axis has become a strong and fundamental pillar in the technological and technical renaissance the country is witnessing in the surveying world, especially with the start of national settlement projects. Axis has given a strong boost to surveying and settlement operations, becoming a reliable supplier of modern technology in the surveying world and its technologies, particularly GPS technology.',
    'ceo.paragraph3': 'Axis management has been keen to respond quickly and effectively to government efforts in development and progress in the surveying field, considering the settlement project as a truly national project aimed at preserving the land, which is the cornerstone of the anticipated state project. Accordingly, Axis has been able to provide more than 85% of the needs of municipalities and surveyors working on the settlement project with the best technologies, in the fastest time, and with continuous daily and direct technical support.',
    'ceo.highlight': 'AXIS will continue to invest in maintaining excellence in the surveying field and will work to advance this profession in the country.',
    'ceo.signatureName': 'Eng. Salameh Awawdeh', 'ceo.signatureRole': 'General Manager — Axis Advanced Engineering Solutions',
    'socialFeed.label': 'Follow Us', 'socialFeed.heading': 'Our Latest News & Posts',
    'socialFeed.subheading': 'Follow us on social media for the latest news, offers, and educational videos',
    'socialFeed.filterAll': 'All', 'socialFeed.viewPost': 'View Post',
    'socialFeed.item1Title': 'Only 5 clicks… 90 seconds of processing… and 19 km of power lines',
    'socialFeed.item2Title': 'Collaboration of the Architectural Frame Restoration Association × Axis × Al-Quds University',
    'socialFeed.item3Title': 'Trimble MX60 — Advanced mobile scanning with high-resolution imaging',
    'socialFeed.item4Title': 'EINSTAR 2 — Accurate and portable wireless scanner',
    'socialFeed.item5Title': 'Axis Engineering Solutions — Exclusive Agent for Trimble and NavVis',
    'footer.logoAlt': 'Axis', 'footer.logoName': 'Axis', 'footer.logoTagline': 'Advanced Engineering Solutions',
    'footer.desc': 'Your trusted partner for surveying and geomatics technologies - Exclusive agent for Trimble, NavVis, Spectra, Applanix, and Kaarta',
    'footer.quickLinks': 'Quick Links', 'footer.linkHome': 'Home', 'footer.linkAbout': 'About Us',
    'footer.linkServices': 'Our Services', 'footer.linkGallery': 'Gallery', 'footer.linkContact': 'Contact Us',
    'footer.servicesTitle': 'Our Services', 'footer.serviceGps': 'GPS & GNSS Devices', 'footer.serviceTotalStation': 'Total Station',
    'footer.service3dScanning': '3D Laser Scanning', 'footer.serviceGisVrs': 'GIS & VRS Systems', 'footer.serviceLaser': 'Laser & Construction',
    'footer.contactTitle': 'Contact Us',
    'footer.mainBranch': 'Main Branch: Tzippori Industrial Zone',
    'footer.northBranch': 'Northern Branch: Kafr Qasim, Ali Bin Abi Talib St.',
    'footer.ramallahBranch': 'Ramallah Branch: Al-Irsal St. near The Ship',
    'footer.hebronBranch': 'Hebron Branch: Ein Sara St. opposite Al-Hussein Stadium', 'footer.copyright': 'All Rights Reserved',
    'theme.autoDark': '🌙 Auto - Dark', 'theme.autoLight': '☀️ Auto - Light',
    'theme.dark': '🌙 Dark Mode', 'theme.light': '☀️ Light Mode', 'theme.returnAuto': '🔄 Auto',
    'theme.ariaDark': 'Switch to Light Mode', 'theme.ariaLight': 'Switch to Dark Mode',
    'whatsapp.title': 'Contact Us via WhatsApp',
    'customers.alt1': 'Success Partners - Axis Clients in the West Bank and Jerusalem',
    'customers.alt2': 'Success Partners - Survey Projects in the Country', 'customers.alt3': 'Success Partners - Field Work Team',
    'customers.alt4': 'Success Partners - GPS Solutions for Organizations', 'customers.alt5': 'Success Partners - Trimble Technologies in the Country',
    'customers.alt6': 'Success Partners - NavVis Field Devices', 'customers.alt7': 'Success Partners - Company Clients',
    'customers.altL1': 'Those Who Trusted Us - NavVis Field Survey', 'customers.altL2': 'Those Who Trusted Us - Survey Team in the Field',
    'customers.altL3': 'Those Who Trusted Us - 3D Scanning', 'customers.altL4': 'Those Who Trusted Us - Advanced NavVis Technology',
    'customers.altL5': 'Those Who Trusted Us - Trimble Field Survey', 'customers.altL6': 'Those Who Trusted Us - 3D Photogrammetric Scanning',
    'customers.altL7': 'Those Who Trusted Us - Trimble GNSS Device', 'customers.altL8': 'Those Who Trusted Us - Advanced Industrial Scanning',
    'customers.altL9': 'Those Who Trusted Us - Construction Site Survey', 'customers.altL10': 'Those Who Trusted Us - GPS Rover Device',
    'customers.altL11': 'Those Who Trusted Us - Heavy Machinery Control Systems', 'customers.altL12': 'Those Who Trusted Us - 3D Models',
  },
}

import { createContext as _createContext, useContext as _useContext } from 'react'

const LangContext = _createContext<{
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
  dir: 'rtl' | 'ltr'
}>({
  lang: 'ar',
  setLang: () => {},
  t: (key: string) => key,
  dir: 'rtl',
})

function useLang() {
  return _useContext(LangContext)
}

function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar')

  useEffect(() => {
    const saved = localStorage.getItem('axis-lang') as Lang | null
    if (saved === 'ar' || saved === 'en') {
      setLangState(saved)
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('axis-lang', l)
    document.documentElement.setAttribute('lang', l)
    document.documentElement.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr')
  }

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
  }, [lang])

  const t = (key: string): string => {
    return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.ar[key] ?? key
  }

  const dir = lang === 'ar' ? 'rtl' as const : 'ltr' as const

  return (
    <LangContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LangContext.Provider>
  )
}

'''

# Insert AFTER all component code replacements
content = content.replace(
    "/* ───────── theme hook (auto + manual) ───────── */",
    i18n_infra + "/* ───────── theme hook (auto + manual) ───────── */"
)

# Write the output
with open(OUTPUT, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ i18n transformation complete!")
