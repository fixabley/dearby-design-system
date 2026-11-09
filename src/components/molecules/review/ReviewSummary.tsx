import { Text } from '@/components/atoms/shared/Text';
import { Badge } from '@/components/ui/badge';

/** 추천 비율 배지(70% 이상 민트, 아래는 테두리, 후기 3개 미만이면 배지 없이 개수만) + 후기 수 */
export function ReviewSummary({
  ratio,
  count,
}: {
  ratio?: number;
  count: number;
}) {
  return (
    <Text
      as="div"
      variant="caption"
      tone="muted"
      className="flex items-center gap-2"
    >
      {ratio != null && count >= 3 && (
        <Badge variant={ratio >= 70 ? 'mint' : 'outline'}>추천 {ratio}%</Badge>
      )}
      <span>후기 {count}개</span>
    </Text>
  );
}
