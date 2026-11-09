import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Templates/Shared/Modal',
  id: 'templates-modal',
  component: X.Modal,
  args: {
    screenTitle: '홈',
    height: 600,
    open: true,
    title: '파이토치 데이 코리아 2026 · 오후 세션',
    sub: '11월 21일 (토) 13:30 ~ 17:30 · 코엑스 그랜드볼룸',
    withFooter: true,
    view: 'all',
    onOpenChange: fn(),
  },
  argTypes: { view: { control: 'inline-radio', options: ['all', 'mine'] } },
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
          <div className="p-6">
            <X.Button variant="mint" onClick={() => update({ open: true })}>
              시간표 열기
            </X.Button>
          </div>
          <X.Modal
            open={args.open}
            onOpenChange={(o) => {
              args.onOpenChange?.(o);
              update({ open: o });
            }}
            title={args.title}
            sub={args.sub}
          >
            <X.Modal.Body>
              <X.ConferenceTimetable
                tracks={D.TRACKS}
                slots={D.SLOTS}
                view={args.view}
                onViewAll={() => update({ view: 'all' })}
              />
            </X.Modal.Body>
            {args.withFooter && (
              <X.Modal.Footer>
                <div className="w-[240px]">
                  <X.Segmented
                    items={['all', 'mine'] as const}
                    labels={{ all: '전체', mine: '내 시간표' }}
                    value={args.view}
                    onChange={(v) => update({ view: v })}
                  />
                </div>
              </X.Modal.Footer>
            )}
          </X.Modal>
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

/** 컴파운드로 바꿔 조립: 아래 전환 없이 주간 시간표만 담은 모달 */
export const Composed: Story = {
  args: {
    title: '온디바이스 AI 앱 만들기 · 시간표',
    sub: '매주 월~금 10:00 ~ 17:00',
  },
  render: function Render(args) {
    const [, update] = useArgs();
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
          <div className="p-6">
            <X.Button variant="mint" onClick={() => update({ open: true })}>
              시간표 열기
            </X.Button>
          </div>
          <X.Modal
            open={args.open}
            onOpenChange={(o) => {
              args.onOpenChange?.(o);
              update({ open: o });
            }}
            title={args.title}
            sub={args.sub}
          >
            <X.Modal.Body className="pb-6">
              <X.WeeklyTimetable blocks={D.BLOCKS} hourHeight={52} />
            </X.Modal.Body>
          </X.Modal>
        </X.WebShell.Main>
      </X.WebShell>
    );
  },
};
