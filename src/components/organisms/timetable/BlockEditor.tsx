import { createContext, useContext, useState, type ReactNode } from 'react';
import { Segmented } from '@/components/molecules/shared/Segmented';
import { Text } from '@/components/atoms/shared/Text';
import { Avatar } from '@/components/ui/avatar';
import { FieldGroup } from '@/components/ui/field';
import { TextField } from '@/components/molecules/shared/TextField';
import { ListGroup, ListRow } from '@/components/molecules/shared/ListGroup';
import { WeekdayPicker } from '@/components/molecules/timetable/WeekdayPicker';

type BlockKind = 'class' | 'rest';
type Leader = { initial: string; name: string; role: string };
type BlockEditorContextValue = {
  name: string; kind: BlockKind; setKind: (k: BlockKind) => void; days: string[]; setDays: (d: string[]) => void; from: string; to: string; leaders: Leader[]; desc?: string;
};
const BlockEditorContext = createContext<BlockEditorContextValue | null>(null);

function useBlockEditor(part: string) {
  const ctx = useContext(BlockEditorContext);
  if (!ctx) throw new Error(`BlockEditor.${part}는 <BlockEditor> 안에서 쓴다`);
  return ctx;
}

/** 수업 | 쉬는 시간 */
function Kind({ className }: { className?: string }) {
  const { kind, setKind } = useBlockEditor('Kind');
  return <Segmented items={['class', 'rest'] as const} labels={{ class: '수업', rest: '쉬는 시간' }} value={kind} onChange={setKind} className={className} />;
}

/** 이름 */
function Name({ className }: { className?: string }) {
  const { name } = useBlockEditor('Name');
  return <FieldGroup className={className}><TextField label="이름" value={name} /></FieldGroup>;
}

/** 요일 */
function Days({ className }: { className?: string }) {
  const { days, setDays } = useBlockEditor('Days');
  return <div className={className}><Text as="h4" variant="caption" tone="muted" className="mb-1.5 px-4">요일</Text><WeekdayPicker value={days} onChange={setDays} /></div>;
}

/** 시작 · 끝 시각 */
function Time({ className }: { className?: string }) {
  const { from, to } = useBlockEditor('Time');
  return <ListGroup className={className}><ListRow icon="calendar" title="시작" trailing={from} /><ListRow icon="clock" title="끝" trailing={to} /></ListGroup>;
}

/** 주도하는 사람 + 사람 추가(수업만) */
function Leaders({ className }: { className?: string }) {
  const { kind, leaders } = useBlockEditor('Leaders');
  return kind === 'class' ? (
    <ListGroup title="주도하는 사람" className={className}>
      {leaders.map((l) => <ListRow key={l.name} title={l.name} subtitle={l.role} media={<Avatar fallback={l.initial} />} />)}
      <ListRow icon="add" title="사람 추가" add onClick={() => {}} />
    </ListGroup>
  ) : null;
}

/** 상세 설명 */
function Description({ className }: { className?: string }) {
  const { desc } = useBlockEditor('Description');
  return <FieldGroup className={className}><TextField label="상세 설명" value={desc} multiline /></FieldGroup>;
}

function BlockEditorRoot({ name, kind, days, from, to, leaders, desc, children }: {
  name: string; kind: BlockKind; days: string[]; from: string; to: string; leaders: Leader[]; desc?: string; children?: ReactNode;
}) {
  const [k, setK] = useState(kind);
  const [d, setD] = useState(days);
  return (
    <BlockEditorContext.Provider value={{ name, kind: k, setKind: setK, days: d, setDays: setD, from, to, leaders, desc }}>
      <div className="flex flex-col gap-3">{children ?? <><Kind /><Name /><Days /><Time /><Leaders /><Description /></>}</div>
    </BlockEditorContext.Provider>
  );
}

/**
 * 시간표 블록 편집(컴파운드): Kind(수업 | 쉬는 시간) · Name · Days(요일) · Time(시작 · 끝) · Leaders(주도하는 사람, 수업만) · Description(상세 설명).
 * 기본 조립은 `<BlockEditor {...block} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<BlockEditor {...block}><BlockEditor.Name /><BlockEditor.Time /><BlockEditor.Description /></BlockEditor>`
 */
export const BlockEditor = Object.assign(BlockEditorRoot, { Kind, Name, Days, Time, Leaders, Description });
