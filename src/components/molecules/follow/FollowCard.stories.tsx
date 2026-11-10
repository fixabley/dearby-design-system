import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/Follow/FollowCard',
  id: 'molecules-followcard',
  component: X.FollowCard,
  args: {
    kind: 'org',
    name: '카카오',
    logo: 'img/logo-22.png',
    fresh: true,
    onClick: fn(),
  },
  parameters: { width: 107 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs;
void fn;
void controlled;
void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {
  render: (args) => (
    <X.FollowCards>
      <X.FollowCard {...(args as ComponentProps<typeof X.FollowCard>)} />
    </X.FollowCards>
  ),
};

/** 팔로우 탭의 가로 한 줄(strip): 종류 글자, 새 모집이 열린 것 먼저. 지역 · 분야는 아이콘 원 */
export const Strip: Story = {
  parameters: { width: 393 },
  render: () => (
    <X.FollowCards aria-label="팔로우 중">
      <X.FollowCard kind="org" name="카카오" logo="img/logo-22.png" fresh />
      <X.FollowCard kind="region" name="서울" fresh />
      <X.FollowCard kind="program" name="SSAFY" logo="img/logo-13.png" />
      <X.FollowCard kind="field" name="데이터·AI" />
      <X.FollowCard
        kind="org"
        name="파이토치 한국 사용자 모임"
        logo="img/logo-pytorch.png"
      />
      <X.FollowCard kind="org" name="디프만" logo="img/logo-depromeet.png" />
    </X.FollowCards>
  ),
};

function GridDemo() {
  const [levels, setLevels] = useState<Record<string, X.FollowLevel>>({
    '파이토치 한국 사용자 모임': 'applyOnly',
  });
  return (
    <X.FollowCards layout="grid" aria-label="조직">
      {(
        [
          ['카카오', 'img/logo-22.png', true],
          ['파이토치 한국 사용자 모임', 'img/logo-pytorch.png', false],
          ['디프만', 'img/logo-depromeet.png', false],
        ] as const
      ).map(([name, logo, fresh]) => (
        <X.FollowCard
          key={name}
          kind="org"
          name={name}
          logo={logo}
          fresh={fresh}
          level={levels[name] ?? 'all'}
          onLevelChange={(l) => setLevels({ ...levels, [name]: l })}
          onUnfollow={() => {}}
        />
      ))}
      <X.BrowseCard kind="org" sub="조직 42곳" />
    </X.FollowCards>
  );
}

/** 팔로우 관리의 3열 격자(grid): 알림 수준 종과 ⋯ 메뉴, 점은 오른쪽 아래. ⋯를 눌러 수준을 바꿔 본다 */
export const Grid: Story = {
  parameters: { width: 345 },
  render: () => <GridDemo />,
};

/** 알림 수준 셋: 전체(꽉 찬 종) · 신청일만(선 종) · 없음(사선 종) */
export const Levels: Story = {
  parameters: { width: 345 },
  render: () => (
    <X.FollowCards layout="grid">
      <X.FollowCard
        kind="org"
        name="카카오"
        logo="img/logo-22.png"
        level="all"
      />
      <X.FollowCard
        kind="org"
        name="디프만"
        logo="img/logo-depromeet.png"
        level="applyOnly"
      />
      <X.FollowCard kind="region" name="서울" level="off" fresh />
    </X.FollowCards>
  ),
};

/** 컴파운드로 바꿔 조립: 종류 글자 없이 로고와 이름만 */
export const Composed: Story = {
  render: (args) => (
    <X.FollowCards>
      <X.FollowCard kind="org" name="카카오" logo={args.logo}>
        <X.FollowCard.Media />
        <X.FollowCard.Name />
      </X.FollowCard>
    </X.FollowCards>
  ),
};

/** 불러오는 동안(FollowCardSkeleton): 같은 면과 간격 */
export const Skeleton: Story = {
  parameters: { width: 258 },
  render: () => (
    <div className="flex items-start gap-8">
      <X.FollowCards>
        <X.FollowCard kind="org" name="카카오" logo="img/logo-22.png" />
      </X.FollowCards>
      <X.FollowCards>
        <X.FollowCardSkeleton />
      </X.FollowCards>
    </div>
  ),
};

/** 둘러보기 카드(민트): 팔로우가 없을 때의 진입, 관리 화면 섹션 끝 */
export const Browse: Story = {
  parameters: { width: 393 },
  render: () => (
    <X.FollowCards aria-label="둘러보기">
      <X.BrowseCard kind="program" sub="프로그램 38개" onClick={fn()} />
      <X.BrowseCard kind="org" sub="조직 42곳" onClick={fn()} />
      <X.BrowseCard kind="region" sub="시·도 17곳" onClick={fn()} />
      <X.BrowseCard kind="field" sub="분야 5개" onClick={fn()} />
    </X.FollowCards>
  ),
};
