import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Templates/TwoColumnList',
  component: X.TwoColumnList,
  args: { screenTitle: '홈', height: 600, rows: 6 },
  argTypes: { rows: { control: { type: 'range', min: 1, max: 12 } } },
  render: function Render(args: Record<string, any>) { const [, update] = useArgs(); void update; return <X.WebShell height={args.height ?? 600} sidebar={<X.Sidebar active="home" hosted={['온디바이스 AI 앱 만들기']} />}><X.TopBar title={args.screenTitle ?? 'Title'} right={<X.GlassGroup unread={2} />} /><X.TwoColumnList><X.RowList columns={2}>{Array.from({ length: args.rows }, (_, i) => <div key={i} className="py-3"><Ph t={`Row ${i + 1}`} h={96} /></div>)}</X.RowList></X.TwoColumnList></X.WebShell>; },
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};
function Ph({ t, h = 120 }: { t: string; h?: number }) { return <div className="grid place-items-center rounded-lg border-[1.5px] border-dashed border-border text-caption font-semibold text-muted-foreground" style={{ height: h }}>{t}</div>; }
