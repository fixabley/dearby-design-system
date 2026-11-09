import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import { SideBySide } from '@/stories/SideBySide';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/Notice/Notice',
  id: 'molecules-notice',
  component: X.Notice,
  args: {
    title: '목요일 모임은 21:00에 시작해요',
    body: '11월 19일 (목)만 **한 시간 늦게** 시작해요. 회의 링크는 [Google Meet](https://meet.google.com/abc-defg-hij)\n• 질문은 https://forms.gle/dearby-study 에 남겨 주세요\n• ~~20:00~~ → *21:00*',
    byline: '김도윤 · 11월 18일 (수) 14:20',
  },

  parameters: { width: 393 },
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

/** 컴파운드로 바꿔 조립: 알림 목록처럼 제목과 쓴 사람만 */
export const Composed: Story = {
  render: (args) => (
    <X.Notice {...(args as ComponentProps<typeof X.Notice>)}>
      <X.Notice.Title />
      <X.Notice.Byline className="mt-0.5" />
    </X.Notice>
  ),
};

/** 불러오는 동안(NoticeSkeleton): 같은 간격. 본문이 두 줄인 공지와 비교한다 */
export const Skeleton: Story = {
  parameters: { width: 818 },
  render: () => (
    <SideBySide width={393}>
      <X.Notice
        title="목요일 모임은 21:00에 시작해요"
        body="11월 19일 (목)만 **한 시간 늦게** 시작해요. 회의 링크는 모임 30분 전에 디스코드에 올려요."
        byline="김도윤 · 11월 18일 (수) 14:20"
      />
      <X.NoticeSkeleton />
    </SideBySide>
  ),
};
