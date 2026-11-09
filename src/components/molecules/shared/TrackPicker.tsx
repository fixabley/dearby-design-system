import type { ComponentProps } from 'react';
import { Icon } from '@/components/foundations/Icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** 구분 고르기 트리거(shadcn Button link). 메뉴가 열리면 화살표가 뒤집힌다 */
export function TrackPicker({
  value,
  placeholder = '캠퍼스·트랙을 선택해주세요',
  className,
  ...props
}: ComponentProps<typeof Button> & { value?: string; placeholder?: string }) {
  return (
    <Button
      variant="link"
      size="auto"
      className={cn(
        // 덧칠(pressable)이 글자에 붙지 않게 여백을 주고 음수 여백으로 자리를 그대로 둔다
        '-mx-1 gap-[3px] rounded-md px-1 [&_svg]:transition-transform data-[state=open]:[&_svg]:rotate-180',
        className,
      )}
      {...props}
    >
      {value ?? placeholder}
      <Icon name="chevronDown" />
    </Button>
  );
}
