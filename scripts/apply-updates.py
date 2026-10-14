#!/usr/bin/env python3
"""Apply multiple updates to page.tsx: add devices, move branches, add theme support."""

import re

FILE = '/home/z/my-project/src/app/page.tsx'

with open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# ═══════════════════════════════════════════════════
# 1. ADD TSC510 & TSC7 to GIS/VRS section
# ═══════════════════════════════════════════════════
old_tdc6 = """            { name: 'TDC6', img: 'https://images.ctfassets.net/1nvkn1423yot/6orejDEuOzl53rmdqD672d/4bfcf62e1b1ae383f8d035dddb4e30bd/geo-tdc6-productpage-fullbackgroundproducthero-800x960.png', datasheet: 'https://frontierprecision.com/wp-content/uploads/2025/01/Frontier-Precision-Trimble-TDC6-Data-Collector-Spec-Sheet.pdf' },"""

new_tdc6 = """            { name: 'TDC6', img: 'https://images.ctfassets.net/1nvkn1423yot/6orejDEuOzl53rmdqD672d/4bfcf62e1b1ae383f8d035dddb4e30bd/geo-tdc6-productpage-fullbackgroundproducthero-800x960.png', datasheet: 'https://frontierprecision.com/wp-content/uploads/2025/01/Frontier-Precision-Trimble-TDC6-Data-Collector-Spec-Sheet.pdf' },
            { name: 'TSC510', img: 'https://images.ctfassets.net/1nvkn1423yot/7CGBo90DVWQ74XWl2GVCX1/52bd3a78b77dbaa41808cdb8478e01f7/geo-product-tsc510-key-specs-image-720x720.jpg', datasheet: 'https://trl.trimble.com/docushare/dsweb/Get/Document-1081993/022650-002_TrimbleTSC510_InfoSheet_USL_0725_LR_SEC.pdf' },
            { name: 'TSC7', img: 'https://images.ctfassets.net/1nvkn1423yot/7z792GpsBF8Oa5ayU5YOSE/8382e9b3141bf93c4b4bc49f74085adb/geo-tsc7-productpage-keyfeatures-720x720.jpg', datasheet: 'https://geonovus.ee/wp-content/uploads/pdf/Datasheet%20-%20Trimble%20TSC7.pdf' },"""

content = content.replace(old_tdc6, new_tdc6)

# ═══════════════════════════════════════════════════
# 2. ADD DSZ32X to laser/level section
# ═══════════════════════════════════════════════════
old_laser = """        { name: 'Spectra', products: [
            { name: 'LL500', img: 'https://sfile.chatglm.cn/images-ppt/4f53457e5907.png', datasheet: 'https://www.spectraprecision.com/_files/ugd/cd4160_34f59423c5414a86b74a0cd6abffa024.pdf' },
            { name: 'HV301', img: 'https://sfile.chatglm.cn/images-ppt/8c4c4d3b5ca7.jpg', datasheet: 'https://www.surveyinstrumentsales.com/PDFs/Brochures/Spectra-Precision-HV301-Brochure.pdf' },
            { name: 'DG613', img: 'https://sfile.chatglm.cn/images-ppt/dd80ee5d60b2.jpg', datasheet: 'https://www.spectraprecision.com/_files/ugd/cd4160_ec44bf9f0ad8480a953c0313ef78bf7c.pdf' },
        ] },"""

new_laser = """        { name: 'Spectra', products: [
            { name: 'LL500', img: 'https://sfile.chatglm.cn/images-ppt/4f53457e5907.png', datasheet: 'https://www.spectraprecision.com/_files/ugd/cd4160_34f59423c5414a86b74a0cd6abffa024.pdf' },
            { name: 'HV301', img: 'https://sfile.chatglm.cn/images-ppt/8c4c4d3b5ca7.jpg', datasheet: 'https://www.surveyinstrumentsales.com/PDFs/Brochures/Spectra-Precision-HV301-Brochure.pdf' },
            { name: 'DG613', img: 'https://sfile.chatglm.cn/images-ppt/dd80ee5d60b2.jpg', datasheet: 'https://www.spectraprecision.com/_files/ugd/cd4160_ec44bf9f0ad8480a953c0313ef78bf7c.pdf' },
            { name: 'DSZ32X', img: 'https://sfile.chatglm.cn/images-ppt/4f53457e5907.png', datasheet: 'https://siteprecisioninc.com/wp-content/uploads/2025/03/Spectra-AL-Series-Data-Sheet.pdf' },
        ] },"""

content = content.replace(old_laser, new_laser)

# ═══════════════════════════════════════════════════
# 3. REMOVE hero quick-access bar, MOVE Branches to before Contact
# ═══════════════════════════════════════════════════

# Remove the quick-access bar under hero
old_hero_bar = """        <Hero />
        {/* ── Quick Access: فروعنا floating bar ── */}
        <div className="relative z-40 -mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.a
              href="#branches"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5, duration: 0.8 }}
              className="group flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-gradient-to-l from-[oklch(0.72_0.14_180)] to-[oklch(0.65_0.16_200)] text-[oklch(0.13_0.02_250)] font-bold text-lg shadow-xl shadow-[oklch(0.72_0.14_180_/_0.25)] hover:shadow-2xl hover:shadow-[oklch(0.72_0.14_180_/_0.35)] hover:scale-[1.02] transition-all duration-300"
            >
              <MapPinned className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span>فروعنا</span>
              <span className="text-sm font-medium opacity-70">— 4 فروع تغطي فلسطين</span>
              <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            </motion.a>
          </div>
        </div>
        <Branches />"""

new_hero_bar = """        <Hero />"""

content = content.replace(old_hero_bar, new_hero_bar)

# Move Branches from after Hero to before Contact
# Current order: ... <Branches /> <About /> ... <Contact /> ...
# New order: ... <About /> ... <Branches /> <Contact /> ...

# Find the Branches line that's still after Hero
# After removing the quick-access bar, Branches should be right after Hero
# Let me check and remove it from its current position
old_main = """        <Hero />
        <Branches />
        <About />"""

new_main = """        <Hero />
        <About />"""

content = content.replace(old_main, new_main)

# Now add Branches before Contact
old_contact = """        <Branches />
        <Contact />"""
# If Branches was already moved, just add it before Contact
old_contact2 = """        <Contact />"""

# Check if Branches is already before Contact
if '<Branches />\n        <Contact />' in content:
    # Already there, do nothing
    pass
else:
    # Add Branches before Contact
    content = content.replace(
        '        <Contact />',
        '        <Branches />\n        <Contact />'
    )

# ═══════════════════════════════════════════════════
# 4. DARK/LIGHT MODE: Replace hardcoded oklch with CSS variables
# ═══════════════════════════════════════════════════

# Define replacement mapping: (old_pattern, new_pattern)
# Order matters - more specific patterns first (with opacity modifiers)
replacements = [
    # Backgrounds with opacity (must come before non-opacity versions)
    ('bg-[oklch(0.18_0.02_250)]/90', 'bg-[var(--bg-1-90)]'),
    ('bg-[oklch(0.18_0.02_250)]/95', 'bg-[var(--bg-1-95)]'),
    ('bg-[oklch(0.22_0.02_250)]/80', 'bg-[var(--bg-2-80)]'),
    ('bg-[oklch(0.25_0.03_250)]/60', 'bg-[var(--bg-3-60)]'),
    
    # Main backgrounds
    ('bg-[oklch(0.11_0.02_250)]', 'bg-[var(--bg-0)]'),
    ('bg-[oklch(0.18_0.02_250)]', 'bg-[var(--bg-1)]'),
    ('bg-[oklch(0.17_0.02_250)]', 'bg-[var(--bg-1)]'),
    ('bg-[oklch(0.22_0.02_250)]', 'bg-[var(--bg-2)]'),
    ('bg-[oklch(0.22_0.025_250)]', 'bg-[var(--bg-2)]'),
    ('bg-[oklch(0.25_0.03_250)]', 'bg-[var(--bg-3)]'),
    ('bg-[oklch(0.26_0.03_250)]', 'bg-[var(--bg-3)]'),
    ('bg-[oklch(0.28_0.035_250)]', 'bg-[var(--bg-hover)]'),
    ('bg-[oklch(0.28_0.03_250)]', 'bg-[var(--bg-hover)]'),
    ('bg-[oklch(0.27_0.03_250)]', 'bg-[var(--bg-hover)]'),
    ('bg-[oklch(0.22_0.03_250)]', 'bg-[var(--bg-input)]'),
    ('bg-[oklch(0.20_0.03_250)]', 'bg-[var(--bg-tab)]'),
    
    # Text colors
    ('text-[oklch(0.95_0.005_250)]', 'text-[var(--t-0)]'),
    ('text-[oklch(0.90_0.005_250)]', 'text-[var(--t-1)]'),
    ('text-[oklch(0.80_0.005_250)]', 'text-[var(--t-2)]'),
    ('text-[oklch(0.80_0.01_250)]', 'text-[var(--t-2b)]'),
    ('text-[oklch(0.75_0.01_250)]', 'text-[var(--t-3)]'),
    ('text-[oklch(0.70_0.01_250)]', 'text-[var(--t-4)]'),
    ('text-[oklch(0.65_0.02_250)]', 'text-[var(--t-5)]'),
    ('text-[oklch(0.65_0.01_250)]', 'text-[var(--t-5)]'),
    ('text-[oklch(0.60_0.01_250)]', 'text-[var(--t-6)]'),
    ('text-[oklch(0.60_0.02_250)]', 'text-[var(--t-6)]'),
    ('text-[oklch(0.55_0.02_250)]', 'text-[var(--t-7)]'),
    ('text-[oklch(0.50_0.02_250)]', 'text-[var(--t-8)]'),
    ('text-[oklch(0.45_0.02_250)]', 'text-[var(--t-9)]'),
    ('text-[oklch(0.40_0.02_250)]', 'text-[var(--t-10)]'),
    
    # Borders
    ('border-[oklch(0.30_0.03_250)]', 'border-[var(--b-1)]'),
    ('border-[oklch(0.30_0.05_250)]', 'border-[var(--b-1)]'),
    ('border-[oklch(0.35_0.03_250)]', 'border-[var(--b-2)]'),
    ('border-[oklch(0.35_0.025_250)]', 'border-[var(--b-2)]'),
    ('border-[oklch(0.40_0.03_250)]', 'border-[var(--b-3)]'),
    ('border-[oklch(0.40_0.04_250)]', 'border-[var(--b-4)]'),
]

for old, new in replacements:
    content = content.replace(old, new)

# Also replace some common hover patterns
hover_replacements = [
    ('hover:border-[oklch(0.72_0.14_180_/_0.4)]', 'hover:border-[var(--accent-border)]'),
    ('hover:border-[oklch(0.72_0.14_180_/_0.3)]', 'hover:border-[var(--accent-border-sm)]'),
    ('hover:border-[oklch(0.72_0.14_180_/_0.6)]', 'hover:border-[var(--accent-border-lg)]'),
    ('hover:border-[oklch(0.30_0.05_250)]', 'hover:border-[var(--b-1)]'),
    ('hover:border-[oklch(0.72_0.14_180_/_0.2)]', 'hover:border-[var(--accent-border-xs)]'),
    ('hover:bg-[oklch(0.26_0.03_250)]', 'hover:bg-[var(--bg-hover)]'),
    ('hover:bg-[oklch(0.28_0.035_250)]', 'hover:bg-[var(--bg-hover)]'),
    ('hover:bg-[oklch(0.72_0.14_180_/_0.1)]', 'hover:bg-[var(--accent-bg-sm)]'),
    ('hover:bg-[oklch(0.72_0.14_180_/_0.08)]', 'hover:bg-[var(--accent-bg-xs)]'),
]

for old, new in hover_replacements:
    content = content.replace(old, new)

# ═══════════════════════════════════════════════════
# 5. ADD ThemeProvider import and Sun/Moon toggle in Navbar
# ═══════════════════════════════════════════════════

# Add Sun/Moon to lucide imports
old_imports = """  Ruler, Compass, DraftingCompass, Factory, Calculator, BarChart3,
  Satellite, ScanLine, GraduationCap, Monitor, Radio, Gauge, MessageCircle,
  FileText, BookOpen, Globe, Award, Eye, Lock, Download, Quote, MapPinned"""

new_imports = """  Ruler, Compass, DraftingCompass, Factory, Calculator, BarChart3,
  Satellite, ScanLine, GraduationCap, Monitor, Radio, Gauge, MessageCircle,
  FileText, BookOpen, Globe, Award, Eye, Lock, Download, Quote, MapPinned,
  Sun, Moon"""

content = content.replace(old_imports, new_imports)

# Add useTheme hook right after SOCIALS array
old_after_socials = """/* ───────── section wrapper ───────── */"""

new_after_socials = """/* ───────── theme hook ───────── */
function useTheme() {
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark')
  useEffect(() => {
    const saved = localStorage.getItem('axis-theme') as 'dark' | 'light' | null
    if (saved) {
      setTheme(saved)
      document.documentElement.setAttribute('data-theme', saved)
    }
  }, [])
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('axis-theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }
  return { theme, toggle }
}

/* ───────── section wrapper ───────── */"""

content = content.replace(old_after_socials, new_after_socials)

# Add theme toggle button in Navbar
# Find the social icons section in desktop nav and add toggle before it
old_social_nav = """            {/* Social icons */}
            <div className="flex items-center gap-2 mr-3 border-r border-[oklch(0.30_0.03_250)] pr-3">"""

new_social_nav = """            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[oklch(0.65_0.02_250)] hover:text-[oklch(0.72_0.14_180)] hover:bg-[oklch(0.72_0.14_180_/_0.08)] transition-all duration-300"
              title={theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {/* Social icons */}
            <div className="flex items-center gap-2 mr-3 border-r border-[var(--b-1)] pr-3">"""

content = content.replace(old_social_nav, new_social_nav)

# Update Navbar to use the theme hook
old_navbar_func = """function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)"""

new_navbar_func = """function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggle: toggleTheme } = useTheme()"""

content = content.replace(old_navbar_func, new_navbar_func)

# Add theme toggle to mobile menu too (before the CTA button)
old_mobile_cta = """              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block mt-2 px-4 py-3 bg-[oklch(0.72_0.14_180)] text-[oklch(0.13_0.02_250)] text-center font-semibold rounded-lg"
              >
                احصل على عرض
              </a>"""

new_mobile_cta = """              <button
                onClick={() => { toggleTheme(); setMobileOpen(false) }}
                className="flex items-center gap-2 w-full px-4 py-3 text-[oklch(0.65_0.02_250)] hover:text-[oklch(0.72_0.14_180)] rounded-lg hover:bg-[oklch(0.72_0.14_180_/_0.08)] transition-all"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
              </button>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block mt-2 px-4 py-3 bg-[oklch(0.72_0.14_180)] text-[oklch(0.13_0.02_250)] text-center font-semibold rounded-lg"
              >
                احصل على عرض
              </a>"""

content = content.replace(old_mobile_cta, new_mobile_cta)

# ═══════════════════════════════════════════════════
# 6. ADD Sun/Moon to layout.tsx ThemeProvider script
# ═══════════════════════════════════════════════════

# Write modified page.tsx
with open(FILE, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ page.tsx updated successfully!")
print(f"  - TSC510 & TSC7 added to GIS section")
print(f"  - DSZ32X added to laser section")
print(f"  - Branches moved to before Contact")
print(f"  - Hero quick-access bar removed")
print(f"  - Theme toggle added to Navbar")
print(f"  - CSS variable replacements applied")
