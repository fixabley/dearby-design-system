import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/Review/ReviewCard',
  id: 'molecules-reviewcard',
  component: X.ReviewCard,
  args: { initial: '박', name: '박서준', meta: '7기 · 2026년 9월', rating: 'recommend', verified: true, body: '매주 코드 리뷰를 주고받으면서 PR 쓰는 법이 많이 늘었어요. 기수 안에서 사이드 프로젝트 팀이 꾸려져서 끝나고도 같이 만들고 있어요.' },
  argTypes: { rating: { control: "inline-radio", options: ["recommend", "neutral", "disappointed"] } },
  
  parameters: { width: 393 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 평가와 글을 먼저, 쓴 사람은 아래(인증 배지 없이) */
export const Composed: Story = { render: (args: Record<string, any>) => <X.ReviewCard {...(args as any)}><X.ReviewCard.Rating className="mt-0" /><X.ReviewCard.Body /><X.ReviewCard.Header className="mt-3"><X.ReviewCard.Author /></X.ReviewCard.Header></X.ReviewCard> };
