import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Templates/Shared/ManageLayout',
  id: 'templates-managelayout',
  tags: ['manage'],
  component: X.ManageLayout,
  args: {
    screenTitle: '온디바이스 AI 앱 만들기 1회차',
    height: 600,
    tab: 'assignments',
    onTab: fn(),
  },
  argTypes: { tab: { control: 'select', options: X.MANAGE_TABS } },
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
          <X.ManageLayout
            tabs={X.MANAGE_TABS}
            labels={X.MANAGE_TAB_LABEL}
            tab={args.tab}
            onTab={(t) => {
              args.onTab?.(t);
              update({ tab: t });
            }}
          >
            <X.ManageLayout.Tabs />
            <X.ManageLayout.Content>
              <X.TwoPane>
                <X.TwoPane.List>
                  <Ph
                    t={`${X.MANAGE_TAB_LABEL[args.tab as X.ManageTab]} list`}
                    h={400}
                  />
                </X.TwoPane.List>
                <X.TwoPane.Detail>
                  <Ph t="Edit" h={400} />
                </X.TwoPane.Detail>
              </X.TwoPane>
            </X.ManageLayout.Content>
          </X.ManageLayout>
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

/** 컴파운드로 채운 실제 화면: 과제 탭의 제출 목록 | 평가 */
export const Composed: Story = {
  render: function Render(args) {
    const [{ selected = 0 }, update] = useArgs();
    return (
      <X.WebShell height={args.height ?? 600}>
        <X.WebShell.Sidebar>
          <X.Sidebar
            active="온디바이스 AI 앱 만들기"
            hosted={['온디바이스 AI 앱 만들기']}
          />
        </X.WebShell.Sidebar>
        <X.WebShell.Main>
          <X.TopBar
            title={args.screenTitle ?? 'Title'}
            right={<X.GlassGroup unread={2} />}
          />
          <X.ManageLayout
            tabs={X.MANAGE_TABS}
            labels={X.MANAGE_TAB_LABEL}
            tab={args.tab}
            onTab={(t) => {
              args.onTab?.(t);
              update({ tab: t });
            }}
          >
            <X.ManageLayout.Tabs />
            <X.ManageLayout.Content>
              <X.TwoPane>
                <X.TwoPane.List>
                  <X.SubmissionList
                    items={D.SUBMISSIONS}
                    selected={selected}
                    onSelect={(i) => update({ selected: i })}
                  />
                </X.TwoPane.List>
                <X.TwoPane.Detail detailKey={String(selected)}>
                  <X.EvaluationForm
                    repo="doyun/ondevice-study #7"
                    submitted="11월 28일 (토) 22:10 제출"
                  />
                </X.TwoPane.Detail>
              </X.TwoPane>
            </X.ManageLayout.Content>
          </X.ManageLayout>
        </X.WebShell.Main>
      </X.WebShell>
    );
  },
};
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
