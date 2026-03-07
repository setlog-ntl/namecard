import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: `${siteConfig.name} - 디지털 명함`,
  description: `${siteConfig.name} | ${siteConfig.title}`,
  openGraph: { title: `${siteConfig.name} - 디지털 명함`, description: `${siteConfig.name} | ${siteConfig.title}`, type: 'website', images: ['/api/og'] },
  twitter: { card: 'summary_large_image', title: `${siteConfig.name} - 디지털 명함`, description: `${siteConfig.name} | ${siteConfig.title}` },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
        <script dangerouslySetInnerHTML={{ __html: "(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}})()" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: siteConfig.name, jobTitle: siteConfig.title, ...(siteConfig.company ? { worksFor: { '@type': 'Organization', name: siteConfig.company } } : {}), ...(siteConfig.email || siteConfig.phone ? { contactPoint: { '@type': 'ContactPoint', ...(siteConfig.email ? { email: siteConfig.email } : {}), ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}) } } : {}), ...(siteConfig.website ? { url: siteConfig.website } : {}), ...(siteConfig.socials?.length ? { sameAs: siteConfig.socials.map((s: { url: string }) => s.url) } : {}) }) }} />
      </head>
      <body className="antialiased bg-gray-50 dark:bg-gray-900">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:shadow-lg focus:text-sm">본문으로 바로가기</a>
        {children}
      </body>
    </html>
  );
}