import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import { content, event, iconArgType, look, state } from '@/stories/argTypes';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/ListGroup',
  component: X.ListRow,
  args: { groupTitle: '기간', icon: 'calendar', title: '시작', subtitle: '', trailing: '11월 30일 (월)', add: false, selected: false },
  argTypes: { children: { table: { disable: true } }, onClick: event(), title: content('제목'), subtitle: content('보조 줄'), trailing: content('오른쪽 값'), icon: iconArgType(true, '앞 아이콘'), groupTitle: content('묶음 머리'), add: look('추가 행(청록 글자)'), selected: state('고른 행(민트 면)') },
  render: ({ groupTitle, ...args }: Record<string, any>) => <X.ListGroup title={groupTitle}><X.ListRow {...(args as any)} /><X.ListRow icon="repeat" title="반복" trailing="매주" /><X.ListRow title="참여자에게 알림 보내기" trailing={<X.Switch defaultChecked />} /><X.ListRow icon="add" title="사람 추가" add onClick={() => {}} /></X.ListGroup>,
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

