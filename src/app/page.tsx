'use client'

import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import dynamic from 'next/dynamic'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Building2, Cog, HardHat, Wrench, Phone, Mail, MapPin,
  ChevronDown, ArrowLeft, Menu, X, CheckCircle2, Users,
  Target, Zap, Shield, ArrowUpRight, Send, Star,
  Ruler, Compass, DraftingCompass, Factory, Calculator, BarChart3,
  Satellite, ScanLine, GraduationCap, Monitor, Radio, Gauge, MessageCircle,
  FileText, BookOpen, Globe, Award, Eye, Lock, Download, Quote, MapPinned
} from 'lucide-react'

/* ───────── dynamic map import (no SSR) ───────── */
const BranchMap = dynamic(() => import('./BranchMap'), { ssr: false })

/* ───────── animated counter ───────── */
function Counter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, end, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ───────── social icons ───────── */
const SOCIALS = [
  { name: 'WhatsApp', href: 'https://wa.me/972525289999', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  )},
  { name: 'Facebook', href: 'https://www.facebook.com/axisTRIMBLE', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  )},
  { name: 'YouTube', href: 'https://www.youtube.com/@axisgpssurveyinginstrument8400', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  )},
  { name: 'Instagram', href: 'https://www.instagram.com/axis.gps/', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  )},
]

/* ───────── i18n: translations & language context ───────── */
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
    'customers.client1': 'شركاء النجاح - أجهزة Trimble مع عملائنا',
    'customers.client2': 'شركاء النجاح - مسح ميداني مع فريق اكسيس',
    'customers.client3': 'شركاء النجاح - تقنيات GPS المتقدمة',
    'customers.client4': 'شركاء النجاح - أجهزة المساحة في المشاريع',
    'customers.client5': 'شركاء النجاح - حلول المسح المتكاملة',
    'customers.client6': 'شركاء النجاح - مشاريع NavVis في البلاد',
    'customers.client7': 'شركاء النجاح - فريق اكسيس الميداني',
    'customers.client8': 'شركاء النجاح - عملاء يثقون بأكسيس',
    'customers.client9': 'شركاء النجاح - أحدث تقنيات المساحة',
    'customers.clientAlt': 'شركاء النجاح - عملاء اكسيس للحلول الهندسية',
    'customers.cinemaTitle': '★ شركاء النجاح ★',
    'customers.cinemaTitleLeft': '★ من وثق بنا ★',
    'customers.altL1': 'من وثق بنا - مسح ميداني بأجهزة NavVis', 'customers.altL2': 'من وثق بنا - فريق المسح في الميدان',
    'customers.altL3': 'من وثق بنا - مسح ثلاثي الأبعاد', 'customers.altL4': 'من وثق بنا - تقنية NavVis المتقدمة',
    'customers.altL5': 'من وثق بنا - مسح ميداني بأجهزة Trimble', 'customers.altL6': 'من وثق بنا - مسح ضوئي ثلاثي الأبعاد',
    'customers.altL7': 'من وثق بنا - جهاز GNSS Trimble', 'customers.altL8': 'من وثق بنا - مسح صناعي متقدم',
    'customers.altL9': 'من وثق بنا - مسح موقع إنشائي', 'customers.altL10': 'من وثق بنا - جهاز GPS Rover',
    'customers.altL11': 'من وثق بنا - أنظمة التحكم بالآلات الثقيلة', 'customers.altL12': 'من وثق بنا - نماذج ثلاثية الأبعاد',
    'customers.dsc2': 'شركاء النجاح - مسح طبوغرافي متقدم', 'customers.dsc4': 'شركاء النجاح - أجهزة مسح دقيقة',
    'customers.dsc6': 'شركاء النجاح - مشاريع بنية تحتية', 'customers.dsc10': 'شركاء النجاح - حلول هندسية متكاملة',
    'customers.dsc11': 'شركاء النجاح - تقنيات LASER', 'customers.dsc12': 'شركاء النجاح - مسح معماري', 'customers.dsc13': 'شركاء النجاح - فريق فني متخصص',
    'customers.website1': 'شركاء النجاح - مشاريع اكسيس الميدانية', 'customers.website2': 'شركاء النجاح - تقنيات المسح الحديثة',
    'customers.website3': 'شركاء النجاح - أجهزة Trimble المتقدمة', 'customers.website4': 'شركاء النجاح - مسح GNSS دقيق',
    'customers.website5': 'شركاء النجاح - حلول NavVis', 'customers.website6': 'شركاء النجاح - مشاريع البنية التحتية',
    'customers.website7': 'شركاء النجاح - أحدث التجهيزات', 'customers.website8': 'شركاء النجاح - خدمات ما بعد البيع',
    'customers.website9': 'شركاء النجاح - تدريب ودعم فني', 'customers.website10': 'شركاء النجاح - شراكات طويلة الأمد',
    'customers.website11': 'شركاء النجاح - مسح ثلاثي الأبعاد', 'customers.website12': 'شركاء النجاح - حلول مخصصة',
    'customers.navvisInd': 'شركاء النجاح - مسح صناعي NavVis', 'customers.navvisScreen': 'شركاء النجاح - شاشة عرض NavVis',
    'customers.navvisTeam': 'شركاء النجاح - فريق NavVis', 'customers.navvis6': 'شركاء النجاح - NavVis في الميدان',
    'customers.trimbleS9': 'شركاء النجاح - جهاز Trimble S9', 'customers.trimbleTripod': 'شركاء النجاح - tripod Trimble',
    'customers.trimbleField': 'شركاء النجاح - Trimble Field Link', 'customers.gpsRover': 'شركاء النجاح - GPS Rover',
    'customers.showcaseTitle': 'عرض مميز', 'customers.clientCount': 'أكثر من 54 عميل يثقون بنا',
    'customers.cinemaCenter': '★ شركاؤنا في كل مكان ★',
    'services.headingPrefix': 'أجهزة وخدمات', 'services.headingHighlight': 'المساحة والجيوماتكس',
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
    'testimonials.testimonialAria': 'شهادة',
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
    'testimonials.label': 'Success Partners\\\' Reviews', 'testimonials.heading': 'Your Opinion Matters',
    'testimonials.subheading': 'We are proud of the trust of our partners and clients and always strive to achieve their satisfaction and exceed their expectations',
    'testimonials.seed1Name': 'Eng. Adnan Yousef Shouman', 'testimonials.seed1Role': 'CEO of Axis',
    'testimonials.seed1Text': 'Since its launch, Axis has been a pioneer in advanced engineering technologies and solutions, and we will continue to provide the latest technologies and best services to our clients everywhere.',
    'testimonials.seed2Name': 'Eng. Saja Musallam', 'testimonials.seed2Role': 'Axis Team - Hebron Branch',
    'testimonials.seed2Text': 'The Axis team works passionately to provide integrated and reliable surveying solutions that meet our clients\\\' needs with the highest standards of quality and precision.',
    'testimonials.seed3Name': 'Eng. Anas Abu Hadid', 'testimonials.seed3Role': 'Hebron Branch Manager - Axis',
    'testimonials.seed3Text': 'At Axis, we are committed to providing the latest technologies and best services to our clients, and we always strive to exceed their expectations.',
    'testimonials.seed4Name': 'Ahmad Saeed Bayoud Al-Tamimi', 'testimonials.seed4Role': 'Chairman of the Board of Trustees of Palestine Polytechnic University',
    'testimonials.seed4Text': 'We commend Axis\\\'s role in supplying the surveying and geomatics sector with modern technologies and supporting academic institutions.',
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
    'team.member7Name': 'Eng. Wa\\\'ad Wahdan', 'team.member7Role': 'Technical Support Department',
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
    'customers.client1': 'Success Partners - Trimble Devices with Our Clients',
    'customers.client2': 'Success Partners - Field Survey with Axis Team',
    'customers.client3': 'Success Partners - Advanced GPS Technologies',
    'customers.client4': 'Success Partners - Surveying Equipment in Projects',
    'customers.client5': 'Success Partners - Integrated Survey Solutions',
    'customers.client6': 'Success Partners - NavVis Projects in the Country',
    'customers.client7': 'Success Partners - Axis Field Team',
    'customers.client8': 'Success Partners - Clients Who Trust Axis',
    'customers.client9': 'Success Partners - Latest Surveying Technologies',
    'customers.clientAlt': 'Success Partners - Axis Engineering Solutions Clients',
    'customers.cinemaTitle': '★ Success Partners ★',
    'customers.cinemaTitleLeft': '★ Those Who Trusted Us ★',
    'customers.altL1': 'Those Who Trusted Us - NavVis Field Survey', 'customers.altL2': 'Those Who Trusted Us - Survey Team in the Field',
    'customers.altL3': 'Those Who Trusted Us - 3D Scanning', 'customers.altL4': 'Those Who Trusted Us - Advanced NavVis Technology',
    'customers.altL5': 'Those Who Trusted Us - Trimble Field Survey', 'customers.altL6': 'Those Who Trusted Us - 3D Photogrammetric Scanning',
    'customers.altL7': 'Those Who Trusted Us - Trimble GNSS Device', 'customers.altL8': 'Those Who Trusted Us - Advanced Industrial Scanning',
    'customers.altL9': 'Those Who Trusted Us - Construction Site Survey', 'customers.altL10': 'Those Who Trusted Us - GPS Rover Device',
    'customers.altL11': 'Those Who Trusted Us - Heavy Machinery Control Systems', 'customers.altL12': 'Those Who Trusted Us - 3D Models',
    'customers.dsc2': 'Success Partners - Advanced Topographic Survey', 'customers.dsc4': 'Success Partners - Precision Survey Instruments',
    'customers.dsc6': 'Success Partners - Infrastructure Projects', 'customers.dsc10': 'Success Partners - Integrated Engineering Solutions',
    'customers.dsc11': 'Success Partners - LASER Technologies', 'customers.dsc12': 'Success Partners - Architectural Scanning', 'customers.dsc13': 'Success Partners - Specialized Technical Team',
    'customers.website1': 'Success Partners - Axis Field Projects', 'customers.website2': 'Success Partners - Modern Survey Technologies',
    'customers.website3': 'Success Partners - Advanced Trimble Devices', 'customers.website4': 'Success Partners - Precise GNSS Surveying',
    'customers.website5': 'Success Partners - NavVis Solutions', 'customers.website6': 'Success Partners - Infrastructure Projects',
    'customers.website7': 'Success Partners - Latest Equipment', 'customers.website8': 'Success Partners - After-Sales Services',
    'customers.website9': 'Success Partners - Training & Technical Support', 'customers.website10': 'Success Partners - Long-Term Partnerships',
    'customers.website11': 'Success Partners - 3D Scanning', 'customers.website12': 'Success Partners - Custom Solutions',
    'customers.navvisInd': 'Success Partners - NavVis Industrial Scanning', 'customers.navvisScreen': 'Success Partners - NavVis Display Screen',
    'customers.navvisTeam': 'Success Partners - NavVis Team', 'customers.navvis6': 'Success Partners - NavVis in the Field',
    'customers.trimbleS9': 'Success Partners - Trimble S9 Device', 'customers.trimbleTripod': 'Success Partners - Trimble Tripod',
    'customers.trimbleField': 'Success Partners - Trimble Field Link', 'customers.gpsRover': 'Success Partners - GPS Rover',
    'customers.showcaseTitle': 'Featured Showcase', 'customers.clientCount': 'Over 54 Clients Trust Us',
    'customers.cinemaCenter': '★ Our Partners Everywhere ★',
    'services.headingPrefix': 'Devices & Services', 'services.headingHighlight': 'Surveying & Geomatics',
    'brands.headingPrefix': 'Leading Global', 'brands.headingHighlight': 'Brands',
    'gallery.headingPrefix': 'Our Latest', 'gallery.headingHighlight': 'Videos',
    'projects.headingPrefix': 'Our Achievements', 'projects.headingHighlight': '& Partnerships',
    'testimonials.headingPrefix': 'Your Opinion', 'testimonials.headingHighlight': 'Matters',
    'whyUs.headingPrefix': 'Why Choose', 'whyUs.headingHighlight': 'Axis?',
    'team.headingPrefix': 'Management', 'team.headingHighlight': 'Structure',
    'contact.headingPrefix': "Let's Start", 'contact.headingHighlight': 'Your Next Project',
    'branches.headingPrefix': 'We Reach', 'branches.headingHighlight': 'You Wherever You Are',
    'ceo.headingPrefix': 'Message from', 'ceo.headingHighlight': 'Eng. Salameh Awawdeh',
    'socialFeed.headingPrefix': 'Our Latest', 'socialFeed.headingHighlight': 'News & Posts',
    'docs.headingPrefix': 'Learn More', 'docs.headingHighlight': 'About Us',
    'review.shareOpinionPrefix': 'Share Your', 'review.shareOpinionHighlight': 'Opinion',
    'team.badgeFounder': 'Founder', 'team.badgeExecutive': 'CEO', 'team.badgeBranch': 'Branch Manager', 'team.badgeAccounting': 'Accounting',
    'testimonials.testimonialAria': 'Testimonial',
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

/* ───────── theme hook (auto + manual) ───────── */
function useTheme() {
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark')
  const [autoMode, setAutoMode] = React.useState(true)
  const mountedRef = React.useRef(false)

  // Get auto-detected theme based on system preference or time
  const getAutoTheme = (): 'dark' | 'light' => {
    if (typeof window === 'undefined') return 'dark'
    try {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark !== undefined) return prefersDark ? 'dark' : 'light'
    } catch {}
    // Fallback: time-based (6am-6pm = light, 6pm-6am = dark)
    const hour = new Date().getHours()
    return (hour >= 6 && hour < 18) ? 'light' : 'dark'
  }

  useEffect(() => {
    const saved = localStorage.getItem('axis-theme-mode') as 'dark' | 'light' | 'auto' | null
    if (saved === 'auto' || saved === null) {
      // Auto mode
      setAutoMode(true)
      const autoTheme = getAutoTheme()
      setTheme(autoTheme)
      document.documentElement.setAttribute('data-theme', autoTheme)
    } else {
      // Manual mode — respect user's choice
      setAutoMode(false)
      setTheme(saved as 'dark' | 'light')
      document.documentElement.setAttribute('data-theme', saved)
    }
    mountedRef.current = true
  }, [])

  // Listen for system preference changes in auto mode
  useEffect(() => {
    if (!autoMode) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light'
      setTheme(newTheme)
      document.documentElement.setAttribute('data-theme', newTheme)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [autoMode])

  // In auto mode, check every minute if theme should change (time-based fallback)
  useEffect(() => {
    if (!autoMode) return
    const interval = setInterval(() => {
      const autoTheme = getAutoTheme()
      setTheme(prev => {
        if (prev !== autoTheme) {
          document.documentElement.setAttribute('data-theme', autoTheme)
          return autoTheme
        }
        return prev
      })
    }, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [autoMode])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setAutoMode(false)
    setTheme(next)
    localStorage.setItem('axis-theme-mode', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  const setAuto = () => {
    setAutoMode(true)
    localStorage.setItem('axis-theme-mode', 'auto')
    const autoTheme = getAutoTheme()
    setTheme(autoTheme)
    document.documentElement.setAttribute('data-theme', autoTheme)
  }

  return { theme, toggle, autoMode, setAuto }
}

/* ───────── section wrapper ───────── */
function Section({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

/* ───────── language toggle components ───────── */
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

/* ───────── nav ───────── */
function Navbar() {
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
  ]

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--bg-1-90)] backdrop-blur-xl border-b border-[var(--b-1)] shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden glow-teal-sm transition-all duration-300 group-hover:scale-110">
              <img src="/logo.png" alt={t('nav.logoAlt')} className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold gradient-text">{t('nav.logoName')}</span>
              <span className="block text-[10px] text-[var(--t-5)] tracking-wider">{t('nav.logoTagline')}</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm text-[var(--t-3)] hover:text-[oklch(0.72_0.14_180)] rounded-lg hover:bg-[var(--accent-bg-xs)] transition-all duration-300"
              >
                <span className="flex items-center gap-1.5">
                  {l.icon}
                  {l.label}
                </span>
              </a>
            ))}
            <a
              href="#contact"
              className="ms-2 px-5 py-2.5 bg-[oklch(0.72_0.14_180)] text-[oklch(0.13_0.02_250)] text-sm font-semibold rounded-lg hover:bg-[oklch(0.75_0.15_180)] transition-all duration-300 glow-teal-sm"
            >
              {t('nav.getQuote')}
            </a>
            {/* Language toggle */}
            <LangToggle />
            {/* Social icons */}
            <div className="flex items-center gap-2 ms-3 border-s border-[var(--b-1)] ps-3">
              {SOCIALS.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className="text-[var(--t-8)] hover:text-[oklch(0.72_0.14_180)] transition-colors duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile: Menu + Language buttons */}
          <div className="flex md:hidden items-center gap-2">
            <LangToggleMobile />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[var(--t-3)]"
              aria-label={t('nav.menuAria')}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--bg-1-95)] backdrop-blur-xl border-t border-[var(--b-1)] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-[var(--t-3)] hover:text-[oklch(0.72_0.14_180)] rounded-lg hover:bg-[var(--accent-bg-xs)] transition-all"
                >
                  {l.icon}
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block mt-2 px-4 py-3 bg-[oklch(0.72_0.14_180)] text-[oklch(0.13_0.02_250)] text-center font-semibold rounded-lg"
              >
                {t('nav.getQuote')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

/* ───────── customer cinema images ───────── */
const CLIENT_IMAGE_COUNT = 54

function useCustomerImages() {
  const { t } = useLang()
  const clientImages = Array.from({ length: CLIENT_IMAGE_COUNT }, (_, i) => {
    const num = String(i + 1).padStart(2, '0')
    return { src: `/customers/client-${num}.jpg`, alt: t('customers.clientAlt') }
  })
  // ALL customer-dsc images
  const dscImages = [
    { src: '/customers/customer-dsc-01.jpg', alt: t('customers.alt1') },
    { src: '/customers/customer-dsc-02.jpg', alt: t('customers.dsc2') },
    { src: '/customers/customer-dsc-03.jpg', alt: t('customers.alt2') },
    { src: '/customers/customer-dsc-04.jpg', alt: t('customers.dsc4') },
    { src: '/customers/customer-dsc-05.jpg', alt: t('customers.alt3') },
    { src: '/customers/customer-dsc-06.jpg', alt: t('customers.dsc6') },
    { src: '/customers/customer-dsc-07.jpg', alt: t('customers.alt4') },
    { src: '/customers/customer-dsc-08.jpg', alt: t('customers.alt5') },
    { src: '/customers/customer-dsc-09.jpg', alt: t('customers.alt6') },
    { src: '/customers/customer-dsc-10.jpg', alt: t('customers.dsc10') },
    { src: '/customers/customer-dsc-11.jpg', alt: t('customers.dsc11') },
    { src: '/customers/customer-dsc-12.jpg', alt: t('customers.dsc12') },
    { src: '/customers/customer-dsc-13.jpg', alt: t('customers.dsc13') },
    { src: '/customers/customer-dsc-14.jpg', alt: t('customers.alt7') },
  ]
  // Website images (Hebrew/Star of David images REMOVED: A, B, C, D, E, F, G, H, I, J, K, L, pic)
  const websiteImages = [
    { src: '/customers/website-navvis-use-3.jpg', alt: t('customers.navvis6') },
    { src: '/customers/website-navvis-use-4.jpg', alt: t('customers.navvisInd') },
    { src: '/customers/website-navvis-use-5.jpg', alt: t('customers.navvisScreen') },
    { src: '/customers/website-navvis-use-6.jpg', alt: t('customers.navvisTeam') },
    { src: '/customers/website-1A.png', alt: t('customers.website3') },
    { src: '/customers/website-2A.png', alt: t('customers.website4') },
    { src: '/customers/website-3A.png', alt: t('customers.website5') },
    { src: '/customers/website-4A.png', alt: t('customers.website6') },
    { src: '/customers/website-5A.png', alt: t('customers.website7') },
    { src: '/customers/website-6A.png', alt: t('customers.website8') },
    { src: '/customers/website-7A.png', alt: t('customers.website9') },
    { src: '/customers/website-8A.png', alt: t('customers.website10') },
    { src: '/customers/website-9A.png', alt: t('customers.website11') },
    { src: '/customers/website-10A.png', alt: t('customers.website12') },
    { src: '/customers/website-11A.png', alt: t('customers.website1') },
    { src: '/customers/website-12A.png', alt: t('customers.website2') },
  ]
  // Equipment images
  const equipmentImages = [
    { src: '/customers/trimble-s9.jpg', alt: t('customers.trimbleS9') },
    { src: '/customers/trimble-tripod.jpg', alt: t('customers.trimbleTripod') },
    { src: '/customers/trimble-fieldlink.jpg', alt: t('customers.trimbleField') },
    { src: '/customers/gps-rover.jpg', alt: t('customers.gpsRover') },
  ]
  // Interleave: client + dsc + website + equipment for rich variety
  const mixedImages: { src: string; alt: string }[] = []
  const allSpecial = [...dscImages, ...websiteImages, ...equipmentImages]
  let specialIdx = 0
  for (let i = 0; i < clientImages.length; i++) {
    mixedImages.push(clientImages[i])
    // Insert a special image every 2 client images
    if (i % 2 === 1 && specialIdx < allSpecial.length) {
      mixedImages.push(allSpecial[specialIdx++])
    }
  }
  // Append any remaining special images
  while (specialIdx < allSpecial.length) {
    mixedImages.push(allSpecial[specialIdx++])
  }
  return mixedImages
}

function useCustomerImagesLeft() {
  const { t } = useLang()
  const clientImages = Array.from({ length: CLIENT_IMAGE_COUNT }, (_, i) => {
    const num = String(i + 1).padStart(2, '0')
    return { src: `/customers/client-${num}.jpg`, alt: t('customers.clientAlt') }
  })
  const navvisImages = [
    { src: '/customers/navvis-full-use-3.jpg', alt: t('customers.altL1') },
    { src: '/customers/navvis-full-use-4.jpg', alt: t('customers.altL2') },
    { src: '/customers/navvis-full-use-5.jpg', alt: t('customers.altL3') },
    { src: '/customers/navvis-full-use-6.jpg', alt: t('customers.navvis6') },
    { src: '/customers/navvis-scanning.jpg', alt: t('customers.altL6') },
    { src: '/customers/navvis-industrial.jpg', alt: t('customers.navvisInd') },
    { src: '/customers/navvis-screen.jpg', alt: t('customers.navvisScreen') },
    { src: '/customers/navvis-team.jpg', alt: t('customers.navvisTeam') },
  ]
  const fieldImages = [
    { src: '/customers/field-surveyor.jpg', alt: t('customers.altL5') },
    { src: '/customers/surveyor-site.jpg', alt: t('customers.altL9') },
    { src: '/customers/cat-excavator.jpg', alt: t('customers.altL11') },
    { src: '/customers/trimble-gnss.jpg', alt: t('customers.altL7') },
    { src: '/customers/trimble-s9.jpg', alt: t('customers.trimbleS9') },
    { src: '/customers/trimble-tripod.jpg', alt: t('customers.trimbleTripod') },
    { src: '/customers/trimble-fieldlink.jpg', alt: t('customers.trimbleField') },
    { src: '/customers/gps-rover.jpg', alt: t('customers.gpsRover') },
  ]
  // Website images (Hebrew/Star of David images REMOVED: A, B, C, D, E, F, G, H, I, J, K, L, pic)
  const websiteImages = [
    { src: '/customers/website-navvis-use-3.jpg', alt: t('customers.navvis6') },
    { src: '/customers/website-navvis-use-4.jpg', alt: t('customers.navvisInd') },
    { src: '/customers/website-navvis-use-5.jpg', alt: t('customers.navvisScreen') },
    { src: '/customers/website-navvis-use-6.jpg', alt: t('customers.navvisTeam') },
  ]
  // Reverse client order for left side variety
  const reversedClients = [...clientImages].reverse()
  const allSpecial = [...navvisImages, ...fieldImages, ...websiteImages]
  const mixedImages: { src: string; alt: string }[] = []
  let specialIdx = 0
  for (let i = 0; i < reversedClients.length; i++) {
    mixedImages.push(reversedClients[i])
    if (i % 2 === 0 && specialIdx < allSpecial.length) {
      mixedImages.push(allSpecial[specialIdx++])
    }
  }
  while (specialIdx < allSpecial.length) {
    mixedImages.push(allSpecial[specialIdx++])
  }
  return mixedImages
}



/* ───────── cinematic hero ───────── */
function Hero() {
  const { t } = useLang()
  const CUSTOMER_IMAGES = useCustomerImages()
  const CUSTOMER_IMAGES_LEFT = useCustomerImagesLeft()
  const [phase, setPhase] = useState<'converge' | 'merge' | 'reveal' | 'content'>('converge')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('merge'), 2200)
    const t2 = setTimeout(() => setPhase('reveal'), 3200)
    const t3 = setTimeout(() => setPhase('content'), 4200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  /* Tech icons that converge from the EDGES of the screen */
  const TECH_ITEMS = [
    { icon: <Satellite className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'GPS', color: 'oklch(0.72 0.14 180)', angle: 0 },
    { icon: <Compass className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'GNSS', color: 'oklch(0.75 0.15 200)', angle: 30 },
    { icon: <ScanLine className="w-5 h-5 sm:w-7 sm:h-7" />, label: '3D Scan', color: 'oklch(0.80 0.10 160)', angle: 60 },
    { icon: <Ruler className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'RTK', color: 'oklch(0.72 0.14 180)', angle: 90 },
    { icon: <Monitor className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'GIS', color: 'oklch(0.65 0.16 200)', angle: 120 },
    { icon: <Gauge className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'VRS', color: 'oklch(0.80 0.10 160)', angle: 150 },
    { icon: <DraftingCompass className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'Mapping', color: 'oklch(0.72 0.14 180)', angle: 180 },
    { icon: <Factory className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'Machine', color: 'oklch(0.75 0.15 200)', angle: 210 },
    { icon: <Radio className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'HD Map', color: 'oklch(0.65 0.16 200)', angle: 240 },
    { icon: <GraduationCap className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'Campus', color: 'oklch(0.80 0.10 160)', angle: 270 },
    { icon: <Cog className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'TBC', color: 'oklch(0.72 0.14 180)', angle: 300 },
    { icon: <BarChart3 className="w-5 h-5 sm:w-7 sm:h-7" />, label: 'Smart', color: 'oklch(0.75 0.15 200)', angle: 330 },
  ]

  /* Brand names orbiting */
  const BRANDS = [
    { name: 'Trimble', color: '#FFC107' },
    { name: 'NavVis', color: '#3B82F6' },
    { name: 'Spectra', color: '#06B6D4' },
    { name: 'Applanix', color: '#10B981' },

    { name: 'Kaarta', color: '#8B5CF6' },
  ]

  /* Positions far from center (screen edges) for each tech icon */
  const getEdgePos = (angle: number) => {
    const rad = (angle * Math.PI) / 180
    const dist = 48 + Math.random() * 4 // 48-52% from center = near edges
    return {
      x: `${50 + dist * Math.cos(rad)}%`,
      y: `${50 + dist * Math.sin(rad)}%`,
    }
  }

  const isConverging = phase === 'converge' || phase === 'merge'
  const showLogo = phase === 'reveal' || phase === 'content'
  const showContent = phase === 'content'

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Animated background circles */}
      <motion.div
        animate={phase === 'reveal' ? { scale: [1, 1.5, 1], opacity: [0.06, 0.15, 0.06] } : {}}
        transition={{ duration: 1.5 }}
        className="absolute top-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[oklch(0.72_0.14_180_/_0.06)] blur-3xl animate-float"
      />
      <motion.div
        animate={phase === 'reveal' ? { scale: [1, 1.4, 1], opacity: [0.05, 0.12, 0.05] } : {}}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute bottom-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[oklch(0.65_0.16_200_/_0.05)] blur-3xl animate-float"
        style={{ animationDelay: '3s' }}
      />

      {/* ── Phase 1 & 2: Tech icons converging from EDGES ── */}
      <div className="absolute inset-0 pointer-events-none">
        {TECH_ITEMS.map((tech, i) => {
          const edge = getEdgePos(tech.angle)
          return (
            <motion.div
              key={i}
              initial={{ x: edge.x, y: edge.y, scale: 0, opacity: 0, rotate: -180 }}
              animate={
                phase === 'converge'
                  ? { x: edge.x, y: edge.y, scale: 1, opacity: 1, rotate: 0 }
                  : phase === 'merge'
                  ? { x: '50%', y: '50%', scale: 1.2, opacity: 0.8, rotate: 360 }
                  : { x: '50%', y: '50%', scale: 0, opacity: 0, rotate: 720 }
              }
              transition={{
                duration: phase === 'converge' ? 1.2 : phase === 'merge' ? 1.0 : 0.6,
                delay: phase === 'converge' ? i * 0.1 : phase === 'merge' ? i * 0.04 : i * 0.02,
                ease: phase === 'converge' ? 'easeOut' : phase === 'merge' ? [0.43, 0.13, 0.23, 0.96] : 'easeIn',
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
              style={{ color: tech.color, zIndex: 20 }}
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-[var(--bg-2-80)] backdrop-blur-sm border border-[var(--b-1)]/50 flex items-center justify-center"
                style={{ boxShadow: `0 0 20px ${tech.color}33` }}
              >
                {tech.icon}
              </div>
              <span className="text-[10px] sm:text-xs font-bold tracking-wider" style={{ color: tech.color }}>{tech.label}</span>
            </motion.div>
          )
        })}
      </div>

      {/* ── Brand names converging from edges ── */}
      <div className="absolute inset-0 pointer-events-none">
        {BRANDS.map((brand, i) => {
          const angle = (i * 360 / BRANDS.length)
          const edge = getEdgePos(angle + 15)
          return (
            <motion.div
              key={brand.name}
              initial={{ x: edge.x, y: edge.y, scale: 0, opacity: 0 }}
              animate={
                phase === 'converge'
                  ? { x: edge.x, y: edge.y, scale: 1, opacity: 0.7 }
                  : phase === 'merge'
                  ? { x: '50%', y: '50%', scale: 0.8, opacity: 0.5 }
                  : { x: '50%', y: '50%', scale: 0, opacity: 0 }
              }
              transition={{
                duration: phase === 'converge' ? 1.4 : phase === 'merge' ? 1.0 : 0.5,
                delay: phase === 'converge' ? 0.3 + i * 0.12 : phase === 'merge' ? i * 0.05 : i * 0.02,
                ease: phase === 'converge' ? 'easeOut' : phase === 'merge' ? [0.43, 0.13, 0.23, 0.96] : 'easeIn',
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 15 }}
            >
              <span
                className="text-sm sm:text-base font-extrabold tracking-[0.2em] uppercase whitespace-nowrap"
                style={{ color: brand.color, textShadow: `0 0 30px ${brand.color}66` }}
              >
                {brand.name}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* ── Convergence energy lines from edges ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 18 }}>
        {isConverging && (
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
            {TECH_ITEMS.map((tech, i) => {
              const rad = (tech.angle * Math.PI) / 180
              const dist = 490
              const sx = 500 + dist * Math.cos(rad)
              const sy = 500 + dist * Math.sin(rad)
              return (
                <motion.line
                  key={i}
                  x1={sx} y1={sy} x2="500" y2="500"
                  stroke={tech.color}
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    phase === 'converge'
                      ? { pathLength: 0, opacity: 0 }
                      : phase === 'merge'
                      ? { pathLength: 1, opacity: 0.6 }
                      : { pathLength: 1, opacity: 0 }
                  }
                  transition={{ duration: 0.8, delay: i * 0.04, ease: 'easeInOut' }}
                  style={{ filter: `drop-shadow(0 0 8px ${tech.color})` }}
                />
              )
            })}
          </svg>
        )}
      </div>

      {/* ── Central energy burst on reveal ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={
          phase === 'reveal'
            ? { scale: [0, 3, 1.5], opacity: [0, 0.8, 0] }
            : phase === 'content'
            ? { scale: 0, opacity: 0 }
            : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
        style={{
          background: 'radial-gradient(circle, oklch(0.72 0.14 180 / 0.6), oklch(0.72 0.14 180 / 0.1), transparent)',
          zIndex: 25,
        }}
      />

      {/* ── Shockwave ring on reveal ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0, borderWidth: 3 }}
        animate={
          phase === 'reveal'
            ? { scale: [0, 2.5, 4], opacity: [0.8, 0.4, 0], borderWidth: [3, 1, 0] }
            : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-[oklch(0.72_0.14_180)]"
        style={{ zIndex: 24 }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0, borderWidth: 2 }}
        animate={
          phase === 'reveal'
            ? { scale: [0, 2, 3.5], opacity: [0.6, 0.3, 0], borderWidth: [2, 1, 0] }
            : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 1.5, delay: 0.15, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-[oklch(0.65_0.16_200)]"
        style={{ zIndex: 24 }}
      />

      {/* ── Floating particles (ambient) ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        {Array.from({ length: 30 }).map((_, i) => {
          const left = Math.random() * 100
          const top = Math.random() * 100
          const size = 1 + Math.random() * 2
          const delay = Math.random() * 4
          const dur = 3 + Math.random() * 4
          return (
            <motion.div
              key={`p-${i}`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                y: [0, -20, 0],
                x: [0, (Math.random() - 0.5) * 10, 0],
              }}
              transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute rounded-full bg-[oklch(0.72_0.14_180)]"
              style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
            />
          )
        })}
      </div>

      {/* ── Orbiting tech icons after reveal (CONTINUOUS SPINNING from edges) ── */}
      <AnimatePresence>
        {showContent && (
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 12 }}>
            {TECH_ITEMS.map((tech, i) => {
              const orbitRadius = 30 + (i % 3) * 7
              return (
                <motion.div
                  key={`orbit-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.4, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.08, duration: 0.5 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ width: `${orbitRadius * 2}%`, height: `${orbitRadius * 2}%` }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'linear' }}
                    className="w-full h-full relative"
                  >
                    <motion.div
                      className="absolute"
                      style={{
                        top: '0%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: tech.color,
                      }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'linear' }}
                    >
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[var(--bg-2)]/60 backdrop-blur-sm border border-[var(--b-1)]/30 flex items-center justify-center"
                        style={{ boxShadow: `0 0 12px ${tech.color}22` }}
                      >
                        {React.cloneElement(tech.icon as React.ReactElement, { className: 'w-3.5 h-3.5 sm:w-4 sm:h-4' })}
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>

      {/* ── Customer showcase cinema screens ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 35 }}>
        {/* ── Film strip decorations with sprocket holes ── */}
        <div className="absolute top-0 right-[22%] bottom-0 w-4 pointer-events-none" style={{ zIndex: 6 }}>
          <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(180deg, oklch(0.72 0.14 180 / 0.08) 0px, oklch(0.72 0.14 180 / 0.08) 2px, transparent 2px, transparent 20px)' }} />
          {/* Sprocket holes */}
          <div className="absolute inset-y-0 left-0 w-full flex flex-col justify-evenly py-4" style={{ zIndex: 7 }}>
            {Array.from({ length: 20 }).map((_, si) => (
              <div key={`sr-${si}`} className="cinema-sprocket mx-auto" style={{ animationDelay: `${si * 0.3}s` }} />
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-[22%] bottom-0 w-4 pointer-events-none" style={{ zIndex: 6 }}>
          <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(180deg, oklch(0.72 0.14 180 / 0.08) 0px, oklch(0.72 0.14 180 / 0.08) 2px, transparent 2px, transparent 20px)' }} />
          <div className="absolute inset-y-0 left-0 w-full flex flex-col justify-evenly py-4" style={{ zIndex: 7 }}>
            {Array.from({ length: 20 }).map((_, si) => (
              <div key={`sl-${si}`} className="cinema-sprocket mx-auto" style={{ animationDelay: `${si * 0.3 + 0.15}s` }} />
            ))}
          </div>
        </div>

        {/* Right screen - scrolls up */}
        <div className="absolute top-0 right-0 bottom-0 overflow-hidden" style={{ width: '22%' }}>
          {/* Top/bottom fade */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[var(--bg-0)] via-[var(--bg-0)]/80 to-transparent" style={{ zIndex: 3 }} />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--bg-0)] via-[var(--bg-0)]/80 to-transparent" style={{ zIndex: 3 }} />
          {/* Inner edge fade toward center */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent to-[var(--bg-0)]" style={{ zIndex: 3 }} />
          {/* Decorative cinema edge line - flowing glow */}
          <div className="absolute inset-y-0 left-0 w-[2px] cinema-edge-line" style={{ zIndex: 4 }} />
          {/* Cinema title */}
          <div className="absolute top-3 inset-x-0 text-center" style={{ zIndex: 5 }}>
            <span className="cinema-title-glow text-[9px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[oklch(0.72_0.14_180_/_0.9)]">{t('customers.cinemaTitle')}</span>
          </div>
          {/* Client count badge */}
          <div className="absolute top-9 sm:top-10 inset-x-0 text-center" style={{ zIndex: 5 }}>
            <span className="inline-block px-3 py-1 rounded-full bg-[oklch(0.72_0.14_180_/_0.15)] border border-[oklch(0.72_0.14_180_/_0.25)] text-[7px] sm:text-[8px] text-[oklch(0.72_0.14_180_/_0.95)] font-bold backdrop-blur-sm">{t('customers.clientCount')}</span>
          </div>
          <div className="cinema-scroll-right pr-2 pt-16">
            {[...CUSTOMER_IMAGES, ...CUSTOMER_IMAGES, ...CUSTOMER_IMAGES].map((img, i) => {
              const isTall = i % 5 === 0
              const isWide = i % 5 === 2
              return (
                <div key={`r-${i}`} className={`cinema-card relative group flex-shrink-0 ${isTall ? 'cinema-card-tall' : ''}`}>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 rounded-xl z-10 pointer-events-none cinema-shimmer-layer" />
                  {/* Corner decorations */}
                  <div className="cinema-corner-tl" />
                  <div className="cinema-corner-br" />
                  <div className={`rounded-xl overflow-hidden border border-white/10 group-hover:border-[oklch(0.72_0.14_180_/_0.5)] cinema-border-glow transition-all duration-600 ${isWide ? 'border-l-2 border-l-[oklch(0.72_0.14_180_/_0.15)]' : ''}`}
                    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 8px rgba(13,148,136,0.12)', animation: 'cinema-glow-pulse 5s ease-in-out infinite', animationDelay: `${(i % 10) * 0.5}s` }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={`w-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-600 group-hover:scale-110 ${isTall ? 'h-36 sm:h-48 lg:h-56' : isWide ? 'h-24 sm:h-32 lg:h-40' : 'h-28 sm:h-36 lg:h-44'}`}
                      loading="lazy"
                    />
                    <div className="cinema-overlay" />
                  </div>
                  <div className="cinema-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  </div>
                  <div className="absolute bottom-1 right-1 left-1 px-2 py-1.5 rounded-lg bg-black/90 backdrop-blur-md border border-[oklch(0.72_0.14_180_/_0.25)] opacity-0 group-hover:opacity-100 transition-all duration-400 cinema-text-reveal">
                    <p className="text-[7px] sm:text-[9px] text-white/95 font-semibold truncate">{img.alt}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Left screen - scrolls down */}
        <div className="absolute top-0 left-0 bottom-0 overflow-hidden" style={{ width: '22%' }}>
          {/* Top/bottom fade */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[var(--bg-0)] via-[var(--bg-0)]/80 to-transparent" style={{ zIndex: 3 }} />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--bg-0)] via-[var(--bg-0)]/80 to-transparent" style={{ zIndex: 3 }} />
          {/* Inner edge fade toward center */}
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-transparent to-[var(--bg-0)]" style={{ zIndex: 3 }} />
          {/* Decorative cinema edge line - flowing glow */}
          <div className="absolute inset-y-0 right-0 w-[2px] cinema-edge-line" style={{ zIndex: 4 }} />
          {/* Cinema title */}
          <div className="absolute top-3 inset-x-0 text-center" style={{ zIndex: 5 }}>
            <span className="cinema-title-glow text-[9px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[oklch(0.72_0.14_180_/_0.9)]">{t('customers.cinemaTitleLeft')}</span>
          </div>
          <div className="cinema-scroll-left pl-2 pt-10">
            {[...CUSTOMER_IMAGES_LEFT, ...CUSTOMER_IMAGES_LEFT, ...CUSTOMER_IMAGES_LEFT].map((img, i) => {
              const isTall = i % 5 === 1
              const isWide = i % 5 === 3
              return (
                <div key={`l-${i}`} className={`cinema-card relative group flex-shrink-0 ${isTall ? 'cinema-card-tall' : ''}`}>
                  <div className="absolute inset-0 rounded-xl z-10 pointer-events-none cinema-shimmer-layer" />
                  <div className="cinema-corner-tl" />
                  <div className="cinema-corner-br" />
                  <div className={`rounded-xl overflow-hidden border border-white/10 group-hover:border-[oklch(0.72_0.14_180_/_0.5)] cinema-border-glow transition-all duration-600 ${isWide ? 'border-r-2 border-r-[oklch(0.72_0.14_180_/_0.15)]' : ''}`}
                    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 8px rgba(13,148,136,0.12)', animation: 'cinema-glow-pulse 5s ease-in-out infinite', animationDelay: `${(i % 10) * 0.6}s` }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={`w-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-600 group-hover:scale-110 ${isTall ? 'h-36 sm:h-48 lg:h-56' : isWide ? 'h-24 sm:h-32 lg:h-40' : 'h-28 sm:h-36 lg:h-44'}`}
                      loading="lazy"
                    />
                    <div className="cinema-overlay" />
                  </div>
                  <div className="cinema-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  </div>
                  <div className="absolute bottom-1 right-1 left-1 px-2 py-1.5 rounded-lg bg-black/90 backdrop-blur-md border border-[oklch(0.72_0.14_180_/_0.25)] opacity-0 group-hover:opacity-100 transition-all duration-400 cinema-text-reveal">
                    <p className="text-[7px] sm:text-[9px] text-white/95 font-semibold truncate">{img.alt}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>

      {/* ── Content layer ── */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo reveal */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={
            showLogo
              ? { scale: 1, opacity: 1, rotate: 0 }
              : { scale: 0, opacity: 0, rotate: -180 }
          }
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-8"
        >
          <div className="w-28 h-28 sm:w-40 sm:h-40 mx-auto rounded-2xl overflow-hidden animate-pulse-glow"
            style={{ boxShadow: '0 0 40px oklch(0.72 0.14 180 / 0.5), 0 0 80px oklch(0.72 0.14 180 / 0.2), 0 0 120px oklch(0.72 0.14 180 / 0.1)' }}
          >
            <img src="/logo.png" alt={t('hero.logoAlt')} className="w-full h-full object-contain p-2 sm:p-3" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={showContent ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="gradient-text">{t('hero.brandName')}</span>
          <br />
          <span className="text-[var(--t-1)]">{t('hero.tagline')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-[var(--t-5)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* رأيك يهمنا - Wide prominent CTA */}
          <a
            href="#testimonials"
            className="group relative w-full sm:w-auto sm:min-w-[420px] px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
          >
            {/* Animated gradient background */}
            <span className="absolute inset-0 bg-gradient-to-l from-[oklch(0.72_0.14_180)] via-[oklch(0.65_0.18_200)] to-[oklch(0.72_0.14_180)] transition-all duration-500" />
            {/* Shimmer overlay */}
            <span className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            {/* Pulse ring behind star */}
            <span className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 animate-ping opacity-30" />
            {/* Content */}
            <span className="relative z-10 text-[oklch(0.13_0.02_250)] flex items-center gap-3 text-lg">
              {/* Modern star-burst icon */}
              <span className="relative flex items-center justify-center w-9 h-9">
                <Star className="w-6 h-6 fill-[oklch(0.13_0.02_250)] text-[oklch(0.13_0.02_250)] group-hover:rotate-[72deg] transition-transform duration-500" />
              </span>
{t('hero.ctaReview')}
              <MessageCircle className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            </span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-[var(--t-8)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ───────── about ───────── */
function About() {
  const { t } = useLang()
  const features = [
    { icon: <Target className="w-6 h-6" />, title: t('about.feature1Title'), desc: t('about.feature1Desc') },
    { icon: <Shield className="w-6 h-6" />, title: t('about.feature2Title'), desc: t('about.feature2Desc') },
    { icon: <Zap className="w-6 h-6" />, title: t('about.feature3Title'), desc: t('about.feature3Desc') },
  ]

  return (
    <Section id="about" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <div>
            <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t('about.label')}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight">
              {t('about.heading')} <br />
              <span className="gradient-text">{t('about.headingHighlight')}</span>
            </h2>
            <p className="text-[var(--t-5)] text-lg leading-relaxed mb-8">
              {t('about.paragraph1')}
            </p>
            <p className="text-[var(--t-7)] leading-relaxed mb-8">
              {t('about.paragraph2')}
            </p>
            <div className="space-y-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-[var(--b-1)] bg-[var(--bg-2)] hover:border-[var(--accent-border-sm)] transition-all duration-300"
                >
                  <div className="p-3 rounded-lg bg-[oklch(0.72_0.14_180_/_0.1)] text-[oklch(0.72_0.14_180)] shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--t-1)] mb-1">{f.title}</h3>
                    <p className="text-sm text-[var(--t-7)]">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual side */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-8 rounded-full border border-[oklch(0.72_0.14_180_/_0.15)]" />
              <div className="absolute inset-16 rounded-full border border-[oklch(0.72_0.14_180_/_0.1)]" />
              <div className="absolute inset-24 rounded-full border border-dashed border-[oklch(0.72_0.14_180_/_0.08)]" />

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-2xl bg-[oklch(0.72_0.14_180_/_0.1)] border border-[oklch(0.72_0.14_180_/_0.2)] flex items-center justify-center glow-teal-sm">
                  <DraftingCompass className="w-16 h-16 text-[oklch(0.72_0.14_180)]" />
                </div>
              </div>

              {/* Floating items */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-8 right-8 p-4 rounded-xl bg-[var(--bg-2)] border border-[var(--b-1)] shadow-xl"
              >
                <Building2 className="w-8 h-8 text-[oklch(0.72_0.14_180)]" />
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-8 left-8 p-4 rounded-xl bg-[var(--bg-2)] border border-[var(--b-1)] shadow-xl"
              >
                <HardHat className="w-8 h-8 text-[oklch(0.65_0.16_200)]" />
              </motion.div>
              <motion.div
                animate={{ y: [-3, 6, -3] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-1/2 left-0 -translate-y-1/2 p-4 rounded-xl bg-[var(--bg-2)] border border-[var(--b-1)] shadow-xl"
              >
                <Ruler className="w-8 h-8 text-[oklch(0.80_0.10_160)]" />
              </motion.div>
              <motion.div
                animate={{ y: [3, -6, 3] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-1/2 right-0 -translate-y-1/2 p-4 rounded-xl bg-[var(--bg-2)] border border-[var(--b-1)] shadow-xl"
              >
                <Compass className="w-8 h-8 text-[oklch(0.60_0.18_30)]" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ───────── services ───────── */
function Services() {
  const { t } = useLang()
  const services = [
    {
      icon: <Satellite className="w-7 h-7" />,
      title: t('services.gpsTitle'),
      desc: t('services.gpsDesc'),
      brands: [
        {
          name: 'Trimble', products: [
            { name: 'R580', img: 'https://images.ctfassets.net/1nvkn1423yot/gJeRON0RN9meNwu9LiC7r/28ded15c873baef48ae4d609e7c7b6e2/geo-r580-productpage-fullbackgroundproducthero-800x960.png', datasheet: 'https://www.geonovus.lt/sites/default/files/022516-677a_trimbler580_datasheet_usl_0923_lrsec_1.pdf' },
            { name: 'R980', img: 'https://images.ctfassets.net/1nvkn1423yot/1jtUB5X0fiJVKIiTfK9zC4/0e41587621af7156f5d6c38f730789a6/geo-product-r980-pim-image-800x960.png', datasheet: 'https://www.laserinst.com/content/R980_Datasheet.pdf' },
            { name: 'Catalyst DA2', img: 'https://images.ctfassets.net/1nvkn1423yot/5RDHxxntqleqha8WC295R6/25929a7fb312f0f657d025c8f6ce1c4e/geo-da2-productpage-fullbackgroundproducthero-800x960__1_.png', datasheet: 'https://buildingpoint.com.au/wp-content/uploads/2024/10/trimble-catalyst-spec-sheet.pdf' },
          ],
        },
        {
          name: 'Spectra', products: [
            { name: 'SP100', img: 'https://spectrageospatial.com/wp-content/uploads/sp100-product-shot.png', datasheet: 'http://trl.trimble.com/docushare/dsweb/Get/Document-1072959/SG_SP100%20GNSS%20Receiver_Datasheet_English%20US_LR.pdf' },
          ],
        },
      ],
    },
    {
      icon: <DraftingCompass className="w-7 h-7" />,
      title: t('services.totalStationTitle'),
      desc: t('services.totalStationDesc'),
      brands: [
        {
          name: 'Trimble', products: [
            { name: 'S7', img: 'https://images.ctfassets.net/1nvkn1423yot/0HpsPfei3wb4THphxFbp9/06466a90de405248afc0e38a23495d00/geo-s7-productpage-fullbackgroundproducthero-800x960.png', datasheet: 'https://www.korecgroup.com/wp-content/uploads/2020/02/022516-154G_TrimbleS7_DS_A4_0619_LR-SEC.pdf' },
            { name: 'S5', img: 'https://images.ctfassets.net/1nvkn1423yot/SO4JJjOZ1SACwgkDJyKuJ/175913cbc27aa112f56f832371fa45b5/geo-s5-productpage-fullbackgroundproducthero-800x960.png', datasheet: 'https://geonovus.ee/wp-content/uploads/pdf/Datasheet%20-%20Trimble%20S5.pdf' },
            { name: 'C5', img: 'https://images.ctfassets.net/1nvkn1423yot/3cSDqj8ZqX3SE45Pq503Je/1071896224b58e47cc962e00743b173d/geo-c5-productpage-fullbackgroundproducthero-800x960.png', datasheet: 'https://www.duncan-parnell.com/customer/docs/skudocs/trimble-c5-datasheet-www-duncan-parnell-com-.pdf' },
          ],
        },
      ],
    },
    {
      icon: <ScanLine className="w-7 h-7" />,
      title: t('services.scanningTitle'),
      desc: t('services.scanningDesc'),
      brands: [
        {
          name: 'NavVis', products: [
            { name: 'VLX3', img: 'https://3339696.fs1.hubspotusercontent-na1.net/hub/3339696/hubfs/product-navvis-VLX-3-Front-800x800-2024.png', datasheet: 'https://www.aptella.com/wp-content/uploads/2023/05/NavVis-VLX-3-data-sheet-Digital_EN.pdf' },
            { name: 'MLX', img: 'https://3339696.fs1.hubspotusercontent-na1.net/hub/3339696/hubfs/product-navvis-MLX-Display-800x800-2024.png', datasheet: 'https://assets.new.siemens.com/siemens/assets/api/uuid:ea0db4fb-f3fd-49e1-9656-2487a1d2f979/navvis-mlx-data-sheet-digital-en-2409.pdf' },
          ],
        },
        {
          name: 'Trimble', products: [
            { name: 'X9', img: 'https://images.ctfassets.net/1nvkn1423yot/6PGYrL01kdT5NyqvCRJAz4/3b037f38b8735e747f0f3294cd49f435/geo-product-x9-pim-image-800x960.png', datasheet: 'https://frontierprecision.com/wp-content/uploads/2025/01/Frontier-Precision-Trimble-X9-3D-Laser-Scanning-System-Spec-Sheet.pdf' },
          ],
        },
      ],
    },
    {
      icon: <Monitor className="w-7 h-7" />,
      title: t('services.gisTitle'),
      desc: t('services.gisDesc'),
      brands: [
        {
          name: 'Trimble', products: [
            { name: 'TDC6', img: 'https://images.ctfassets.net/1nvkn1423yot/6orejDEuOzl53rmdqD672d/4bfcf62e1b1ae383f8d035dddb4e30bd/geo-tdc6-productpage-fullbackgroundproducthero-800x960.png', datasheet: 'https://frontierprecision.com/wp-content/uploads/2025/01/Frontier-Precision-Trimble-TDC6-Data-Collector-Spec-Sheet.pdf' },
            { name: 'TSC510', img: 'https://images.ctfassets.net/1nvkn1423yot/7CGBo90DVWQ74XWl2GVCX1/52bd3a78b77dbaa41808cdb8478e01f7/geo-product-tsc510-key-specs-image-720x720.jpg', datasheet: 'https://trl.trimble.com/docushare/dsweb/Get/Document-1081993/022650-002_TrimbleTSC510_InfoSheet_USL_0725_LR_SEC.pdf' },
            { name: 'TSC7', img: 'https://images.ctfassets.net/1nvkn1423yot/7z792GpsBF8Oa5ayU5YOSE/8382e9b3141bf93c4b4bc49f74085adb/geo-tsc7-productpage-keyfeatures-720x720.jpg', datasheet: 'https://geonovus.ee/wp-content/uploads/pdf/Datasheet%20-%20Trimble%20TSC7.pdf' },
          ],
        },
      ],
    },
    {
      icon: <Radio className="w-7 h-7" />,
      title: t('services.monitoringTitle'),
      desc: t('services.monitoringDesc'),
      brands: [],
    },
    {
      icon: <Gauge className="w-7 h-7" />,
      title: t('services.laserTitle'),
      desc: t('services.laserDesc'),
      brands: [
        { name: 'Spectra', products: [
            { name: 'LL500', img: 'https://sfile.chatglm.cn/images-ppt/4f53457e5907.png', datasheet: 'https://www.spectraprecision.com/_files/ugd/cd4160_34f59423c5414a86b74a0cd6abffa024.pdf' },
            { name: 'HV301', img: 'https://sfile.chatglm.cn/images-ppt/8c4c4d3b5ca7.jpg', datasheet: 'https://www.surveyinstrumentsales.com/PDFs/Brochures/Spectra-Precision-HV301-Brochure.pdf' },
            { name: 'DG613', img: 'https://sfile.chatglm.cn/images-ppt/dd80ee5d60b2.jpg', datasheet: 'https://www.spectraprecision.com/_files/ugd/cd4160_ec44bf9f0ad8480a953c0313ef78bf7c.pdf' },
            { name: 'DSZ32X', img: 'https://sfile.chatglm.cn/images-ppt/443b31e2401c.jpg', datasheet: 'https://5.imimg.com/data5/SELLER/Doc/2021/3/LB/FP/JY/124692814/averex-auto-level.pdf' },
        ] },
      ],
    },
    {
      icon: <Calculator className="w-7 h-7" />,
      title: t('services.softwareTitle'),
      desc: t('services.softwareDesc'),
      brands: [],
    },
    {
      icon: <GraduationCap className="w-7 h-7" />,
      title: t('services.campusTitle'),
      desc: t('services.campusDesc'),
      brands: [],
    },
  ]

  const brandColors: Record<string, string> = {
    Trimble: 'bg-[#FFC72C]/10 border-[#FFC72C]/30 text-[#FFC72C]',
    NavVis: 'bg-[#0057B8]/10 border-[#0057B8]/30 text-[#0057B8]',
    Spectra: 'bg-[#0057B8]/10 border-[#0057B8]/30 text-[#FFFFFF]',
  }

  return (
    <Section id="services" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t('services.label')}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            {t('services.headingPrefix')} <span className="gradient-text">{t('services.headingHighlight')}</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            {t('services.subheading')}
          </p>
        </div>

        <div className="space-y-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)] hover:border-[var(--accent-border)] transition-all duration-500 overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[oklch(0.72_0.14_180_/_0.05)] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-[oklch(0.72_0.14_180_/_0.1)] text-[oklch(0.72_0.14_180)] shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--t-1)] mb-1">{s.title}</h3>
                    <p className="text-[var(--t-7)] leading-relaxed text-sm">{s.desc}</p>
                  </div>
                </div>

                {/* Brand products with images */}
                {s.brands.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    {s.brands.flatMap((b) =>
                      b.products.map((p, k) => (
                        <a
                          key={`${b.name}-${k}`}
                          href={typeof p === 'object' && p.datasheet ? p.datasheet : undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/product rounded-xl border border-[var(--b-1)] bg-[var(--bg-1)] overflow-hidden hover:border-[var(--accent-border-sm)] transition-all duration-300 hover:shadow-lg hover:shadow-[oklch(0.72_0.14_180_/_0.08)]"
                        >
                          {/* Product image */}
                          <div className="relative aspect-[4/3] bg-gradient-to-b from-[oklch(0.25_0.02_250)] to-[oklch(0.18_0.02_250)] flex items-center justify-center p-4">
                            {typeof p === 'object' && p.img ? (
                              <img
                                src={p.img}
                                alt={`${b.name} ${typeof p === 'object' ? p.name : p}`}
                                className="max-h-full max-w-full object-contain drop-shadow-lg transition-transform duration-300 group-hover/product:scale-105"
                              />
                            ) : (
                              <div className="text-[var(--t-10)]">
                                {b.name === 'Trimble' ? <Satellite className="w-10 h-10" /> : b.name === 'NavVis' ? <ScanLine className="w-10 h-10" /> : <Cog className="w-10 h-10" />}
                              </div>
                            )}
                          </div>
                          {/* Brand + product name */}
                          <div className="p-3">
                            <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold border mb-2 ${brandColors[b.name] || 'bg-[var(--bg-tab)] border-[var(--b-1)] text-[oklch(0.72_0.14_180)]'}`}>
                              {b.name}
                            </span>
                            <div className="flex items-center justify-between">
                              <span className="text-[oklch(0.85_0.005_250)] text-sm font-semibold">
                                {typeof p === 'object' ? p.name : p}
                              </span>
                              {typeof p === 'object' && p.datasheet && (
                                <FileText className="w-3.5 h-3.5 text-[var(--t-8)] group-hover/product:text-[oklch(0.72_0.14_180)] transition-colors" />
                              )}
                            </div>
                          </div>
                        </a>
                      ))
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────── stats ───────── */
function Stats() {
  const { t } = useLang()
  const stats = [
    { value: 4, suffix: '', label: t('stats.branches'), icon: <MapPin className="w-6 h-6" /> },
    { value: 10000, suffix: '+', label: t('stats.clients'), icon: <Users className="w-6 h-6" /> },
    { value: 20, suffix: '+', label: t('stats.years'), icon: <Wrench className="w-6 h-6" /> },
  ]

  return (
    <Section id="stats" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[oklch(0.72_0.14_180_/_0.06)] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative p-6 sm:p-8 rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2-80)] backdrop-blur text-center group hover:border-[var(--accent-border-sm)] transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">
                <div className="p-3 rounded-xl bg-[oklch(0.72_0.14_180_/_0.1)] text-[oklch(0.72_0.14_180)] group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-2">
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <div className="text-[var(--t-7)] text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────── brands ───────── */
function Brands() {
  const { t } = useLang()
  const brands = [
    {
      name: 'Trimble',
      desc: t('brands.trimbleDesc'),
      color: 'from-[#FFC72C] to-[#E5B300]',
      textColor: 'text-[#1a1a1a]',
      specialties: ['GPS / GNSS', 'Total Station', t('brands.trimbleSpec1'), t('brands.trimbleSpec2')],
    },
    {
      name: 'NavVis',
      desc: t('brands.navvisDesc'),
      color: 'from-[#0057B8] to-[#003F8A]',
      textColor: 'text-white',
      specialties: [t('brands.navvisSpec1'), t('brands.navvisSpec2'), t('brands.navvisSpec3'), t('projects.proj3Tag1')],
    },
    {
      name: 'Spectra',
      desc: t('brands.spectraDesc'),
      color: 'from-[#FFFFFF] to-[#E8F0FE]',
      textColor: 'text-[#0057B8]',
      specialties: ['RTK / GPS', t('brands.spectraSpec1'), t('brands.spectraSpec2'), t('brands.spectraSpec3')],
    },
  ]

  return (
    <Section id="brands" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t('brands.label')}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            {t('brands.headingPrefix')} <span className="gradient-text">{t('brands.headingHighlight')}</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            {t('brands.subheading')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {brands.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)] overflow-hidden hover:border-[var(--accent-border)] transition-all duration-500"
            >
              {/* Brand header gradient */}
              <div className={`bg-gradient-to-l ${b.color} p-6 text-center`}>
                <h3 className={`text-2xl sm:text-3xl font-bold tracking-wide ${b.textColor}`}>{b.name}</h3>
                <p className={`text-sm mt-2 ${b.textColor === 'text-white' ? 'text-white/80' : b.textColor === 'text-[#1a1a1a]' ? 'text-[#1a1a1a]/70' : 'text-[#0057B8]/70'}`}>{b.desc}</p>
              </div>

              {/* Specialties */}
              <div className="p-6">
                <h4 className="text-[oklch(0.72_0.14_180)] font-semibold text-sm mb-3">{t('brands.specialties')}</h4>
                <div className="flex flex-wrap gap-2">
                  {b.specialties.map((s, j) => (
                    <span
                      key={j}
                      className="px-3 py-1.5 rounded-lg bg-[var(--bg-input)] text-[var(--t-4)] text-xs border border-[var(--b-1)] group-hover:border-[var(--accent-border-xs)] transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1 text-[oklch(0.72_0.14_180)] text-sm font-medium">
                  <span>{t('brands.exclusiveAgent')}</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────── gallery ───────── */
function Gallery() {
  const { t } = useLang()
  const [activeTab, setActiveTab] = useState<'all' | 'video'>('all')
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null)

  const mediaItems = [
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: '3D Laser Scanning the Nablus Court of Appeal',
      youtubeId: 'XgBOGJzBn5g',
      thumb: 'https://i.ytimg.com/vi/XgBOGJzBn5g/hqdefault.jpg',
      category: t('gallery.categoryLaser'),
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'NavVis MLX – Redefining Handheld Reality Capture',
      youtubeId: '-IDRr44-6RA',
      thumb: 'https://i.ytimg.com/vi/-IDRr44-6RA/hqdefault.jpg',
      category: t('brands.navvisSpec1'),
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'NavVis VLX3 – Fast & Accurate 3D Laser Scanning',
      youtubeId: 'TOZkZdhxvZk',
      thumb: 'https://i.ytimg.com/vi/TOZkZdhxvZk/hqdefault.jpg',
      category: t('gallery.categoryLaser'),
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'High-Precision 3D Laser Scanning with Trimble X9',
      youtubeId: 'mvGkQGVsQQI',
      thumb: 'https://i.ytimg.com/vi/mvGkQGVsQQI/hqdefault.jpg',
      category: 'Trimble',
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'Trimble GNSS R580',
      youtubeId: 'OmxZSrO7zTg',
      thumb: 'https://i.ytimg.com/vi/OmxZSrO7zTg/hqdefault.jpg',
      category: 'GPS / GNSS',
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'Spectra GNSS SP85',
      youtubeId: 'UV-q0YKINYQ',
      thumb: 'https://i.ytimg.com/vi/UV-q0YKINYQ/hqdefault.jpg',
      category: 'Spectra',
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'From Point Cloud to Digital Terrain Models',
      youtubeId: '5NWINk0x28w',
      thumb: 'https://i.ytimg.com/vi/5NWINk0x28w/hqdefault.jpg',
      category: t('gallery.category3dModeling'),
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'Trimble TDC6 Data Collector',
      youtubeId: 'r3wwTRqF0SA',
      thumb: 'https://i.ytimg.com/vi/r3wwTRqF0SA/hqdefault.jpg',
      category: t('brands.spectraSpec3'),
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'Trimble TDC600 Handheld',
      youtubeId: 'IBpddj4MPCs',
      thumb: 'https://i.ytimg.com/vi/IBpddj4MPCs/hqdefault.jpg',
      category: t('brands.spectraSpec3'),
    },
    {
      type: 'video' as const,
      platform: 'youtube' as const,
      title: 'NavVis VLX – From Reality to CAD in Hours',
      youtubeId: 'LgmeF3BZO4Y',
      thumb: 'https://i.ytimg.com/vi/LgmeF3BZO4Y/hqdefault.jpg',
      category: t('brands.navvisSpec1'),
    },


  ]

  const filtered = activeTab === 'all' ? mediaItems : mediaItems.filter(m => m.type === activeTab)

  const tabs = [
    { key: 'all' as const, label: t('gallery.tabAll'), count: mediaItems.length },
    { key: 'video' as const, label: t('gallery.tabVideos'), count: mediaItems.filter(m => m.type === 'video').length },
  ]

  return (
    <Section id="gallery" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t('gallery.label')}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            {t('gallery.headingPrefix')} <span className="gradient-text">{t('gallery.headingHighlight')}</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            {t('gallery.subheading')}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === t.key
                  ? 'bg-[oklch(0.72_0.14_180)] text-[oklch(0.13_0.02_250)] shadow-lg shadow-[oklch(0.72_0.14_180_/_0.2)]'
                  : 'bg-[var(--bg-tab)] border border-[var(--b-1)] text-[var(--t-6)] hover:border-[var(--accent-border-sm)] hover:text-[oklch(0.72_0.14_180)]'
              }`}
            >
              {t.label}
              <span className={`mr-1.5 text-xs ${activeTab === t.key ? 'text-[oklch(0.13_0.02_250_/_0.6)]' : 'text-[var(--t-10)]'}`}>({t.count})</span>
            </button>
          ))}
        </div>

        {/* Media grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.08, 0.4) }}
                className="group relative rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)] overflow-hidden hover:border-[var(--accent-border)] transition-all duration-500"
              >
                {item.type === 'video' && item.youtubeId && (
                  <>
                    {/* Video thumbnail */}
                    <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => setLightboxVideo(item.youtubeId!)}>
                      <img
                        src={item.thumb}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-[#FF0000]/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#FF0000]/30">
                          <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 mr-[-2px]"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      </div>
                      {/* Category badge */}
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[var(--bg-1)]/80 backdrop-blur-sm text-[oklch(0.72_0.14_180)] text-[10px] font-semibold border border-[var(--b-1)]">
                        {item.category}
                      </span>
                      {/* YouTube badge */}
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#FF0000] text-white text-[10px] font-bold flex items-center gap-1">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        YouTube
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-[var(--t-1)] font-semibold text-sm leading-relaxed line-clamp-2">{item.title}</h4>
                    </div>
                  </>
                )}


              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Channel link */}
        <div className="text-center mt-10">
          <a
            href="https://www.youtube.com/@axisgpssurveyinginstrument8400"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF0000]/10 border border-[#FF0000]/20 text-[#FF0000] font-semibold text-sm hover:bg-[#FF0000]/20 transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            {t('gallery.youtubeCta')}
          </a>
        </div>
      </div>

      {/* Video Lightbox */}
      <AnimatePresence>
        {lightboxVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${lightboxVideo}?autoplay=1&rel=0`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
              <button
                onClick={() => setLightboxVideo(null)}
                className="absolute top-3 left-3 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}

/* ───────── projects ───────── */
function Projects() {
  const { t } = useLang()
  const projects = [
    {
      title: t('projects.proj1Title'),
      category: t('projects.proj1Category'),
      desc: t('projects.proj1Desc'),
      tags: ['GIS', t('projects.proj1Tag1'), t('projects.proj1Tag2')],
    },
    {
      title: t('projects.proj2Title'),
      category: t('projects.proj2Category'),
      desc: t('projects.proj2Desc'),
      tags: [t('projects.proj2Tag1'), t('projects.proj1Tag1'), t('projects.proj2Tag3')],
    },
    {
      title: t('projects.proj3Title'),
      category: t('projects.proj3Category'),
      desc: t('projects.proj3Desc'),
      tags: ['UNDP', 'GIS', t('projects.proj3Tag1')],
    },
    {
      title: t('projects.proj4Title'),
      category: t('projects.proj4Category'),
      desc: t('projects.proj4Desc'),
      tags: [t('projects.proj4Tag1'), t('projects.proj4Tag2'), t('projects.proj4Tag3')],
    },
  ]

  return (
    <Section id="projects" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t('projects.label')}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            {t('projects.headingPrefix')} <span className="gradient-text">{t('projects.headingHighlight')}</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            {t('projects.subheading')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group relative p-6 sm:p-8 rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)] hover:border-[var(--accent-border)] transition-all duration-500 overflow-hidden"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-[oklch(0.72_0.14_180_/_0.04)] rounded-br-full" />

              <div className="relative">
                <span className="text-xs font-medium text-[oklch(0.72_0.14_180)] bg-[oklch(0.72_0.14_180_/_0.1)] px-3 py-1 rounded-full">
                  {p.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--t-1)] mt-4 mb-3">{p.title}</h3>
                <p className="text-[var(--t-7)] leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t, j) => (
                    <span key={j} className="text-xs px-3 py-1 rounded-full border border-[var(--b-1)] text-[var(--t-7)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────── review form ───────── */
function ReviewForm({ onSubmitted }: { onSubmitted?: (newItem?: TestimonialData) => void }) {
  const { t } = useLang()
  const [hoverRating, setHoverRating] = useState(0)
  const [selectedRating, setSelectedRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedRating === 0) return
    setLoading(true)
    setErrorMsg('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('review-name') as string,
      company: formData.get('review-company') as string,
      rating: selectedRating,
      text: formData.get('review-text') as string,
    }

    // Build a local testimonial object immediately for localStorage backup
    const localItem: TestimonialData = {
      id: 'local-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      name: data.name,
      company: data.company || null,
      text: data.text,
      rating: data.rating,
      createdAt: new Date().toISOString(),
      initials: getInitials(data.name),
      color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
      role: data.company || undefined,
    }

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (res.ok) {
        // Use the server-returned id if available, otherwise use local id
        const savedItem: TestimonialData = result.testimonial
          ? { ...localItem, id: result.testimonial.id || localItem.id }
          : localItem
        setSubmitted(true)
        form.reset()
        setSelectedRating(0)
        onSubmitted?.(savedItem)
        setTimeout(() => { setSubmitted(false); setFormOpen(false) }, 8000)
      } else {
        setErrorMsg(result.error || t('review.errorSubmit'))
      }
    } catch {
      // Even if server fails, save locally and show the testimonial
      setSubmitted(true)
      form.reset()
      setSelectedRating(0)
      onSubmitted?.(localItem)
      setTimeout(() => { setSubmitted(false); setFormOpen(false) }, 8000)
    } finally {
      setLoading(false)
    }
  }

  // Collapsed state: show inviting CTA — modern, non-traditional design
  if (!formOpen && !submitted) {
    return (
      <div className="relative text-center py-4">
        {/* Decorative floating stars */}
        <div className="absolute -top-2 right-8 animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '2.5s' }}>
          <Star className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24] opacity-60" />
        </div>
        <div className="absolute -top-1 left-12 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '3s' }}>
          <Star className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24] opacity-40" />
        </div>
        <div className="absolute bottom-4 right-16 animate-bounce" style={{ animationDelay: '1.4s', animationDuration: '2.8s' }}>
          <Star className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24] opacity-50" />
        </div>

        {/* Animated stars row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-1.5 mb-4"
        >
          {[1,2,3,4,5].map(i => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, rotate: -20 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: i * 0.1 + 0.3, type: 'spring', stiffness: 300 }}
            >
              <Star className="w-7 h-7 fill-[#FBBF24] text-[#FBBF24] drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
            </motion.div>
          ))}
        </motion.div>

        <h3 className="text-2xl sm:text-3xl font-bold text-[var(--t-0)] mb-2">
          {t('review.shareOpinionPrefix')} <span className="gradient-text">{t('review.shareOpinionHighlight')}</span>
        </h3>
        <p className="text-[var(--t-6)] text-sm mb-6 max-w-lg mx-auto leading-relaxed">
          {t('review.ctaDesc')}
        </p>

        {/* Modern CTA button with gradient ring */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setFormOpen(true)}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base overflow-hidden transition-all duration-500"
        >
          {/* Rotating gradient border effect */}
          <span className="absolute -inset-[2px] rounded-2xl bg-gradient-to-l from-[oklch(0.72_0.14_180)] via-[#FBBF24] to-[oklch(0.65_0.16_200)] opacity-80 group-hover:opacity-100 transition-opacity animate-[spin_4s_linear_infinite]" style={{ filter: 'blur(1px)' }} />
          {/* Inner background */}
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-l from-[oklch(0.72_0.14_180)] via-[oklch(0.68_0.16_190)] to-[oklch(0.65_0.16_200)] group-hover:from-[oklch(0.75_0.15_180)] group-hover:via-[oklch(0.70_0.17_190)] group-hover:to-[oklch(0.68_0.17_200)] transition-all duration-300" />
          {/* Shimmer sweep */}
          <span className="absolute inset-0 bg-gradient-to-l from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          {/* Content */}
          <span className="relative z-10 text-[oklch(0.13_0.02_250)] flex items-center gap-3">
            {/* Animated pen/plus icon */}
            <span className="relative w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 group-hover:rotate-90 transition-transform duration-400">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
            {t('review.addNow')}
            <MessageCircle className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300" />
          </span>
        </motion.button>
      </div>
    )
  }

  // Submitted state
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-[oklch(0.72_0.14_180_/_0.2)] to-[#FBBF24/0.2] flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-[oklch(0.72_0.14_180)]" />
        </div>
        <h3 className="text-2xl font-bold text-[var(--t-0)] mb-3">{t('review.submittedTitle')}</h3>
        <p className="text-[var(--t-7)] text-base leading-relaxed max-w-md mx-auto">
          {t('review.submittedDesc')}
        </p>
      </motion.div>
    )
  }

  // Open form state
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="text-center mb-5">
        <h3 className="text-xl font-bold text-[var(--t-0)] mb-1">{t('review.formTitle')}</h3>
        <p className="text-[var(--t-7)] text-sm">{t('review.formDesc')}</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
        {/* Star rating */}
        <div className="text-center">
          <label className="block text-sm text-[var(--t-6)] mb-3">{t('review.ratingLabel')}</label>
          <div className="flex items-center justify-center gap-2">
            {[1,2,3,4,5].map(i => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedRating(i)}
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform duration-200 hover:scale-125 active:scale-95"
              >
                <Star className={`w-9 h-9 transition-colors duration-200 ${
                  i <= (hoverRating || selectedRating)
                    ? 'fill-[#FBBF24] text-[#FBBF24]'
                    : 'text-[var(--t-10)]'
                }`} />
              </button>
            ))}
            {selectedRating > 0 && (
              <span className="mr-2 text-[#FBBF24] font-bold text-lg">{selectedRating}.0</span>
            )}
          </div>
        </div>

        {/* Name & Company */}
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            name="review-name"
            required
            placeholder={t('review.namePlaceholder')}
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--b-1)] text-[var(--t-1)] placeholder:text-[var(--t-10)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors text-sm"
          />
          <input
            name="review-company"
            placeholder={t('review.companyPlaceholder')}
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--b-1)] text-[var(--t-1)] placeholder:text-[var(--t-10)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors text-sm"
          />
        </div>

        {/* Review text */}
        <textarea
          name="review-text"
          required
          rows={3}
          placeholder={t('review.textPlaceholder')}
          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--b-1)] text-[var(--t-1)] placeholder:text-[var(--t-10)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors resize-none text-sm"
        />

        {/* Error message */}
        {errorMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <X className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={selectedRating === 0 || loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[oklch(0.72_0.14_180)] text-[oklch(0.13_0.02_250)] font-bold rounded-xl hover:bg-[oklch(0.75_0.15_180)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            ) : (
              <><Send className="w-4 h-4" /> {t('review.submit')}</>
            )}
          </button>
          <button
            type="button"
            onClick={() => { setFormOpen(false); setSelectedRating(0) }}
            className="px-5 py-3 rounded-xl border border-[var(--b-1)] text-[var(--t-6)] hover:text-[var(--t-3)] hover:border-[var(--b-2)] transition-colors text-sm"
          >
            {t('review.cancel')}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

/* ───────── testimonials data types ───────── */
interface TestimonialData {
  id: string
  name: string
  company?: string | null
  text: string
  rating: number
  createdAt?: string
  initials?: string
  color?: string
  role?: string
}

/* Color palette for avatar gradients */
const AVATAR_COLORS = [
  'from-[oklch(0.72_0.14_180)] to-[oklch(0.65_0.16_200)]',
  'from-[#E1306C] to-[#C1255E]',
  'from-[oklch(0.55_0.12_250)] to-[oklch(0.65_0.16_200)]',
  'from-[oklch(0.70_0.12_90)] to-[oklch(0.60_0.14_60)]',
  'from-[oklch(0.75_0.15_330)] to-[oklch(0.65_0.16_300)]',
  'from-[oklch(0.60_0.18_30)] to-[oklch(0.55_0.14_50)]',
  'from-[oklch(0.80_0.10_160)] to-[oklch(0.72_0.14_180)]',
]

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2)
  // Take first char of first and last name
  return parts[0][0] + parts[parts.length - 1][0]
}

/* ───────── localStorage helpers for testimonials persistence ───────── */
const LS_KEY = 'axis:testimonials:db'

function readLsTestimonials(): TestimonialData[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch { return [] }
}

function writeLsTestimonials(items: TestimonialData[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(items))
  } catch { /* quota exceeded etc */ }
}

/* Merge two testimonial arrays, deduplicating by id (server data wins) */
function mergeTestimonials(server: TestimonialData[], local: TestimonialData[]): TestimonialData[] {
  const seen = new Set(server.map(t => t.id))
  const extras = local.filter(t => !seen.has(t.id))
  return [...server, ...extras]
}

/* ───────── testimonials ───────── */
function Testimonials() {
  const { t } = useLang()
  const [activeIndex, setActiveIndex] = useState(0)
  const [dbTestimonials, setDbTestimonials] = useState<TestimonialData[]>([])
  const [loading, setLoading] = useState(true)

  // Seed testimonials (always shown)
  const seedTestimonials: TestimonialData[] = [
    {
      id: 'seed-1',
      name: t('testimonials.seed1Name'),
      role: t('testimonials.seed1Role'),
      text: 'منذ الإطلاقة كانت أكسيس رائدة في مجال التقنيات والحلول الهندسية المتقدمة، كان الحلم كبير والطموح عظيم، ومع الإصرار والمتابعة والكفاح تحقق الحلم وأنجزنا الطموح، وكنا رواداً في مجالنا لنشكل نموذجاً فريداً في البلاد.',
      rating: 5,
      initials: 'ع ش',
      color: 'from-[#FBBF24] to-[#F59E0B]',
    },
    {
      id: 'seed-2',
      name: t('testimonials.seed2Name'),
      role: t('testimonials.seed2Role'),
      text: 'فريق اكسيس يعمل بشغف لتوفير حلول مسح متكاملة تلبي احتياجات المشاريع المختلفة، من أجهزة GPS إلى أنظمة المراقبة المتقدمة.',
      rating: 5,
      initials: 'سجى',
      color: 'from-[#E1306C] to-[#C1255E]',
    },
    {
      id: 'seed-3',
      name: t('testimonials.seed3Name'),
      role: t('testimonials.seed3Role'),
      text: 'نلتزم في اكسيس بتقديم أحدث التقنيات وأفضل الخدمات لعملائنا في قطاع المساحة والجيوماتكس، ونسعى دائماً لتجاوز توقعاتهم.',
      rating: 5,
      initials: 'أنس',
      color: 'from-[oklch(0.72_0.14_180)] to-[oklch(0.65_0.16_200)]',
    },
    {
      id: 'seed-4',
      name: t('testimonials.seed4Name'),
      role: t('testimonials.seed4Role'),
      text: 'نشيد بدور شركة اكسيس في إرفاد قطاع المساحة والجيوماتكس بأحدث التقنيات الحديثة من خلال مبادراتها وخبراتها المهنية للمساحين والمهندسين.',
      rating: 5,
      initials: 'أحمد',
      color: 'from-[oklch(0.55_0.12_250)] to-[oklch(0.65_0.16_200)]',
    },
  ]

  // Fetch testimonials from database on mount
  // Also uses localStorage as a persistent backup so testimonials never disappear
  useEffect(() => {
    async function fetchTestimonials() {
      // 1. Load cached testimonials from localStorage first (instant)
      const cached = readLsTestimonials()
      if (cached.length > 0) {
        const mapped = cached.map((t, i) => ({
          ...t,
          initials: t.initials || getInitials(t.name),
          color: t.color || AVATAR_COLORS[i % AVATAR_COLORS.length],
          role: t.role || t.company || undefined,
        }))
        setDbTestimonials(mapped)
        setLoading(false)
      }

      // 2. Fetch fresh data from server
      try {
        const res = await fetch('/api/testimonials')
        if (res.ok) {
          const data = await res.json()
          const serverMapped: TestimonialData[] = (data.testimonials || []).map((t: TestimonialData, i: number) => ({
            ...t,
            initials: getInitials(t.name),
            color: AVATAR_COLORS[i % AVATAR_COLORS.length],
            role: t.company || undefined,
          }))

          // 3. Merge server data with localStorage (server wins on conflicts, localStorage preserves items lost on server)
          const merged = mergeTestimonials(serverMapped, cached)

          // 4. Save merged data back to localStorage for next visit
          writeLsTestimonials(merged)

          setDbTestimonials(merged)
        }
      } catch { /* silent */ } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  // Combine: seed + DB testimonials
  const testimonials: TestimonialData[] = [...seedTestimonials, ...dbTestimonials]

  // Auto-rotate
  useEffect(() => {
    if (testimonials.length <= 1) return
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <Section id="testimonials" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[oklch(0.72_0.14_180_/_0.04)] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[oklch(0.65_0.16_200_/_0.04)] rounded-full blur-3xl" />
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t('testimonials.label')}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-3">
            {t('testimonials.headingPrefix')} <span className="gradient-text">{t('testimonials.headingHighlight')}</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-xl mx-auto text-sm">
            {t('testimonials.subheading')}
          </p>
        </div>

        {/* Submit your review - PROMINENT, at the top so users see it first */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-12 p-6 sm:p-8 rounded-3xl border-2 border-dashed border-[oklch(0.72_0.14_180_/_0.3)] bg-[oklch(0.72_0.14_180_/_0.03)] overflow-hidden"
        >
          {/* Glow background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.72_0.14_180_/_0.04)] to-transparent" />
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-l from-transparent via-[oklch(0.72_0.14_180_/_0.5)] to-transparent" />

          <div className="relative z-10">
            <ReviewForm onSubmitted={(newItem?: TestimonialData) => {
              // If the form gives us the new item, save it to localStorage immediately
              if (newItem) {
                const cached = readLsTestimonials()
                const updated = [newItem, ...cached.filter(c => c.id !== newItem.id)]
                writeLsTestimonials(updated)
              }
              // Re-fetch testimonials from server after submission
              fetch('/api/testimonials')
                .then(r => r.json())
                .then(data => {
                  const serverMapped: TestimonialData[] = (data.testimonials || []).map((t: TestimonialData, i: number) => ({
                    ...t,
                    initials: getInitials(t.name),
                    color: AVATAR_COLORS[(i + seedTestimonials.length) % AVATAR_COLORS.length],
                    role: t.company || undefined,
                  }))
                  // Merge with localStorage to preserve any items lost on server
                  const cached = readLsTestimonials()
                  const merged = mergeTestimonials(serverMapped, cached)
                  writeLsTestimonials(merged)
                  setDbTestimonials(merged)
                  setActiveIndex(seedTestimonials.length) // Show the new testimonial
                })
                .catch(() => {
                  // Even if server fetch fails, ensure localStorage items are shown
                  const cached = readLsTestimonials()
                  if (cached.length > 0) {
                    const mapped = cached.map((t, i) => ({
                      ...t,
                      initials: t.initials || getInitials(t.name),
                      color: t.color || AVATAR_COLORS[i % AVATAR_COLORS.length],
                      role: t.role || t.company || undefined,
                    }))
                    setDbTestimonials(mapped)
                  }
                })
            }} />
          </div>
        </motion.div>

        {/* Featured Testimonial - Large Display */}
        {testimonials.length > 0 && (
          <div className="relative mb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[activeIndex]?.id || activeIndex}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.5 }}
                className="relative max-w-3xl mx-auto"
              >
                <div className="relative p-8 sm:p-12 rounded-3xl border border-[var(--b-1)] bg-[var(--bg-2)] overflow-hidden">
                  {/* Accent top line */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-l from-[oklch(0.72_0.14_180)] via-[oklch(0.65_0.16_200)] to-[oklch(0.72_0.14_180)]" />
                  
                  {/* Large quote icon */}
                  <div className="absolute top-4 right-4 opacity-[0.04]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 text-[oklch(0.72_0.14_180)]"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                  </div>

                  {/* Rating stars */}
                  <div className="flex items-center gap-1.5 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: j * 0.1 + 0.3 }}
                      >
                        <Star className={`w-6 h-6 ${j < testimonials[activeIndex].rating ? 'fill-[#FBBF24] text-[#FBBF24]' : 'text-[var(--t-10)]'}`} />
                      </motion.div>
                    ))}
                    <span className="mr-3 text-[var(--t-8)] text-sm font-medium">
                      {testimonials[activeIndex].rating}.0
                    </span>
                  </div>

                  {/* Quote text */}
                  <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--t-1)] leading-relaxed mb-8 relative z-10">
                    &ldquo;{testimonials[activeIndex].text}&rdquo;
                  </blockquote>

                  {/* Author info */}
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonials[activeIndex].color || AVATAR_COLORS[0]} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {testimonials[activeIndex].initials || getInitials(testimonials[activeIndex].name)}
                    </div>
                    <div>
                      <div className="font-bold text-[var(--t-0)] text-lg">{testimonials[activeIndex].name}</div>
                      <div className="text-[var(--t-8)] text-sm">{testimonials[activeIndex].role || testimonials[activeIndex].company || ''}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation dots */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`transition-all duration-500 rounded-full ${
                      i === activeIndex 
                        ? 'w-10 h-3 bg-[oklch(0.72_0.14_180)]' 
                        : 'w-3 h-3 bg-[var(--t-10)] hover:bg-[var(--t-8)]'
                    }`}
                    aria-label={`شهادة ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* All testimonials grid - small cards */}
        {testimonials.length > 0 && (
          <div className={`grid gap-5 mt-10 ${testimonials.length <= 3 ? 'md:grid-cols-' + testimonials.length : 'md:grid-cols-3'}`} style={{ gridTemplateColumns: testimonials.length <= 3 ? `repeat(${Math.min(testimonials.length, 3)}, minmax(0, 1fr))` : undefined }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveIndex(i)}
                className={`cursor-pointer group p-5 rounded-2xl border transition-all duration-300 ${
                  i === activeIndex 
                    ? 'border-[oklch(0.72_0.14_180_/_0.4)] bg-[oklch(0.72_0.14_180_/_0.05)] shadow-lg shadow-[oklch(0.72_0.14_180_/_0.08)]' 
                    : 'border-[var(--b-1)] bg-[var(--bg-2)] hover:border-[var(--accent-border-sm)]'
                }`}
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-3.5 h-3.5 ${j < t.rating ? 'fill-[#FBBF24] text-[#FBBF24]' : 'text-[var(--t-10)]'}`} />
                  ))}
                </div>
                <p className="text-[var(--t-4)] text-sm leading-relaxed mb-4 line-clamp-3">{t.text}</p>
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${t.color || AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-white font-bold text-xs`}>
                    {t.initials || getInitials(t.name)}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--t-1)] text-xs">{t.name}</div>
                    <div className="text-[var(--t-9)] text-[10px]">{t.role || t.company || ''}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}

/* ───────── why us ───────── */
function WhyUs() {
  const { t } = useLang()
  const reasons = [
    { icon: <CheckCircle2 className="w-5 h-5" />, text: t('whyUs.reason1') },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: t('whyUs.reason2') },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: t('whyUs.reason3') },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: t('whyUs.reason4') },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: t('whyUs.reason5') },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: t('whyUs.reason6') },
  ]

  return (
    <Section id="why-us" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[oklch(0.72_0.14_180_/_0.04)] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t('whyUs.label')}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight">
              {t('whyUs.headingPrefix')} <span className="gradient-text">{t('whyUs.headingHighlight')}</span>
            </h2>
            <p className="text-[var(--t-7)] leading-relaxed mb-8">
              نتميز بأننا الشركة الرائدة والأكبر في البلاد في مجال أجهزة المساحة والجيوماتكس.
              وكالة حصرية لأكبر الشركات العالمية مع شبكة فروع واسعة وفريق متخصص يقدم أفضل الحلول والدعم لعملائنا.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {reasons.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[oklch(0.72_0.14_180)] shrink-0 mt-0.5" />
                  <span className="text-[var(--t-4)] text-sm">{r.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[oklch(0.72_0.14_180_/_0.2)] animate-spin" style={{ animationDuration: '30s' }} />
              <div className="absolute inset-8 rounded-full border border-[oklch(0.72_0.14_180_/_0.1)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden glow-teal mb-4">
                    <img src="/logo.png" alt="اكسيس" className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="text-[oklch(0.72_0.14_180)] font-bold text-lg">اكسيس</div>
                  <div className="text-[var(--t-8)] text-xs">حلول هندسية متقدمة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ───────── team member card helper ───────── */
function TeamCard({
  member, size, index, showLine,
}: {
  member: {
    name: string; role: string; initials: string; photo: string;
    gradient: string; border: string; glow: string; badge: string;
  }
  size: 'founder' | 'executive' | 'manager' | 'staff'
  index: number
  showLine?: 'top' | 'bottom' | 'both'
}) {
  const { t } = useLang()
  const sizeConfig = {
    founder: { avatar: 'w-32 h-32 sm:w-40 sm:h-40', text: 'text-xl sm:text-2xl', roleText: 'text-base sm:text-lg', pad: 'p-7 sm:p-9', maxW: 'max-w-md', rounded: 'rounded-3xl', ring: 'ring-4', initialsText: 'text-4xl sm:text-5xl' },
    executive: { avatar: 'w-24 h-24 sm:w-28 sm:h-28', text: 'text-base sm:text-lg', roleText: 'text-sm sm:text-base', pad: 'p-5 sm:p-6', maxW: 'max-w-xs', rounded: 'rounded-2xl', ring: 'ring-2', initialsText: 'text-2xl sm:text-3xl' },
    manager: { avatar: 'w-20 h-20 sm:w-24 sm:h-24', text: 'text-sm sm:text-base', roleText: 'text-xs sm:text-sm', pad: 'p-4 sm:p-5', maxW: 'max-w-[200px]', rounded: 'rounded-2xl', ring: 'ring-2', initialsText: 'text-xl sm:text-2xl' },
    staff: { avatar: 'w-16 h-16 sm:w-20 sm:h-20', text: 'text-xs sm:text-sm', roleText: 'text-[10px] sm:text-xs', pad: 'p-3 sm:p-4', maxW: 'max-w-[170px]', rounded: 'rounded-xl', ring: 'ring', initialsText: 'text-lg sm:text-xl' },
  }
  const cfg = sizeConfig[size]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className={`group relative ${cfg.rounded} border ${cfg.pad} bg-[var(--bg-3)] hover:bg-[var(--bg-hover)] transition-all duration-500 ${member.border} text-center w-full ${cfg.maxW} ${
        size === 'founder' ? 'border-2 shadow-xl shadow-[oklch(0.72_0.14_180_/_0.1)] hover:shadow-2xl hover:shadow-[oklch(0.72_0.14_180_/_0.18)] bg-gradient-to-b from-[oklch(0.28_0.03_250)] to-[oklch(0.24_0.03_250)]' : ''
      }`}
      >
        {/* Badge */}
        {member.badge && size === 'founder' && (
          <div className="absolute -top-5 left-1/2 -translate-x-1/2">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[oklch(0.72_0.14_180)] to-[oklch(0.65_0.16_200)] flex items-center justify-center shadow-lg shadow-[oklch(0.72_0.14_180_/_0.3)]">
                <Star className="w-5 h-5 text-[oklch(0.13_0.02_250)]" />
              </div>
              <div className="absolute -inset-1.5 rounded-full border-2 border-[oklch(0.72_0.14_180_/_0.3)] animate-pulse" />
            </div>
          </div>
        )}
        {member.badge && size !== 'founder' && (
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-l from-[oklch(0.65_0.16_200)] to-[oklch(0.55_0.12_250)] text-[oklch(0.97_0.005_250)] shadow-md whitespace-nowrap">
            {t('team.badge' + member.badge)}
          </span>
        )}

        {/* Avatar */}
        <div className={`relative mx-auto mb-3 ${cfg.avatar} ${size === 'founder' ? 'mt-3' : ''}`}>
          {member.photo ? (
            <div className={`w-full h-full ${cfg.rounded} overflow-hidden shadow-lg transition-transform duration-500 group-hover:scale-105 ${cfg.ring} ${member.border}`}>
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className={`w-full h-full ${cfg.rounded} bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-105`}>
              <span className={`text-white ${cfg.initialsText} font-bold select-none`}>{member.initials}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <h3 className={`text-[var(--t-0)] font-bold ${cfg.text} mb-1 leading-tight`}>{member.name}</h3>
        <p className={`text-[var(--t-6)] ${cfg.roleText} leading-relaxed`}>{member.role}</p>
      </div>
    </motion.div>
  )
}

/* ───────── org tree connector line ───────── */
function TreeLine({ type }: { type: 'vertical' | 'horizontal' | 'branch-down' }) {
  const lineColor = 'oklch(0.72 0.14 180 / 0.25)'
  if (type === 'vertical') {
    return <div className="w-0.5 h-8 sm:h-10 mx-auto" style={{ background: `linear-gradient(to bottom, ${lineColor}, oklch(0.72 0.14 180 / 0.08))` }} />
  }
  if (type === 'horizontal') {
    return <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, oklch(0.72 0.14 180 / 0.08), ${lineColor}, oklch(0.72 0.14 180 / 0.08))` }} />
  }
  return null
}

/* ───────── team ───────── */
function Team() {
  const { t } = useLang()
  const teamMembers = [
    {
      name: t('team.member1Name'),
      role: t('team.member1Role'),
      initials: 'س ع',
      photo: '/team/salame.jpg',
      gradient: 'from-[oklch(0.72_0.14_180)] to-[oklch(0.65_0.16_200)]',
      border: 'border-[oklch(0.72_0.14_180_/_0.3)]',
      glow: 'shadow-[oklch(0.72_0.14_180_/_0.15)]',
      badge: 'Founder',
    },
    {
      name: t('team.member2Name'),
      role: t('team.member2Role'),
      initials: 'ع ش',
      photo: '/team/adnan.jpg',
      gradient: 'from-[oklch(0.65_0.16_200)] to-[oklch(0.55_0.12_250)]',
      border: 'border-[oklch(0.65_0.16_200_/_0.3)]',
      glow: 'shadow-[oklch(0.65_0.16_200_/_0.15)]',
      badge: 'Executive',
    },
    {
      name: t('team.member3Name'),
      role: t('team.member3Role'),
      initials: 'و ب',
      photo: '/team/walaa.jpg',
      gradient: 'from-[oklch(0.70_0.12_90)] to-[oklch(0.60_0.14_60)]',
      border: 'border-[oklch(0.70_0.12_90_/_0.3)]',
      glow: 'shadow-[oklch(0.70_0.12_90_/_0.15)]',
      badge: 'Accounting',
    },
    {
      name: t('team.member4Name'),
      role: t('team.member4Role'),
      initials: 'أ ح',
      photo: '/team/anas.jpg',
      gradient: 'from-[oklch(0.60_0.18_30)] to-[oklch(0.55_0.14_50)]',
      border: 'border-[oklch(0.60_0.18_30_/_0.3)]',
      glow: 'shadow-[oklch(0.60_0.18_30_/_0.15)]',
      badge: 'Branch',
    },
    {
      name: t('team.member5Name'),
      role: t('team.member5Role'),
      initials: 'أ خ',
      photo: '/team/alaa.jpg',
      gradient: 'from-[oklch(0.75_0.15_330)] to-[oklch(0.65_0.16_300)]',
      border: 'border-[oklch(0.75_0.15_330_/_0.3)]',
      glow: 'shadow-[oklch(0.75_0.15_330_/_0.15)]',
      badge: '',
    },
    {
      name: t('team.member6Name'),
      role: t('team.member6Role'),
      initials: 'س م',
      photo: '/team/saja_new.jpg',
      gradient: 'from-[oklch(0.80_0.10_160)] to-[oklch(0.72_0.14_180)]',
      border: 'border-[oklch(0.80_0.10_160_/_0.3)]',
      glow: 'shadow-[oklch(0.80_0.10_160_/_0.15)]',
      badge: '',
    },
    {
      name: t('team.member7Name'),
      role: t('team.member7Role'),
      initials: 'و و',
      photo: '/team/waad.jpg',
      gradient: 'from-[oklch(0.55_0.12_250)] to-[oklch(0.65_0.16_200)]',
      border: 'border-[oklch(0.55_0.12_250_/_0.3)]',
      glow: 'shadow-[oklch(0.55_0.12_250_/_0.15)]',
      badge: '',
    },
    {
      name: t('team.member8Name'),
      role: t('team.member8Role'),
      initials: 'ح ع',
      photo: '/team/hatem.jpg',
      gradient: 'from-[oklch(0.50_0.15_150)] to-[oklch(0.72_0.14_180)]',
      border: 'border-[oklch(0.50_0.15_150_/_0.3)]',
      glow: 'shadow-[oklch(0.50_0.15_150_/_0.15)]',
      badge: '',
    },
  ]

  const founder = teamMembers[0]
  const executive = teamMembers[1]
  const accounting = teamMembers[2] // ولاء - المحاسبة
  const branch = teamMembers[3] // أنس - فرع الخليل
  const departments = teamMembers.slice(4) // الأقسام الفنية

  return (
    <Section id="team" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[oklch(0.72_0.14_180_/_0.08)] rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[oklch(0.65_0.16_200_/_0.08)] rounded-full blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t('team.label')}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            {t('team.headingPrefix')} <span className="gradient-text">{t('team.headingHighlight')}</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            {t('team.subheading')}
          </p>
        </div>

        {/* ═══════ ORG TREE ═══════ */}
        <div className="flex flex-col items-center">

          {/* Level 1: المؤسس */}
          <TeamCard member={founder} size="founder" index={0} />

          {/* Line: Founder → Executive */}
          <div className="relative w-full flex flex-col items-center">
            <TreeLine type="vertical" />
            <svg width="2" height="40" className="sm:hidden" style={{ overflow: 'visible' }}>
              <line x1="1" y1="0" x2="1" y2="40" stroke="oklch(0.72 0.14 180 / 0.25)" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Level 2: المدير التنفيذي */}
          <TeamCard member={executive} size="executive" index={1} />

          {/* Line: Executive → branches */}
          <TreeLine type="vertical" />

          {/* Horizontal connector line spanning all Level 3 items */}
          <div className="w-full max-w-4xl relative">
            <div className="h-0.5 mx-auto" style={{ background: 'linear-gradient(to right, oklch(0.72 0.14 180 / 0.05), oklch(0.72 0.14 180 / 0.25), oklch(0.72 0.14 180 / 0.05))' }} />
          </div>

          {/* Level 3: المحاسبة (directly under Executive) + فرع الخليل + الأقسام */}
          <div className="w-full max-w-5xl mt-0">

            {/* Three main branches under Executive */}
            <div className="flex flex-col sm:flex-row items-start justify-center gap-3 sm:gap-4">

              {/* Branch A: المحاسبة - directly connected to Executive */}
              <div className="flex flex-col items-center flex-1">
                {/* Vertical connector from horizontal line */}
                <div className="w-0.5 h-6 sm:h-8" style={{ background: 'linear-gradient(to bottom, oklch(0.72 0.14 180 / 0.25), oklch(0.72 0.14 180 / 0.1))' }} />

                <TeamCard member={accounting} size="manager" index={2} />
              </div>

              {/* Branch B: فرع الخليل */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-0.5 h-6 sm:h-8" style={{ background: 'linear-gradient(to bottom, oklch(0.72 0.14 180 / 0.2), oklch(0.60 0.18 30 / 0.1))' }} />
                <TeamCard member={branch} size="manager" index={3} />
              </div>

              {/* Branch C: الأقسام الفنية (grouped) */}
              <div className="flex flex-col items-center flex-[2]">
                <div className="w-0.5 h-6 sm:h-8" style={{ background: 'linear-gradient(to bottom, oklch(0.72 0.14 180 / 0.2), oklch(0.55 0.12 250 / 0.1))' }} />
                {/* Department group label */}
                <div className="mb-3 px-4 py-1 rounded-full border border-[var(--b-3)] bg-[var(--bg-2)]">
                  <span className="text-[var(--t-6)] text-[10px] sm:text-xs font-semibold">{t('team.deptLabel')}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                  {departments.map((member, i) => (
                    <TeamCard key={`dept-${i}`} member={member} size="staff" index={4 + i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-[var(--b-3)] bg-[var(--bg-3)]">
            <Users className="w-5 h-5 text-[oklch(0.72_0.14_180)]" />
            <span className="text-[var(--t-5)] text-sm">{t('team.ctaText')}</span>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

/* ───────── contact ───────── */
function Contact() {
  const { t } = useLang()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || t('contact.errorSend'))
      }

      setSubmitted(true)
      form.reset()
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t('contact.errorUnexpected')
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  /* WhatsApp chat URL with pre-filled message */
  const whatsappMsg = encodeURIComponent(t('contact.whatsappMsg'))
  const whatsappUrl = `https://wa.me/972525289999?text=${whatsappMsg}`
  const messengerUrl = 'https://m.me/axisTRIMBLE'
  const instagramUrl = 'https://www.instagram.com/axis.gps/'

  const socialChannels = [
    {
      name: t('contact.whatsappName'),
      nameEn: 'WhatsApp',
      href: whatsappUrl,
      color: '#25D366',
      hoverColor: '#20BD5A',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
      desc: t('contact.whatsappDesc'),
      badge: t('contact.whatsappBadge'),
    },
    {
      name: t('contact.messengerName'),
      nameEn: 'Messenger',
      href: messengerUrl,
      color: '#0084FF',
      hoverColor: '#0070E0',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.2 5.42 3.15 7.15.16.14.26.34.27.56l.05 1.74c.02.57.61.94 1.14.72l1.94-.8c.16-.07.34-.09.51-.05.88.24 1.82.37 2.79.37 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm5.89 7.54l-2.83 4.48c-.45.71-1.39.89-2.07.39l-2.25-1.69a.75.75 0 00-.9 0l-3.04 2.31c-.41.31-.94-.2-.67-.64l2.83-4.48c.45-.71 1.39-.89 2.07-.39l2.25 1.69a.75.75 0 00.9 0l3.04-2.31c.41-.31.94.2.67.64z"/></svg>,
      desc: t('contact.messengerDesc'),
      badge: null,
    },
    {
      name: t('contact.instagramName'),
      nameEn: 'Instagram',
      href: instagramUrl,
      color: '#E1306C',
      hoverColor: '#C1255E',
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
      desc: t('contact.instagramDesc'),
      badge: null,
    },
  ]

  const contactDetails = [
    { icon: <Phone className="w-5 h-5" />, label: t('contact.phoneLabel'), value: '0594224497' },
    { icon: <Phone className="w-5 h-5" />, label: t('contact.phoneLabel'), value: '0595289999' },
    { icon: <Mail className="w-5 h-5" />, label: t('contact.emailLabel'), value: 'adnan@axis-gps.com' },
    { icon: <Mail className="w-5 h-5" />, label: t('contact.emailLabel'), value: 'salame@axis-gps.com' },
  ]

  return (
    <Section id="contact" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t('contact.label')}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            {t('contact.headingPrefix')} <span className="gradient-text">{t('contact.headingHighlight')}</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            {t('contact.subheading')}
          </p>
        </div>

        {/* ── Primary: Social Chat Channels ── */}
        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          {socialChannels.map((ch, i) => (
            <motion.a
              key={ch.nameEn}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)] hover:border-transparent transition-all duration-500 overflow-hidden"
              style={{ ['--ch-color' as string]: ch.color, ['--ch-hover' as string]: ch.hoverColor }}
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, ${ch.color}15, transparent 70%)` }} />
              {/* Top border accent */}
              <div className="absolute top-0 inset-x-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, transparent, ${ch.color}, transparent)` }} />

              {ch.badge && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white" style={{ background: ch.color }}>
                  {ch.badge}
                </div>
              )}

              <div className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: `${ch.color}18` }}>
                <div style={{ color: ch.color }}>{ch.icon}</div>
              </div>

              <h3 className="relative z-10 text-xl font-bold text-[var(--t-0)] mb-1">{ch.name}</h3>
              <p className="relative z-10 text-[var(--t-8)] text-sm">{ch.desc}</p>

              <div className="relative z-10 mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all duration-300" style={{ background: ch.color }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                {t('contact.openApp')} {ch.name}
              </div>
            </motion.a>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact details + Map */}
          <div className="lg:col-span-2 space-y-4">
            {contactDetails.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-[var(--b-1)] bg-[var(--bg-2)] hover:border-[var(--accent-border-sm)] transition-all"
              >
                <div className="p-2.5 rounded-lg bg-[oklch(0.72_0.14_180_/_0.1)] text-[oklch(0.72_0.14_180)] shrink-0">
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs text-[var(--t-9)]">{c.label}</div>
                  <div className="text-[var(--t-1)] font-medium text-sm" dir="ltr">{c.value}</div>
                </div>
              </motion.div>
            ))}

            {/* Branches interactive map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)] overflow-hidden p-4 sm:p-5"
            >
              <h4 className="text-[oklch(0.72_0.14_180)] font-semibold text-sm mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {t('contact.mapTitle')}
              </h4>
              <BranchMap />
            </motion.div>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-6 sm:p-8 rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)]"
          >
            <h3 className="text-lg font-bold text-[var(--t-0)] mb-5 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[oklch(0.72_0.14_180)]" />
              {t('contact.formTitle')}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-[var(--t-6)] mb-2">{t('contact.nameLabel')}</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={t('contact.namePlaceholder')}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--b-1)] text-[var(--t-1)] placeholder:text-[var(--t-10)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--t-6)] mb-2">{t('contact.emailLabel')}</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="example@email.com"
                  dir="ltr"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--b-1)] text-[var(--t-1)] placeholder:text-[var(--t-10)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-[var(--t-6)] mb-2">{t('contact.phoneFormLabel')}</label>
              <input
                type="tel"
                name="phone"
                placeholder="+972 XX XXX XXXX"
                dir="ltr"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--b-1)] text-[var(--t-1)] placeholder:text-[var(--t-10)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-[var(--t-6)] mb-2">{t('contact.serviceLabel')}</label>
              <select name="service" className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--b-1)] text-[var(--t-1)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors appearance-none">
                <option value="">{t('contact.servicePlaceholder')}</option>
                <option value="gps">{t('contact.serviceGps')}</option>
                <option value="total-station">{t('contact.serviceTotalStation')}</option>
                <option value="scanning">{t('contact.service3dScanning')}</option>
                <option value="gis">{t('contact.serviceGis')}</option>
                <option value="monitoring">{t('contact.serviceMonitoring')}</option>
                <option value="training">{t('contact.serviceTraining')}</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm text-[var(--t-6)] mb-2">{t('contact.projectDetailsLabel')}</label>
              <textarea
                rows={4}
                name="message"
                required
                placeholder={t('contact.projectDetailsPlaceholder')}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--b-1)] text-[var(--t-1)] placeholder:text-[var(--t-10)] focus:border-[oklch(0.72_0.14_180)] focus:outline-none transition-colors resize-none"
              />
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 py-4 text-[oklch(0.72_0.14_180)] font-semibold"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  {t('contact.submitSuccess')}
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {error && (
                    <div className="mb-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[oklch(0.72_0.14_180)] text-[oklch(0.13_0.02_250)] font-bold rounded-xl hover:bg-[oklch(0.75_0.15_180)] transition-all duration-300 glow-teal-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t('contact.sendMessage')}
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </Section>
  )
}

/* ───────── documents / resources ───────── */
function Documents() {
  const { t } = useLang()
  const [activeDoc, setActiveDoc] = useState<string | null>(null)

  const docs = [
    {
      id: 'cv',
      title: t('docs.cvTitle'),
      description: t('docs.cvDesc'),
      icon: <BookOpen className="w-6 h-6" />,
      file: '/docs/cv-2025.pdf',
      color: 'from-[oklch(0.72_0.14_180)] to-[oklch(0.65_0.16_200)]',
      borderColor: 'border-[oklch(0.72_0.14_180_/_0.3)]',
      category: t('docs.cvTitle'),
    },
    {
      id: 'tech-support',
      title: t('docs.techSupportTitle'),
      description: t('docs.techSupportDesc'),
      icon: <Cog className="w-6 h-6" />,
      file: '/docs/technical-support.pdf',
      color: 'from-[oklch(0.55_0.12_250)] to-[oklch(0.65_0.16_200)]',
      borderColor: 'border-[oklch(0.55_0.12_250_/_0.3)]',
      category: t('docs.techSupportTitle'),
    },
  ]

  return (
    <Section id="documents" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[oklch(0.72_0.14_180_/_0.04)] rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-[oklch(0.65_0.16_200_/_0.04)] rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t('docs.label')}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            {t('docs.headingPrefix')} <span className="gradient-text">{t('docs.headingHighlight')}</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            {t('docs.subheading')}
          </p>
        </div>

        {/* Document cards - grouped by category */}
        {(() => {
          const categories = [
            { key: t('docs.cvTitle'), label: t('docs.cvTitle'), icon: <BookOpen className="w-7 h-7" /> },
            { key: t('docs.techSupportTitle'), label: t('docs.techSupportTitle'), icon: <Cog className="w-7 h-7" /> },
          ]
          return categories.map((cat) => {
            const catDocs = docs.filter(d => d.category === cat.key)
            if (catDocs.length === 0) return null
            return (
              <div key={cat.key} className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[oklch(0.72_0.14_180_/_0.15)] border border-[oklch(0.72_0.14_180_/_0.3)] flex items-center justify-center text-[oklch(0.72_0.14_180)]">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--t-0)]">{cat.label}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {catDocs.map((doc, i) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className={`group relative rounded-2xl border ${doc.borderColor} bg-[var(--bg-2)] hover:bg-[var(--bg-3)] transition-all duration-500 overflow-hidden hover:shadow-lg hover:shadow-[oklch(0.72_0.14_180_/_0.06)] cursor-pointer`}
                      onClick={() => setActiveDoc(doc.id)}
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <div className="flex items-center gap-4 p-4 sm:p-5">
                        {/* Icon */}
                        <div className={`shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${doc.color} flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-105`}>
                          {doc.icon}
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[var(--t-0)] font-bold text-sm sm:text-base mb-1 leading-tight">{doc.title}</h4>
                          <p className="text-[var(--t-8)] text-xs leading-relaxed line-clamp-2">{doc.description}</p>
                        </div>
                        {/* View button */}
                        <div className="shrink-0 flex flex-col items-center gap-1">
                          <div className="w-10 h-10 rounded-full bg-[oklch(0.72_0.14_180_/_0.1)] group-hover:bg-[oklch(0.72_0.14_180)] flex items-center justify-center transition-all duration-300">
                            <Eye className="w-4 h-4 text-[oklch(0.72_0.14_180)] group-hover:text-[oklch(0.13_0.02_250)] transition-colors duration-300" />
                          </div>
                          <span className="text-[9px] text-[var(--t-9)] group-hover:text-[oklch(0.72_0.14_180)] transition-colors">{t('docs.view')}</span>
                        </div>
                        {/* Lock badge */}
                        <div className="absolute top-2 left-2 flex items-center gap-1 opacity-50">
                          <Lock className="w-2.5 h-2.5 text-[var(--t-8)]" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })
        })()}

        {/* PDF Viewer Modal */}
        <AnimatePresence>
          {activeDoc && (() => {
            const doc = docs.find(d => d.id === activeDoc)
            if (!doc) return null
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={() => setActiveDoc(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative w-full max-w-5xl h-[85vh] bg-[var(--bg-1)] rounded-2xl border border-[var(--b-2)] overflow-hidden shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {/* Modal header */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--b-1)] bg-[var(--bg-2)]">
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-[oklch(0.72_0.14_180)]" />
                      <span className="text-[var(--t-2)] text-sm font-semibold">{doc.title}</span>
                      <span className="text-[var(--t-8)] text-xs">- {t('docs.viewOnly')}</span>
                    </div>
                    <button
                      onClick={() => setActiveDoc(null)}
                      className="w-8 h-8 rounded-lg bg-[oklch(0.30_0.03_250)] hover:bg-[oklch(0.40_0.04_250)] flex items-center justify-center text-[var(--t-4)] transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {/* PDF viewer - view only, no download */}
                  <div
                    className="w-full h-[calc(100%-52px)] relative"
                    style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                    onContextMenu={(e) => e.preventDefault()}
                    onCopy={(e) => e.preventDefault()}
                  >
                    {/* Invisible overlay to block direct interaction with PDF toolbar */}
                    <div className="absolute top-0 left-0 right-0 h-10 z-10" onContextMenu={(e) => e.preventDefault()} />
                    <object
                      data={`${doc.file}#toolbar=0&navpanes=0&scrollbar=1&page=1&view=FitH`}
                      type="application/pdf"
                      className="w-full h-full"
                      title={doc.title}
                    >
                      <embed
                        src={`${doc.file}#toolbar=0&navpanes=0&scrollbar=1&page=1&view=FitH`}
                        type="application/pdf"
                        className="w-full h-full"
                      />
                    </object>
                  </div>
                </motion.div>
              </motion.div>
            )
          })()}
        </AnimatePresence>
      </div>
    </Section>
  )
}

/* ───────── footer ───────── */
function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-[var(--b-1)] bg-[var(--bg-0)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img src="/logo.png" alt={t('nav.logoAlt')} className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-bold gradient-text">اكسيس</span>
                <span className="block text-[10px] text-[var(--t-8)]">للحلول الهندسية المتقدمة</span>
              </div>
            </div>
            <p className="text-[var(--t-8)] text-sm leading-relaxed mb-4">
              {t('footer.desc')}
            </p>
            {/* Footer Social Icons */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className="w-9 h-9 rounded-lg bg-[var(--bg-tab)] border border-[var(--b-1)] flex items-center justify-center text-[var(--t-8)] hover:text-[oklch(0.72_0.14_180)] hover:border-[var(--accent-border-sm)] transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[var(--t-1)] font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <div className="space-y-2">
              {[t('footer.linkHome'), t('footer.linkAbout'), t('footer.linkServices'), t('footer.linkGallery'), t('footer.linkContact')].map((l, i) => (
                <a key={i} href={`#${['hero', 'about', 'services', 'gallery', 'contact'][i]}`} className="block text-[var(--t-8)] hover:text-[oklch(0.72_0.14_180)] text-sm transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[var(--t-1)] font-semibold mb-4">{t('footer.servicesTitle')}</h4>
            <div className="space-y-2">
              {[t('footer.serviceGps'), t('footer.serviceTotalStation'), t('footer.service3dScanning'), t('footer.serviceGisVrs'), t('footer.serviceLaser'), 'Axis Campus'].map((s, i) => (
                <span key={i} className="block text-[var(--t-8)] text-sm">{s}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[var(--t-1)] font-semibold mb-4">{t('footer.contactTitle')}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[var(--t-8)] text-sm">
                <Phone className="w-4 h-4 text-[oklch(0.72_0.14_180)]" />
                <span dir="ltr">0594224497</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--t-8)] text-sm">
                <Phone className="w-4 h-4 text-[oklch(0.72_0.14_180)]" />
                <span dir="ltr">0595289999</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--t-8)] text-sm">
                <Mail className="w-4 h-4 text-[oklch(0.72_0.14_180)]" />
                <span dir="ltr">adnan@axis-gps.com</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--t-8)] text-sm">
                <Mail className="w-4 h-4 text-[oklch(0.72_0.14_180)]" />
                <span dir="ltr">salame@axis-gps.com</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--t-8)] text-sm">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <a href="https://wa.me/972525289999" target="_blank" rel="noopener noreferrer" className="hover:text-[oklch(0.72_0.14_180)] transition-colors">
                  <span dir="ltr">+972 52-528-9999</span>
                </a>
              </div>
              <div className="flex items-start gap-2 text-[var(--t-8)] text-sm">
                <MapPin className="w-4 h-4 text-[oklch(0.72_0.14_180)] mt-0.5 shrink-0" />
                <div className="space-y-1.5">
                  <a href="https://www.google.com/maps?q=32.7579702,35.3189103" target="_blank" rel="noopener noreferrer" className="block hover:text-[oklch(0.72_0.14_180)] transition-colors">
                    {t('footer.mainBranch')} ↗
                  </a>
                  <a href="https://www.google.com/maps?q=32.11146,34.96504" target="_blank" rel="noopener noreferrer" className="block hover:text-[oklch(0.72_0.14_180)] transition-colors">
                    {t('footer.northBranch')} ↗
                  </a>
                  <a href="https://www.google.com/maps?q=31.8652474,35.2287424" target="_blank" rel="noopener noreferrer" className="block hover:text-[oklch(0.72_0.14_180)] transition-colors">
                    {t('footer.ramallahBranch')} ↗
                  </a>
                  <a href="https://www.google.com/maps?q=31.537372,35.0987544" target="_blank" rel="noopener noreferrer" className="block hover:text-[oklch(0.72_0.14_180)] transition-colors">
                    {t('footer.hebronBranch')} ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[var(--b-1)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--t-10)] text-sm">
            {t('footer.copyright')} &copy; {new Date().getFullYear()} اكسيس للحلول الهندسية المتقدمة
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/axisTRIMBLE" target="_blank" rel="noopener noreferrer" className="text-[var(--t-10)] hover:text-[oklch(0.72_0.14_180)] text-xs transition-colors">Facebook</a>
            <a href="https://www.youtube.com/@axisgpssurveyinginstrument8400" target="_blank" rel="noopener noreferrer" className="text-[var(--t-10)] hover:text-[oklch(0.72_0.14_180)] text-xs transition-colors">YouTube</a>
            <a href="https://www.instagram.com/axis.gps/" target="_blank" rel="noopener noreferrer" className="text-[var(--t-10)] hover:text-[oklch(0.72_0.14_180)] text-xs transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ───────── floating whatsapp ───────── */
function FloatingWhatsApp() {
  const { t } = useLang()
  const [pulse, setPulse] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 5000)
    return () => clearTimeout(t)
  }, [])
  return (
    <motion.a
      href="https://wa.me/972525289999"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 flex items-center justify-center text-white hover:bg-[#20BD5A] hover:scale-110 transition-all duration-300 ${pulse ? 'animate-pulse' : ''}`}
      title={t('whatsapp.title')}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </motion.a>
  )
}

/* ───────── branches quick section ───────── */
function Branches() {
  const { t } = useLang()
  const branches = [
    {
      name: t('branches.mainBranch'),
      address: t('branches.mainBranchAddress'),
      phone: '04-6419995',
      lat: 32.7579702,
      lng: 35.3189103,
      color: '#0ea5a0',
    },
    {
      name: t('branches.northBranch'),
      address: t('branches.northBranchAddress'),
      phone: '0595289999',
      lat: 32.11146,
      lng: 34.96504,
      color: '#6366f1',
    },
    {
      name: t('branches.ramallahBranch'),
      address: t('branches.ramallahAddress'),
      phone: '02-2950149',
      lat: 31.92730,
      lng: 35.20910,
      color: '#f59e0b',
    },
    {
      name: t('branches.hebronBranch'),
      address: t('branches.hebronAddress'),
      phone: '0594224498',
      lat: 31.537372,
      lng: 35.0987544,
      color: '#ef4444',
    },
  ]

  return (
    <Section id="branches" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[oklch(0.72_0.14_180_/_0.04)] rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2">
            <MapPinned className="w-4 h-4" />
            فروعنا
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            {t('branches.headingPrefix')} <span className="gradient-text">{t('branches.headingHighlight')}</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            {t('branches.subheading')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {branches.map((b, i) => (
            <motion.a
              key={b.name}
              href={`https://www.google.com/maps?q=${b.lat},${b.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group relative p-6 rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)] hover:border-[var(--accent-border)] transition-all duration-500 overflow-hidden text-start"
            >
              {/* Color accent top */}
              <div className="absolute top-0 right-0 left-0 h-1 rounded-t-2xl" style={{ backgroundColor: b.color }} />
              
              {/* Hover glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: `${b.color}15` }} />

              <div className="relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${b.color}15`, border: `1px solid ${b.color}30` }}>
                  <MapPin className="w-5 h-5" style={{ color: b.color }} />
                </div>
                <h3 className="text-lg font-bold text-[var(--t-1)] mb-2">{b.name}</h3>
                <p className="text-[var(--t-7)] text-sm leading-relaxed mb-3">{b.address}</p>
                <div className="flex items-center gap-2 text-[var(--t-8)] text-xs">
                  <Phone className="w-3.5 h-3.5" />
                  <span dir="ltr">{b.phone}</span>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[oklch(0.72_0.14_180)] text-xs font-medium group-hover:gap-2 transition-all">
                  <span>{t('branches.viewOnMap')}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────── CEO message / quote ───────── */
function CEOMessage() {
  const { t } = useLang()
  return (
    <Section id="ceo-message" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[oklch(0.72_0.14_180_/_0.05)] rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[oklch(0.65_0.16_200_/_0.04)] rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2">
            <Quote className="w-4 h-4" />
            {t('ceo.label')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            {t('ceo.headingPrefix')} <span className="gradient-text">{t('ceo.headingHighlight')}</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-[oklch(0.72_0.14_180_/_0.2)] bg-[var(--bg-2)] p-8 sm:p-12"
        >
          {/* Decorative quote marks */}
          <div className="absolute top-4 right-6 text-[oklch(0.72_0.14_180)] opacity-15">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          </div>
          <div className="absolute bottom-4 left-6 text-[oklch(0.72_0.14_180)] opacity-15 rotate-180">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          </div>

          <div className="relative space-y-5">
            <p className="text-[var(--t-2b)] text-base sm:text-lg leading-loose">
              خلال أكثر من عشرين عاماً من الزمان، نجحت شركة أكسيس في أن تصبح الشركة الأولى في البلاد من خلال فروعها المنتشرة والتي تصل لكل المحافظات، والتي سهلت الوصول لكل من له علاقة بالمساحة من أفراد ومؤسسات أهلية وحكومية كالوزارات والبلديات والجامعات ومكاتب المساحة المرخصة والمساحين.
            </p>
            <p className="text-[var(--t-3)] text-base sm:text-lg leading-loose">
              تزايدت الطاقة الإنتاجية وصارت اكسيس دعامة قوية وأساسية في النهضة التكنولوجية والتقنية التي تشهدها البلاد في عالم المساحة وخاصة مع بدء أعمال ومشاريع التسوية الوطنية. لقد أعطت اكسيس دفعة قوية لعمليات المساحة والتسوية، وصارت مورّداً يعتمد عليه في تغذية التكنولوجيا الحديثة في عالم المساحة وتقنياتها وخصوصاً في تقنية GPS.
            </p>
            <p className="text-[var(--t-4)] text-base sm:text-lg leading-loose">
              حرصت إدارة شركة أكسيس على التجاوب السريع والفعال مع جهود الحكومة في التنمية والتطور في مجال المساحة، بإعتبار أن مشروع التسوية هو مشروع وطني بامتياز يهدف إلى حفظ الأرض والتي هي حجر الأساس في مشروع الدولة المنتظر. وعليه استطاعت أكسيس أن توفر ما يزيد عن 85% من احتياجات البلديات والمساحين العاملين في مشروع التسوية بأفضل التقنيات وبأسرع وقت وبتواصل ودعم فني مستمر بشكل يومي ومباشر.
            </p>

            {/* Highlighted quote */}
            <div className="relative my-8 px-6 py-5 rounded-2xl bg-[oklch(0.72_0.14_180_/_0.08)] border border-[oklch(0.72_0.14_180_/_0.15)]">
              <Quote className="absolute top-3 right-3 w-5 h-5 text-[oklch(0.72_0.14_180)] opacity-30" />
              <p className="text-[var(--t-1)] text-lg sm:text-xl font-bold leading-relaxed">
                {t('ceo.highlight')}
              </p>
            </div>

            {/* Signature */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-[var(--b-1)]">
              <div className="text-start">
                <p className="text-[var(--t-1)] font-bold text-base">{t('ceo.signatureName')}</p>
                <p className="text-[var(--t-7)] text-sm">{t('ceo.signatureRole')}</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[oklch(0.72_0.14_180)] to-[oklch(0.65_0.16_200)] flex items-center justify-center text-white font-bold text-xl shrink-0">
                س
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

/* ───────── social media feed ───────── */
function SocialFeed() {
  const { t } = useLang()
  const [activePlatform, setActivePlatform] = useState<'all' | 'instagram' | 'facebook' | 'youtube'>('all')

  const feedItems = [
    // === من حساب اكسيس على إنستغرام @axis.gps ===
    {
      platform: 'instagram' as const,
      title: 'من الميدان... مشاركة مميزة من المهندس أحمد دعباس أثناء العمل بجهاز Trimble R980',
      href: 'https://www.instagram.com/p/DZr0VzMgh6o',
      date: '2026',
    },
    {
      platform: 'instagram' as const,
      title: 'في البيئات المعقدة، لا مجال للتقدير والمجازفة... أكسيس تقدم لك الحقيقة الرقمية',
      href: 'https://www.instagram.com/reel/DXcfJXDCeDl',
      date: '2026',
    },
    {
      platform: 'instagram' as const,
      title: 'عُقد لقاء في جامعة القدس جمع شركة أكسيس مع طلاب الهندسة المعمارية',
      href: 'https://www.instagram.com/p/DYMDE8sF6cu',
      date: '2026',
    },
    // === من صفحة اكسيس على فيسبوك facebook.com/axisTRIMBLE ===
    {
      platform: 'facebook' as const,
      title: 'ألف مبارك لشركة جمان هوم في رام الله على انضمام جهاز Trimble X9',
      href: 'https://www.facebook.com/291397367620687',
      date: '2026',
    },
    {
      platform: 'facebook' as const,
      title: 'AXIS - Trimble Harrier 68i — جمع بيانات LiDAR والتصوير في رحلة واحدة',
      href: 'https://www.facebook.com/axisTRIMBLE',
      date: '2025',
    },
    {
      platform: 'facebook' as const,
      title: 'مجموعة أكسيس - شريكك في الحلول الهندسية المتقدمة',
      href: 'https://www.facebook.com/groups/1254042372448873',
      date: '2025',
    },
    // === من قناة اكسيس على يوتيوب @axisgpssurveyinginstrument8400 ===
    {
      platform: 'youtube' as const,
      title: 'Ram Quarry | 800 Dunums Drone Survey & High-Resolution Mapping',
      href: 'https://www.youtube.com/watch?v=pdsDcWzCtfg',
      date: '2026',
    },
    {
      platform: 'youtube' as const,
      title: 'NavVis VLX3 | From Point Clouds to Trusted Data',
      href: 'https://www.youtube.com/watch?v=mgnYTlZOw3w',
      date: '2026',
    },
    {
      platform: 'youtube' as const,
      title: 'Spot Meets Trimble X7 | Autonomous 3D Laser Scanning',
      href: 'https://www.youtube.com/watch?v=GOxT2vQnnaE',
      date: '2026',
    },
  ]

  const filtered = activePlatform === 'all' ? feedItems : feedItems.filter(f => f.platform === activePlatform)

  const platformConfig = {
    instagram: { color: 'from-[#833AB4] via-[#FD1D1D] to-[#F77737]', label: 'Instagram', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
    facebook: { color: 'from-[#1877F2] to-[#0d5bbf]', label: 'Facebook', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    youtube: { color: 'from-[#FF0000] to-[#cc0000]', label: 'YouTube', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  }

  return (
    <Section id="social" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[oklch(0.72_0.14_180)] text-sm font-semibold tracking-wider uppercase">{t('socialFeed.label')}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            {t('socialFeed.headingPrefix')} <span className="gradient-text">{t('socialFeed.headingHighlight')}</span>
          </h2>
          <p className="text-[var(--t-7)] max-w-2xl mx-auto">
            {t('socialFeed.subheading')}
          </p>
        </div>

        {/* Platform filter */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {(['all', 'instagram', 'facebook', 'youtube'] as const).map(p => (
            <button
              key={p}
              onClick={() => setActivePlatform(p)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activePlatform === p
                  ? 'bg-[oklch(0.72_0.14_180)] text-[oklch(0.13_0.02_250)] shadow-lg shadow-[oklch(0.72_0.14_180_/_0.2)]'
                  : 'bg-[var(--bg-tab)] border border-[var(--b-1)] text-[var(--t-6)] hover:border-[var(--accent-border-sm)] hover:text-[oklch(0.72_0.14_180)]'
              }`}
            >
              {p !== 'all' && platformConfig[p].icon}
              {p === 'all' ? t('socialFeed.filterAll') : platformConfig[p].label}
            </button>
          ))}
        </div>

        {/* Feed grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlatform}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((item, i) => (
              <motion.a
                key={`${item.platform}-${i}`}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.08, 0.4) }}
                className="group relative p-6 rounded-2xl border border-[var(--b-1)] bg-[var(--bg-2)] hover:border-[var(--accent-border)] transition-all duration-500"
              >
                {/* Platform badge */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-l ${platformConfig[item.platform].color} text-white text-[10px] font-bold mb-4`}>
                  {platformConfig[item.platform].icon}
                  {platformConfig[item.platform].label}
                </div>
                
                <h4 className="text-[var(--t-1)] font-semibold text-sm leading-relaxed mb-4">{item.title}</h4>
                
                <div className="flex items-center gap-1 text-[var(--t-8)] text-xs group-hover:text-[oklch(0.72_0.14_180)] transition-colors">
                  <span>{t('socialFeed.viewPost')}</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Social links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          {SOCIALS.map(s => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--bg-2)] border border-[var(--b-1)] text-[var(--t-5)] hover:border-[var(--accent-border)] hover:text-[oklch(0.72_0.14_180)] transition-all duration-300 text-sm font-medium"
            >
              {s.icon}
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ───────── floating theme toggle (PORTAL - rendered to document.body) ───────── */
function FloatingThemeToggle() {
  const { t } = useLang()
  const { theme, toggle: toggleTheme, autoMode, setAuto } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const toggleEl = (
    <div className="fixed bottom-6 right-6 z-[999999] flex flex-col items-center gap-2">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg bg-[var(--bg-2)] border border-[var(--b-1)] text-[var(--t-2)] text-xs whitespace-nowrap shadow-lg">
          {autoMode
            ? (theme === 'dark' ? t('theme.autoDark') : t('theme.autoLight'))
            : (theme === 'dark' ? t('theme.dark') : t('theme.light'))
          }
          <button
            onClick={(e) => { e.stopPropagation(); setAuto() }}
            className="block mt-1 text-[oklch(0.72_0.14_180)] hover:underline"
          >
            {autoMode ? '' : t('theme.returnAuto')}
          </button>
        </div>
      )}
      <button
        onClick={toggleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="group relative w-14 h-14 rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden"
        style={{
          boxShadow: theme === 'dark'
            ? '0 0 20px rgba(250,204,21,0.4), 0 4px 12px rgba(0,0,0,0.4)'
            : '0 0 20px rgba(30,41,59,0.3), 0 4px 12px rgba(0,0,0,0.15)',
        }}
        aria-label={theme === 'dark' ? t('theme.ariaDark') : t('theme.ariaLight')}
      >
        {/* Background */}
        <div className="absolute inset-0 transition-all duration-500" style={{
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
            : 'linear-gradient(135deg, #87CEEB 0%, #FFD700 50%, #FF8C00 100%)',
        }} />
        {/* Stars (dark mode) */}
        <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: theme === 'dark' ? 1 : 0 }}>
          <div className="absolute w-1 h-1 bg-white rounded-full" style={{ top: '20%', left: '25%', opacity: 0.8 }} />
          <div className="absolute w-0.5 h-0.5 bg-white rounded-full" style={{ top: '35%', left: '70%', opacity: 0.6 }} />
          <div className="absolute w-1 h-1 bg-white rounded-full" style={{ top: '15%', left: '55%', opacity: 0.7 }} />
          <div className="absolute w-0.5 h-0.5 bg-white rounded-full" style={{ top: '55%', left: '30%', opacity: 0.5 }} />
        </div>
        {/* Auto indicator dot */}
        {autoMode && (
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[oklch(0.72_0.14_180)] animate-pulse" />
        )}
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-500">
          {theme === 'dark' ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF8C00" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          )}
        </div>
      </button>
    </div>
  )

  return createPortal(toggleEl, document.body)
}

/* ───────── main page ───────── */
export default function Home() {
  return (
    <LangProvider>
    <div className="min-h-screen flex flex-col">
      <FloatingThemeToggle />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <CEOMessage />
        <Stats />
        <Brands />
        <SocialFeed />
        <Gallery />
        <Services />
        <Projects />
        <WhyUs />
        <Team />
        <Documents />
        <Testimonials />
        <Branches />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
    </LangProvider>
  )
}
