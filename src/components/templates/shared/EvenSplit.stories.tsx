import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Templates/Shared/EvenSplit',
  id: 'templates-evensplit',
  component: X.EvenSplit,
  args: {
    screenTitle: '공지 쓰기',
    height: 600,
    left: 'Editor',
    right: 'Preview',
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
          <X.EvenSplit>
            <X.EvenSplit.Left>
              <Ph t={args.left} h={460} />
            </X.EvenSplit.Left>
            <X.EvenSplit.Right>
              <Ph t={args.right} h={460} />
            </X.EvenSplit.Right>
          </X.EvenSplit>
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

const NOTICE = {
  title: '목요일 모임은 21:00에 시작해요',
  body: '11월 19일 (목)만 **한 시간 늦게** 시작해요.\n• 질문은 https://forms.gle/dearby-study 에 남겨 주세요',
};

/** 컴파운드로 채운 실제 화면: 공지 쓰기 | 미리보기 */
export const Composed: Story = {
  render: function Render(args) {
    const [{ noticeTitle = NOTICE.title, noticeBody = NOTICE.body }, update] =
      useArgs();
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
          <X.EvenSplit>
            <X.EvenSplit.Left>
              <X.NoticeForm
                title={noticeTitle}
                body={noticeBody}
                onTitle={(v) => update({ noticeTitle: v })}
                onBody={(v) => update({ noticeBody: v })}
                channels={D.CHANNELS}
              />
            </X.EvenSplit.Left>
            <X.EvenSplit.Right>
              <X.NoticePreview title={noticeTitle} body={noticeBody} />
            </X.EvenSplit.Right>
          </X.EvenSplit>
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
