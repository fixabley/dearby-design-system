import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Atoms/shadcn/Input',
  id: 'ui-shadcn-input',  // 예전 'UI (shadcn)' 링크가 그대로 열리도록 고정
  tags: ['shadcn'],
  component: X.Input,
  args: { label: '제목', defaultValue: '목요일 모임은 21:00에 시작해요', placeholder: '선택', multiline: false, disabled: false },
  
  render: ({ label, multiline, ...args }) => <X.ListGroup><div className="px-4 py-2.5"><X.Label>{label}</X.Label>{multiline ? <X.Textarea key="t" {...args} /> : <X.Input key={String(args.defaultValue)} {...args} />}</div></X.ListGroup>,
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

