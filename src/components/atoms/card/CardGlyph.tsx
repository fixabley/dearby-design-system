import { cn } from '@/lib/utils';

/**
 * 명함 글리프(34 x 22, 시안 .pcard): 흰 명함 면(왼쪽 위에서 오른쪽 아래로 옅은 회색 → 흰색)에 가는 테두리 · 작은 그림자, 회색 줄 둘.
 * 다크는 어두운 면과 .5px 테두리에 청록 줄 하나. 꾸밈이라 화면 읽기에서는 숨고 명함 이름은 옆 글자가 전한다
 */
export function CardGlyph({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'relative inline-block h-[22px] w-[34px] shrink-0 rounded-[4px] bg-[linear-gradient(140deg,#F2F4F5,#fff)] shadow-[0_0_0_.5px_rgba(0,0,0,.12),0_1px_3px_rgba(0,0,0,.08)] dark:bg-[linear-gradient(140deg,#202427,#2A2E31)] dark:shadow-[0_0_0_.5px_rgba(255,255,255,.06)]',
        className,
      )}
    >
      <i className="absolute left-[5px] top-[6px] h-[3px] w-3.5 rounded-[2px] bg-[#C4C4C7] shadow-[0_5px_0_#E0E0E3] dark:bg-[#007F80] dark:shadow-none" />
    </span>
  );
}
