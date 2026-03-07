'use client';

import { useState } from 'react';
import type { SiteConfig } from '@/lib/config';
import { ProfileCard } from '@/components/profile-card';
import { ContactInfo } from '@/components/contact-info';
import { SocialLinks } from '@/components/social-links';
import { QrCode } from '@/components/qr-code';
import { SaveContactButton } from '@/components/save-contact-button';
import { useLocale } from '@/lib/i18n';
import { ScanLine, User } from 'lucide-react';

interface Props { config: SiteConfig; }

export function FlippableCard({ config }: Props) {
  const [flipped, setFlipped] = useState(false);
  const { t } = useLocale();

  return (
    <div className="w-full">
      {/* Flip hint */}
      <p className="text-center text-xs text-gray-400 dark:text-gray-500 mb-3 select-none">
        {flipped ? t('card.showProfile') : t('card.showQr')}
      </p>

      <div
        className={`card-flip-container ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped((v) => !v)}
        role="button"
        tabIndex={0}
        aria-label={flipped ? t('card.showProfile') : t('card.showQr')}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped((v) => !v); } }}
      >
        <div className="card-flip-inner" style={{ minHeight: '480px' }}>
          {/* ── FRONT ── */}
          <div className="card-flip-front print-card rounded-[var(--radius-xl)] overflow-hidden bg-[var(--surface-elevated)] shadow-[var(--shadow-card-hover)]">
            {/* Accent bar */}
            <div
              className="h-1 w-full"
              style={{ background: `linear-gradient(90deg, ${config.accentColor}, ${config.accentColor}cc)` }}
            />
            {/* Hero gradient header */}
            <div
              className="h-24 w-full"
              style={{ background: `linear-gradient(160deg, ${config.accentColor}22 0%, ${config.accentColor}08 100%)` }}
            />
            <div className="px-6 pb-6 space-y-5">
              <ProfileCard config={config} />
              <div className="border-t border-[var(--surface-border)]" />
              <ContactInfo config={config} accentColor={config.accentColor} />
              {config.socials.length > 0 && (
                <>
                  <div className="border-t border-[var(--surface-border)]" />
                  <SocialLinks socials={config.socials} accentColor={config.accentColor} />
                </>
              )}
            </div>
            {/* Flip indicator */}
            <div className="flex items-center justify-center gap-1.5 py-3 border-t border-[var(--surface-border)]">
              <ScanLine className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
              <span className="text-[10px] text-gray-300 dark:text-gray-600 select-none">{t('card.tapToFlip')}</span>
            </div>
          </div>

          {/* ── BACK ── */}
          <div className="card-flip-back rounded-[var(--radius-xl)] overflow-hidden bg-[var(--surface-elevated)] shadow-[var(--shadow-card-hover)]">
            {/* Accent bar */}
            <div
              className="h-1 w-full"
              style={{ background: `linear-gradient(90deg, ${config.accentColor}, ${config.accentColor}cc)` }}
            />
            <div className="p-6 flex flex-col items-center gap-5">
              <div className="text-center space-y-1 pt-2">
                <p className="text-base font-bold text-gray-900 dark:text-gray-50">{config.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{config.title}</p>
              </div>
              <QrCode config={config} />
              <div className="w-full" onClick={(e) => e.stopPropagation()}>
                <SaveContactButton config={config} />
              </div>
            </div>
            {/* Flip indicator */}
            <div className="flex items-center justify-center gap-1.5 py-3 border-t border-[var(--surface-border)]">
              <User className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
              <span className="text-[10px] text-gray-300 dark:text-gray-600 select-none">{t('card.tapToFlip')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}