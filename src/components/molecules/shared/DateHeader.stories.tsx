import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import { content, event, look, state } from '@/stories/argTypes';
import { toDate, toIso } from '@/stories/date';

const meta: Meta = {
  title: 'Molecules/Shared/DateHeader',
  id: 'molecules-dateheader',
  component: X.DateHeader,
  args: {
    date: '2026-11-09',
    today: '2026-11-03',
    pickable: false,
    sticky: false,
    open: false,
    onSelect: fn(),
    onOpenChange: fn(),
  },
  argTypes: {
    date: {
      control: 'text',
      ...content(
        '묶음 날짜(YYYY-MM-DD). 기준일과 해가 다르면 앞에 연도가 붙는다',
      ),
    },
    pickable: look(
      '누를 수 있는 고정 머리 모양(22/700 + 꺾쇠). 누르면 말풍선 달력',
    ),
    sticky: look('스크롤해도 위에 붙는다(바탕을 깐다)'),
    today: {
      control: 'text',
      ...state(
        '기준일: 연도를 붙일지와 달력의 오늘 표시(시안 기준일 11월 3일)',
      ),
    },
    open: state('달력 말풍선 열림(pickable일 때)'),
    onSelect: event('날짜 고름(고르면 바로 닫힌다)'),
    onOpenChange: event(),
    className: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: function Render({ date, today, onSelect, onOpenChange, ...args }) {
    const [, update] = useArgs();
    return (
      <X.DateHeader
        {...args}
        date={toDate(date)}
        today={toDate(today)}
        onOpenChange={(o) => {
          onOpenChange?.(o);
          update({ open: o });
        }}
        onSelect={(d) => {
          onSelect?.(d);
          update({ date: toIso(d) });
        }}
      />
    );
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다(㉗-g 알림 목록 · ⑧-0 내 활동의 날짜 소제목) */
export const Playground: Story = {};

/** ⑧-0b 고정 머리: 누르면 머리 아래 말풍선 달력, 날짜를 누르면 알리고 바로 닫힌다 */
export const Pickable: Story = { args: { date: '2026-11-08', pickable: true } };

/** ⑧-0 맨 위 묶음: 기준일과 해가 다르면 앞에 연도 */
export const OtherYear: Story = { args: { date: '2025-03-01' } };

/** 컴파운드로 바꿔 조립: ⑧-0의 앞으로 올 날짜 소제목처럼 요일 뒤에 D-day */
export const Composed: Story = {
  render: () => (
    <X.DateHeader date={toDate('2026-11-21')} today={toDate('2026-11-03')}>
      <X.DateHeader.Day />
      <X.DateHeader.Weekday />
      <X.Text variant="badge">
        <X.DDay>D-18</X.DDay>
      </X.Text>
    </X.DateHeader>
  ),
};
