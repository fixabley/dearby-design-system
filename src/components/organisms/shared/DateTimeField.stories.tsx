import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import { content, event, state } from '@/stories/argTypes';
import { toDate, toIsoTime } from '@/stories/date';

const meta: Meta = {
  title: 'Organisms/Shared/DateTimeField',
  id: 'organisms-datetimefield',
  component: X.DateTimeField,
  args: {
    start: '2026-11-16T20:00',
    end: '2026-11-16T22:00',
    allDay: false,
    today: '2026-11-03',
    onStartChange: fn(),
    onEndChange: fn(),
    onAllDayChange: fn(),
  },
  argTypes: {
    start: { control: 'text', ...content('시작(YYYY-MM-DDTHH:mm)') },
    end: {
      control: 'text',
      ...content('끝(YYYY-MM-DDTHH:mm, 비우면 끝 행이 없다)'),
    },
    allDay: state('하루 종일(켜면 시각 칸이 빠진다)'),
    today: {
      control: 'text',
      ...state(
        '기준일: 연도를 붙일지와 달력의 오늘 표시(시안 기준일 11월 3일)',
      ),
    },
    onStartChange: event(),
    onEndChange: event(),
    onAllDayChange: event(),
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: function Render({
    start,
    end,
    today,
    onStartChange,
    onEndChange,
    onAllDayChange,
    ...args
  }) {
    const [, update] = useArgs();
    return (
      <X.DateTimeField
        {...args}
        start={toDate(start)}
        end={toDate(end)}
        today={toDate(today)}
        onStartChange={(d) => {
          onStartChange?.(d);
          update({ start: toIsoTime(d) });
        }}
        onEndChange={(d) => {
          onEndChange?.(d);
          update({ end: toIsoTime(d) });
        }}
        onAllDayChange={(v) => {
          onAllDayChange?.(v);
          update({ allDay: v });
        }}
      />
    );
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다(㉙-c3 첫 모임: 11월 16일 (월) 20:00부터 22:00까지) */
export const Playground: Story = {};

/** ㉙-c5 결과 발표: 하루 종일이라 시각 칸 없이 시작 11월 15일 (일)만 */
export const AllDay: Story = {
  args: { start: '2026-11-15T00:00', end: '', allDay: true },
};

/** 컴파운드로 바꿔 조립: 하루 종일 없이 시작 · 끝만 */
export const Composed: Story = {
  render: () => (
    <X.DateTimeField
      start={toDate('2026-11-16T20:00')}
      end={toDate('2026-11-16T22:00')}
      today={toDate('2026-11-03')}
    >
      <X.DateTimeField.Start />
      <X.DateTimeField.End />
    </X.DateTimeField>
  ),
};
