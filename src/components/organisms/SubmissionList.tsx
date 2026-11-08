import { useState } from 'react';
import type { Submission } from '@/types';
import { Segmented } from '@/components/atoms/Segmented';
import { ListGroup } from '@/components/molecules/ListGroup';
import { SubmissionRow } from '@/components/molecules/SubmissionRow';

/** 과제 제출 목록: 요약 · 전체/평가 전/아직 · 행 */
export function SubmissionList({ items, selected, onSelect }: { items: Submission[]; selected?: number; onSelect?: (i: number) => void }) {
  const [f, setF] = useState<'all' | 'pending' | 'none'>('all');
  const done = items.filter((s) => s.state !== 'none').length;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-caption text-muted-foreground"><b className="font-semibold text-accent-foreground">제출 {done}</b> · 아직 {items.length - done}</p>
      <Segmented items={['all', 'pending', 'none'] as const} labels={{ all: '전체', pending: '평가 전', none: '아직' }} value={f} onChange={setF} />
      <ListGroup>{items.map((s, i) => (f === 'all' || s.state === f) && <SubmissionRow key={s.name} s={s} selected={selected === i} onSelect={() => onSelect?.(i)} />)}</ListGroup>
    </div>
  );
}
