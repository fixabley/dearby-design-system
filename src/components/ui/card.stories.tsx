import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/shadcn/Card',
  id: 'ui-shadcn-card', // 예전 'UI (shadcn)' 링크가 그대로 열리도록 고정
  tags: ['shadcn'],
  component: X.Card,
  args: {
    title: '소개',
    body: '서류 통과한 17기끼리 모의 면접을 돌려요. 매주 월·목 저녁 온라인으로 만나요.',
  },

  render: ({ title, body }) => (
    <X.Card>
      <X.CardTitle>{title}</X.CardTitle>
      <p className="text-body leading-relaxed">{body}</p>
    </X.Card>
  ),
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs;
void fn;
void controlled;
void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 바탕 → 카드 → 조작 면: 카드 위에 놓인 컨트롤이 구분되는지 라이트·다크로 확인한다. 다크는 그림자 대신 밝기(바탕 #0f1112 · 카드 #171a1b · 조작 면 #1f2325)와 조작 면 위쪽 밝은 선으로 높이를 나타낸다 */
export const Surfaces: Story = {
  parameters: { width: 420 },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <X.Button variant="outline">바탕 위 버튼</X.Button>
        <X.Button variant="mint">민트</X.Button>
        <X.Button variant="outline" size="icon" aria-label="공유">
          <X.Icon name="share" />
        </X.Button>
      </div>
      <X.Card className="flex flex-col gap-3">
        <X.CardTitle>카드 위 컨트롤</X.CardTitle>
        <p className="text-body">본문 글자</p>
        <p className="text-caption text-muted-foreground">보조 글자</p>
        <div className="flex flex-wrap items-center gap-2">
          <X.Button variant="outline">보조 버튼</X.Button>
          <X.Button variant="mint">민트</X.Button>
          <X.Button>채움</X.Button>
          <X.Button variant="ghost">글자 버튼</X.Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <X.Button variant="tile" size="tile" icon="calendar">
            타일
          </X.Button>
          <X.Toggle variant="tile">토글 타일</X.Toggle>
          <X.Toggle variant="tile" defaultPressed>
            켠 타일
          </X.Toggle>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <X.Toggle variant="chip">칩</X.Toggle>
          <X.Toggle variant="chip" defaultPressed>
            고른 칩
          </X.Toggle>
          <X.Badge variant="outline">배지</X.Badge>
          <X.Badge variant="mint">민트 배지</X.Badge>
        </div>
        <X.Separator />
        <div className="flex items-center gap-3">
          <X.Skeleton className="size-10 rounded-full" />
          <X.Skeleton className="h-4 flex-1" />
        </div>
      </X.Card>
    </div>
  ),
};
