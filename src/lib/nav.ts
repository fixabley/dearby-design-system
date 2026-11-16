import type { IconName } from '@/icons';

/**
 * 앱의 탭(웹 사이드바·모바일 탭 막대가 함께 쓴다). 다섯 개: 홈 · 발견 · QR · 연락처 · 내 프로필(2026-11-17 계약 "QR 교환").
 * QR은 가운데의 평범한 탭(솟은 단추가 아니다)이고, 연락처는 받은 명함이 모이는 탭이라 명함 글리프를 쓴다
 */
export type NavKey = 'home' | 'discover' | 'qr' | 'contacts' | 'profile';
export const NAV: { key: NavKey; icon: IconName; label: string }[] = [
  { key: 'home', icon: 'home', label: '홈' },
  { key: 'discover', icon: 'explore', label: '발견' },
  { key: 'qr', icon: 'qr', label: 'QR' },
  { key: 'contacts', icon: 'card', label: '연락처' },
  { key: 'profile', icon: 'profile', label: '내 프로필' },
];
