import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** 글 속 D-day. 지난 날짜는 past로 날짜를 그대로 쓴다 */
export function DDay({ children, past }: { children: ReactNode; past?: boolean }) {
  return <em className={cn('not-italic tabular-nums', past ? 'font-normal text-muted-foreground' : 'font-bold text-accent-foreground')}>{children}</em>;
}
