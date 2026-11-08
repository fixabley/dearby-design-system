import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Submission } from '@/types';
import { Segmented } from '@/components/atoms/shared/Segmented';
import { Text } from '@/components/atoms/shared/Text';
import { ListGroup } from '@/components/molecules/shared/ListGroup';
import { SubmissionRow } from '@/components/molecules/submission/SubmissionRow';

type Show = 'all' | 'pending' | 'none';
type SubmissionListContextValue = { items: Submission[]; selected?: number; onSelect?: (i: number) => void; show: Show; setShow: (v: Show) => void };
const SubmissionListContext = createContext<SubmissionListContextValue | null>(null);

function useSubmissionList(part: string) {
  const ctx = useContext(SubmissionListContext);
  if (!ctx) throw new Error(`SubmissionList.${part}는 <SubmissionList> 안에서 쓴다`);
  return ctx;
}

/** 요약: 제출 n · 아직 n */
function Summary({ className }: { className?: string }) {
  const { items } = useSubmissionList('Summary');
  const done = items.filter((s) => s.state !== 'none').length;
  return <Text as="p" variant="caption" tone="muted" className={className}><Text as="b" variant="caption" weight="semibold" tone="accent">제출 {done}</Text> · 아직 {items.length - done}</Text>;
}

/** 전체 | 평가 전 | 아직 */
function Filter({ className }: { className?: string }) {
  const { show, setShow } = useSubmissionList('Filter');
  return <Segmented items={['all', 'pending', 'none'] as const} labels={{ all: '전체', pending: '평가 전', none: '아직' }} value={show} onChange={setShow} className={className} />;
}

/** 고른 묶음의 제출 행 */
function List({ className }: { className?: string }) {
  const { items, selected, onSelect, show } = useSubmissionList('List');
  return <ListGroup className={className}>{items.map((s, i) => (show === 'all' || s.state === show) && <SubmissionRow key={s.name} s={s} selected={selected === i} onSelect={() => onSelect?.(i)} />)}</ListGroup>;
}

function SubmissionListRoot({ items, selected, onSelect, children }: { items: Submission[]; selected?: number; onSelect?: (i: number) => void; children?: ReactNode }) {
  const [show, setShow] = useState<Show>('all');
  return (
    <SubmissionListContext.Provider value={{ items, selected, onSelect, show, setShow }}>
      <div className="flex flex-col gap-3">{children ?? <><Summary /><Filter /><List /></>}</div>
    </SubmissionListContext.Provider>
  );
}

/**
 * 과제 제출 목록(컴파운드): Summary(제출 · 아직) · Filter(전체 | 평가 전 | 아직) · List(행).
 * 기본 조립은 `<SubmissionList items={items} selected={0} onSelect={…} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<SubmissionList items={items}><SubmissionList.Filter /><SubmissionList.List /></SubmissionList>`
 */
export const SubmissionList = Object.assign(SubmissionListRoot, { Summary, Filter, List });
