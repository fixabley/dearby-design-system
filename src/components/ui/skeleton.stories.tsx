import type { Meta, StoryObj } from '@storybook/react-vite';
import * as X from '@/index';
import { look } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Atoms/shadcn/Skeleton',
  id: 'ui-shadcn-skeleton',
  tags: ['shadcn'],
  component: X.Skeleton,
  args: { className: 'h-4 w-48' },
  argTypes: {
    className: look(
      '크기·모양. 글자 줄 h-4 w-48 · 원 size-12 rounded-full · 둥근 사각형 size-16',
    ),
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 className으로 크기·모양을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/**
 * 목록 행: 썸네일(Thumbnail md) + 제목·보조 두 줄.
 * 목록 하나에 aria-busy, 그 바로 옆(busy 밖)에 화면에 안 보이는 role="status" 글자 하나로 "불러오는 중"을 알린다
 */
export const Row: Story = {
  render: () => (
    <>
      <span role="status" className="sr-only">
        불러오는 중
      </span>
      <div aria-busy="true" className="flex flex-col gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <X.Skeleton className="size-16" />
            <div className="flex flex-1 flex-col gap-2">
              <X.Skeleton className="h-[17px] w-3/4" />
              <X.Skeleton className="h-[13px] w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </>
  ),
};

/** 프로필 머리: 사진(Avatar lg) + 이름·핸들 줄. 알림은 Row와 같다 */
export const ProfileHeader: Story = {
  render: () => (
    <>
      <span role="status" className="sr-only">
        불러오는 중
      </span>
      <div aria-busy="true" className="flex items-center gap-4">
        <X.Skeleton className="size-20 rounded-full" />
        <div className="flex flex-col gap-2.5">
          <X.Skeleton className="h-[26px] w-32" />
          <X.Skeleton className="h-[13px] w-20" />
        </div>
      </div>
    </>
  ),
};

/** 바탕 · 카드 · 채움(muted) 묶음 위에서 모두 보이는지 라이트·다크로 확인한다 */
export const Surfaces: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {[
        ['바탕', 'bg-background ring-1 ring-inset ring-border'],
        ['카드', 'bg-card shadow-control'],
        ['채움 묶음', 'bg-muted'],
      ].map(([name, surface]) => (
        <div
          key={name}
          className={`flex items-center gap-3 rounded-lg p-4 ${surface}`}
        >
          <X.Skeleton className="size-12 rounded-full" />
          <X.Skeleton className="h-4 flex-1" />
          <span className="text-caption text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  ),
};
