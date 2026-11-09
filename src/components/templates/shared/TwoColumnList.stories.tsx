import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Templates/Shared/TwoColumnList',
  id: 'templates-twocolumnlist',
  component: X.TwoColumnList,
  args: { screenTitle: '홈', height: 600, rows: 6 },
  argTypes: { rows: { control: { type: 'range', min: 1, max: 12 } } },
  render: function Render(args) { const [, update] = useArgs(); void update; return <X.WebShell height={args.height ?? 600}><X.WebShell.Sidebar><X.Sidebar active="home" hosted={['온디바이스 AI 앱 만들기']} /></X.WebShell.Sidebar><X.WebShell.Main><X.TopBar title={args.screenTitle ?? 'Title'} right={<X.GlassGroup unread={2} />} /><X.TwoColumnList><X.TwoColumnList.Items>{Array.from({ length: args.rows }, (_, i) => <div key={i} className="py-3"><Ph t={`Row ${i + 1}`} h={96} /></div>)}</X.TwoColumnList.Items></X.TwoColumnList></X.WebShell.Main></X.WebShell>; },
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 채운 실제 화면: 머리(분할 전환) + 내 활동 두 열 */
export const Composed: Story = {
  render: (args) => (
    <X.WebShell height={args.height ?? 600}>
      <X.WebShell.Sidebar><X.Sidebar active="home" hosted={['온디바이스 AI 앱 만들기']} /></X.WebShell.Sidebar>
      <X.WebShell.Main>
        <X.TopBar title={args.screenTitle ?? 'Title'} right={<X.GlassGroup unread={2} />} />
        <X.TwoColumnList>
          <X.TwoColumnList.Header className="w-[240px] pb-2"><X.Segmented items={['mine', 'past'] as const} labels={{ mine: '내 활동', past: '지난 활동' }} value="mine" /></X.TwoColumnList.Header>
          <X.TwoColumnList.Items>{D.ACTIVITIES.map((a) => <X.ActivityRow key={a.id} a={a} />)}</X.TwoColumnList.Items>
        </X.TwoColumnList>
      </X.WebShell.Main>
    </X.WebShell>
  ),
};
function Ph({ t, h = 120 }: { t: string; h?: number }) { return <div className="grid place-items-center rounded-lg border-[1.5px] border-dashed border-border text-caption font-semibold text-muted-foreground" style={{ height: h }}>{t}</div>; }
