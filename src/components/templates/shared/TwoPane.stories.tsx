import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Templates/Shared/TwoPane',
  id: 'templates-twopane',
  component: X.TwoPane,
  args: { screenTitle: '홈', height: 600, list: 'List 5fr', detail: 'Detail 7fr', withFooter: true, detailKey: 'a' },

  render: function Render(args: Record<string, any>) { const [, update] = useArgs(); void update; return <X.WebShell height={args.height ?? 600}><X.WebShell.Sidebar><X.Sidebar active="home" hosted={['온디바이스 AI 앱 만들기']} /></X.WebShell.Sidebar><X.WebShell.Main><X.TopBar title={args.screenTitle ?? 'Title'} right={<X.GlassGroup unread={2} />} /><X.TwoPane><X.TwoPane.List><Ph t={args.list} h={900} /></X.TwoPane.List><X.TwoPane.Detail detailKey={args.detailKey}><Ph t={args.detail} h={900} /></X.TwoPane.Detail>{args.withFooter && <X.TwoPane.Footer><X.Button size="lg" block>신청하러 가기</X.Button></X.TwoPane.Footer>}</X.TwoPane></X.WebShell.Main></X.WebShell>; },
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 채운 실제 화면: 활동 목록 | 고른 활동 상세 + 아래 신청 CTA */
export const Composed: Story = {
  render: function Render(args: Record<string, any>) {
    const [{ selectedId = '1287' }, update] = useArgs();
    return (
      <X.WebShell height={args.height ?? 600}>
        <X.WebShell.Sidebar><X.Sidebar active="home" /></X.WebShell.Sidebar>
        <X.WebShell.Main>
          <X.TopBar title="홈" right={<X.GlassGroup unread={2} />} />
          <X.TwoPane>
            <X.TwoPane.List><X.RowList>{D.ACTIVITIES.map((a) => <X.ActivityRow key={a.id} a={a} selected={selectedId === a.id} onSelect={(x) => update({ selectedId: x.id })} />)}</X.RowList></X.TwoPane.List>
            <X.TwoPane.Detail detailKey={selectedId}><X.ActivityDetail d={D.SSAFY} /></X.TwoPane.Detail>
            <X.TwoPane.Footer><X.Button size="lg" block>신청하러 가기</X.Button></X.TwoPane.Footer>
          </X.TwoPane>
        </X.WebShell.Main>
      </X.WebShell>
    );
  },
};
function Ph({ t, h = 120 }: { t: string; h?: number }) { return <div className="grid place-items-center rounded-lg border-[1.5px] border-dashed border-border text-caption font-semibold text-muted-foreground" style={{ height: h }}>{t}</div>; }
