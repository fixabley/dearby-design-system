import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import { content, event, state } from '@/stories/argTypes';
import { toDate, toIso } from '@/stories/date';

const meta: Meta = {
  title: 'Molecules/Shared/DatePicker',
  id: 'molecules-datepicker',
  component: X.DatePicker,
  args: {
    value: '2026-11-16', placeholder: '선택', label: '날짜', min: '', max: '', disabledDates: [], today: '2026-11-03', open: false,
    onChange: fn(), onOpenChange: fn(),
  },
  argTypes: {
    value: { control: 'text', ...content('고른 날(YYYY-MM-DD, 비우면 자리 글자)') },
    placeholder: content('값이 없을 때 자리 글자'),
    label: content('화면 읽기용 칸 이름(보이지 않음). 고른 값과 함께 읽힌다'),
    min: { control: 'text', ...state('이 날 전은 고를 수 없다(YYYY-MM-DD, 비우면 없음)') },
    max: { control: 'text', ...state('이 날 뒤는 고를 수 없다(YYYY-MM-DD, 비우면 없음)') },
    disabledDates: state('고를 수 없는 날(YYYY-MM-DD 목록)'),
    today: { control: 'text', ...state('기준일: 연도를 붙일지와 달력의 오늘 표시(시안 기준일 11월 3일)') },
    open: state('달력 말풍선 열림'),
    onChange: event('날짜 고름(고르면 바로 닫힌다)'),
    onOpenChange: event(),
    className: { table: { disable: true } },
  },
  render: function Render({ value, min, max, disabledDates, today, onChange, onOpenChange, ...args }) {
    const [, update] = useArgs();
    return (
      <X.DatePicker {...args} value={toDate(value)} min={toDate(min)} max={toDate(max)} disabledDates={(disabledDates as string[]).map((s) => toDate(s))} today={toDate(today)}
        onOpenChange={(o) => { onOpenChange?.(o); update({ open: o }); }}
        onChange={(d) => { onChange?.(d); update({ value: toIso(d) }); }} />
    );
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다(㉙-c3 일정 시작 11월 16일 (월)) */
export const Playground: Story = {};

/** 값이 없으면 자리 글자 */
export const Empty: Story = { args: { value: '' } };

/** ㉙-c6 반복 기간 11월 16일 (월) ~ 11월 30일 (월) 안에서만 고르고, 건너뛸 날 11월 19일 (목)은 고를 수 없다 */
export const Limited: Story = { args: { min: '2026-11-16', max: '2026-11-30', disabledDates: ['2026-11-19'] } };
