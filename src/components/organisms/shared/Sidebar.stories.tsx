import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/Shared/Sidebar',
  id: 'organisms-sidebar',
  component: X.Sidebar,
  args: { active: 'home', hosted: ['온디바이스 AI 앱 만들기'], onNavigate: fn() },
  argTypes: { active: { control: 'select', options: ['home', 'discover', 'cards', 'profile', '온디바이스 AI 앱 만들기'] } },
  render: controlled(X.Sidebar, 'active', 'onNavigate'),
  
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 로고 아래 탭 두 개만 */
export const Composed: Story = {
  render: function Render(args: Record<string, any>) {
    const [, update] = useArgs();
    return (
      <X.Sidebar active={args.active} onNavigate={(k) => { args.onNavigate?.(k); update({ active: k }); }}>
        <X.Sidebar.Logo />
        <X.Sidebar.NavItem value="home"><X.Icon name="home" />홈</X.Sidebar.NavItem>
        <X.Sidebar.NavItem value="discover"><X.Icon name="explore" />발견</X.Sidebar.NavItem>
      </X.Sidebar>
    );
  },
};
