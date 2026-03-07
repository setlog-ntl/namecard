'use client';

import { Download } from 'lucide-react';
import { generateVCard } from '@/lib/vcard';
import type { SiteConfig } from '@/lib/config';
import { useLocale } from '@/lib/i18n';

interface Props { config: SiteConfig; }

export function SaveContactButton({ config }: Props) {
  const { t } = useLocale();
  const handleSave = () => {
    const vcard = generateVCard({ name: config.name, title: config.title, company: config.company, email: config.email, phone: config.phone, address: config.address, website: config.website });
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.name}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <button
      onClick={handleSave}
      className="w-full py-3 rounded-[var(--radius-md)] text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-md"
      style={{ backgroundColor: config.accentColor, boxShadow: `0 4px 14px ${config.accentColor}40` }}
    >
      <Download className="w-4 h-4" />
      {t('save.contact')}
    </button>
  );
}