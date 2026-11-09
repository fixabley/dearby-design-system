import type { IconName } from '@/icons';

/** 앱의 탭(웹 사이드바·모바일 탭 막대가 함께 쓴다) */
export type NavKey = 'home' | 'discover' | 'cards' | 'profile';
export const NAV: { key: NavKey; icon: IconName; label: string }[] = [
  { key: 'home', icon: 'home', label: '홈' },
  { key: 'discover', icon: 'explore', label: '발견' },
  { key: 'cards', icon: 'card', label: '명함' },
  { key: 'profile', icon: 'profile', label: '내 프로필' },
];
