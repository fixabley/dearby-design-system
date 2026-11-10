import { STATUS, type StatusKind } from '@/icons';
import { cn } from '@/lib/utils';
import { Svg } from '@/components/foundations/Icon';

const TONE: Record<StatusKind, string> = {
  participating: 'text-accent-foreground',
  waiting: 'text-accent-foreground',
  selecting: 'text-amber',
  applying: 'text-[#8E8E93]',
  ended: 'text-[#8E8E93]',
};
/** 진행 상태: 원 글리프(빈·반·고리·꽉 찬 원) + 글자. 선발 중만 호박색 */
export function StatusGlyph({
  status,
  className,
}: {
  status: StatusKind;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center gap-1 whitespace-nowrap text-badge',
        TONE[status],
        className,
      )}
    >
      <Svg src={STATUS[status].svg} size={14} />
      {STATUS[status].label}
    </span>
  );
}
