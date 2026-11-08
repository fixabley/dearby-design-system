import * as React from 'react';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/lib/utils';

/** 캠퍼스·트랙 같은 구분 고르기 트리거(청록 글자 + 아래 화살표). 메뉴는 DropdownMenu에 넣어 쓴다 */
export const TrackPicker = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'> & { value?: string; placeholder?: string }>(
  ({ value, placeholder = '캠퍼스·트랙을 선택해주세요', className, ...props }, ref) => (
    <button ref={ref} type="button" className={cn('inline-flex items-center gap-[3px] text-body font-semibold text-accent-foreground outline-none focus-visible:underline [&_svg]:size-[15px] [&_svg]:transition-transform data-[state=open]:[&_svg]:rotate-180', className)} {...props}>
      {value ?? placeholder}<Icon name="chevronDown" />
    </button>
  ),
);
TrackPicker.displayName = 'TrackPicker';
