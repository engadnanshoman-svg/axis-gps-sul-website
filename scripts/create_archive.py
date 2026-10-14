#!/usr/bin/env python3
"""Create a comprehensive project archive for Axis Engineering Solutions website."""
import os, json, datetime

PROJECT = "/home/z/my-project"
DOWNLOAD = f"{PROJECT}/download"
os.makedirs(DOWNLOAD, exist_ok=True)

# Project summary
summary = {
    "project": "Axis Engineering Solutions Website (اكسيس للحلول الهندسية المتقدمة)",
    "url": "https://axisps.com",
    "created": "2026-06-13",
    "lastUpdated": datetime.datetime.now().isoformat(),
    "techStack": {
        "framework": "Next.js 16.1.3 (App Router)",
        "styling": "Tailwind CSS v4 + custom CSS",
        "ui": "shadcn/ui components",
        "animations": "Framer Motion",
        "database": "Prisma (SQLite for testimonials)",
        "language": "TypeScript + Arabic RTL i18n",
        "deployment": "Node.js production server"
    },
    "features": [
        "Cinematic hero section with animated tech icons converging",
        "Two cinema-screen photo galleries (right: 64 images, left: 63 images) with real customer photos",
        "8 service categories with product listings and datasheet links",
        "Multi-language support (Arabic/English) with custom i18n",
        "Testimonials section with client reviews and star ratings",
        "Team section with staff profiles and photos",
        "Document gallery (CV, technical support, network docs)",
        "Branch map with 4 locations (Kafr Kanna, Kafr Qasim, Ramallah, Hebron)",
        "Contact form with email integration",
        "WhatsApp floating button",
        "Social media links (Facebook, Instagram, YouTube)",
        "Dark/Light theme toggle",
        "Responsive design for mobile/tablet/desktop",
        "SEO optimized (robots.txt, sitemap.xml, OG images)",
        "Google verification integrated"
    ],
    "branches": [
        {"name": "كفر كنا", "nameEn": "Kafr Kanna", "lat": 32.75, "lng": 35.39},
        {"name": "كفر قاسم", "nameEn": "Kafr Qasim", "lat": 32.10, "lng": 34.97},
        {"name": "رام الله", "nameEn": "Ramallah", "lat": 31.90, "lng": 35.20},
        {"name": "الخليل", "nameEn": "Hebron", "lat": 31.54, "lng": 35.10}
    ],
    "fileStructure": {
        "src/app/page.tsx": "Main single-page application (~4080 lines)",
        "src/app/layout.tsx": "Root layout with fonts and metadata",
        "src/app/globals.css": "Global styles and animations",
        "src/app/BranchMap.tsx": "Interactive branch map component",
        "src/app/api/contact/route.ts": "Contact form API endpoint",
        "src/app/api/testimonials/route.ts": "Testimonials CRUD API",
        "public/customers/": "Customer photos (64 right + 63 left + misc)",
        "public/products/": "Product images",
        "public/team/": "Team member photos",
        "public/docs/": "Company documents (CV, tech support, network)",
        "public/logo.png": "Company logo"
    },
    "recentFixes": [
        "Replaced all cinema screen images with real customer photos",
        "Removed Hebrew/Star of David imagery from the site",
        "Fixed hydration mismatch from Math.random() in Hero component",
        "Removed unused CLIENT_IMAGE_COUNT constant",
        "Added client count badge to left cinema screen for balance",
        "Fixed deterministic particle positioning"
    ],
    "pendingTasks": [
        "Remove Walaa's photo from right cinema screen (keep in team section)",
        "Slow down cinema speed and make display more attractive",
        "Import real customer reviews from Facebook/Instagram"
    ]
}

# Write summary
with open(f"{DOWNLOAD}/project-archive.json", "w", encoding="utf-8") as f:
    json.dump(summary, f, ensure_ascii=False, indent=2)

# Write readable summary
with open(f"{DOWNLOAD}/AXIS_Project_Archive.txt", "w", encoding="utf-8") as f:
    f.write("=" * 70 + "\n")
    f.write("  AXIS ENGINEERING SOLUTIONS - PROJECT ARCHIVE\n")
    f.write("  اكسيس للحلول الهندسية المتقدمة\n")
    f.write("=" * 70 + "\n\n")
    f.write(f"  Date: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}\n")
    f.write(f"  Website: https://axisps.com\n")
    f.write(f"  Framework: Next.js 16.1.3\n\n")
    
    f.write("-" * 70 + "\n")
    f.write("  TECH STACK\n")
    f.write("-" * 70 + "\n")
    for k, v in summary["techStack"].items():
        f.write(f"  {k}: {v}\n")
    
    f.write("\n" + "-" * 70 + "\n")
    f.write("  FEATURES\n")
    f.write("-" * 70 + "\n")
    for feat in summary["features"]:
        f.write(f"  • {feat}\n")
    
    f.write("\n" + "-" * 70 + "\n")
    f.write("  FILE STRUCTURE\n")
    f.write("-" * 70 + "\n")
    for path, desc in summary["fileStructure"].items():
        f.write(f"  {path}\n")
        f.write(f"    → {desc}\n")
    
    f.write("\n" + "-" * 70 + "\n")
    f.write("  RECENT FIXES\n")
    f.write("-" * 70 + "\n")
    for fix in summary["recentFixes"]:
        f.write(f"  ✓ {fix}\n")
    
    f.write("\n" + "-" * 70 + "\n")
    f.write("  PENDING TASKS\n")
    f.write("-" * 70 + "\n")
    for task in summary["pendingTasks"]:
        f.write(f"  ○ {task}\n")
    
    f.write("\n" + "=" * 70 + "\n")
    f.write("  HOW TO RUN THE PROJECT\n")
    f.write("=" * 70 + "\n")
    f.write("  1. Install dependencies:\n")
    f.write("     npm install\n\n")
    f.write("  2. Development mode:\n")
    f.write("     npx next dev -p 3000\n\n")
    f.write("  3. Production build:\n")
    f.write("     npx next build\n")
    f.write("     npx next start -p 3000\n\n")
    f.write("  4. Custom persistent server:\n")
    f.write("     node scripts/persistent-server.js\n")
    f.write("\n" + "=" * 70 + "\n")

print("Archive created successfully!")
print(f"  → {DOWNLOAD}/project-archive.json")
print(f"  → {DOWNLOAD}/AXIS_Project_Archive.txt")
