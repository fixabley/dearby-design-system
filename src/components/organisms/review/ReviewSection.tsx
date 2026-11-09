import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ProgramDetailData } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ReviewCard } from '@/components/molecules/review/ReviewCard';
import { ReviewSummary } from '@/components/molecules/review/ReviewSummary';
import { TrackPicker } from '@/components/molecules/shared/TrackPicker';
import { cn } from '@/lib/utils';

type Reviews = NonNullable<ProgramDetailData['reviews']>;
type ReviewSectionContextValue = {
  r: Reviews;
  cohort: string;
  setCohort: (c: string) => void;
};
const ReviewSectionContext = createContext<ReviewSectionContextValue | null>(
  null,
);

function useReviewSection(part: string) {
  const ctx = useContext(ReviewSectionContext);
  if (!ctx)
    throw new Error(`ReviewSection.${part}는 <ReviewSection> 안에서 쓴다`);
  return ctx;
}

const sub = (count: number, ratio?: number) =>
  count >= 3 ? `후기 ${count}개 · 추천 ${ratio}%` : `후기 ${count}개`;

/** 기수 고르기(DropdownMenu, 보조 줄에 개수 · 비율) */
function Cohort({ className }: { className?: string }) {
  const { r, cohort, setCohort } = useReviewSection('Cohort');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TrackPicker value={cohort} className={cn('mb-2.5', className)} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup value={cohort} onValueChange={setCohort}>
          <DropdownMenuRadioItem value="전체 기수" sub={sub(r.count, r.ratio)}>
            전체 기수
          </DropdownMenuRadioItem>
          <DropdownMenuSeparator />
          {r.cohorts.map((c) => (
            <DropdownMenuRadioItem
              key={c.cohort}
              value={c.cohort}
              sub={sub(c.count, c.ratio)}
            >
              {c.cohort}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** 추천 비율 · 후기 수 */
function Summary() {
  const { r } = useReviewSection('Summary');
  return <ReviewSummary ratio={r.ratio} count={r.count} />;
}

/** 최근 후기들 */
function List({ className }: { className?: string }) {
  const { r } = useReviewSection('List');
  return (
    <div className={cn('divide-y divide-border', className)}>
      {r.items.map((x) => (
        <ReviewCard key={x.name} {...x} />
      ))}
    </div>
  );
}

/** 후기 모두 보기 */
function More({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { r } = useReviewSection('More');
  return (
    <Button variant="mint" block className={cn('mt-2', className)}>
      {children ?? `후기 ${r.count}개 모두 보기`}
    </Button>
  );
}

function ReviewSectionRoot({
  r,
  className,
  children,
}: {
  r: Reviews;
  className?: string;
  children?: ReactNode;
}) {
  const [cohort, setCohort] = useState('전체 기수');
  return (
    <ReviewSectionContext.Provider value={{ r, cohort, setCohort }}>
      <Card className={className}>
        <CardTitle>후기</CardTitle>
        {children ?? (
          <>
            <Cohort />
            <Summary />
            <List />
            <More />
          </>
        )}
      </Card>
    </ReviewSectionContext.Provider>
  );
}

/**
 * 지난 기수 후기 카드(컴파운드): 머리 `후기` 아래 Cohort(기수 고르기) · Summary(요약) · List(최근 후기) · More(모두 보기).
 * 기본 조립은 `<ReviewSection r={reviews} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ReviewSection r={reviews}><ReviewSection.Summary /><ReviewSection.List /></ReviewSection>`
 */
export const ReviewSection = Object.assign(ReviewSectionRoot, {
  Cohort,
  Summary,
  List,
  More,
});
