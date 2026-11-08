import { useState } from 'react';
import type { ProgramDetailData } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ReviewCard } from '@/components/molecules/ReviewCard';
import { ReviewSummary } from '@/components/molecules/ReviewSummary';
import { TrackPicker } from '@/components/molecules/TrackPicker';

/** 지난 기수 후기: 기수 고르기(DropdownMenu, 보조 줄에 개수·비율) · 요약 · 최근 2개 · 모두 보기 */
export function ReviewSection({ r }: { r: NonNullable<ProgramDetailData['reviews']> }) {
  const [cohort, setCohort] = useState('전체 기수');
  const sub = (count: number, ratio?: number) => (count >= 3 ? `후기 ${count}개 · 추천 ${ratio}%` : `후기 ${count}개`);
  return (
    <Card>
      <CardTitle>후기</CardTitle>
      <DropdownMenu>
        <DropdownMenuTrigger asChild><TrackPicker value={cohort} className="mb-2.5" /></DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuRadioGroup value={cohort} onValueChange={setCohort}>
            <DropdownMenuRadioItem value="전체 기수" sub={sub(r.count, r.ratio)}>전체 기수</DropdownMenuRadioItem>
            <DropdownMenuSeparator />
            {r.cohorts.map((c) => <DropdownMenuRadioItem key={c.cohort} value={c.cohort} sub={sub(c.count, c.ratio)}>{c.cohort}</DropdownMenuRadioItem>)}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <ReviewSummary ratio={r.ratio} count={r.count} />
      <div className="divide-y divide-border">{r.items.map((x) => <ReviewCard key={x.name} {...x} />)}</div>
      <Button variant="mint" block className="mt-2">후기 {r.count}개 모두 보기</Button>
    </Card>
  );
}
