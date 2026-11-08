import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/FilterSheet',
  component: X.FilterSheet,
  args: { resultLabel: '프로그램 3개 보기', onApply: fn(), groups: [{ title: '활동 상태', hint: '여러 개 고를 수 있어요', options: [{ label: '지원 가능', count: 7, on: true }, { label: '진행·예정', count: 12 }, { label: '지난 활동', count: 21 }] }, { title: '종류', options: [{ label: '부트캠프', count: 5, on: true }, { label: '동아리', count: 1 }, { label: '해커톤', count: 0, disabled: true }] }] },
  
  render: (args: Record<string, any>) => <X.Sheet open modal={false}><X.SheetContent floating><X.FilterSheet key={JSON.stringify(args.groups)} {...(args as any)} /></X.SheetContent></X.Sheet>,
  
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

