import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/Notice',
  component: X.Notice,
  args: { title: '목요일 모임은 21:00에 시작해요', body: '11월 19일 (목)만 **한 시간 늦게** 시작해요. 회의 링크는 [Google Meet](https://meet.google.com/abc-defg-hij)\n• 질문은 https://forms.gle/dearby-study 에 남겨 주세요\n• ~~20:00~~ → *21:00*', byline: '김도윤 · 11월 18일 (수) 14:20' },
  
  
  parameters: { width: 393 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 알림 목록처럼 제목과 쓴 사람만 */
export const Composed: Story = { render: (args: Record<string, any>) => <X.Notice {...(args as any)}><X.Notice.Title /><X.Notice.Byline className="mt-0.5" /></X.Notice> };
