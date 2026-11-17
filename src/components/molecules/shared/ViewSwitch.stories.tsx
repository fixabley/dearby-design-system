import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/Shared/ViewSwitch',
  id: 'molecules-viewswitch',
  component: X.ViewSwitch,
  args: {
    items: [
      { value: 'grid', icon: 'viewGrid', label: '격자로 보기' },
      { value: 'list', icon: 'viewList', label: '목록으로 보기' },
    ],
    value: 'grid',
    label: '보기',
    onChange: fn(),
  },
  render: controlled(X.ViewSwitch, 'value', 'onChange'),
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** 격자 · 목록: 제목 줄 오른쪽에 놓는다. 고른 것은 청록 아이콘과 옅은 면, 단추는 44px */
export const Playground: Story = {};

/** 달력 · 주간 · 목록(활동 상세의 일정) */
export const Three: Story = {
  args: {
    items: [
      { value: 'calendar', icon: 'calendar', label: '달력으로 보기' },
      { value: 'week', icon: 'viewWeek', label: '주간으로 보기' },
      { value: 'list', icon: 'viewList', label: '목록으로 보기' },
    ],
    value: 'calendar',
    label: '일정 보기',
  },
};
