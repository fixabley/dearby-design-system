import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Atoms/Badge',
  id: 'ui-shadcn-badge',  // 예전 'UI (shadcn)' 링크가 그대로 열리도록 고정
  tags: ['shadcn'],
  component: X.Badge,
  args: { children: 'D-6', variant: 'default', size: 'default' },
  argTypes: { variant: { control: "select", options: ["default", "mint", "outline", "muted", "destructive"] }, size: { control: "inline-radio", options: ["default", "sm"] }, asChild: { table: { disable: true } } },
  
  
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};
export const All: Story = { render: () => <div className="flex flex-col gap-3"><div className="flex gap-2"><X.Badge>D-6</X.Badge><X.Badge variant="mint">추천 75%</X.Badge><X.Badge variant="outline">다시 해 보기</X.Badge><X.Badge variant="muted">모집 중</X.Badge><X.Badge variant="destructive">오류</X.Badge></div>
  <div className="flex gap-2"><X.Badge size="sm">D-6</X.Badge><X.Badge variant="mint" size="sm"><X.Icon name="check" />확인됨</X.Badge><X.Badge variant="outline" size="sm">발표자</X.Badge></div></div> };
