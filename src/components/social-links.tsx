'use client';

import { Linkedin, Twitter, Instagram, Github, Facebook, Youtube, Globe, type LucideIcon } from 'lucide-react';
import type { SocialItem } from '@/lib/config';

const socialIcons: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
};

interface Props { socials: SocialItem[]; accentColor: string; }

export function SocialLinks({ socials, accentColor }: Props) {
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      {socials.map((social, i) => {
        const Icon = socialIcons[social.platform] ?? Globe;
        return (
          <a
            key={i}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.platform}
            className="w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-md"
            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
          >
            <Icon className="w-5 h-5" />
          </a>
        );
      })}
    </div>
  );
}