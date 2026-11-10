import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/atoms/shared/Text';
import { cn } from '@/lib/utils';

/**
 * 개설자 줄: 이니셜 원(18) + `@핸들 · 소속` + 직접 개설 캡슐(Badge muted).
 * 조직이 연 프로그램의 줄(HostLine)과 달리 사람이 연 것이라 원 모양이고 캡슐이 붙는다.
 * 텍스트가 넘치면 말줄임, 캡슐은 줄어들지 않는다. hosted를 끄면 캡슐 없이 줄만 그린다
 */
export function HostedLine({
  initial,
  text,
  hosted = true,
  className,
}: {
  initial: string;
  text: string;
  hosted?: boolean;
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
      <Avatar size="dot" fallback={initial} />
      <span className="min-w-0 truncate">{text}</span>
      {hosted && (
        <Badge variant="muted" size="sm">
          직접 개설
        </Badge>
      )}
    </Text>
  );
}
