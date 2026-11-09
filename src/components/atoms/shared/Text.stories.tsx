import type { Meta, StoryObj } from '@storybook/react-vite';
import * as X from '@/index';
import { content, look } from '@/stories/argTypes';

const VARIANTS = [
  'title',
  'section',
  'subtitle',
  'rowTitle',
  'bodyLarge',
  'innerTitle',
  'body',
  'caption',
  'control',
  'badge',
  'micro',
] as const;
const LABEL: Record<(typeof VARIANTS)[number], string> = {
  title: '화면 제목 26/700',
  section: '섹션 제목 22/700',
  subtitle: '소제목 17/600',
  rowTitle: '행 제목 17/600',
  bodyLarge: '입력·목록 행 17/400',
  innerTitle: '행 안 제목 15/600',
  body: '본문 15/400',
  caption: '보조 13/400',
  control: '컨트롤 13/600',
  badge: '배지 12/700',
  micro: '마이크로 11/400',
};
/** 역할이 쓰는 글자 토큰(Foundations › Typography). Text의 variant 클래스에서 읽는다 */
const token = (v: (typeof VARIANTS)[number]) =>
  X.textVariants({ variant: v }).match(/\btext-[a-z-]+/)?.[0];

const meta: Meta = {
  title: 'Atoms/Shared/Text',
  id: 'atoms-text',
  component: X.Text,
  args: {
    children: '활동 둘러보기 SSAFY 17기',
    variant: 'body',
    tone: 'default',
    weight: undefined,
    leading: undefined,
    truncate: false,
    lines: undefined,
    tabular: false,
    as: undefined,
  },
  argTypes: {
    children: content('글자'),
    variant: {
      control: 'select',
      options: VARIANTS,
      ...look('글자 계층(역할). 크기·줄 높이·기본 굵기가 정해진다'),
    },
    tone: {
      control: 'inline-radio',
      options: [
        'default',
        'muted',
        'accent',
        'destructive',
        'amber',
        'inverse',
        'inherit',
      ],
      ...look('글자 색'),
    },
    weight: {
      control: 'inline-radio',
      options: [undefined, 'regular', 'medium', 'semibold', 'bold'],
      ...look('같은 크기 안에서 강조(크기는 바뀌지 않는다)'),
    },
    leading: {
      control: 'inline-radio',
      options: [undefined, 'tight'],
      ...look(
        '줄 높이만 줄인다. tight(1.25)는 아바타 옆 한 줄 메타(HostLine)만',
      ),
    },
    truncate: look('한 줄 말줄임'),
    lines: {
      control: 'inline-radio',
      options: [undefined, 1, 2, 3],
      ...look('여러 줄 말줄임'),
    },
    tabular: look('숫자 폭 맞춤'),
    as: {
      control: 'select',
      options: [undefined, 'h1', 'h2', 'h3', 'p', 'span', 'small', 'label'],
      ...look('그릴 요소(정하지 않으면 계층에 맞춤)'),
    },
  },
  parameters: { width: 480 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 글자 계층 11가지: 역할 · 쓰는 토큰 */
export const Scale: Story = {
  parameters: { width: 760 },
  render: () => (
    <div className="divide-y divide-border">
      {VARIANTS.map((v) => (
        <div key={v} className="flex items-baseline gap-5 py-2.5">
          <X.Text variant="caption" tone="muted" className="w-56 shrink-0">
            {LABEL[v]}
            <br />
            <code>{v}</code> · <code>{token(v)}</code>
          </X.Text>
          <X.Text variant={v}>활동 둘러보기 SSAFY 17기</X.Text>
        </div>
      ))}
    </div>
  ),
};

/** 색 */
export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      {(['default', 'muted', 'accent', 'destructive', 'amber'] as const).map(
        (t) => (
          <X.Text key={t} variant="body" tone={t}>
            {t} · 모집 11월 9일 (월) 17:00 마감
          </X.Text>
        ),
      )}
      <span className="rounded-md bg-primary px-2 py-1">
        <X.Text variant="body" tone="inverse">
          inverse · 청록 채움 위
        </X.Text>
      </span>
    </div>
  ),
};

/** 자리 표시(TextSkeleton): 역할마다 불러온 글자와 줄 높이가 같다 */
export const Skeleton: Story = {
  parameters: { width: 840 },
  render: () => (
    <div className="divide-y divide-border">
      {VARIANTS.map((v) => (
        <div key={v} className="flex items-start gap-5 py-2.5">
          <X.Text variant="caption" tone="muted" className="w-24 shrink-0">
            <code>{v}</code>
          </X.Text>
          <X.Text variant={v} block className="w-80 shrink-0">
            활동 둘러보기 SSAFY 17기
          </X.Text>
          <X.TextSkeleton variant={v} className="w-80" />
        </div>
      ))}
    </div>
  ),
};
