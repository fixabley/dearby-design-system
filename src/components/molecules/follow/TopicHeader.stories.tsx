import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { SideBySide } from '@/stories/SideBySide';
import { content, iconArgType, look } from '@/stories/argTypes';

const mapButton = (
  <X.Button
    type="button"
    variant="outline"
    size="icon-sm"
    icon="map"
    aria-label="서울 활동 지도로 보기"
    onClick={fn()}
  />
);

const meta: Meta = {
  title: 'Molecules/Follow/TopicHeader',
  id: 'molecules-topicheader',
  component: X.TopicHeader,
  args: {
    kind: 'region',
    name: '서울',
    programs: 4,
    open: 3,
    level: undefined,
    map: mapButton,
  },
  argTypes: {
    kind: {
      control: 'inline-radio',
      options: ['region', 'field'],
      ...look('종류(타일 기본 아이콘)'),
    },
    icon: iconArgType(true, '타일 아이콘(기본은 종류 아이콘)'),
    name: content('이름'),
    programs: content('프로그램 수'),
    open: content('모집 중 수'),
    level: {
      control: 'inline-radio',
      options: [undefined, 'all', 'applyOnly', 'off'],
      ...look('알림 수준. 없으면 팔로우 전, 있으면 팔로우 중 ⌄ 메뉴'),
    },
    map: { control: false, ...content('지도 버튼 자리(쓰는 쪽이 넣는다)') },
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {
  render: (args) => (
    <X.TopicHeader {...(args as ComponentProps<typeof X.TopicHeader>)} />
  ),
};

function FollowDemo({ kind }: { kind: 'region' | 'field' }) {
  const [level, setLevel] = useState<X.FollowLevel>();
  return (
    <X.TopicHeader
      kind={kind}
      name={kind === 'region' ? '서울' : '데이터·AI'}
      programs={4}
      open={3}
      level={level}
      onFollow={() => setLevel('off')}
      onLevelChange={setLevel}
      onUnfollow={() => setLevel(undefined)}
      map={kind === 'region' ? mapButton : undefined}
    />
  );
}

/** 지역 화면(⑦-R) 머리: 눌러 팔로우하면 `팔로우 중 ⌄` 메뉴로 바뀐다(알림 기본 없음). 지도 버튼은 `map` 자리에 쓰는 쪽이 넣는다 */
export const Region: Story = { render: () => <FollowDemo kind="region" /> };

/** 분야 화면(⑦-F) 머리: 같은 머리에 지도 버튼만 없다 */
export const Field: Story = { render: () => <FollowDemo kind="field" /> };

/** 팔로우 중: 알림 수준이 정해진 상태 */
export const Following: Story = {
  render: () => (
    <X.TopicHeader
      kind="region"
      name="서울"
      programs={4}
      open={3}
      level="all"
      onLevelChange={fn()}
      onUnfollow={fn()}
      map={mapButton}
    />
  ),
};

/** 긴 이름은 배너에서 말줄임, 제목은 줄바꿈 */
export const Long: Story = {
  render: () => (
    <X.TopicHeader
      kind="field"
      name="데이터 엔지니어링과 머신러닝 운영"
      programs={128}
      open={42}
    />
  ),
};

/** 컴파운드로 바꿔 조립: 배너와 제목만 */
export const Composed: Story = {
  render: (args) => (
    <X.TopicHeader {...(args as ComponentProps<typeof X.TopicHeader>)}>
      <X.TopicHeader.Banner />
      <X.TopicHeader.Title />
    </X.TopicHeader>
  ),
};

/** 불러오는 동안: 불러온 뒤와 같은 크기 · 간격 */
export const Skeleton: Story = {
  parameters: { width: 760 },
  render: () => (
    <SideBySide width={345}>
      <X.TopicHeader kind="region" name="서울" programs={4} open={3} />
      <X.TopicHeaderSkeleton />
    </SideBySide>
  ),
};
