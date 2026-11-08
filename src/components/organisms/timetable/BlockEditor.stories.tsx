import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/Timetable/BlockEditor',
  id: 'organisms-blockeditor',
  tags: ['manage'],
  component: X.BlockEditor,
  args: { name: '특강', kind: 'class', days: ['수'], from: '15:00', to: '17:00', leaders: [{ initial: '한', name: '한유진', role: '멘토 · @yujin' }], desc: '오전 강의 내용으로 화면 하나를 직접 만들어요.' },
  argTypes: { kind: { control: "inline-radio", options: ["class", "rest"] } },
  render: (args: Record<string, any>) => <X.BlockEditor key={JSON.stringify(args)} {...(args as any)} />,
  parameters: { width: 300 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 쉬는 시간처럼 이름 · 시각 · 설명만 */
export const Composed: Story = { render: (args: Record<string, any>) => <X.BlockEditor key={JSON.stringify(args)} {...(args as any)}><X.BlockEditor.Name /><X.BlockEditor.Time /><X.BlockEditor.Description /></X.BlockEditor> };
