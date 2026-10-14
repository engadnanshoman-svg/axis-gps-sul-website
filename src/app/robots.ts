export const dynamic = "force-static";
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://axis-gps-sul-website.vercel.app/sitemap.xml',
    host: 'https://axis-gps-sul-website.vercel.app',
  }
}
