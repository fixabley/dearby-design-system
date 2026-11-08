import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/Shared/TabBar',
  id: 'organisms-tabbar',
  component: X.TabBar,
  args: { active: 'home', onNavigate: fn() },
  argTypes: { active: { control: "inline-radio", options: ["home", "discover", "cards", "profile"] } },
  render: controlled(X.TabBar, 'active', 'onNavigate'),
  parameters: { width: 361 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 탭 세 개만 */
export const Composed: Story = {
  render: function Render(args: Record<string, any>) {
    const [, update] = useArgs();
    return (
      <X.TabBar active={args.active} onNavigate={(k) => { args.onNavigate?.(k); update({ active: k }); }}>
        <X.TabBar.Tab value="home" icon="home">홈</X.TabBar.Tab>
        <X.TabBar.Tab value="discover" icon="explore">발견</X.TabBar.Tab>
        <X.TabBar.Tab value="profile" icon="profile">내 프로필</X.TabBar.Tab>
      </X.TabBar>
    );
  },
};
