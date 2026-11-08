import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import { content, event, look, state } from '@/stories/argTypes';

const toDate = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const toIso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const header = (d: Date) => `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${'일월화수목금토'[d.getDay()]})`;

const meta: Meta = {
  title: 'Molecules/Popover',
  id: 'ui-shadcn-popover',
  tags: ['shadcn'],
  component: X.Popover,
  args: { date: '2026-11-08', open: false, side: 'bottom', align: 'start', sideOffset: 6, onOpenChange: fn(), onSelect: fn() },
  argTypes: {
    date: content('고른 날(트리거 글자와 달력에 함께 보인다)'),
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'], ...look('트리거의 어느 쪽에 뜰지') },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'], ...look('그 쪽 안에서 맞출 끝') },
    sideOffset: { control: { type: 'range', min: 0, max: 24 }, ...look('트리거와 떨어진 거리') },
    open: state('열림'),
    onOpenChange: event(),
    onSelect: event('날짜 고름(고르면 바로 닫힌다)'),
  },
  // ⑧-0b 내 활동 날짜 헤더를 누르면 헤더 아래 말풍선에 날짜 피커가 뜨고, 날짜를 누르면 바로 닫힌다
  render: function Render({ date, open, side, align, sideOffset, onOpenChange, onSelect }: Record<string, any>) {
    const [, update] = useArgs();
    const value = toDate(date);
    return (
      <X.Popover open={open} onOpenChange={(o) => { onOpenChange?.(o); update({ open: o }); }}>
        <X.PopoverTrigger className="flex items-center gap-1.5 rounded-sm text-section outline-none focus-visible:ring-2 focus-visible:ring-ring">
          {header(value)}<X.Icon name="chevronDown" className="size-[18px] text-muted-foreground" />
        </X.PopoverTrigger>
        <X.PopoverContent side={side} align={align} sideOffset={sideOffset} className="w-auto p-0">
          <X.Calendar mode="single" required selected={value} defaultMonth={value} today={new Date(2026, 10, 3)}
            onSelect={(d) => { onSelect?.(d); update({ date: toIso(d), open: false }); }} />
        </X.PopoverContent>
      </X.Popover>
    );
  },
};
export default meta;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: StoryObj<typeof meta> = {};
