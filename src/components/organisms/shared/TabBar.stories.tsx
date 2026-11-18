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
  argTypes: {
    active: {
      control: 'inline-radio',
      options: ['home', 'discover', 'qr', 'contacts', 'profile'],
    },
  },
  render: controlled(X.TabBar, 'active', 'onNavigate'),
  parameters: { width: 361 },
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

/** 줄어든 모양(아래로 스크롤하는 동안): 고른 탭 아이콘 하나의 작은 캡슐, 누르면 펴진다 */
export const Minimized: Story = {
  args: { minimized: true },
};

/** 컴파운드로 바꿔 조립: 탭 세 개만 */
export const Composed: Story = {
  render: function Render(args) {
    const [, update] = useArgs();
    return (
      <X.TabBar
        active={args.active}
        onNavigate={(k) => {
          args.onNavigate?.(k);
          update({ active: k });
        }}
      >
        <X.TabBar.Tab value="home" icon="tabHomeFill">
          홈
        </X.TabBar.Tab>
        <X.TabBar.Tab value="discover" icon="tabSearchFill">
          발견
        </X.TabBar.Tab>
        <X.TabBar.Tab value="profile" icon="tabProfileFill">
          내 프로필
        </X.TabBar.Tab>
      </X.TabBar>
    );
  },
};

/** 주소를 주면 탭이 링크가 된다(새 탭에서 열기 · 링크 목록). 로그인이 필요한 탭 등은 onNavigate에서 event.preventDefault()로 직접 이동한다. Next에서는 linkAs={Link} */
export const Links: Story = {
  args: {
    hrefs: {
      home: '#home',
      discover: '#discover',
      qr: '#qr',
      contacts: '#contacts',
      profile: '#profile',
    },
  },
  render: function Render(args) {
    const [, update] = useArgs();
    return (
      <X.TabBar
        active={args.active}
        hrefs={args.hrefs}
        onNavigate={(k, e) => {
          e.preventDefault();
          args.onNavigate?.(k, e);
          update({ active: k });
        }}
      />
    );
  },
};
