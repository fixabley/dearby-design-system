import { Avatar } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Text, TextSkeleton } from '@/components/atoms/shared/Text';
import { cn } from '@/lib/utils';

/** 로고(또는 첫 글자) + 조직 · 프로그램. 넘치면 말줄임, count가 있으면 `· 활동 n개` */
export function HostLine({
  logo,
  initial,
  text,
  count,
  className,
}: {
  logo?: string;
  initial?: string;
  text: string;
  count?: number;
  className?: string;
}) {
  return (
    <Text
      as="div"
      variant="caption"
      tone="muted"
      leading="tight"
      className={cn('flex min-w-0 items-center gap-1.5', className)}
    >
      {(logo || initial) && (
        <Avatar size="mark" src={logo} fallback={initial ?? ''} />
      )}
      <span className="min-w-0 truncate">{text}</span>
      {count != null && (
        <span className="-ml-0.5 shrink-0">
          · 활동{' '}
          <Text as="b" variant="caption" weight="semibold" leading="tight">
            {count}개
          </Text>
        </span>
      )}
    </Text>
  );
}

/** 불러오는 동안의 조직 줄: 로고 자리 + 보조 글자 한 줄(같은 줄 높이) */
export function HostLineSkeleton() {
  return (
    <div aria-hidden className="flex w-1/2 items-center gap-1.5">
      <Skeleton className="size-4 rounded-sm" />
      <TextSkeleton variant="caption" leading="tight" className="flex-1" />
    </div>
  );
}
