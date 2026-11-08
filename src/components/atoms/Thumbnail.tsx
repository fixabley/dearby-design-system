import { cva, type VariantProps } from 'class-variance-authority';
import type { Thumb } from '@/types';
import { cn } from '@/lib/utils';

const thumb = cva('relative grid shrink-0 place-items-center overflow-hidden bg-cover bg-center', {
  variants: { size: { lg: 'size-[76px] rounded-md', md: 'size-16 rounded-md', sm: 'size-14 rounded-md', xl: 'size-24 rounded-lg' } },
  defaultVariants: { size: 'md' },
});
/** 행·상세의 썸네일: 커버 사진, 없으면 브랜드색 그러데이션 위 흰 로고 상자 */
export function Thumbnail({ thumb: t, size, className }: { thumb: Thumb } & VariantProps<typeof thumb> & { className?: string }) {
  if ('cover' in t) return <div className={cn(thumb({ size }), className)} style={{ backgroundImage: `url(${t.cover})` }} />;
  return (
    <div className={cn(thumb({ size }), className)} style={{ background: `linear-gradient(140deg,${t.color},${t.color}AA)` }}>
      <i className="grid size-[58%] place-items-center rounded-[10px] bg-white bg-[length:74%] bg-center bg-no-repeat text-[18px] font-bold not-italic text-[#0E5E66] dark:bg-[#2A2E31] dark:text-white"
        style={t.logo ? { backgroundImage: `url(${t.logo})` } : undefined}>{t.logo ? null : t.letter}</i>
    </div>
  );
}
