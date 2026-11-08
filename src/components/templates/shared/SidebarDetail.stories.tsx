import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Templates/Shared/SidebarDetail',
  id: 'templates-sidebardetail',
  component: X.SidebarDetail,
  args: { screenTitle: '', height: 600, side: 'Profile header 360', content: 'Tabs + content' },

  render: function Render(args: Record<string, any>) { const [, update] = useArgs(); void update; return <X.WebShell height={args.height ?? 600}><X.WebShell.Sidebar><X.Sidebar active="home" hosted={['온디바이스 AI 앱 만들기']} /></X.WebShell.Sidebar><X.WebShell.Main><X.TopBar title={args.screenTitle ?? 'Title'} right={<X.GlassGroup unread={2} />} /><X.SidebarDetail><X.SidebarDetail.Side><Ph t={args.side} h={320} /></X.SidebarDetail.Side><X.SidebarDetail.Content><Ph t={args.content} h={700} /></X.SidebarDetail.Content></X.SidebarDetail></X.WebShell.Main></X.WebShell>; },
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 채운 실제 화면: 왼쪽 프로필 머리 + 오른쪽 활동 목록 */
export const Composed: Story = {
  render: (args: Record<string, any>) => (
    <X.WebShell height={args.height ?? 600}>
      <X.WebShell.Sidebar><X.Sidebar active="profile" hosted={['온디바이스 AI 앱 만들기']} /></X.WebShell.Sidebar>
      <X.WebShell.Main>
        <X.TopBar title={args.screenTitle ?? 'Title'} right={<X.GlassGroup unread={2} />} />
        <X.SidebarDetail>
          <X.SidebarDetail.Side><X.ProfileHeader p={D.SEOYEON} /></X.SidebarDetail.Side>
          <X.SidebarDetail.Content><X.RowList>{D.ACTIVITIES.slice(0, 3).map((a) => <X.ActivityRow key={a.id} a={a} />)}</X.RowList></X.SidebarDetail.Content>
        </X.SidebarDetail>
      </X.WebShell.Main>
    </X.WebShell>
  ),
};
function Ph({ t, h = 120 }: { t: string; h?: number }) { return <div className="grid place-items-center rounded-lg border-[1.5px] border-dashed border-border text-caption font-semibold text-muted-foreground" style={{ height: h }}>{t}</div>; }
