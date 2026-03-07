'use client';

import { useSyncExternalStore } from 'react';

export type Locale = 'ko' | 'en';

const translations: Record<Locale, Record<string, string>> = {
  ko: { 'contact.call': '전화하기', 'contact.email': '이메일 보내기', 'contact.map': '지도에서 보기', 'contact.website': '웹사이트 방문', 'qr.hint': 'QR 코드를 스캔하면 연락처가 저장됩니다', 'save.contact': '연락처에 저장', 'theme.light': '라이트 모드로 전환', 'theme.dark': '다크 모드로 전환', 'footer.powered': 'Powered by', 'lang.switchLabel': 'Switch to English', 'lang.toggle': 'EN', 'card.showQr': '탭하면 QR 코드가 표시됩니다', 'card.showProfile': '탭하면 프로필로 돌아갑니다', 'card.tapToFlip': '탭하여 뒤집기' },
  en: { 'contact.call': 'Call', 'contact.email': 'Send email', 'contact.map': 'View on map', 'contact.website': 'Visit website', 'qr.hint': 'Scan QR code to save contact', 'save.contact': 'Save Contact', 'theme.light': 'Switch to light mode', 'theme.dark': 'Switch to dark mode', 'footer.powered': 'Powered by', 'lang.switchLabel': '한국어로 전환', 'lang.toggle': '한국어', 'card.showQr': 'Tap to show QR code', 'card.showProfile': 'Tap to return to profile', 'card.tapToFlip': 'Tap to flip' },
};

let _locale: Locale = 'ko';
const _listeners = new Set<() => void>();
function subscribe(cb: () => void) { _listeners.add(cb); return () => { _listeners.delete(cb); }; }
function getSnapshot() { return _locale; }
function getServerSnapshot() { return 'ko' as Locale; }

if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('locale');
  if (saved === 'ko' || saved === 'en') { _locale = saved; document.documentElement.lang = saved; }
}

export function useLocale() {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setLocale = (l: Locale) => {
    _locale = l;
    localStorage.setItem('locale', l);
    document.documentElement.lang = l;
    _listeners.forEach((cb) => cb());
  };
  const t = (key: string) => translations[locale]?.[key] ?? key;
  return { locale, setLocale, t };
}