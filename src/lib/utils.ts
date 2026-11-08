import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// 글자 계층(text-title 등)을 글자 크기로 알려 줘야 text-accent-foreground 같은 색 클래스를 지우지 않는다
const twMerge = extendTailwindMerge({
  extend: { theme: { text: ['title', 'section', 'headline', 'body', 'caption', 'badge', 'micro'] }, classGroups: { shadow: [{ shadow: ['control', 'primary'] }] } },
});

/** shadcn cn: 클래스 합치기 + Tailwind 충돌 정리 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
