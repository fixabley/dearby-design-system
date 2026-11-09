import { KINDS, type ActivityKind } from '@/icons';
import { cn } from '@/lib/utils';
import { Svg } from '@/components/foundations/Icon';
import { Skeleton } from '@/components/ui/skeleton';

/** 활동 종류 라벨(아이콘 + 이름) */
export function KindLabel({
  kind,
  className,
}: {
  kind: ActivityKind;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[3px] whitespace-nowrap text-micro font-semibold leading-none text-muted-foreground [&_svg]:size-3',
        className,
      )}
    >
      <Svg src={KINDS[kind].svg} />
      {KINDS[kind].label}
    </span>
  );
}

/** 불러오는 동안의 종류 라벨: 같은 높이(아이콘 12) 막대 */
export function KindLabelSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn('h-3 w-10', className)} />;
}
