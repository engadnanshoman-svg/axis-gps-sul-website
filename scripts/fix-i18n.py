#!/usr/bin/env python3
"""
Fix i18n: Replace hardcoded Arabic text with t() translation calls
in /home/z/my-project/src/app/page.tsx
"""
import re

FILE = '/home/z/my-project/src/app/page.tsx'

with open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

original = content  # Keep a copy for debugging

# ============================================================
# 1. Services section heading (lines ~1375-1381)
# ============================================================
content = content.replace(
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">خدماتنا</span>',
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t(\'services.label\')}</span>'
)

content = content.replace(
    'أجهزة وخدمات <span className="gradient-text">المساحة والجيوماتكس</span>',
    '{t(\'services.headingPrefix\')} <span className="gradient-text">{t(\'services.headingHighlight\')}</span>'
)

content = content.replace(
    'نقدم أحدث أجهزة المساحة والقياس من أبرز الشركات العالمية مع خدمات التدريب والدعم الفني المتكامل',
    '{t(\'services.subheading\')}'
)

# ============================================================
# 2. Stats labels (data array with hardcoded Arabic)
# ============================================================
content = content.replace(
    "label: 'فروع في البلاد'",
    "label: t('stats.branches')"
)
content = content.replace(
    "label: 'أكثر من عميل راضٍ'",
    "label: t('stats.clients')"
)
content = content.replace(
    "label: 'سنة خبرة'",
    "label: t('stats.years')"
)

# ============================================================
# 3. Brands section - data array items
# ============================================================
content = content.replace(
    "desc: 'رائد عالمي في تقنيات المسح والبنية التحتية'",
    "desc: t('brands.trimbleDesc')"
)
content = content.replace(
    "desc: 'قائد تقنيات المسح المتنقل والنمذجة ثلاثية الأبعاد'",
    "desc: t('brands.navvisDesc')"
)
content = content.replace(
    "desc: 'حلول مسح عالية الدقة للمساحين والمقاولين'",
    "desc: t('brands.spectraDesc')"
)

# Brands specialties
content = content.replace(
    "'أجهزة ليزر'",
    "t('brands.trimbleSpec1')"
)
content = content.replace(
    "'برامج المسح'",
    "t('brands.trimbleSpec2')"
)
content = content.replace(
    "'مسح متنقل'",
    "t('brands.navvisSpec1')"
)
content = content.replace(
    "'ماسحات داخلية'",
    "t('brands.navvisSpec2')"
)
content = content.replace(
    "'نمذجة 3D'",
    "t('brands.navvisSpec3')"
)
content = content.replace(
    "'خرائط رقمية'",
    "t('brands.navvisSpec4')"
)
content = content.replace(
    "'توتل ستيشن'",
    "t('brands.spectraSpec1')"
)
content = content.replace(
    "'مستويات ليزر'",
    "t('brands.spectraSpec2')"
)
content = content.replace(
    "'جمع بيانات'",
    "t('brands.spectraSpec3')"
)

# Brands section heading & subheading
content = content.replace(
    'علامات تجارية <span className="gradient-text">عالمية رائدة</span>',
    '{t(\'brands.headingPrefix\')} <span className="gradient-text">{t(\'brands.headingHighlight\')}</span>'
)
content = content.replace(
    'وكيل حصري في البلاد لأبرز الشركات العالمية المتخصصة في أجهزة المساحة والجيوماتكس',
    '{t(\'brands.subheading\')}'
)
content = content.replace(
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">شراكاتنا</span>',
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t(\'brands.label\')}</span>'
)

# ============================================================
# 4. Gallery section - data array items & headings
# ============================================================
content = content.replace(
    "category: 'مسح ليزري'",
    "category: t('gallery.categoryLaser')"
)
content = content.replace(
    "category: 'مسح متنقل'",
    "category: t('gallery.categoryMobile')"
)
content = content.replace(
    "category: 'نمذجة ثلاثية الأبعاد'",
    "category: t('gallery.category3dModeling')"
)
content = content.replace(
    "category: 'جمع بيانات'",
    "category: t('gallery.categoryDataCollection')"
)

# Gallery tabs
content = content.replace(
    "label: 'الكل'",
    "label: t('gallery.tabAll')"
)
content = content.replace(
    "label: 'فيديوهات'",
    "label: t('gallery.tabVideos')"
)

# Gallery heading
content = content.replace(
    'أحدث <span className="gradient-text">فيديوهاتنا</span>',
    '{t(\'gallery.headingPrefix\')} <span className="gradient-text">{t(\'gallery.headingHighlight\')}</span>'
)
content = content.replace(
    'تابع أحدث أعمالنا وتقنياتنا في المساحة والجيوماتكس عبر منصاتنا المختلفة',
    '{t(\'gallery.subheading\')}'
)

# Gallery YouTube CTA
content = content.replace(
    'زوروا قناتنا على يوتيوب — 105+ فيديو',
    '{t(\'gallery.youtubeCta\')}'
)

# Gallery label
content = content.replace(
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">معرض الوسائط</span>',
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t(\'gallery.label\')}</span>'
)

# ============================================================
# 5. Projects section - data array items & headings
# ============================================================
content = content.replace(
    "category: 'التعليم الأكاديمي'",
    "category: t('projects.proj1Category')"
)
content = content.replace(
    "category: 'المسؤولية المجتمعية'",
    "category: t('projects.proj2Category')"
)
content = content.replace(
    "category: 'مشاريع دولية'",
    "category: t('projects.proj3Category')"
)
# Projects tags
content = content.replace(
    "'أجهزة مساحة'",
    "t('projects.proj1Tag1')"
)
content = content.replace(
    "'جامعة الخليل'",
    "t('projects.proj1Tag2')"
)
content = content.replace(
    "'تبرع'",
    "t('projects.proj2Tag1')"
)
content = content.replace(
    "'البوليتكنك'",
    "t('projects.proj2Tag3')"
)
content = content.replace(
    "'فرع جديد'",
    "t('projects.proj4Tag1')"
)
content = content.replace(
    "'توسع'",
    "t('projects.proj4Tag3')"
)

# Projects heading & subheading
content = content.replace(
    'إنجازاتنا <span className="gradient-text">وشراكاتنا</span>',
    '{t(\'projects.headingPrefix\')} <span className="gradient-text">{t(\'projects.headingHighlight\')}</span>'
)
content = content.replace(
    'نفخر بشراكاتنا مع المؤسسات الأكاديمية والدولية ومساهمتنا في تطوير قطاع المساحة والجيوماتكس في البلاد',
    '{t(\'projects.subheading\')}'
)

# Projects label
content = content.replace(
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">مشاريعنا</span>',
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t(\'projects.label\')}</span>'
)

# ============================================================
# 6. ReviewForm - hardcoded text
# ============================================================
# Add useLang to ReviewForm if not present
content = content.replace(
    'function ReviewForm({ onSubmitted }: { onSubmitted?: () => void }) {\n  const [hoverRating',
    'function ReviewForm({ onSubmitted }: { onSubmitted?: () => void }) {\n  const { t } = useLang()\n  const [hoverRating'
)

# CTA heading
content = content.replace(
    'شاركنا <span className="gradient-text">رأيك</span>',
    '{t(\'review.shareYourOpinionPrefix\')} <span className="gradient-text">{t(\'review.shareYourOpinionHighlight\')}</span>'
)

# CTA description
content = content.replace(
    'تجربتك معنا تهمّنا! شاركنا تقييمك وسيظهر رأيك هنا ليستفيد منه الآخرون',
    '{t(\'review.ctaDesc\')}'
)

# Add button text
content = content.replace(
    'أضف مشاركتك الآن',
    '{t(\'review.addNow\')}'
)

# Submitted message
content = content.replace(
    'شكراً لك! مشاركتك ظهرت الآن في قسم شركاء النجاح ويمكن للجميع رؤيتها',
    '{t(\'review.submittedDesc\')}'
)

# Form description
content = content.replace(
    'شاركنا تقييمك لتجربتك مع اكسيس',
    '{t(\'review.formDesc\')}'
)

# Placeholders
content = content.replace(
    'placeholder="اسمك"',
    'placeholder={t(\'review.namePlaceholder\')}'
)
content = content.replace(
    'placeholder="الشركة / المؤسسة (اختياري)"',
    'placeholder={t(\'review.companyPlaceholder\')}'
)
content = content.replace(
    'placeholder="اكتب مشاركتك وتقييمك هنا..."',
    'placeholder={t(\'review.textPlaceholder\')}'
)

# Submit & Cancel buttons
content = content.replace(
    'أرسل مشاركتك',
    '{t(\'review.submit\')}'
)
content = content.replace(
    'إلغاء',
    '{t(\'review.cancel\')}'
)

# ============================================================
# 7. Testimonials section heading & subheading
# ============================================================
content = content.replace(
    'رأيك <span className="gradient-text">يهمنا</span>',
    '{t(\'testimonials.headingPrefix\')} <span className="gradient-text">{t(\'testimonials.headingHighlight\')}</span>'
)
content = content.replace(
    'نفتخر بثقة شركائنا وعملائنا ونسعى دائماً لتحقيق رضاهم وتجاوز توقعاتهم',
    '{t(\'testimonials.subheading\')}'
)

# ============================================================
# 8. WhyUs section
# ============================================================
content = content.replace(
    "'4 فروع رئيسية تغطي جميع أنحاء البلاد'",
    "t('whyUs.reason3')"
)
content = content.replace(
    'لماذا تختار <span className="gradient-text">اكسيس؟</span>',
    '{t(\'whyUs.headingPrefix\')} <span className="gradient-text">{t(\'whyUs.headingHighlight\')}</span>'
)
content = content.replace(
    'نتميز بأننا الشركة الرائدة والأكبر في البلاد في مجال أجهزة المساحة والجيوماتكس. وكالة حصرية لأكبر الشركات العالمية مع شبكة فروع واسعة وفريق متخصص يقدم أفضل الحلول والدعم لعملائنا.',
    '{t(\'whyUs.paragraph\')}'
)

# WhyUs logo text
content = content.replace(
    'alt="اكسيس"\n            />',
    'alt={t(\'whyUs.logoAlt\')}\n            />'
)

# ============================================================
# 9. Team badges - change to use language-independent identifiers
# ============================================================
# Replace badge comparisons in TeamCard
# The badge field is used for both comparison and display
# We need to change the badge values to English identifiers and use t() for display
content = content.replace(
    "member.badge === 'تنفيذي' ? 'المدير التنفيذي' : member.badge === 'فرع' ? 'مدير فرع' : member.badge",
    "t('team.badge' + member.badge)"
)

# Change badge values in team data to English identifiers
content = content.replace(
    "badge: 'المؤسس'",
    "badge: 'Founder'"
)
content = content.replace(
    "badge: 'تنفيذي'",
    "badge: 'Executive'"
)
content = content.replace(
    "badge: 'محاسبة'",
    "badge: 'Accounting'"
)
content = content.replace(
    "badge: 'فرع'",
    "badge: 'Branch'"
)

# Team heading & subheading
content = content.replace(
    'الهيكل <span className="gradient-text">الإداري</span>',
    '{t(\'team.headingPrefix\')} <span className="gradient-text">{t(\'team.headingHighlight\')}</span>'
)
content = content.replace(
    'هيكل إداري متكامل يضم نخبة من المهندسين والمتخصصين تحت قيادة متميزة',
    '{t(\'team.subheading\')}'
)

# Team CTA text
content = content.replace(
    'فريق متخصص يضم نخبة من المهندسين ذوي الكفاءات العالية',
    '{t(\'team.ctaText\')}'
)

# Team label
content = content.replace(
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">فريق العمل</span>',
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t(\'team.label\')}</span>'
)

# ============================================================
# 10. Contact section
# ============================================================
# Channel names
content = content.replace(
    "name: 'واتساب'",
    "name: t('contact.whatsappName')"
)
content = content.replace(
    "badge: 'الأسرع'",
    "badge: t('contact.whatsappBadge')"
)
content = content.replace(
    "name: 'ماسنجر'",
    "name: t('contact.messengerName')"
)
content = content.replace(
    "name: 'انستغرام'",
    "name: t('contact.instagramName')"
)

# Contact labels
content = content.replace(
    "label: 'هاتف'",
    "label: t('contact.phoneLabel')"
)
content = content.replace(
    "label: 'بريد إلكتروني'",
    "label: t('contact.emailLabel')"
)

# Contact heading & subheading
content = content.replace(
    'لنبدأ <span className="gradient-text">مشروعك القادم</span>',
    '{t(\'contact.headingPrefix\')} <span className="gradient-text">{t(\'contact.headingHighlight\')}</span>'
)
content = content.replace(
    'تواصل معنا مباشرة عبر قنوات التواصل الاجتماعي أو أرسل لنا تفاصيل مشروعك',
    '{t(\'contact.subheading\')}'
)

# Contact form
content = content.replace(
    'مواقع فروعنا على الخريطة',
    '{t(\'contact.mapTitle\')}'
)
content = content.replace(
    'أو أرسل لنا تفاصيل مشروعك',
    '{t(\'contact.formTitle\')}'
)

# Form labels and placeholders
content = content.replace(
    'الاسم الكامل',
    '{t(\'contact.nameLabel\')}'
)
content = content.replace(
    'placeholder="أدخل اسمك"',
    'placeholder={t(\'contact.namePlaceholder\')}'
)
content = content.replace(
    'البريد الإلكتروني',
    '{t(\'contact.emailLabel\')}'
)
content = content.replace(
    'رقم الهاتف',
    '{t(\'contact.phoneFormLabel\')}'
)
content = content.replace(
    'نوع الخدمة',
    '{t(\'contact.serviceLabel\')}'
)
content = content.replace(
    'اختر الخدمة المطلوبة',
    '{t(\'contact.servicePlaceholder\')}'
)
content = content.replace(
    'أجهزة GPS و RTK',
    '{t(\'contact.serviceGps\')}'
)
content = content.replace(
    'أجهزة التوتل ستيشن',
    '{t(\'contact.serviceTotalStation\')}'
)
content = content.replace(
    'المسح الضوئي ثلاثي الأبعاد',
    '{t(\'contact.service3dScanning\')}'
)
content = content.replace(
    'أنظمة GIS والخرائط',
    '{t(\'contact.serviceGis\')}'
)
content = content.replace(
    'أنظمة مراقبة التحرك',
    '{t(\'contact.serviceMonitoring\')}'
)
content = content.replace(
    'التدريب والدعم الفني',
    '{t(\'contact.serviceTraining\')}'
)
content = content.replace(
    'تفاصيل المشروع',
    '{t(\'contact.projectDetailsLabel\')}'
)
content = content.replace(
    'placeholder="اكتب تفاصيل مشروعك هنا..."',
    'placeholder={t(\'contact.projectDetailsPlaceholder\')}'
)
content = content.replace(
    'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً',
    '{t(\'contact.submitSuccess\')}'
)
content = content.replace(
    'جاري الإرسال...',
    '{t(\'contact.sending\')}'
)
content = content.replace(
    'إرسال الرسالة',
    '{t(\'contact.sendMessage\')}'
)

# Open {ch.name}
content = content.replace(
    'افتح {ch.name}',
    '{t(\'contact.openApp\')} {ch.name}'
)

# Contact label
content = content.replace(
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">تواصل معنا</span>',
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t(\'contact.label\')}</span>'
)

# ============================================================
# 11. Documents section
# ============================================================
content = content.replace(
    'تعرف اكثر <span className="gradient-text">علينا</span>',
    '{t(\'docs.headingPrefix\')} <span className="gradient-text">{t(\'docs.headingHighlight\')}</span>'
)
content = content.replace(
    'تصفح السيرة الذاتية للشركة ووثائق الدعم الفني',
    '{t(\'docs.subheading\')}'
)
content = content.replace(
    '>مشاهدة</',
    '>{t(\'docs.view\')}</'
)
content = content.replace(
    'مشاهدة فقط',
    '{t(\'docs.viewOnly\')}'
)

# Docs label
content = content.replace(
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">تعرف اكثر علينا</span>',
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t(\'docs.label\')}</span>'
)

# ============================================================
# 12. Footer section
# ============================================================
content = content.replace(
    "['الرئيسية', 'من نحن', 'خدماتنا', 'المعرض', 'تواصل معنا']",
    "[t('footer.linkHome'), t('footer.linkAbout'), t('footer.linkServices'), t('footer.linkGallery'), t('footer.linkContact')]"
)

# Footer headings
content = content.replace(
    '>خدماتنا</h4>',
    '>{t(\'footer.servicesTitle\')}</h4>'
)
content = content.replace(
    '>تواصل معنا</h4>',
    '>{t(\'footer.contactTitle\')}</h4>'
)

# Footer branches
content = content.replace(
    'الفرع الرئيسي: المنطقة الصناعية تسيفوريت ↗',
    '{t(\'footer.mainBranch\')} ↗'
)
content = content.replace(
    'فرع الشمال: كفر قاسم شارع علي بن أبي طالب ↗',
    '{t(\'footer.northBranch\')} ↗'
)
content = content.replace(
    'فرع رام الله: شارع الإرسال قرب السفينة ↗',
    '{t(\'footer.ramallahBranch\')} ↗'
)
content = content.replace(
    'فرع الخليل: شارع عين سارة مقابل ستاد الحسين ↗',
    '{t(\'footer.hebronBranch\')} ↗'
)

# Footer copyright
content = content.replace(
    'جميع الحقوق محفوظة',
    '{t(\'footer.copyright\')}'
)

# Footer desc
content = content.replace(
    'شريكك الموثوق لتقنيات المساحة والجيوماتكس - الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta',
    '{t(\'footer.desc\')}'
)

# Footer logo
content = content.replace(
    'alt="اكسيس"\n              />',
    'alt={t(\'footer.logoAlt\')}\n              />'
)

# ============================================================
# 13. FloatingWhatsApp
# ============================================================
content = content.replace(
    'title="تواصل معنا عبر واتساب"',
    'title={t(\'whatsapp.title\')}'
)

# ============================================================
# 14. Branches section
# ============================================================
content = content.replace(
    "name: 'الفرع الرئيسي'",
    "name: t('branches.mainBranch')"
)
content = content.replace(
    "name: 'فرع الشمال'",
    "name: t('branches.northBranch')"
)
content = content.replace(
    "name: 'فرع رام الله'",
    "name: t('branches.ramallahBranch')"
)
content = content.replace(
    "name: 'فرع الخليل'",
    "name: t('branches.hebronBranch')"
)

# Branches heading & subheading
content = content.replace(
    'نصل <span className="gradient-text">إليك أينما كنت</span>',
    '{t(\'branches.headingPrefix\')} <span className="gradient-text">{t(\'branches.headingHighlight\')}</span>'
)
content = content.replace(
    'أربعة فروع رئيسية تغطي جميع أنحاء البلاد، لخدمتكم بأسرع وقت وأعلى جودة',
    '{t(\'branches.subheading\')}'
)

# Branches label
content = content.replace(
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">فروعنا</span>',
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t(\'branches.label\')}</span>'
)

# ============================================================
# 15. CEO Message section
# ============================================================
content = content.replace(
    'كلمة المدير العام',
    '{t(\'ceo.label\')}'
)
content = content.replace(
    'رسالة <span className="gradient-text">المهندس سلامة عواودة</span>',
    '{t(\'ceo.headingPrefix\')} <span className="gradient-text">{t(\'ceo.headingHighlight\')}</span>'
)

# CEO paragraphs - these are longer blocks, need to be careful
content = content.replace(
    'على مدار أكثر من عشرين عاماً، نجحت شركة اكسيس في أن تصبح الشركة الأولى في البلاد من خلال فروعها المنتشرة التي وصلت إلى جميع المحافظات، مما سهّل الوصول لكل من يعمل في مجال المساحة من أفراد ومؤسسات مدنية وحكومية كالوزارات والبلديات والجامعات ومكاتب المساحة المرخصة والمساحين.',
    '{t(\'ceo.paragraph1\')}'
)
content = content.replace(
    'تزداد القدرة الإنتاجية وتصبح اكسيس ركيزة قوية وأساسية في نهضة تقنية وتكنولوجية تشهدها البلاد في عالم المساحة، لا سيما مع بدء مشاريع التوطين الوطنية. فقد أعطت اكسيس دفعة قوية لعمليات المساحة والتوطين وأصبحت مزوّداً موثوقاً للتكنولوجيا الحديثة في عالم المساحة وتقنياتها، وتحديداً تقنية GPS.',
    '{t(\'ceo.paragraph2\')}'
)
content = content.replace(
    'حرصت إدارة اكسيس على الاستجابة السريعة والفعالة لجهود الحكومة في التطوير والتقدم في مجال المساحة، معتبرةً مشروع التوطين مشروعاً وطنياً بامتياز يهدف إلى الحفاظ على الأرض التي هي حجر الأساس في مشروع الدولة المنتظرة. وبناءً على ذلك، استطاعت اكسيس توفير أكثر من 85% من احتياجات البلديات والمساحين العاملين على مشروع التوطين بأفضل التقنيات وبأسرع وقت مع دعم فني متواصل ومباشر يومياً.',
    '{t(\'ceo.paragraph3\')}'
)
content = content.replace(
    'سوف تواصل شركة AXIS بالاستثمار للحفاظ على التميز في مجال المساحة وسوف تعمل على ترقية هذه المهنة في البلاد.',
    '{t(\'ceo.highlight\')}'
)
content = content.replace(
    'المهندس سلامة عواودة',
    '{t(\'ceo.signatureName\')}'
)
content = content.replace(
    'المدير العام — شركة أكسيس للحلول الهندسية المتقدمة',
    '{t(\'ceo.signatureRole\')}'
)

# ============================================================
# 16. SocialFeed section
# ============================================================
content = content.replace(
    'أحدث <span className="gradient-text">أخبارنا ومنشوراتنا</span>',
    '{t(\'socialFeed.headingPrefix\')} <span className="gradient-text">{t(\'socialFeed.headingHighlight\')}</span>'
)
content = content.replace(
    'تابعونا على منصات التواصل الاجتماعي للحصول على آخر الأخبار والعروض والفيديوهات التعليمية',
    '{t(\'socialFeed.subheading\')}'
)
content = content.replace(
    "'الكل'",
    "t('socialFeed.filterAll')"
)

# SocialFeed label
content = content.replace(
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">تابعونا</span>',
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t(\'socialFeed.label\')}</span>'
)

# ============================================================
# 17. Navbar alt text
# ============================================================
content = content.replace(
    'alt="اكسيس" className="w-full h-full object-contain"',
    'alt={t(\'nav.logoAlt\')} className="w-full h-full object-contain"'
)

# ============================================================
# Now add all the missing translation keys to both ar and en
# ============================================================

# Find the end of the ar translations section
# We need to add keys for split headings (prefix + highlight)
# The TRANSLATIONS object has 'ar' section ending around line 128 (before the 'en' section)

# Add missing ar keys - these are for split headings where we need prefix + highlight
new_ar_keys = """    'services.headingPrefix': 'أجهزة وخدمات', 'services.headingHighlight': 'المساحة والجيوماتكس',
    'brands.headingPrefix': 'علامات تجارية', 'brands.headingHighlight': 'عالمية رائدة',
    'gallery.headingPrefix': 'أحدث', 'gallery.headingHighlight': 'فيديوهاتنا',
    'projects.headingPrefix': 'إنجازاتنا', 'projects.headingHighlight': 'وشراكاتنا',
    'testimonials.headingPrefix': 'رأيك', 'testimonials.headingHighlight': 'يهمنا',
    'whyUs.headingPrefix': 'لماذا تختار', 'whyUs.headingHighlight': 'اكسيس؟',
    'team.headingPrefix': 'الهيكل', 'team.headingHighlight': 'الإداري',
    'contact.headingPrefix': 'لنبدأ', 'contact.headingHighlight': 'مشروعك القادم',
    'branches.headingPrefix': 'نصل', 'branches.headingHighlight': 'إليك أينما كنت',
    'ceo.headingPrefix': 'رسالة', 'ceo.headingHighlight': 'المهندس سلامة عواودة',
    'socialFeed.headingPrefix': 'أحدث', 'socialFeed.headingHighlight': 'أخبارنا ومنشوراتنا',
    'docs.headingPrefix': 'تعرف اكثر', 'docs.headingHighlight': 'علينا',
    'review.shareYourOpinionPrefix': 'شاركنا', 'review.shareYourOpinionHighlight': 'رأيك',
    'team.badgeFounder': 'المؤسس', 'team.badgeExecutive': 'المدير التنفيذي', 'team.badgeBranch': 'مدير فرع', 'team.badgeAccounting': 'محاسبة',
    'testimonials.testimonialAria': 'شهادة',"""

new_en_keys = """    'services.headingPrefix': 'Devices & Services', 'services.headingHighlight': 'Surveying & Geomatics',
    'brands.headingPrefix': 'Leading Global', 'brands.headingHighlight': 'Brands',
    'gallery.headingPrefix': 'Our Latest', 'gallery.headingHighlight': 'Videos',
    'projects.headingPrefix': 'Our Achievements', 'projects.headingHighlight': '& Partnerships',
    'testimonials.headingPrefix': 'Your Opinion', 'testimonials.headingHighlight': 'Matters',
    'whyUs.headingPrefix': 'Why Choose', 'whyUs.headingHighlight': 'Axis?',
    'team.headingPrefix': 'Management', 'team.headingHighlight': 'Structure',
    'contact.headingPrefix': \"Let's Start\", 'contact.headingHighlight': 'Your Next Project',
    'branches.headingPrefix': 'We Reach', 'branches.headingHighlight': 'You Wherever You Are',
    'ceo.headingPrefix': 'Message from', 'ceo.headingHighlight': 'Eng. Salameh Awawdeh',
    'socialFeed.headingPrefix': 'Our Latest', 'socialFeed.headingHighlight': 'News & Posts',
    'docs.headingPrefix': 'Learn More', 'docs.headingHighlight': 'About Us',
    'review.shareYourOpinionPrefix': 'Share Your', 'review.shareYourOpinionHighlight': 'Opinion',
    'team.badgeFounder': 'Founder', 'team.badgeExecutive': 'CEO', 'team.badgeBranch': 'Branch Manager', 'team.badgeAccounting': 'Accounting',
    'testimonials.testimonialAria': 'Testimonial',"""

# Find the last key in the ar section and add the new keys after it
# The ar section has keys like 'customers.altL12' at the end
ar_marker = "'customers.altL12': 'Those Who Trusted Us - 3D Models',"
if ar_marker in content:
    # This marker is in the en section, not ar. Let me find the ar section end.
    pass

# Actually, the ar section ends around line 128. Let me find a unique marker.
# The ar section ends with: 'about.feature3Desc': 'نوظف أحدث تقنيات...'
# No wait, it continues much further. Let me find the boundary between ar and en.

# The en section starts with:  en: {
# Let me find a marker right before the en section starts
en_section_start = "  en: {"
if en_section_start in content:
    # Find the line before en section
    idx = content.index(en_section_start)
    # Go back to find the end of ar section (the closing })
    # The ar section should end with 'customers.altL12': ...
    # Let me find the last ar key before en section

    # Insert new ar keys before the closing of ar section
    # Find the last ar translation key
    ar_end_marker = "'customers.altL12': 'Those Who Trusted Us - 3D Models',"
    # Actually this is in the en section. Let me find the right marker.

    # The structure is:
    # const TRANSLATIONS = {
    #   ar: { ... keys ... },
    #   en: { ... keys ... },
    # }

    # I need to add the new keys at the end of the ar section, before the closing },
    # and at the end of the en section, before the closing },

    # Let me find the end of the ar section by looking for the pattern: },\n  en: {
    ar_section_end = content[:idx].rstrip()
    # The last character before "  en: {" should be a closing brace and comma
    # Let me insert the new ar keys before the closing of the ar section

    # Find the last key-value pair in the ar section
    # Looking for the pattern: 'key': 'value',\n  },\n  en: {
    # Replace the closing of ar section with: new_keys + closing

    ar_close_pattern = "  },\n  en: {"
    if ar_close_pattern in content:
        content = content.replace(
            ar_close_pattern,
            new_ar_keys + "\n  },\n  en: {"
        )

# Add new en keys before the closing of the en section
# The en section ends with: 'customers.altL12': 'Those Who Trusted Us - 3D Models',\n  },\n}
en_close_pattern = "'customers.altL12': 'Those Who Trusted Us - 3D Models',\n  },\n}"
if en_close_pattern in content:
    content = content.replace(
        en_close_pattern,
        "'customers.altL12': 'Those Who Trusted Us - 3D Models',\n" + new_en_keys + "\n  },\n}"
    )

# ============================================================
# Write the modified file
# ============================================================
with open(FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print("i18n fix script completed successfully!")
print(f"Original length: {len(original)} chars")
print(f"New length: {len(content)} chars")
