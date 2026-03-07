'use client';

import type { SiteConfig } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props { config: SiteConfig; }

export function ProfileCard({ config }: Props) {
  const { locale } = useLocale();
  const name = locale === 'en' && config.nameEn ? config.nameEn : config.name;
  const title = locale === 'en' && config.titleEn ? config.titleEn : config.title;
  const company = locale === 'en' && config.companyEn ? config.companyEn : config.company;
  const initials = name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="flex flex-col items-center text-center gap-2 pt-2">
      {config.avatarUrl
        ? (<img src={config.avatarUrl} alt={name} width={96} height={96} className="w-24 h-24 rounded-full object-cover -mt-16 ring-4 ring-[var(--surface-elevated)] shadow-md" />)
        : (<div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white -mt-16 ring-4 ring-[var(--surface-elevated)] shadow-md shrink-0" style={{ backgroundColor: config.accentColor }} aria-label={name}>{initials}</div>)
      }
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mt-1">{name}</h1>
      <p className="text-base font-medium text-gray-600 dark:text-gray-400">{title}</p>
      {company && (
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
          {company}
        </span>
      )}
    </div>
  );
}