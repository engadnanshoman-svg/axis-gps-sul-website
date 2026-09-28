export const dynamic = "force-static";
import { NextRequest, NextResponse } from 'next/server';

// Use Gmail until axis-gps.com domain is verified in Resend
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'eng.adnan.shoman@gmail.com';

/* ── Resend (primary) ── */
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  // Lazy import to avoid build-time errors
  const { Resend } = require('resend');
  return new Resend(apiKey);
}

/* ── Nodemailer (fallback SMTP) ── */
async function sendViaNodemailer(htmlContent: string, subject: string) {
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  });

  await transporter.sendMail({
    from: `"اكسيس للحلول الهندسية" <${process.env.SMTP_USER || 'noreply@axis-gps.com'}>`,
    to: TO_EMAIL,
    subject,
    html: htmlContent,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message, type, rating, company, text } = body;

    // Handle review type
    if (type === 'review') {
      if (!name || !text || !rating) {
        return NextResponse.json(
          { error: 'الرجاء ملء جميع الحقول المطلوبة' },
          { status: 400 }
        );
      }

      const starsHtml = Array.from({ length: 5 }, (_, i) =>
        i < rating ? '★' : '☆'
      ).join('');

      const reviewHtml = `
        <div dir="rtl" style="font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #FBBF24, #F59E0B); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">⭐ مشاركة جديدة من شركاء النجاح</h1>
          </div>
          <div style="background: white; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold; width: 120px;">الاسم</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">الشركة</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${company || 'غير محدد'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">التقييم</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #F59E0B; font-size: 24px;">${starsHtml} (${rating}/5)</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #64748b; font-weight: bold; vertical-align: top;">المشاركة</td>
                <td style="padding: 12px 0; color: #1e293b; line-height: 1.8;">${text}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background: #FFFBEB; border-radius: 8px; border-right: 4px solid #F59E0B;">
              <p style="margin: 0; color: #92400E; font-size: 14px;">
                تم إرسال هذه المشاركة من قسم "شركاء النجاح" على موقع اكسيس للحلول الهندسية
              </p>
            </div>
          </div>
        </div>
      `;

      const reviewSubject = `مشاركة جديدة من ${name} - تقييم ${rating}/5 ⭐`;

      // Try Resend
      const resend = getResend();
      if (resend) {
        const { error } = await resend.emails.send({
          from: 'اكسيس للحلول الهندسية <onboarding@resend.dev>',
          to: TO_EMAIL,
          subject: reviewSubject,
          html: reviewHtml,
        });
        if (error) console.error('Resend review error:', error);
      } else {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('⭐ NEW REVIEW SUBMISSION:');
        console.log(`  Name: ${name}`);
        console.log(`  Company: ${company || 'N/A'}`);
        console.log(`  Rating: ${rating}/5`);
        console.log(`  Text: ${text}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      }

      return NextResponse.json({ success: true, message: 'تم إرسال مشاركتك بنجاح' });
    }

    // Handle contact form type
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'الرجاء ملء جميع الحقول المطلوبة' },
        { status: 400 }
      );
    }

    // Build email content
    const serviceLabels: Record<string, string> = {
      'gps': 'أجهزة GPS و RTK',
      'total-station': 'أجهزة التوتل ستيشن',
      'scanning': 'المسح الضوئي ثلاثي الأبعاد',
      'gis': 'أنظمة GIS والخرائط',
      'monitoring': 'أنظمة مراقبة التحرك',
      'training': 'التدريب والدعم الفني',
    };

    const serviceName = service ? (serviceLabels[service] || service) : 'غير محدد';

    const htmlContent = `
      <div dir="rtl" style="font-family: 'Cairo', 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 12px;">
        <div style="background: linear-gradient(135deg, #0d9488, #0e7490); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 22px;">طلب عرض جديد - اكسيس</h1>
        </div>
        <div style="background: white; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold; width: 120px;">الاسم</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">البريد الإلكتروني</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; direction: ltr; text-align: right;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">رقم الهاتف</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; direction: ltr; text-align: right;">${phone || 'غير محدد'}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">نوع الخدمة</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0d9488; font-weight: bold;">${serviceName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #64748b; font-weight: bold; vertical-align: top;">تفاصيل المشروع</td>
              <td style="padding: 12px 0; color: #1e293b; line-height: 1.8;">${message}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f0fdfa; border-radius: 8px; border-right: 4px solid #0d9488;">
            <p style="margin: 0; color: #0d9488; font-size: 14px;">
              تم إرسال هذا الطلب من نموذج الاتصال على موقع اكسيس للحلول الهندسية المتقدمة
            </p>
          </div>
        </div>
      </div>
    `;

    const subject = `طلب عرض جديد من ${name} - ${serviceName}`;

    // Try Resend first
    const resend = getResend();
    if (resend) {
      const { error } = await resend.emails.send({
        from: 'اكسيس للحلول الهندسية <onboarding@resend.dev>',
        to: TO_EMAIL,
        subject,
        html: htmlContent,
      });

      if (error) {
        console.error('Resend error:', error);
        // Try nodemailer fallback
        if (process.env.SMTP_HOST) {
          try {
            await sendViaNodemailer(htmlContent, subject);
            console.log('✅ Email sent via SMTP fallback');
          } catch (smtpErr) {
            console.error('SMTP fallback error:', smtpErr);
            return NextResponse.json(
              { error: 'حدث خطأ في إرسال البريد الإلكتروني' },
              { status: 500 }
            );
          }
        } else {
          return NextResponse.json(
            { error: 'حدث خطأ في إرسال البريد الإلكتروني' },
            { status: 500 }
          );
        }
      } else {
        console.log('✅ Email sent via Resend to:', TO_EMAIL);
      }
    } else if (process.env.SMTP_HOST) {
      // No Resend key, try SMTP
      try {
        await sendViaNodemailer(htmlContent, subject);
        console.log('✅ Email sent via SMTP to:', TO_EMAIL);
      } catch (smtpErr) {
        console.error('SMTP error:', smtpErr);
        return NextResponse.json(
          { error: 'حدث خطأ في إرسال البريد الإلكتروني' },
          { status: 500 }
        );
      }
    } else {
      // No email service configured - log to console
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 NEW CONTACT FORM SUBMISSION (no email service configured):');
      console.log(`  Name: ${name}`);
      console.log(`  Email: ${email}`);
      console.log(`  Phone: ${phone || 'N/A'}`);
      console.log(`  Service: ${serviceName}`);
      console.log(`  Message: ${message}`);
      console.log('  ⚠️  Configure RESEND_API_KEY or SMTP settings in .env');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }

    return NextResponse.json({ success: true, message: 'تم إرسال رسالتك بنجاح' });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع' },
      { status: 500 }
    );
  }
}
