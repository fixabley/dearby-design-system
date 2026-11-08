import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Templates/ThreeColumnEditor',
  component: X.ThreeColumnEditor,
  args: { screenTitle: '시간표 편집', height: 600, left: 'Settings 280', center: 'Grid', right: 'Selected 300' },

  render: function Render(args: Record<string, any>) { const [, update] = useArgs(); void update; return <X.WebShell height={args.height ?? 600}><X.WebShell.Sidebar><X.Sidebar active="home" hosted={['온디바이스 AI 앱 만들기']} /></X.WebShell.Sidebar><X.WebShell.Main><X.TopBar title={args.screenTitle ?? 'Title'} right={<X.GlassGroup unread={2} />} /><X.ThreeColumnEditor><X.ThreeColumnEditor.Left><Ph t={args.left} h={460} /></X.ThreeColumnEditor.Left><X.ThreeColumnEditor.Center><Ph t={args.center} h={460} /></X.ThreeColumnEditor.Center><X.ThreeColumnEditor.Right><Ph t={args.right} h={460} /></X.ThreeColumnEditor.Right></X.ThreeColumnEditor></X.WebShell.Main></X.WebShell>; },
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 채운 실제 화면: 기간 설정 | 주간 시간표(편집) | 고른 블록 편집 */
export const Composed: Story = {
  render: function Render(args: Record<string, any>) {
    const [{ selected = 14 }, update] = useArgs();
    return (
      <X.WebShell height={args.height ?? 600}>
        <X.WebShell.Sidebar><X.Sidebar active="온디바이스 AI 앱 만들기" hosted={['온디바이스 AI 앱 만들기']} /></X.WebShell.Sidebar>
        <X.WebShell.Main>
          <X.TopBar title={args.screenTitle ?? 'Title'} right={<X.GlassGroup unread={2} />} />
          <X.ThreeColumnEditor>
            <X.ThreeColumnEditor.Left><X.ListGroup title="기간"><X.ListRow icon="calendar" title="시작" trailing="11월 30일 (월)" /><X.ListRow icon="repeat" title="반복" trailing="매주" /></X.ListGroup></X.ThreeColumnEditor.Left>
            <X.ThreeColumnEditor.Center><X.WeeklyTimetable blocks={D.BLOCKS} mode="edit" selected={selected} onSelect={(i) => update({ selected: i })} /></X.ThreeColumnEditor.Center>
            <X.ThreeColumnEditor.Right><X.BlockEditor name="특강" kind="class" days={['수']} from="15:00" to="17:00" leaders={[{ initial: '한', name: '한유진', role: '멘토 · @yujin' }]} desc="오전 강의 내용으로 화면 하나를 직접 만들어요." /></X.ThreeColumnEditor.Right>
          </X.ThreeColumnEditor>
        </X.WebShell.Main>
      </X.WebShell>
    );
  },
};
function Ph({ t, h = 120 }: { t: string; h?: number }) { return <div className="grid place-items-center rounded-lg border-[1.5px] border-dashed border-border text-caption font-semibold text-muted-foreground" style={{ height: h }}>{t}</div>; }
