// app/sitemap/route.ts
import { getServerSideSitemap } from 'next-sitemap';
import { headers } from 'next/headers';

async function getServerBaseUrl() {
  const headersList:any = headers();
  const host = headersList.get('host');
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL; 
  if (fromEnv) return fromEnv.replace(/\/+$/, '');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  return host ? `${protocol}://${host}` : 'http://localhost:3000';
}

export async function GET() {
  const baseUrl = await getServerBaseUrl();
  const now = new Date().toISOString();


  const fields = [
    {
      loc: `${baseUrl}`,          
      lastmod: now,
      changefreq: 'daily',
      priority: 1.0,
    },
  
    { loc: `${baseUrl}/#about`,         lastmod: now, changefreq: 'weekly',  priority: 0.8 },
    { loc: `${baseUrl}/#services`,      lastmod: now, changefreq: 'weekly',  priority: 0.8 },
    { loc: `${baseUrl}/#work`,          lastmod: now, changefreq: 'weekly',  priority: 0.8 },
    { loc: `${baseUrl}/#testimonials`,  lastmod: now, changefreq: 'monthly', priority: 0.7 },
    { loc: `${baseUrl}/#faq`,           lastmod: now, changefreq: 'monthly', priority: 0.7 },
    { loc: `${baseUrl}/#contact`,       lastmod: now, changefreq: 'monthly', priority: 0.8 },
  ] as const;

  return getServerSideSitemap(fields as any);
}
