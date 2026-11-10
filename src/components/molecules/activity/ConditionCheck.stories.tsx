import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { AGE } from '@/stories/conditions';

const meta: Meta<typeof X.ConditionCheck> = {
  title: 'Molecules/Activity/ConditionCheck',
  id: 'molecules-conditioncheck',
  component: X.ConditionCheck,
  args: {
    met: true,
    children: '김도윤님과 명함 맞교환',
    onVerify: fn(),
  },
  argTypes: { children: { control: 'text' }, onVerify: { action: 'verify' } },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** ㉙-d: 충족한 조건은 청록 체크 */
export const Playground: Story = {};

/** ㉙-d2: 충족하지 못하면 빈 원 + 인증하기 */
export const NotMet: Story = {
  args: { met: false, children: 'SSAFY 16기·17기 서류 발표 통과 이상' },
};

/** onVerify를 주지 않으면 인증하기 없이 줄만(개설자 미리보기) */
export const NoAction: Story = {
  args: { met: false, onVerify: undefined },
};

/** ㉙-d2의 참여 조건 구역. 문구는 조건 값 도우미(formatConditionSummary)로 만든다 */
export const Section: Story = {
  parameters: { width: 345 },
  render: () => (
    <section className="flex flex-col">
      <X.Text as="h3" variant="innerTitle" className="mb-2">
        참여 조건 · 모두 충족
      </X.Text>
      <X.ConditionCheck met>김도윤님과 명함 맞교환</X.ConditionCheck>
      <X.ConditionCheck met={false} onVerify={fn()}>
        {X.formatConditionSummary(AGE)}
      </X.ConditionCheck>
    </section>
  ),
};
