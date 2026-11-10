import type { ComponentProps } from 'react';
import { Text } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** 명함 교환 상태 넷: 요청 전 · 내가 보냄 · 상대가 먼저 보냄 · 맞교환 끝 */
export type ExchangeState = 'request' | 'sent' | 'accept' | 'done';

/** 상태마다 보이는 글자 */
export const EXCHANGE_LABEL: Record<ExchangeState, string> = {
  request: '교환 요청',
  sent: '요청함',
  accept: '수락',
  done: '교환함',
};

/**
 * 명함 교환 상태(참여자 행 오른쪽 · 교환 요청 알림 행, 시안 ㉘-d2 · ㉘-f).
 * `request`(민트 알약)와 `accept`(청록 채움 알약)는 누르는 버튼이고 `onClick`으로 알린다.
 * `sent`(요청함)와 `done`(교환함)은 시안에서 버튼이 아니라 글자라 누를 수 없는 표시로 그린다(done은 체크가 앞에 붙는다).
 * 이름이 목록에서 겹치지 않게 쓰는 쪽이 `aria-label`로 누구인지 덧붙인다(예: "이서연에게 교환 요청"). 보이는 글자가 이름 안에 들어 있게 쓴다
 */
export function ExchangeButton({
  state,
  className,
  ...props
}: Omit<ComponentProps<'button'>, 'children'> & { state: ExchangeState }) {
  const label = EXCHANGE_LABEL[state];
  if (state === 'sent')
    return (
      <Text
        variant="control"
        tone="muted"
        nowrap
        className={cn('shrink-0', className)}
      >
        {label}
      </Text>
    );
  if (state === 'done')
    return (
      <Text
        variant="control"
        tone="accent"
        nowrap
        className={cn('inline-flex shrink-0 items-center gap-1', className)}
      >
        <Icon name="checkmark" className="size-3.5" />
        {label}
      </Text>
    );
  return (
    <Button
      type="button"
      size="sm"
      variant={state === 'request' ? 'mint' : 'default'}
      className={className}
      {...props}
    >
      {label}
    </Button>
  );
}
