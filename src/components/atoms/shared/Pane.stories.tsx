import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Atoms/Shared/Pane',
  id: 'atoms-pane',
  component: X.FloatingBar,
  args: { screenTitle: '발견', height: 600, align: 'center' },
  argTypes: {
    align: { control: 'inline-radio', options: ['center', 'left-pane'] },
  },
  render: function Render(args) {
    const [, update] = useArgs();
    void update;
    return (
      <X.WebShell height={args.height ?? 600}>
        <X.WebShell.Sidebar>
          <X.Sidebar active="home" hosted={['온디바이스 AI 앱 만들기']} />
        </X.WebShell.Sidebar>
        <X.WebShell.Main>
          <X.TopBar
            title={args.screenTitle ?? 'Title'}
            right={<X.GlassGroup unread={2} />}
          />
          <X.TwoColumnList>
            <Ph t="목록" h={900} />
          </X.TwoColumnList>
          <X.FloatingBar align={args.align}>
            <X.SearchBar />
          </X.FloatingBar>
        </X.WebShell.Main>
      </X.WebShell>
    );
  },
  parameters: { layout: 'fullscreen' },
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
function Ph({ t, h = 120 }: { t: string; h?: number }) {
  return (
    <div
      className="grid place-items-center rounded-lg border-[1.5px] border-dashed border-border text-caption font-semibold text-muted-foreground"
      style={{ height: h }}
    >
      {t}
    </div>
  );
}
