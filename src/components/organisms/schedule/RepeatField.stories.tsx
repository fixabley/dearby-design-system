import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { toDate } from '@/stories/date';

const START = toDate('2026-11-16T20:00');
const TODAY = toDate('2026-11-03');

/** ㉙-c6의 정기 모임: 매주 월·목, 11월 30일까지, 11월 19일은 건너뜀 */
const WEEKLY: X.RepeatRule = {
  frequency: 'weekly',
  interval: 1,
  weekdays: ['mon', 'thu'],
  end: { type: 'until', date: toDate('2026-11-30') },
  skipDates: [toDate('2026-11-19')],
};

const meta: Meta = {
  title: 'Organisms/Schedule/RepeatField',
  id: 'organisms-repeatfield',
  component: X.RepeatField,
  args: {
    start: START,
    today: TODAY,
    onChange: fn(),
    onCustomize: fn(),
    onEditSkipDates: fn(),
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

function Demo({ initial }: { initial: X.RepeatRule | null }) {
  const [rule, setRule] = useState(initial);
  return (
    <X.RepeatField
      value={rule}
      start={START}
      today={TODAY}
      onChange={setRule}
      onCustomize={() =>
        alert('사용자 지정 화면으로 갑니다(RepeatCustom 스토리)')
      }
      onEditSkipDates={() =>
        alert('건너뛸 날 화면으로 갑니다(SkipDates 스토리)')
      }
    />
  );
}

/** ㉙-c6: 행을 누르면 메뉴(안 함 · 매일 · 매주 · 2주마다 · 매월 · 매년 + 사용자 지정). 반복이면 반복 종료와 건너뛸 날이 보인다 */
export const Playground: Story = {
  render: () => <Demo initial={WEEKLY} />,
};

/** 반복 안 함: 반복 행만 있다 */
export const Off: Story = { render: () => <Demo initial={null} /> };

/** 반복 종료를 `n회 뒤`로: 횟수 행이 더해진다 */
export const Count: Story = {
  render: () => (
    <Demo initial={{ ...WEEKLY, end: { type: 'count', count: 8 } }} />
  ),
};

/** 건너뛸 날이 여럿이면 첫 날 뒤에 개수가 붙는다 */
export const ManySkips: Story = {
  render: () => (
    <Demo
      initial={{
        ...WEEKLY,
        skipDates: [
          toDate('2026-11-19'),
          toDate('2026-11-23'),
          toDate('2026-11-26'),
        ],
      }}
    />
  ),
};

/** 컴파운드로 바꿔 조립: 반복 행과 반복 종료만 */
export const Composed: Story = {
  render: () => (
    <X.RepeatField value={WEEKLY} start={START} today={TODAY}>
      <X.RepeatField.Repeat />
      <X.RepeatField.End />
    </X.RepeatField>
  ),
};

type Page = 'main' | 'custom' | 'skip';
function Flow() {
  const [page, setPage] = useState<Page>('main');
  const [start, setStart] = useState(START);
  const [end, setEnd] = useState<Date | undefined>(toDate('2026-11-16T22:00'));
  const [allDay, setAllDay] = useState(false);
  const [rule, setRule] = useState<X.RepeatRule | null>(WEEKLY);
  const back = () => setPage('main');
  return (
    <X.Sheet open modal={false}>
      <X.SheetContent>
        {page === 'main' && (
          <>
            <X.SheetHeader title="일정" />
            <div className="flex flex-col gap-3 overflow-y-auto pb-1">
              <X.DateTimeField
                start={start}
                end={end}
                allDay={allDay}
                today={TODAY}
                onStartChange={setStart}
                onEndChange={setEnd}
                onAllDayChange={setAllDay}
              />
              <X.RepeatField
                value={rule}
                start={start}
                today={TODAY}
                onChange={setRule}
                onCustomize={() => setPage('custom')}
                onEditSkipDates={() => setPage('skip')}
              />
            </div>
          </>
        )}
        {page === 'custom' && rule && (
          <X.RepeatCustom
            value={rule}
            start={start}
            onChange={setRule}
            onBack={back}
            onDone={back}
            autoFocus
          />
        )}
        {page === 'skip' && rule && (
          <X.SkipDates
            value={rule.skipDates}
            min={start}
            max={rule.end.type === 'until' ? rule.end.date : undefined}
            today={TODAY}
            onChange={(skipDates) => setRule({ ...rule, skipDates })}
            onBack={back}
            onDone={back}
            autoFocus
          />
        )}
      </X.SheetContent>
    </X.Sheet>
  );
}

/** 일정 입력 시트 전체 흐름(㉙-c3 → c6 → c7 · c8): 날짜 · 시각 아래 반복, 사용자 지정과 건너뛸 날은 같은 시트 안 화면으로 간다 */
export const InSheet: Story = {
  parameters: { layout: 'fullscreen', width: undefined },
  render: () => <Flow />,
};
