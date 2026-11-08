import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Templates/PhoneFrame',
  component: X.PhoneFrame,
  args: { title: '홈', unread: 2, tab: 'home' },
  argTypes: { tab: { control: "inline-radio", options: ["home", "discover", "cards", "profile"] } },
  render: ({ title, unread, tab }: Record<string, any>) => <X.PhoneFrame title={title} actions={<X.GlassGroup unread={unread} />} tabBar={<X.TabBar active={tab} />}><X.QueueCard covers={['img/cover-22.jpg', 'img/cover-13.jpg', 'img/cover-42.jpg']} sub="프로그램 7개 중 3개 봤어요" /><h2 className="mb-1 mt-4 text-section">내 활동</h2><X.RowList>{D.ACTIVITIES.map((a) => <X.ActivityRow key={a.id} a={a} />)}</X.RowList></X.PhoneFrame>,
  
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

