import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';
import { content, iconArgType, look } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Atoms/shadcn/Badge',
  id: 'ui-shadcn-badge',  // 예전 'UI (shadcn)' 링크가 그대로 열리도록 고정
  tags: ['shadcn'],
  component: X.Badge,
  args: { children: '확인됨', icon: 'none', variant: 'mint', size: 'default' },
  argTypes: {
    children: content('배지 글자'),
    icon: iconArgType(),
    variant: { control: 'select', options: ['default', 'mint', 'outline', 'muted', 'destructive', 'count'], ...look('default 청록 채움(D-day) · mint 민트(추천 비율·통과) · outline 흰 바탕 테두리 · muted 모집 상태 · destructive 오류 · count 알림 개수') },
    size: { control: 'inline-radio', options: ['default', 'sm', 'dot'], ...look('default 24 · sm 20 · dot 16(알림 개수)') },
    asChild: { table: { disable: true } },
  },
  
  
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};
export const All: Story = { render: () => <div className="flex flex-col gap-3"><div className="flex gap-2"><X.Badge>D-6</X.Badge><X.Badge variant="mint">추천 75%</X.Badge><X.Badge variant="outline">다시 해 보기</X.Badge><X.Badge variant="muted">모집 중</X.Badge><X.Badge variant="destructive">오류</X.Badge></div>
  <div className="flex gap-2"><X.Badge size="sm">D-6</X.Badge><X.Badge variant="mint" size="sm" icon="check">확인됨</X.Badge><X.Badge variant="mint" icon="github">평가 전</X.Badge><X.Badge icon="calendar">D-6</X.Badge><X.Badge variant="outline" size="sm">발표자</X.Badge></div></div> };
