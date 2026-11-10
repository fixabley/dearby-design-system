import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId, type ComponentProps } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { SideBySide } from '@/stories/SideBySide';
import { content, iconArgType, look, state } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Molecules/Follow/TopicRow',
  id: 'molecules-topicrow',
  component: X.TopicRow,
  args: {
    kind: 'region',
    name: '서울',
    count: 31,
    following: true,
    onClick: fn(),
  },
  argTypes: {
    kind: {
      control: 'inline-radio',
      options: ['region', 'field'],
      ...look('종류(기본 아이콘: 지역 핀 · 분야 반짝임)'),
    },
    icon: iconArgType(true, '종류 기본 아이콘을 덮는다(분야마다 다를 때)'),
    name: content('이름'),
    count: content('프로그램 수'),
    following: state('팔로우 중 글자'),
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {
  render: (args) => (
    <ul role="list">
      <X.TopicRow {...(args as ComponentProps<typeof X.TopicRow>)} />
    </ul>
  ),
};

const REGIONS: [string, number][] = [
  ['서울', 31],
  ['경기', 18],
  ['인천', 4],
  ['부산', 6],
  ['대구', 3],
  ['광주', 3],
  ['대전', 5],
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const id = useId();
  return (
    <section className="mb-4">
      <X.Text
        as="h3"
        variant="caption"
        weight="semibold"
        tone="muted"
        id={id}
        className="mb-1 mt-2"
      >
        {title}
      </X.Text>
      <ul role="list" aria-labelledby={id}>
        {children}
      </ul>
    </section>
  );
}

/** 지역 목록(⑦-RL): 팔로우한 지역이 맨 위 묶음, 아래는 모든 지역. 묶음 제목은 `Text`와 `ul aria-labelledby`로 쓴다(부품 없음). 링크 행은 `asChild` */
export const Regions: Story = {
  render: () => (
    <div>
      <Section title="팔로우 중">
        <X.TopicRow kind="region" name="서울" count={31} following asChild>
          <a href="#seoul" />
        </X.TopicRow>
        <X.TopicRow kind="region" name="대전" count={5} following asChild>
          <a href="#daejeon" />
        </X.TopicRow>
      </Section>
      <Section title="모든 지역">
        {REGIONS.map(([name, count]) => (
          <X.TopicRow
            key={name}
            kind="region"
            name={name}
            count={count}
            asChild
          >
            <a href={`#${name}`} />
          </X.TopicRow>
        ))}
      </Section>
    </div>
  ),
};

/** 분야 목록(⑦-FL): 같은 행. 분야마다 아이콘이 다르면 `icon`으로 덮는다(어떤 아이콘이 어떤 분야인지는 쓰는 쪽 몫, 여기는 있는 아이콘으로 보여 준다) */
export const Fields: Story = {
  render: () => (
    <div>
      <Section title="팔로우 중">
        <X.TopicRow
          kind="field"
          name="데이터·AI"
          count={12}
          following
          onClick={fn()}
        />
      </Section>
      <Section title="모든 분야">
        <X.TopicRow kind="field" name="데이터·AI" count={12} onClick={fn()} />
        <X.TopicRow
          kind="field"
          name="웹·앱"
          count={9}
          icon="chat"
          onClick={fn()}
        />
        <X.TopicRow
          kind="field"
          name="클라우드"
          count={4}
          icon="layers"
          onClick={fn()}
        />
        <X.TopicRow
          kind="field"
          name="모바일"
          count={3}
          icon="phone"
          onClick={fn()}
        />
      </Section>
    </div>
  ),
};

/** 긴 이름은 말줄임, 개수는 오른쪽 끝에 그대로 */
export const Long: Story = {
  parameters: { width: 260 },
  render: () => (
    <ul role="list">
      <X.TopicRow
        kind="field"
        name="데이터 엔지니어링과 머신러닝 운영"
        count={128}
        following
        onClick={fn()}
      />
    </ul>
  ),
};

/** 컴파운드로 바꿔 조립: 개수 없이 아이콘과 이름만 */
export const Composed: Story = {
  render: (args) => (
    <ul role="list">
      <X.TopicRow {...(args as ComponentProps<typeof X.TopicRow>)}>
        <X.TopicRow.Media />
        <X.TopicRow.Name />
      </X.TopicRow>
    </ul>
  ),
};

/** 불러오는 동안: 불러온 뒤와 같은 높이 · 간격 */
export const Skeleton: Story = {
  parameters: { width: 760 },
  render: () => (
    <SideBySide width={345}>
      <ul role="list">
        <X.TopicRow kind="region" name="서울" count={31} following />
        <X.TopicRow kind="region" name="경기" count={18} />
      </ul>
      <ul role="list">
        <X.TopicRowSkeleton />
        <X.TopicRowSkeleton />
      </ul>
    </SideBySide>
  ),
};
