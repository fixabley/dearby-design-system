import { cn } from '@/lib/utils';

const EAR = 'stroke-wordmark-ear';

// 시안(로고 v3)의 path 그대로. d · b · y는 청록(currentColor), ear와 입은 wordmark-ear 토큰
const MARKS = {
  /** 큰 판: 윙크하는 e와 입. 획 25 · 엄지 31 · 입 13 */
  large: {
    box: [-6, -66, 679.587, 232],
    strokeWidth: 25,
    body: (
      <>
        <path d="M12.5,50a37.5,37.5 0 1 0 75,0a37.5,37.5 0 1 0 -75,0z" />
        <path d="M84.5,84.5V72Q84.5,5.5 99.5,-44.5" strokeWidth={31} />
        <g className={EAR}>
          <path
            d="M136.5,50H211.5A37.5,37.5 0 1 0 201.87,75.09"
            transform="rotate(-20 174 50)"
          />
          <path d="M247.5,50a37.5,37.5 0 1 0 75,0a37.5,37.5 0 1 0 -75,0z" />
          <path d="M322.5,12.5V87.5" />
          <path d="M362.5,12.5V87.5" />
          <path d="M362.5,50A37.5,37.5 0 0 1 423.09,20.45" />
        </g>
        <g transform="translate(1005.17,0) scale(-1,1)">
          <path d="M465.087,50a37.5,37.5 0 1 0 75,0a37.5,37.5 0 1 0 -75,0z" />
          <path
            d="M537.087,84.5V72Q537.087,5.5 552.087,-44.5"
            strokeWidth={31}
          />
        </g>
        <path d="M580.087,12.5V50A37.5,37.5 0 0 0 655.087,50" />
        <path d="M655.087,12.5V110A37.5,37.5 0 0 1 617.587,147.5H595.587" />
        <path d="M184,123Q229.5,147 275,123" className={EAR} strokeWidth={13} />
      </>
    ),
  },
  /** 작은 판(머리용): 입이 없고 e의 가로획이 가늘다. 획 24 · 엄지 29 · e 가로획 15 */
  small: {
    box: [-4, -49, 673.249, 190],
    strokeWidth: 24,
    body: (
      <>
        <path d="M12,50a38,38 0 1 0 76,0a38,38 0 1 0 -76,0z" />
        <path d="M85.5,85.5V72Q85.5,18.5 97.5,-31.5" strokeWidth={29} />
        <g className={EAR}>
          <path
            d="M210,50A38,38 0 1 0 201.11,74.43"
            transform="rotate(-14 172 50)"
          />
          <path
            d="M136,50H210"
            strokeWidth={15}
            transform="rotate(-14 172 50)"
          />
          <path d="M246,50a38,38 0 1 0 76,0a38,38 0 1 0 -76,0z" />
          <path d="M322,12V88" />
          <path d="M361,12V88" />
          <path d="M361,50A38,38 0 0 1 420.25,18.50" />
        </g>
        <g transform="translate(1000.5,0) scale(-1,1)">
          <path d="M462.249,50a38,38 0 1 0 76,0a38,38 0 1 0 -76,0z" />
          <path
            d="M535.749,85.5V72Q535.749,18.5 547.749,-31.5"
            strokeWidth={29}
          />
        </g>
        <path d="M577.249,12V50A38,38 0 0 0 653.249,50" />
        <path d="M653.249,12V98A28,28 0 0 1 625.249,126H611.249" />
      </>
    ),
  },
} as const;

/**
 * dearby 로고(워드마크) 그림. 글자 계층 밖의 브랜드 표시라 아톰 하나로 묶었다.
 * variant는 머리용 작은 판(small, 기본)과 로그인 같은 큰 자리의 큰 판(large). 크기는 height(그림 상자 높이, 기본 22)로 정하고 폭은 비율대로다.
 * 색은 토큰을 따라 라이트 · 다크가 저절로 맞는다: d · b · y는 accent-foreground(className의 글자색으로 바꿀 수 있음), ear와 입은 wordmark-ear
 */
export function Wordmark({
  variant = 'small',
  height = 22,
  className,
}: {
  variant?: keyof typeof MARKS;
  height?: number;
  className?: string;
}) {
  const { box, strokeWidth, body } = MARKS[variant];
  return (
    <svg
      viewBox={box.join(' ')}
      width={(height * box[2]) / box[3]}
      height={height}
      role="img"
      aria-label="dearby"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('block shrink-0 text-accent-foreground', className)}
    >
      {body}
    </svg>
  );
}
