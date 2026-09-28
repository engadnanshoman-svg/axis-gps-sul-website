#!/usr/bin/env python3
"""
Fix i18n v2: Safely replace hardcoded Arabic text with t() calls
Only modifies the JSX portion of the file (after TRANSLATIONS object)
and adds new translation keys properly.
"""
import re

FILE = '/home/z/my-project/src/app/page.tsx'

with open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# ============================================================
# Step 1: Add new translation keys to both ar and en sections
# ============================================================

# New ar keys to add (for split headings and missing keys)
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
    'review.shareOpinionPrefix': 'شاركنا', 'review.shareOpinionHighlight': 'رأيك',
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
    'review.shareOpinionPrefix': 'Share Your', 'review.shareOpinionHighlight': 'Opinion',
    'team.badgeFounder': 'Founder', 'team.badgeExecutive': 'CEO', 'team.badgeBranch': 'Branch Manager', 'team.badgeAccounting': 'Accounting',
    'testimonials.testimonialAria': 'Testimonial',"""

# Find the ar section closing - look for pattern before "  en: {"
# The ar section ends with the last key-value pair followed by "  },\n  en: {"
ar_close = "  },\n  en: {"
if ar_close in content:
    content = content.replace(
        ar_close,
        new_ar_keys + "\n  },\n  en: {",
        1  # Only replace the first occurrence
    )

# Find the en section closing - look for the pattern at the end of en section
en_close = "  },\n}\n\nimport { createContext"
if en_close in content:
    content = content.replace(
        en_close,
        new_en_keys + "\n  },\n}\n\nimport { createContext",
        1
    )

# ============================================================
# Step 2: Find where TRANSLATIONS object ends and JSX code begins
# We'll only make replacements AFTER this point
# ============================================================
# The TRANSLATIONS object ends with: }\n\nimport { createContext
translations_end_marker = "}\n\nimport { createContext"
split_idx = content.index(translations_end_marker) + len(translations_end_marker)

translations_part = content[:split_idx]
jsx_part = content[split_idx:]

# ============================================================
# Step 3: Make replacements ONLY in the JSX part
# ============================================================

# --- Services section ---
jsx_part = jsx_part.replace(
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">خدماتنا</span>',
    "<span className=\"text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase\">{t('services.label')}</span>"
)
jsx_part = jsx_part.replace(
    'أجهزة وخدمات <span className="gradient-text">المساحة والجيوماتكس</span>',
    "{t('services.headingPrefix')} <span className=\"gradient-text\">{t('services.headingHighlight')}</span>"
)
jsx_part = jsx_part.replace(
    'نقدم أحدث أجهزة المساحة والقياس من أبرز الشركات العالمية مع خدمات التدريب والدعم الفني المتكامل',
    "{t('services.subheading')}"
)

# --- Stats labels ---
jsx_part = jsx_part.replace(
    "label: 'فروع في البلاد'",
    "label: t('stats.branches')"
)
jsx_part = jsx_part.replace(
    "label: 'أكثر من عميل راضٍ'",
    "label: t('stats.clients')"
)
jsx_part = jsx_part.replace(
    "label: 'سنة خبرة'",
    "label: t('stats.years')"
)

# --- Brands data ---
jsx_part = jsx_part.replace(
    "desc: 'رائد عالمي في تقنيات المسح والبنية التحتية'",
    "desc: t('brands.trimbleDesc')"
)
jsx_part = jsx_part.replace(
    "desc: 'قائد تقنيات المسح المتنقل والنمذجة ثلاثية الأبعاد'",
    "desc: t('brands.navvisDesc')"
)
jsx_part = jsx_part.replace(
    "desc: 'حلول مسح عالية الدقة للمساحين والمقاولين'",
    "desc: t('brands.spectraDesc')"
)

# Brands specialties - be careful to only match in JSX part
jsx_part = jsx_part.replace("'أجهزة ليزر'", "t('brands.trimbleSpec1')")
jsx_part = jsx_part.replace("'برامج المسح'", "t('brands.trimbleSpec2')")
jsx_part = jsx_part.replace("'مسح متنقل'", "t('brands.navvisSpec1')")
jsx_part = jsx_part.replace("'ماسحات داخلية'", "t('brands.navvisSpec2')")
jsx_part = jsx_part.replace("'نمذجة 3D'", "t('brands.navvisSpec3')")
jsx_part = jsx_part.replace("'خرائط رقمية'", "t('brands.navvisSpec4')")
jsx_part = jsx_part.replace("'توتل ستيشن'", "t('brands.spectraSpec1')")
jsx_part = jsx_part.replace("'مستويات ليزر'", "t('brands.spectraSpec2')")
jsx_part = jsx_part.replace("'جمع بيانات'", "t('brands.spectraSpec3')")

# Brands heading & subheading
jsx_part = jsx_part.replace(
    'علامات تجارية <span className="gradient-text">عالمية رائدة</span>',
    "{t('brands.headingPrefix')} <span className=\"gradient-text\">{t('brands.headingHighlight')}</span>"
)
jsx_part = jsx_part.replace(
    'وكيل حصري في البلاد لأبرز الشركات العالمية المتخصصة في أجهزة المساحة والجيوماتكس',
    "{t('brands.subheading')}"
)
jsx_part = jsx_part.replace(
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">شراكاتنا</span>',
    "<span className=\"text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase\">{t('brands.label')}</span>"
)

# --- Gallery ---
jsx_part = jsx_part.replace("category: 'مسح ليزري'", "category: t('gallery.categoryLaser')")
jsx_part = jsx_part.replace("category: 'مسح متنقل'", "category: t('gallery.categoryMobile')")
jsx_part = jsx_part.replace("category: 'نمذجة ثلاثية الأبعاد'", "category: t('gallery.category3dModeling')")
jsx_part = jsx_part.replace("category: 'جمع بيانات'", "category: t('gallery.categoryDataCollection')")
jsx_part = jsx_part.replace("label: 'الكل'", "label: t('gallery.tabAll')")
jsx_part = jsx_part.replace("label: 'فيديوهات'", "label: t('gallery.tabVideos')")

jsx_part = jsx_part.replace(
    'أحدث <span className="gradient-text">فيديوهاتنا</span>',
    "{t('gallery.headingPrefix')} <span className=\"gradient-text\">{t('gallery.headingHighlight')}</span>"
)
jsx_part = jsx_part.replace(
    'تابع أحدث أعمالنا وتقنياتنا في المساحة والجيوماتكس عبر منصاتنا المختلفة',
    "{t('gallery.subheading')}"
)
jsx_part = jsx_part.replace(
    'زوروا قناتنا على يوتيوب — 105+ فيديو',
    "{t('gallery.youtubeCta')}"
)
jsx_part = jsx_part.replace(
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">معرض الوسائط</span>',
    "<span className=\"text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase\">{t('gallery.label')}</span>"
)

# --- Projects ---
jsx_part = jsx_part.replace("category: 'التعليم الأكاديمي'", "category: t('projects.proj1Category')")
jsx_part = jsx_part.replace("category: 'المسؤولية المجتمعية'", "category: t('projects.proj2Category')")
jsx_part = jsx_part.replace("category: 'مشاريع دولية'", "category: t('projects.proj3Category')")
jsx_part = jsx_part.replace("'أجهزة مساحة'", "t('projects.proj1Tag1')")
jsx_part = jsx_part.replace("'جامعة الخليل'", "t('projects.proj1Tag2')")
jsx_part = jsx_part.replace("'تبرع'", "t('projects.proj2Tag1')")
jsx_part = jsx_part.replace("'البوليتكنك'", "t('projects.proj2Tag3')")
jsx_part = jsx_part.replace("'فرع جديد'", "t('projects.proj4Tag1')")
jsx_part = jsx_part.replace("'توسع'", "t('projects.proj4Tag3')")

jsx_part = jsx_part.replace(
    'إنجازاتنا <span className="gradient-text">وشراكاتنا</span>',
    "{t('projects.headingPrefix')} <span className=\"gradient-text\">{t('projects.headingHighlight')}</span>"
)
jsx_part = jsx_part.replace(
    'نفخر بشراكاتنا مع المؤسسات الأكاديمية والدولية ومساهمتنا في تطوير قطاع المساحة والجيوماتكس في البلاد',
    "{t('projects.subheading')}"
)
jsx_part = jsx_part.replace(
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">مشاريعنا</span>',
    "<span className=\"text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase\">{t('projects.label')}</span>"
)

# --- ReviewForm ---
# Add useLang to ReviewForm
jsx_part = jsx_part.replace(
    'function ReviewForm({ onSubmitted }: { onSubmitted?: () => void }) {\n  const [hoverRating',
    'function ReviewForm({ onSubmitted }: { onSubmitted?: () => void }) {\n  const { t } = useLang()\n  const [hoverRating'
)

jsx_part = jsx_part.replace(
    'شاركنا <span className="gradient-text">رأيك</span>',
    "{t('review.shareOpinionPrefix')} <span className=\"gradient-text\">{t('review.shareOpinionHighlight')}</span>"
)
jsx_part = jsx_part.replace(
    'تجربتك معنا تهمّنا! شاركنا تقييمك وسيظهر رأيك هنا ليستفيد منه الآخرون',
    "{t('review.ctaDesc')}"
)
jsx_part = jsx_part.replace('أضف مشاركتك الآن', "{t('review.addNow')}")
jsx_part = jsx_part.replace(
    'شكراً لك! مشاركتك ظهرت الآن في قسم شركاء النجاح ويمكن للجميع رؤيتها',
    "{t('review.submittedDesc')}"
)
jsx_part = jsx_part.replace(
    'شاركنا تقييمك لتجربتك مع اكسيس',
    "{t('review.formDesc')}"
)
jsx_part = jsx_part.replace('placeholder="اسمك"', "placeholder={t('review.namePlaceholder')}")
jsx_part = jsx_part.replace('placeholder="الشركة / المؤسسة (اختياري)"', "placeholder={t('review.companyPlaceholder')}")
jsx_part = jsx_part.replace('placeholder="اكتب مشاركتك وتقييمك هنا..."', "placeholder={t('review.textPlaceholder')}")
jsx_part = jsx_part.replace('أرسل مشاركتك', "{t('review.submit')}")
jsx_part = jsx_part.replace('إلغاء', "{t('review.cancel')}")

# --- Testimonials heading ---
jsx_part = jsx_part.replace(
    'رأيك <span className="gradient-text">يهمنا</span>',
    "{t('testimonials.headingPrefix')} <span className=\"gradient-text\">{t('testimonials.headingHighlight')}</span>"
)
jsx_part = jsx_part.replace(
    'نفتخر بثقة شركائنا وعملائنا ونسعى دائماً لتحقيق رضاهم وتجاوز توقعاتهم',
    "{t('testimonials.subheading')}"
)

# --- WhyUs ---
jsx_part = jsx_part.replace(
    "'4 فروع رئيسية تغطي جميع أنحاء البلاد'",
    "t('whyUs.reason3')"
)
jsx_part = jsx_part.replace(
    'لماذا تختار <span className="gradient-text">اكسيس؟</span>',
    "{t('whyUs.headingPrefix')} <span className=\"gradient-text\">{t('whyUs.headingHighlight')}</span>"
)
jsx_part = jsx_part.replace(
    'نتميز بأننا الشركة الرائدة والأكبر في البلاد في مجال أجهزة المساحة والجيوماتكس. وكالة حصرية لأكبر الشركات العالمية مع شبكة فروع واسعة وفريق متخصص يقدم أفضل الحلول والدعم لعملائنا.',
    "{t('whyUs.paragraph')}"
)

# --- Team badges ---
jsx_part = jsx_part.replace(
    "member.badge === 'تنفيذي' ? 'المدير التنفيذي' : member.badge === 'فرع' ? 'مدير فرع' : member.badge",
    "t('team.badge' + member.badge)"
)
jsx_part = jsx_part.replace("badge: 'المؤسس'", "badge: 'Founder'")
jsx_part = jsx_part.replace("badge: 'تنفيذي'", "badge: 'Executive'")
jsx_part = jsx_part.replace("badge: 'محاسبة'", "badge: 'Accounting'")
jsx_part = jsx_part.replace("badge: 'فرع'", "badge: 'Branch'")

jsx_part = jsx_part.replace(
    'الهيكل <span className="gradient-text">الإداري</span>',
    "{t('team.headingPrefix')} <span className=\"gradient-text\">{t('team.headingHighlight')}</span>"
)
jsx_part = jsx_part.replace(
    'هيكل إداري متكامل يضم نخبة من المهندسين والمتخصصين تحت قيادة متميزة',
    "{t('team.subheading')}"
)
jsx_part = jsx_part.replace(
    'فريق متخصص يضم نخبة من المهندسين ذوي الكفاءات العالية',
    "{t('team.ctaText')}"
)
jsx_part = jsx_part.replace(
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">فريق العمل</span>',
    "<span className=\"text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase\">{t('team.label')}</span>"
)

# --- Contact ---
jsx_part = jsx_part.replace("name: 'واتساب'", "name: t('contact.whatsappName')")
jsx_part = jsx_part.replace("badge: 'الأسرع'", "badge: t('contact.whatsappBadge')")
jsx_part = jsx_part.replace("name: 'ماسنجر'", "name: t('contact.messengerName')")
jsx_part = jsx_part.replace("name: 'انستغرام'", "name: t('contact.instagramName')")
jsx_part = jsx_part.replace("label: 'هاتف'", "label: t('contact.phoneLabel')")
jsx_part = jsx_part.replace("label: 'بريد إلكتروني'", "label: t('contact.emailLabel')")

jsx_part = jsx_part.replace(
    'لنبدأ <span className="gradient-text">مشروعك القادم</span>',
    "{t('contact.headingPrefix')} <span className=\"gradient-text\">{t('contact.headingHighlight')}</span>"
)
jsx_part = jsx_part.replace(
    'تواصل معنا مباشرة عبر قنوات التواصل الاجتماعي أو أرسل لنا تفاصيل مشروعك',
    "{t('contact.subheading')}"
)
jsx_part = jsx_part.replace('مواقع فروعنا على الخريطة', "{t('contact.mapTitle')}")
jsx_part = jsx_part.replace('أو أرسل لنا تفاصيل مشروعك', "{t('contact.formTitle')}")

jsx_part = jsx_part.replace('الاسم الكامل', "{t('contact.nameLabel')}")
jsx_part = jsx_part.replace('placeholder="أدخل اسمك"', "placeholder={t('contact.namePlaceholder')}")
jsx_part = jsx_part.replace('البريد الإلكتروني', "{t('contact.emailLabel')}")
jsx_part = jsx_part.replace('رقم الهاتف', "{t('contact.phoneFormLabel')}")
jsx_part = jsx_part.replace('نوع الخدمة', "{t('contact.serviceLabel')}")
jsx_part = jsx_part.replace('اختر الخدمة المطلوبة', "{t('contact.servicePlaceholder')}")
jsx_part = jsx_part.replace('أجهزة GPS و RTK', "{t('contact.serviceGps')}")
jsx_part = jsx_part.replace('أجهزة التوتل ستيشن', "{t('contact.serviceTotalStation')}")
jsx_part = jsx_part.replace('المسح الضوئي ثلاثي الأبعاد', "{t('contact.service3dScanning')}")
jsx_part = jsx_part.replace('أنظمة GIS والخرائط', "{t('contact.serviceGis')}")
jsx_part = jsx_part.replace('أنظمة مراقبة التحرك', "{t('contact.serviceMonitoring')}")
jsx_part = jsx_part.replace('التدريب والدعم الفني', "{t('contact.serviceTraining')}")
jsx_part = jsx_part.replace('تفاصيل المشروع', "{t('contact.projectDetailsLabel')}")
jsx_part = jsx_part.replace('placeholder="اكتب تفاصيل مشروعك هنا..."', "placeholder={t('contact.projectDetailsPlaceholder')}")
jsx_part = jsx_part.replace('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', "{t('contact.submitSuccess')}")
jsx_part = jsx_part.replace('جاري الإرسال...', "{t('contact.sending')}")
jsx_part = jsx_part.replace('إرسال الرسالة', "{t('contact.sendMessage')}")
jsx_part = jsx_part.replace('افتح {ch.name}', "{t('contact.openApp')} {ch.name}")

jsx_part = jsx_part.replace(
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">تواصل معنا</span>',
    "<span className=\"text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase\">{t('contact.label')}</span>"
)

# --- Documents ---
jsx_part = jsx_part.replace(
    'تعرف اكثر <span className="gradient-text">علينا</span>',
    "{t('docs.headingPrefix')} <span className=\"gradient-text\">{t('docs.headingHighlight')}</span>"
)
jsx_part = jsx_part.replace(
    'تصفح السيرة الذاتية للشركة ووثائق الدعم الفني',
    "{t('docs.subheading')}"
)
jsx_part = jsx_part.replace('>مشاهدة</', ">{t('docs.view')}</")
jsx_part = jsx_part.replace('مشاهدة فقط', "{t('docs.viewOnly')}")

# --- Footer ---
jsx_part = jsx_part.replace(
    "['الرئيسية', 'من نحن', 'خدماتنا', 'المعرض', 'تواصل معنا']",
    "[t('footer.linkHome'), t('footer.linkAbout'), t('footer.linkServices'), t('footer.linkGallery'), t('footer.linkContact')]"
)
jsx_part = jsx_part.replace('>خدماتنا</h4>', ">{t('footer.servicesTitle')}</h4>")
jsx_part = jsx_part.replace('>تواصل معنا</h4>', ">{t('footer.contactTitle')}</h4>")

jsx_part = jsx_part.replace(
    'الفرع الرئيسي: المنطقة الصناعية تسيفوريت ↗',
    "{t('footer.mainBranch')} ↗"
)
jsx_part = jsx_part.replace(
    'فرع الشمال: كفر قاسم شارع علي بن أبي طالب ↗',
    "{t('footer.northBranch')} ↗"
)
jsx_part = jsx_part.replace(
    'فرع رام الله: شارع الإرسال قرب السفينة ↗',
    "{t('footer.ramallahBranch')} ↗"
)
jsx_part = jsx_part.replace(
    'فرع الخليل: شارع عين سارة مقابل ستاد الحسين ↗',
    "{t('footer.hebronBranch')} ↗"
)
jsx_part = jsx_part.replace('جميع الحقوق محفوظة', "{t('footer.copyright')}")
jsx_part = jsx_part.replace(
    'شريكك الموثوق لتقنيات المساحة والجيوماتكس - الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta',
    "{t('footer.desc')}"
)

# --- WhatsApp ---
jsx_part = jsx_part.replace('title="تواصل معنا عبر واتساب"', "title={t('whatsapp.title')}")

# --- Branches ---
jsx_part = jsx_part.replace("name: 'الفرع الرئيسي'", "name: t('branches.mainBranch')")
jsx_part = jsx_part.replace("name: 'فرع الشمال'", "name: t('branches.northBranch')")
jsx_part = jsx_part.replace("name: 'فرع رام الله'", "name: t('branches.ramallahBranch')")
jsx_part = jsx_part.replace("name: 'فرع الخليل'", "name: t('branches.hebronBranch')")

jsx_part = jsx_part.replace(
    'نصل <span className="gradient-text">إليك أينما كنت</span>',
    "{t('branches.headingPrefix')} <span className=\"gradient-text\">{t('branches.headingHighlight')}</span>"
)
jsx_part = jsx_part.replace(
    'أربعة فروع رئيسية تغطي جميع أنحاء البلاد، لخدمتكم بأسرع وقت وأعلى جودة',
    "{t('branches.subheading')}"
)
jsx_part = jsx_part.replace(
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">فروعنا</span>',
    "<span className=\"text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase\">{t('branches.label')}</span>"
)

# --- CEO Message ---
jsx_part = jsx_part.replace('كلمة المدير العام', "{t('ceo.label')}")
jsx_part = jsx_part.replace(
    'رسالة <span className="gradient-text">المهندس سلامة عواودة</span>',
    "{t('ceo.headingPrefix')} <span className=\"gradient-text\">{t('ceo.headingHighlight')}</span>"
)

# CEO paragraphs - these are long unique strings
jsx_part = jsx_part.replace(
    'على مدار أكثر من عشرين عاماً، نجحت شركة اكسيس في أن تصبح الشركة الأولى في البلاد من خلال فروعها المنتشرة التي وصلت إلى جميع المحافظات، مما سهّل الوصول لكل من يعمل في مجال المساحة من أفراد ومؤسسات مدنية وحكومية كالوزارات والبلديات والجامعات ومكاتب المساحة المرخصة والمساحين.',
    "{t('ceo.paragraph1')}"
)
jsx_part = jsx_part.replace(
    'تزداد القدرة الإنتاجية وتصبح اكسيس ركيزة قوية وأساسية في نهضة تقنية وتكنولوجية تشهدها البلاد في عالم المساحة، لا سيما مع بدء مشاريع التوطين الوطنية. فقد أعطت اكسيس دفعة قوية لعمليات المساحة والتوطين وأصبحت مزوّداً موثوقاً للتكنولوجيا الحديثة في عالم المساحة وتقنياتها، وتحديداً تقنية GPS.',
    "{t('ceo.paragraph2')}"
)
jsx_part = jsx_part.replace(
    'حرصت إدارة اكسيس على الاستجابة السريعة والفعالة لجهود الحكومة في التطوير والتقدم في مجال المساحة، معتبرةً مشروع التوطين مشروعاً وطنياً بامتياز يهدف إلى الحفاظ على الأرض التي هي حجر الأساس في مشروع الدولة المنتظرة. وبناءً على ذلك، استطاعت اكسيس توفير أكثر من 85% من احتياجات البلديات والمساحين العاملين على مشروع التوطين بأفضل التقنيات وبأسرع وقت مع دعم فني متواصل ومباشر يومياً.',
    "{t('ceo.paragraph3')}"
)
jsx_part = jsx_part.replace(
    'سوف تواصل شركة AXIS بالاستثمار للحفاظ على التميز في مجال المساحة وسوف تعمل على ترقية هذه المهنة في البلاد.',
    "{t('ceo.highlight')}"
)
jsx_part = jsx_part.replace('المهندس سلامة عواودة', "{t('ceo.signatureName')}")
jsx_part = jsx_part.replace(
    'المدير العام — شركة أكسيس للحلول الهندسية المتقدمة',
    "{t('ceo.signatureRole')}"
)

# --- SocialFeed ---
jsx_part = jsx_part.replace(
    'أحدث <span className="gradient-text">أخبارنا ومنشوراتنا</span>',
    "{t('socialFeed.headingPrefix')} <span className=\"gradient-text\">{t('socialFeed.headingHighlight')}</span>"
)
jsx_part = jsx_part.replace(
    'تابعونا على منصات التواصل الاجتماعي للحصول على آخر الأخبار والعروض والفيديوهات التعليمية',
    "{t('socialFeed.subheading')}"
)
jsx_part = jsx_part.replace("'الكل'", "t('socialFeed.filterAll')")

jsx_part = jsx_part.replace(
    '<span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">تابعونا</span>',
    "<span className=\"text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase\">{t('socialFeed.label')}</span>"
)

# --- Navbar alt text ---
jsx_part = jsx_part.replace(
    'alt="اكسيس" className="w-full h-full object-contain"',
    "alt={t('nav.logoAlt')} className=\"w-full h-full object-contain\""
)

# ============================================================
# Step 4: Reconstruct the file
# ============================================================
content = translations_part + jsx_part

with open(FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print("i18n fix v2 completed successfully!")
print(f"Translations section length: {len(translations_part)}")
print(f"JSX section length: {len(jsx_part)}")
