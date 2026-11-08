import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import { iconArgType } from '@/stories/argTypes';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/ListGroup',
  component: X.ListRow,
  args: { groupTitle: '기간', icon: 'calendar', title: '시작', subtitle: '', trailing: '11월 30일 (월)', add: false, selected: false },
  argTypes: { icon: iconArgType() },
  render: ({ groupTitle, ...args }: Record<string, any>) => <X.ListGroup title={groupTitle}><X.ListRow {...(args as any)} /><X.ListRow icon="repeat" title="반복" trailing="매주" /><X.ListRow title="참여자에게 알림 보내기" trailing={<X.Switch defaultChecked />} /><X.ListRow icon="add" title="사람 추가" add onClick={() => {}} /></X.ListGroup>,
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

