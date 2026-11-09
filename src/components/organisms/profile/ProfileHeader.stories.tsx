import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import { SideBySide } from '@/stories/SideBySide';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/Profile/ProfileHeader',
  id: 'organisms-profileheader',
  component: X.ProfileHeader,
  args: { p: D.SEOYEON },

  parameters: { width: 360 },
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

/** 컴파운드로 바꿔 조립: 소개·가입 없이 사진 · 이름 · 소셜만 */
export const Composed: Story = {
  render: (args) => (
    <X.ProfileHeader p={args.p}>
      <div className="flex items-center gap-4">
        <X.ProfileHeader.Avatar />
        <X.ProfileHeader.Name />
      </div>
      <X.ProfileHeader.Social />
    </X.ProfileHeader>
  ),
};

/** 불러오는 동안(ProfileHeaderSkeleton): 기본 조립과 같은 크기 · 간격. 소개는 있을 때만이라 뺀 예시 데이터로 비교한다 */
export const Skeleton: Story = {
  parameters: { width: 752 },
  render: () => (
    <SideBySide width={360}>
      <X.ProfileHeader p={{ ...D.SEOYEON, bio: undefined }} />
      <X.ProfileHeaderSkeleton />
    </SideBySide>
  ),
};

/** 웹 프로필처럼 바꿔 조립했을 때: 사진 · 이름 + SocialLinks */
export const SkeletonComposed: Story = {
  parameters: { width: 752 },
  render: () => (
    <SideBySide width={360}>
      <X.ProfileHeader p={D.SEOYEON}>
        <div className="flex items-center gap-4">
          <X.ProfileHeader.Avatar />
          <X.ProfileHeader.Name />
        </div>
        <X.SocialLinks
          className="mt-3"
          links={[
            {
              icon: 'github',
              href: 'https://github.com/seoyeon',
              label: 'GitHub',
            },
            { icon: 'link', href: 'https://example.com', label: '링크' },
          ]}
        />
      </X.ProfileHeader>
      <X.ProfileHeaderSkeleton>
        <div className="flex items-center gap-4">
          <X.ProfileHeaderSkeleton.Avatar />
          <X.ProfileHeaderSkeleton.Name />
        </div>
        <X.SocialLinksSkeleton className="mt-3" count={2} />
      </X.ProfileHeaderSkeleton>
    </SideBySide>
  ),
};
