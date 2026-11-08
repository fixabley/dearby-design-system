import { useState } from 'react';
import { Segmented } from '@/components/atoms/Segmented';
import { Avatar } from '@/components/ui/avatar';
import { FieldGroup } from '@/components/ui/field';
import { TextField } from '@/components/molecules/TextField';
import { ListGroup, ListRow } from '@/components/molecules/ListGroup';
import { WeekdayPicker } from '@/components/molecules/WeekdayPicker';

/** 시간표 블록 편집: 수업 | 쉬는 시간 · 이름 · 요일 · 시각 · 주도하는 사람 · 상세 설명 */
export function BlockEditor({ name, kind, days, from, to, leaders, desc }: {
  name: string; kind: 'class' | 'rest'; days: string[]; from: string; to: string; leaders: { initial: string; name: string; role: string }[]; desc?: string;
}) {
  const [k, setK] = useState(kind);
  const [d, setD] = useState(days);
  return (
    <div className="flex flex-col gap-3">
      <Segmented items={['class', 'rest'] as const} labels={{ class: '수업', rest: '쉬는 시간' }} value={k} onChange={setK} />
      <FieldGroup><TextField label="이름" value={name} /></FieldGroup>
      <div><h4 className="mb-1.5 px-4 text-caption text-muted-foreground">요일</h4><WeekdayPicker value={d} onChange={setD} /></div>
      <ListGroup><ListRow icon="calendar" title="시작" trailing={from} /><ListRow icon="clock" title="끝" trailing={to} /></ListGroup>
      {k === 'class' && (
        <ListGroup title="주도하는 사람">
          {leaders.map((l) => <ListRow key={l.name} title={l.name} subtitle={l.role}><Avatar fallback={l.initial} /></ListRow>)}
          <ListRow icon="add" title="사람 추가" add onClick={() => {}} />
        </ListGroup>
      )}
      <FieldGroup><TextField label="상세 설명" value={desc} multiline /></FieldGroup>
    </div>
  );
}
