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
  render: ({ title, unread, tab }: Record<string, any>) => <X.PhoneFrame><X.PhoneFrame.Header title={title}><X.GlassGroup unread={unread} /></X.PhoneFrame.Header><X.PhoneFrame.Body><X.QueueCard covers={['img/cover-22.jpg', 'img/cover-13.jpg', 'img/cover-42.jpg']} sub="프로그램 7개 중 3개 봤어요" /><h2 className="mb-1 mt-4 text-section">내 활동</h2><X.RowList>{D.ACTIVITIES.map((a) => <X.ActivityRow key={a.id} a={a} />)}</X.RowList></X.PhoneFrame.Body><X.PhoneFrame.TabBar><X.TabBar active={tab} /></X.PhoneFrame.TabBar></X.PhoneFrame>,

};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 오른쪽 그룹 없는 발견 화면(검색 + 프로그램 목록) */
export const Composed: Story = {
  render: () => (
    <X.PhoneFrame>
      <X.PhoneFrame.Header title="발견" />
      <X.PhoneFrame.Body><X.SearchBar /><X.RowList>{D.PROGRAMS.map((p) => <X.ProgramRow key={p.id} p={p} />)}</X.RowList></X.PhoneFrame.Body>
      <X.PhoneFrame.TabBar><X.TabBar active="discover" /></X.PhoneFrame.TabBar>
    </X.PhoneFrame>
  ),
};
