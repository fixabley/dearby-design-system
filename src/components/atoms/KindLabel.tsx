import { KINDS, type ActivityKind } from '@/icons';
import { cn } from '@/lib/utils';
import { Svg } from '@/components/foundations/Icon';

/** 활동 종류 라벨(아이콘 + 이름) */
export function KindLabel({ kind, className }: { kind: ActivityKind; className?: string }) {
  return <span className={cn('inline-flex items-center gap-[3px] whitespace-nowrap text-micro font-semibold leading-none text-muted-foreground [&_svg]:size-3', className)}>
    <Svg src={KINDS[kind].svg} />{KINDS[kind].label}</span>;
}
