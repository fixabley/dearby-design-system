import type { Thumb } from '@/types';
import { AvatarFallback, AvatarImage, AvatarRoot, avatarVariants } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Size = 'sm' | 'md' | 'lg' | 'xl';
const SIZE = { sm: 'thumb-sm', md: 'thumb', lg: 'thumb-lg', xl: 'thumb-xl' } as const;

/** 행·상세의 썸네일(shadcn Avatar 네모): 커버 사진, 없으면 브랜드색 그러데이션 위 흰 로고 상자 */
export function Thumbnail({ thumb: t, size = 'md', className }: { thumb: Thumb; size?: Size; className?: string }) {
  const root = cn(avatarVariants({ size: SIZE[size] }), className);
  if ('cover' in t) {
    return <AvatarRoot className={root}><AvatarImage src={t.cover} alt="" className="size-full object-cover" /><AvatarFallback className="size-full bg-muted" /></AvatarRoot>;
  }
  return (
    <AvatarRoot className={cn(root, 'grid place-items-center')} style={{ background: `linear-gradient(140deg,${t.color},${t.color}AA)` }}>
      <span className="grid size-[58%] place-items-center overflow-hidden rounded-[10px] bg-white text-[18px] font-bold text-[#0E5E66] dark:bg-[#2A2E31] dark:text-white">
        {t.logo ? <AvatarImage src={t.logo} alt="" className="size-[74%] object-contain" /> : t.letter}
      </span>
    </AvatarRoot>
  );
}
