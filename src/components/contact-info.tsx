'use client';

import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import type { SiteConfig } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props { config: SiteConfig; accentColor?: string; }

export function ContactInfo({ config, accentColor }: Props) {
  const { t, locale } = useLocale();
  const address = locale === 'en' && config.addressEn ? config.addressEn : config.address;
  const accent = accentColor || config.accentColor;
  const items = [
    config.phone ? { icon: Phone, label: config.phone, href: `tel:${config.phone.replace(/[^+\d]/g, '')}`, ariaLabel: t('contact.call') } : null,
    config.email ? { icon: Mail, label: config.email, href: `mailto:${config.email}`, ariaLabel: t('contact.email') } : null,
    address ? { icon: MapPin, label: address, href: `https://maps.google.com/?q=${encodeURIComponent(address)}`, ariaLabel: t('contact.map') } : null,
    config.website ? { icon: Globe, label: config.website.replace(/^https?:\/\//, ''), href: config.website, ariaLabel: t('contact.website') } : null,
  ].filter(Boolean) as Array<{ icon: typeof Phone; label: string; href: string; ariaLabel: string }>;
  if (items.length === 0) return null;
  return (
    <div className="divide-y divide-[var(--surface-border)]">
      {items.map((item, i) => (
        <a
          key={i}
          href={item.href}
          target={item.icon === Globe || item.icon === MapPin ? '_blank' : undefined}
          rel={item.icon === Globe || item.icon === MapPin ? 'noopener noreferrer' : undefined}
          aria-label={item.ariaLabel}
          className="group flex items-center gap-3 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <span className="flex-shrink-0 w-8 h-8 rounded-[var(--radius-sm)] flex items-center justify-center transition-colors" style={{ backgroundColor: `${accent}18` }}>
            <item.icon className="w-4 h-4" style={{ color: accent }} />
          </span>
          <span className="text-sm truncate">{item.label}</span>
        </a>
      ))}
    </div>
  );
}