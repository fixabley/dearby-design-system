import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/Shared/AccordionSection',
  id: 'molecules-accordionsection',
  component: X.AccordionSection,
  args: {
    icon: 'group',
    title: '조직',
    count: 3,
    fresh: true,
    defaultOpen: false,
    onOpenChange: fn(),
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs;
void fn;
void controlled;
void D;

const cards = (
  <X.FollowCards layout="grid">
    <X.FollowCard
      kind="org"
      name="카카오"
      logo="img/logo-22.png"
      fresh
      level="all"
      onLevelChange={fn()}
      onUnfollow={fn()}
    />
    <X.FollowCard
      kind="org"
      name="파이토치 한국 사용자 모임"
      logo="img/logo-pytorch.png"
      level="applyOnly"
      onLevelChange={fn()}
      onUnfollow={fn()}
    />
    <X.FollowCard
      kind="org"
      name="디프만"
      logo="img/logo-depromeet.png"
      level="all"
      onLevelChange={fn()}
      onUnfollow={fn()}
    />
    <X.BrowseCard kind="org" sub="조직 42곳" />
  </X.FollowCards>
);

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {
  render: (args) => (
    <X.AccordionSection
      icon={args.icon}
      title={args.title}
      count={args.count}
      fresh={args.fresh}
      defaultOpen={args.defaultOpen}
      onOpenChange={args.onOpenChange}
    >
      {cards}
    </X.AccordionSection>
  ),
};

/** 팔로우 관리: 네 섹션, 조직 · 지역은 펼침. 섹션 사이 구분선은 각 섹션의 아래 선 */
export const FollowManage: Story = {
  render: () => (
    <div>
      <X.AccordionSection icon="group" title="조직" count={3} fresh defaultOpen>
        {cards}
      </X.AccordionSection>
      <X.AccordionSection icon="layers" title="프로그램" count={1}>
        <X.FollowCards layout="grid">
          <X.FollowCard kind="program" name="SSAFY" logo="img/logo-13.png" />
        </X.FollowCards>
      </X.AccordionSection>
      <X.AccordionSection icon="place" title="지역" count={1} fresh defaultOpen>
        <X.FollowCards layout="grid">
          <X.FollowCard kind="region" name="서울" level="off" fresh />
          <X.BrowseCard kind="region" sub="시·도 17곳" />
        </X.FollowCards>
      </X.AccordionSection>
      <X.AccordionSection icon="sparkle" title="분야" count={1}>
        <X.FollowCards layout="grid">
          <X.FollowCard kind="field" name="데이터·AI" level="all" />
        </X.FollowCards>
      </X.AccordionSection>
    </div>
  ),
};

/** 모두 접힘: 처음 들어왔을 때 */
export const Collapsed: Story = {
  render: () => (
    <div>
      <X.AccordionSection icon="group" title="조직" count={3} fresh />
      <X.AccordionSection icon="layers" title="프로그램" count={1} />
      <X.AccordionSection icon="place" title="지역" count={1} fresh />
      <X.AccordionSection icon="sparkle" title="분야" count={1} />
    </div>
  ),
};
