import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Templates/WebShell',
  component: X.WebShell,
  args: { height: 480, active: 'home', title: '홈' },
  argTypes: { active: { control: "inline-radio", options: ["home", "discover", "cards", "profile"] } },
  render: ({ height, active, title }: Record<string, any>) => <X.WebShell height={height}><X.WebShell.Sidebar><X.Sidebar active={active} hosted={['온디바이스 AI 앱 만들기']} /></X.WebShell.Sidebar><X.WebShell.Main><X.TopBar title={title} right={<X.GlassGroup unread={2} />} /></X.WebShell.Main></X.WebShell>,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 채운 실제 화면: 내가 연 모임 없는 사이드바 + 발견 목록 */
export const Composed: Story = {
  render: ({ height }: Record<string, any>) => (
    <X.WebShell height={height}>
      <X.WebShell.Sidebar><X.Sidebar active="discover"><X.Sidebar.Logo /><X.Sidebar.Nav /></X.Sidebar></X.WebShell.Sidebar>
      <X.WebShell.Main>
        <X.TopBar title="발견" right={<X.GlassGroup unread={2} />} />
        <div className="px-6"><X.RowList>{D.PROGRAMS.slice(0, 3).map((p) => <X.ProgramRow key={p.id} p={p} />)}</X.RowList></div>
      </X.WebShell.Main>
    </X.WebShell>
  ),
};
