import type { Thumb } from '@/types';
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

/** 썸네일 네모 크기: 52(알림 행) · 56 · 64 · 76 · 96 */
const SIZE = {
  xs: 'size-13 rounded-[10px] text-[14px]',
  sm: 'size-14 rounded-md text-[16px]',
  md: 'size-16 rounded-md text-[18px]',
  lg: 'size-[76px] rounded-md text-[20px]',
  xl: 'size-24 rounded-lg text-[24px]',
} as const;

/** 행·상세의 썸네일(shadcn Avatar 네모): 커버 사진, 없으면 브랜드색 그러데이션 위 흰 로고 상자 */
export function Thumbnail({
  thumb: t,
  size = 'md',
  className,
}: {
  thumb: Thumb;
  size?: keyof typeof SIZE;
  className?: string;
}) {
  const root = cn(
    'relative flex shrink-0 overflow-hidden',
    SIZE[size],
    className,
  );
  if ('cover' in t) {
    return (
      <AvatarRoot className={root}>
        <AvatarImage src={t.cover} alt="" className="size-full object-cover" />
        <AvatarFallback className="size-full bg-muted" />
      </AvatarRoot>
    );
  }
  return (
    <AvatarRoot
      className={cn(root, 'grid place-items-center')}
      style={{ background: `linear-gradient(140deg,${t.color},${t.color}AA)` }}
    >
      <span className="grid size-[58%] place-items-center overflow-hidden rounded-[10px] bg-white text-[18px] font-bold text-[#0E5E66] dark:bg-[#2A2E31] dark:text-white">
        {t.logo ? (
          <AvatarImage
            src={t.logo}
            alt=""
            className="size-[74%] object-contain"
          />
        ) : (
          t.letter
        )}
      </span>
    </AvatarRoot>
  );
}
