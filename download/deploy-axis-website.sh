#!/bin/bash
# ============================================================
# 🚀 سكريبت نشر موقع اكسيس للحلول الهندسية المتقدمة
# AXIS GPS & Surveying Instruments - Deployment Script
# ============================================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  🚀 نشر موقع اكسيس للحلول الهندسية المتقدمة${NC}"
echo -e "${CYAN}  AXIS GPS & Surveying Instruments${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_DIR"

echo -e "${YELLOW}📁 مجلد المشروع: $PROJECT_DIR${NC}"
echo ""

# ── Step 1: Install dependencies ──
echo -e "${YELLOW}━━━ الخطوة 1/4: تثبيت الاعتماديات ━━━${NC}"
npm install
echo -e "${GREEN}✅ تم تثبيت الاعتماديات${NC}"
echo ""

# ── Step 2: Build the project ──
echo -e "${YELLOW}━━━ الخطوة 2/4: بناء المشروع ━━━${NC}"
npm run build
echo -e "${GREEN}✅ تم بناء المشروع بنجاح${NC}"
echo ""

# ── Step 3: Deploy to Vercel ──
echo -e "${YELLOW}━━━ الخطوة 3/4: نشر الموقع على Vercel ━━━${NC}"
echo ""
echo -e "${CYAN}سيتم فتح رابط في المتصفح للمصادقة${NC}"
echo -e "${CYAN}يرجى تسجيل الدخول أو إنشاء حساب مجاني${NC}"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}تثبيت Vercel CLI...${NC}"
    npm install -g vercel
fi

# Login to Vercel (will open browser for auth)
vercel login

# Deploy to production
echo ""
echo -e "${YELLOW}جاري النشر على Vercel...${NC}"
vercel --prod

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ تم نشر الموقع بنجاح على الإنترنت!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${CYAN}💡 نصائح:${NC}"
echo -e "  • يمكنك ربط دومين مخصص (مثل axis-gps.com) من لوحة تحكم Vercel"
echo -e "  • أي تعديل على الكود يتطلب إعادة تشغيل: vercel --prod"
echo -e "  • لوحة التحكم: https://vercel.com/dashboard"
echo ""
