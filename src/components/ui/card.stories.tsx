import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/shadcn/Card',
  id: 'ui-shadcn-card',  // 예전 'UI (shadcn)' 링크가 그대로 열리도록 고정
  tags: ['shadcn'],
  component: X.Card,
  args: { title: '소개', body: '서류 통과한 17기끼리 모의 면접을 돌려요. 매주 월·목 저녁 온라인으로 만나요.' },
  
  render: ({ title, body }) => <X.Card><X.CardTitle>{title}</X.CardTitle><p className="text-body leading-relaxed">{body}</p></X.Card>,
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

