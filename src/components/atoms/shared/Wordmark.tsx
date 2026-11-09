import { cn } from '@/lib/utils';

/** dearby 글자 로고(워드마크). 글자 계층 밖의 브랜드 표시라 아톰 하나로 묶었다 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'text-[22px] font-extrabold leading-none tracking-tight text-accent-foreground',
        className,
      )}
    >
      dearby
    </span>
  );
}
