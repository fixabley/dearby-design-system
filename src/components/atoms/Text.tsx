import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * 글자 아톰. 글자 크기·굵기·줄 높이를 정하는 유일한 곳(shadcn 키트 제외).
 * 분자 이상은 글자 스타일 클래스를 쓰지 않고 Text(또는 Text를 품은 아톰)로만 글자를 그린다.
 * variant는 역할(글자 계층 11가지), weight는 같은 크기 안에서 강조, tone은 글자 색.
 */
export const textVariants = cva('', {
  variants: {
    variant: {
      title: 'text-title tracking-[-0.01em]',            // 화면 제목 26/700
      section: 'text-section',                           // 섹션 제목 22/700
      subtitle: 'text-headline',                         // 소제목 17/600
      rowTitle: 'text-headline',                         // 행 제목 17/600
      bodyLarge: 'text-body-lg',                         // 입력·목록 행 17/400
      innerTitle: 'text-body font-semibold leading-[1.35]', // 행 안 제목 15/600
      body: 'text-body',                                 // 본문 15/400
      caption: 'text-caption',                           // 보조 13/400
      control: 'text-caption font-semibold leading-[1.2]', // 컨트롤 13/600
      badge: 'text-badge',                               // 배지 12/700
      micro: 'text-micro',                               // 마이크로 11/400
    },
    tone: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-accent-foreground',
      destructive: 'text-destructive',
      amber: 'text-amber',
      inverse: 'text-primary-foreground',
      inherit: '',
    },
    weight: { regular: 'font-normal', medium: 'font-medium', semibold: 'font-semibold', bold: 'font-bold' },
    truncate: { true: 'min-w-0 truncate', false: '' },
    lines: { 1: 'line-clamp-1', 2: 'line-clamp-2', 3: 'line-clamp-3' },
    tabular: { true: 'tabular-nums', false: '' },
    nowrap: { true: 'whitespace-nowrap', false: '' },
    pre: { true: 'whitespace-pre-line', false: '' },
  },
  defaultVariants: { variant: 'body', tone: 'inherit' },
});

type Variant = NonNullable<VariantProps<typeof textVariants>['variant']>;
const TAG: Record<Variant, React.ElementType> = {
  title: 'h1', section: 'h2', subtitle: 'h3', rowTitle: 'span', bodyLarge: 'span', innerTitle: 'span', body: 'p', caption: 'span', control: 'span', badge: 'span', micro: 'span',
};

export type TextProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'> & VariantProps<typeof textVariants> & {
  /** 그릴 요소. 정하지 않으면 계층에 맞춰(title h1, section h2, subtitle h3, body p, 나머지 span) */
  as?: React.ElementType;
  /** 줄 바꿈 블록으로(같은 줄에 이어 쓰지 않음) */
  block?: boolean;
  htmlFor?: string;
};

export function Text({ as, variant, tone, weight, truncate, lines, tabular, nowrap, pre, block, className, ...props }: TextProps) {
  const Comp = as ?? TAG[variant ?? 'body'];
  return <Comp data-slot="text" className={cn(textVariants({ variant, tone, weight, truncate, lines, tabular, nowrap, pre }), block && 'block', className)} {...props} />;
}
