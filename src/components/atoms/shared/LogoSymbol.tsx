import { cn } from '@/lib/utils';

// 시안(로고 v3 심벌 S2)의 path 그대로: 엄지를 든 d(배 16 · 엄지 21)와 얼굴(눈 둘 · 입 7)
const BODY = (
  <>
    <path d="M8,50a42,42 0 1 0 84,0a42,42 0 1 0 -84,0z" />
    <path d="M89.5,89.5V72Q89.5,8.5 104.5,-41.5" strokeWidth={21} />
    <path
      d="M29.5,42a7.5,7.5 0 1 0 15,0a7.5,7.5 0 1 0 -15,0z"
      fill="currentColor"
      stroke="none"
    />
    <path
      d="M53.5,42a7.5,7.5 0 1 0 15,0a7.5,7.5 0 1 0 -15,0z"
      fill="currentColor"
      stroke="none"
    />
    <path d="M36,59Q49,72 62,59" strokeWidth={7} />
  </>
);

/**
 * dearby 심벌(엄지를 든 d와 얼굴). 크기는 size(정사각 한 변, 기본 32).
 * bare(기본)는 바탕 없이 accent-foreground로 그리고 className의 글자색으로 바꿀 수 있다.
 * appIcon은 둥근 사각(모서리 22.5%) primary 바탕에 primary-foreground(흰색) 그림, 여백은 사방 20%
 */
export function LogoSymbol({
  variant = 'bare',
  size = 32,
  className,
}: {
  variant?: 'bare' | 'appIcon';
  size?: number;
  className?: string;
}) {
  const icon = variant === 'appIcon';
  return (
    <svg
      viewBox={
        icon
          ? '-69.1667 -102.667 253.333 253.333'
          : '-21.6667 -55.1667 158.333 158.333'
      }
      width={size}
      height={size}
      role="img"
      aria-label="dearby"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        'block shrink-0',
        icon ? 'text-primary-foreground' : 'text-accent-foreground',
        className,
      )}
    >
      {icon && (
        <rect
          x={-69.1667}
          y={-102.667}
          width={253.333}
          height={253.333}
          rx={57}
          className="fill-primary"
          stroke="none"
        />
      )}
      {BODY}
    </svg>
  );
}
