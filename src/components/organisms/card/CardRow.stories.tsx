import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { SideBySide } from '@/stories/SideBySide';

const meta: Meta = {
  title: 'Organisms/Card/CardRow',
  id: 'organisms-cardrow',
  component: X.CardRow,
  args: {
    name: 'SNS',
    summary: '소셜 링크만',
    onClick: fn(),
  },
  parameters: { width: 345 },
  render: (args) => (
    <X.ListGroup>
      <X.CardRow
        name={args.name}
        summary={args.summary}
        onClick={args.onClick}
      />
    </X.ListGroup>
  ),
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 명함 목록(㉗-j2): 기본 명함 두 장과 내가 만든 명함, 아래 따로 묶은 새 명함 줄(기존 ListRow `add`) */
export const List: Story = {
  render: () => (
    <>
      <X.ListGroup>
        <X.CardRow name="전체" summary="모든 항목" onClick={fn()} />
        <X.CardRow name="SNS" summary="소셜 링크만" onClick={fn()} />
        <X.CardRow name="개발 행사용" summary="항목 4개" onClick={fn()} />
      </X.ListGroup>
      <X.ListGroup className="mt-5">
        <X.ListRow icon="addCircle" title="새 명함" add onClick={fn()} />
      </X.ListGroup>
    </>
  ),
};

/** 링크로 가는 행: `asChild`에 링크 요소 하나(안은 비워 둔다) */
export const AsLink: Story = {
  render: () => (
    <X.ListGroup>
      <X.CardRow name="SNS" summary="소셜 링크만" asChild>
        <a href="#sns" />
      </X.CardRow>
    </X.ListGroup>
  ),
};

/** 이름과 요약이 긴 경우: 이름이 먼저 말줄임 */
export const Long: Story = {
  render: () => (
    <X.ListGroup>
      <X.CardRow
        name="파이토치 데이 코리아 2026 현장 교환용 명함"
        summary="항목 12개"
        onClick={fn()}
      />
    </X.ListGroup>
  ),
};

/** 불러오는 동안(CardRowSkeleton): 같은 높이와 간격 */
export const Skeleton: Story = {
  parameters: { width: 740 },
  render: () => (
    <SideBySide width={345}>
      <X.ListGroup>
        <X.CardRow name="SNS" summary="소셜 링크만" onClick={fn()} />
      </X.ListGroup>
      <X.ListGroup>
        <X.CardRowSkeleton />
      </X.ListGroup>
    </SideBySide>
  ),
};
