import { ICONS, type IconName } from '@/icons';

const ATTR = /([a-zA-Z-]+)="([^"]*)"/g;
const camel = (k: string) => (k === 'viewBox' ? k : k.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase()));

/** 시안의 SVG 원문을 감싸는 요소 없이 그린다(크기는 size 또는 부모의 [&_svg] 규칙) */
export function Svg({ src, className, label, size }: { src: string; className?: string; label?: string; size?: number }) {
  const m = /^<svg([^>]*)>([\s\S]*)<\/svg>$/.exec(src.trim());
  if (!m) return null;
  const attrs: Record<string, string> = {};
  for (const [, k, v] of m[1].matchAll(ATTR)) if (!['class', 'width', 'height', 'style'].includes(k) && !k.startsWith('aria')) attrs[camel(k)] = v;
  return <svg {...attrs} width={size} height={size} className={className} aria-hidden={label ? undefined : true} aria-label={label} role={label ? 'img' : undefined}
    dangerouslySetInnerHTML={{ __html: m[2] }} />;
}

/** 아이콘 크기 단계 */
export const ICON_SIZES = [12, 16, 20, 24, 32] as const;
export type IconSize = (typeof ICON_SIZES)[number];
export function Icon({ name, size, label, className }: { name: IconName; size?: IconSize; label?: string; className?: string }) {
  return <Svg src={ICONS[name]} size={size} label={label} className={className} />;
}
