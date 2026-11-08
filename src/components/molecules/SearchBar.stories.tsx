import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/SearchBar',
  component: X.SearchBar,
  args: { placeholder: '프로그램·활동·태그 검색', onFilter: fn() },
  
  
  parameters: { width: 440 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 필터 없이 검색 캡슐만 */
export const Composed: Story = { render: (args: Record<string, any>) => <X.SearchBar {...(args as any)}><X.SearchBar.Input /></X.SearchBar> };
