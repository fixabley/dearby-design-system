import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { cn } from '@/lib/utils';

/**
 * 참여 조건 한 줄. 충족하면 청록 체크, 아니면 빈 원 + `인증하기`.
 * 색과 모양만으로 전하지 않도록 화면 읽기용 글(충족 · 미충족)을 앞에 붙인다.
 * onVerify가 없으면 인증하기 없이 줄만 그린다(개설자 미리보기 등)
 */
export function ConditionCheck({
  met,
  children,
  onVerify,
  className,
}: {
  met: boolean;
  children: ReactNode;
  onVerify?: () => void;
  className?: string;
}) {
  return (
    <div className={cn('flex min-h-10 items-center gap-3', className)}>
      {met ? (
        <Icon
          name="check"
          size={20}
          className="shrink-0 text-accent-foreground"
        />
      ) : (
        <Icon
          name="circle"
          size={20}
          className="shrink-0 text-muted-foreground"
        />
      )}
      <Text as="span" className="min-w-0 flex-1">
        <span className="sr-only">{met ? '충족: ' : '미충족: '}</span>
        {children}
      </Text>
      {!met && onVerify && (
        <Button
          type="button"
          variant="link"
          size="auto"
          onClick={onVerify}
          className="-mx-1 -my-2 shrink-0 rounded-md px-1 py-2"
        >
          <Text variant="control" tone="inherit">
            인증하기
          </Text>
          <span className="sr-only">: {children}</span>
        </Button>
      )}
    </div>
  );
}
