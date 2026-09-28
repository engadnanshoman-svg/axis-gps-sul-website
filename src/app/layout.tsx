import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "اكسيس | لأجهزة المساحة والجيوماتكس - AXIS GPS & Surveying Instruments",
    template: "%s | اكسيس - AXIS GPS",
  },
  description: "شركة اكسيس للحلول الهندسية المتقدمة - الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta. أحدث أجهزة GPS و RTK والمسح الضوئي ثلاثي الأبعاد وأنظمة مراقبة التحرك و VRS. 4 فروع رئيسية في كفر كنا وكفر قاسم ورام الله والخليل.",
  keywords: [
    "اكسيس", "AXIS GPS", "أجهزة المساحة", "GPS", "RTK", "GIS", "جيوماتكس",
    "Trimble", "NavVis", "Spectra", "Applanix", "Kaarta", "VRS",
    "توتل ستيشن", "مسح ضوئي", "ليزر", "Machine Control",
    "مساحة", "مسح أرضي", "أجهزة قياس", "جهاز GPS", "مستقبل GNSS",
    "مسح ثلاثي الأبعاد", "رسم خرائط", "خرائط رقمية", "مدن ذكية",
    "مراقبة تحرك", "توجيه آليات", "زراعة دقيقة", "واقع معزز",
    "كفر كنا", "كفر قاسم", "رام الله", "الخليل", "فلسطين",
    "أجهزة مساحة رام الله", "أجهزة مساحة الخليل", "أجهزة GPS فلسطين",
    "Trimble فلسطين", "NavVis الشرق الأوسط",
    "surveying instruments", "3D laser scanning", "total station",
    "surveying equipment", "GNSS receiver", "laser scanner",
    "mobile mapping", "GPS survey", "land surveying", "geomatics",
    "axis gps surveying", "axis surveying instruments",
    "GPS Palestine", "surveying equipment Ramallah", "GPS Hebron",
    "Trimble dealer Palestine", "NavVis Middle East",
    "RTK correction service", "VRS network",
  ],
  authors: [{ name: "اكسيس للحلول الهندسية المتقدمة", url: "https://axis-gps.com" }],
  creator: "AXIS GPS & Surveying Instruments",
  publisher: "AXIS GPS & Surveying Instruments",
  metadataBase: new URL('https://axis-gps.com'),
  alternates: {
    canonical: '/',
    languages: {
      'ar': '/',
      'en': '/',
    },
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32" },
      { url: "/logo.png", sizes: "192x192" },
    ],
    apple: "/logo.png",
    other: [
      { url: "/manifest.json", rel: "manifest" },
    ],
  },
  openGraph: {
    title: "اكسيس | لأجهزة المساحة والجيوماتكس - AXIS GPS",
    description: "الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta - أحدث أجهزة GPS و RTK والمسح الضوئي ثلاثي الأبعاد و VRS. 4 فروع في جميع أنحاء البلاد.",
    type: "website",
    locale: 'ar_PS',
    alternateLocale: ['en_US', 'ar_IL'],
    url: 'https://axis-gps.com',
    siteName: 'اكسيس - AXIS GPS',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'اكسيس للحلول الهندسية المتقدمة - AXIS GPS & Surveying Instruments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'اكسيس | لأجهزة المساحة والجيوماتكس - AXIS GPS',
    description: 'الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta - أحدث أجهزة GPS و RTK',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  classification: 'Surveying Equipment & GPS Solutions',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'اكسيس AXIS GPS',
    'mobile-web-app-capable': 'yes',
    'theme-color': '#0B1120',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data: Organization (JSON-LD)
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'اكسيس للحلول الهندسية المتقدمة',
    alternateName: ['AXIS GPS & Surveying Instruments', 'Axis GPS', 'اكسيس'],
    url: 'https://axis-gps.com',
    logo: 'https://axis-gps.com/logo.png',
    description: 'الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta - أحدث أجهزة GPS و RTK والمسح الضوئي ثلاثي الأبعاد و VRS',
    foundingDate: '2004',
    founder: {
      '@type': 'Person',
      name: 'سلامة عواودة',
      jobTitle: 'Founder',
    },
    telephone: ['+972-4-641-9995', '+972-52-528-9999'],
    email: 'info@axis-gps.com',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Tziporit Industrial Zone, HaSadna St',
        addressLocality: 'Nof HaGalil',
        addressCountry: 'IL',
        name: 'الفرع الرئيسي - تسيفوريت',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'شارع علي بن أبي طالب 2',
        addressLocality: 'كفر قاسم',
        addressCountry: 'IL',
        name: 'فرع الشمال - كفر قاسم',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'شارع الإرسال قرب السفينة',
        addressLocality: 'رام الله',
        addressCountry: 'PS',
        name: 'فرع رام الله',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'شارع عين سارة مقابل ستاد الحسين',
        addressLocality: 'الخليل',
        addressCountry: 'PS',
        name: 'فرع الخليل',
      },
    ],
    sameAs: [
      'https://www.facebook.com/axisTRIMBLE',
      'https://www.instagram.com/axis.gps/',
      'https://www.youtube.com/@axisgpssurveyinginstrument8400',
    ],
    brand: [
      { '@type': 'Brand', name: 'Trimble' },
      { '@type': 'Brand', name: 'NavVis' },
      { '@type': 'Brand', name: 'Spectra Precision' },
      { '@type': 'Brand', name: 'Applanix' },
      { '@type': 'Brand', name: 'Kaarta' },
    ],
  };

  // Structured data: LocalBusiness (JSON-LD)
  const businessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://axis-gps.com#business',
    name: 'اكسيس للحلول الهندسية المتقدمة',
    alternateName: 'AXIS GPS & Surveying Instruments',
    image: 'https://axis-gps.com/logo.png',
    url: 'https://axis-gps.com',
    telephone: '+972-4-641-9995',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tziporit Industrial Zone, HaSadna St',
      addressLocality: 'Nof HaGalil',
      addressCountry: 'IL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.7579702,
      longitude: 35.3189103,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '85',
    },
  };

  // Structured data: WebSite with search action (JSON-LD)
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'اكسيس للحلول الهندسية المتقدمة',
    alternateName: 'AXIS GPS',
    url: 'https://axis-gps.com',
    inLanguage: ['ar', 'en'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://axis-gps.com/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // Structured data: BreadcrumbList (JSON-LD)
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: 'https://axis-gps.com',
      },
    ],
  };

  // Structured data: Service (JSON-LD) - for rich service results
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'أجهزة وخدمات المساحة والجيوماتكس',
    provider: {
      '@type': 'Organization',
      name: 'اكسيس للحلول الهندسية المتقدمة',
    },
    description: 'أحدث أجهزة GPS و GNSS و RTK والمسح الضوئي ثلاثي الأبعاد وأنظمة GIS و VRS ومراقبة التحرك وتوجيه الآلات والليزر وبرمجيات المعالجة',
    serviceType: 'Surveying Equipment & Geomatics Solutions',
    areaServed: [
      { '@type': 'Place', name: 'فلسطين' },
      { '@type': 'Place', name: 'رام الله' },
      { '@type': 'Place', name: 'الخليل' },
      { '@type': 'Place', name: 'كفر كنا' },
      { '@type': 'Place', name: 'كفر قاسم' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'أجهزة وخدمات المساحة',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'أجهزة GPS و GNSS' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'أجهزة التوتل ستيشن' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'المسح الضوئي 3D' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'أنظمة GIS و VRS' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'رصد ومراقبة وتوجيه آليات' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'مستويات ليزر وبناء' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'برمجيات ومعالجة بيانات' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'تدريب Axis Campus' } },
      ],
    },
  };

  // Structured data: FAQPage (JSON-LD) - for rich FAQ snippets on Google
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'ما هي شركة اكسيس للحلول الهندسية المتقدمة؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'شركة اكسيس هي الشركة الرائدة والأكبر في البلاد في مجال تقنيات وحلول المساحة والجيوماتكس والمعلومات الجغرافية. الوكيل الحصري لشركات Trimble و NavVis و Spectra و Applanix و Kaarta العالمية. تمتلك 4 فروع رئيسية في كفر كنا وكفر قاسم ورام الله والخليل.',
        },
      },
      {
        '@type': 'Question',
        name: 'ما هي العلامات التجارية التي تتعامل معها اكسيس؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'اكسيس هي الوكيل الحصري لشركات Trimble و NavVis و Spectra Precision و Applanix و Kaarta. تشمل منتجاتها أجهزة GPS و GNSS والتوتل ستيشن والماسحات الضوئية وأنظمة GIS و VRS وبرمجيات المعالجة.',
        },
      },
      {
        '@type': 'Question',
        name: 'أين توجد فروع اكسيس؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'لدى اكسيس 4 فروع رئيسية: الفرع الرئيسي في تسيفوريت (كفر كنا)، فرع كفر قاسم، فرع رام الله، وفرع الخليل. كما يوجد مختبر ومعهد تدريب Axis Campus.',
        },
      },
      {
        '@type': 'Question',
        name: 'ما هي خدمات شبكة VRS من اكسيس؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'شبكة VRS من اكسيس توفر خدمات تصحيح الموقع RTK في الوقت الحقيقي، مما يتيح للمساحين والمهندسين الحصول على دقة سنتمترية باستخدام أجهزة GPS و GNSS. الخدمة متوفرة في جميع مناطق البلاد.',
        },
      },
      {
        '@type': 'Question',
        name: 'هل تقدم اكسيس خدمات تدريب على الأجهزة؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'نعم، تقدم اكسيس تدريباً مهنياً متخصصاً عبر معهد Axis Campus الذي يوفر ورش عمل ودورات اعتماد محترفين على أجهزة Trimble و NavVis وغيرها، مع مختبر مجهز ودعم فني متكامل.',
        },
      },
      {
        '@type': 'Question',
        name: 'كيف يمكنني التواصل مع اكسيس؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'يمكنك التواصل مع اكسيس عبر الهاتف: 04-641-9995 أو واتساب: 052-528-9999 أو البريد الإلكتروني: info@axis-gps.com. كما يمكنك زيارة أي من الفروع الأربعة في كفر كنا وكفر قاسم ورام الله والخليل.',
        },
      },
    ],
  };

  return (
    <html lang="ar" dir="rtl" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://images.ctfassets.net" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://sfile.chatglm.cn" />

        {/* JSON-LD Structured Data for Google Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="v9dNdjaArbsrV4g4j9J8U9c1RSSvIa0KeYf5SP0E-fM" />

        {/* Theme init script: auto-detect based on time + system preference */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('axis-theme-mode');
                  if (saved === 'auto' || saved === null) {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (prefersDark !== undefined) {
                      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
                    } else {
                      var hour = new Date().getHours();
                      document.documentElement.setAttribute('data-theme', (hour >= 6 && hour < 18) ? 'light' : 'dark');
                    }
                  } else {
                    document.documentElement.setAttribute('data-theme', saved);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="antialiased bg-background text-foreground"
        style={{ fontFamily: "'Cairo', 'Inter', 'Segoe UI', 'Noto Sans Arabic', Tahoma, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
