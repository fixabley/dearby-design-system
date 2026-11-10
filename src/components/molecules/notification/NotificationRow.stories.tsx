import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { SideBySide } from '@/stories/SideBySide';
import { content, look, state } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Molecules/Notification/NotificationRow',
  id: 'molecules-notificationrow',
  component: X.NotificationRow,
  args: {
    kind: 'open',
    logo: 'img/logo-22.png',
    initial: '카',
    subject: '카카오',
    message: '에서 새 모집을 열었어요 · 카카오테크 부트캠프 6기',
    time: '09:00',
    thumb: 'img/cover-22.jpg',
    unread: true,
  },
  argTypes: {
    kind: {
      control: 'inline-radio',
      options: Object.keys(X.NOTIFICATION_KINDS),
      ...look('종류 배지(아이콘과 화면 읽기 이름)'),
    },
    logo: {
      control: 'select',
      options: ['', 'img/logo-13.png', 'img/logo-22.png', 'img/logo-41.png'],
      ...content('조직 로고(없으면 이니셜 원)'),
    },
    initial: content('로고가 없을 때 원에 들어가는 글자'),
    subject: content('굵은 주어'),
    message: content(
      '주어 뒤에 이어 붙는 나머지(조사로 시작하면 붙고, 아니면 앞에 공백)',
    ),
    time: content('시각'),
    thumb: {
      control: 'select',
      options: ['', 'img/cover-13.jpg', 'img/cover-22.jpg'],
      ...content('오른쪽 커버(없으면 안 그림)'),
    },
    unread: state('안 읽음 점'),
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {
  render: (args) => (
    <ul role="list">
      <X.NotificationRow
        {...(args as ComponentProps<typeof X.NotificationRow>)}
      />
    </ul>
  ),
};

const choice = (
  <div className="flex items-center gap-2">
    <X.Button size="sm" onClick={fn()}>
      통과
    </X.Button>
    <X.Button size="sm" variant="outline" onClick={fn()}>
      탈락
    </X.Button>
    <X.Button
      size="sm"
      variant="plain"
      className="px-1.5 text-muted-foreground"
      onClick={fn()}
    >
      아직 몰라요
    </X.Button>
  </div>
);

/** 알림 목록(㉗-g): 날짜 소제목 아래 행. 안 읽음은 왼쪽 바깥 청록 점, 선발 결과 묻기는 행 안 버튼, 썸네일은 있을 때만 */
export const List: Story = {
  render: () => (
    <div>
      <X.DateHeader date={new Date(2026, 10, 9)} />
      <ul role="list">
        <X.NotificationRow
          kind="result"
          logo="img/logo-13.png"
          initial="S"
          subject="SSAFY 17기"
          message=" 서류 발표일이에요. 결과를 남겨 주세요"
          time="17:02"
          thumb="img/cover-13.jpg"
          unread
          action={choice}
        />
        <X.NotificationRow
          kind="open"
          logo="img/logo-22.png"
          initial="카"
          subject="카카오"
          message="에서 새 모집을 열었어요 · 카카오테크 부트캠프 6기"
          time="09:00"
          thumb="img/cover-22.jpg"
          unread
        />
      </ul>
      <X.DateHeader date={new Date(2026, 10, 8)} className="pt-4" />
      <ul role="list">
        <X.NotificationRow
          kind="deadline"
          logo="img/logo-41.png"
          initial="F"
          subject="FLY AI Challenger 10기"
          message=" 모집 마감 D-DAY 23:59"
          time="08:00"
        />
        <X.NotificationRow
          kind="event"
          logo="img/logo-pytorch.png"
          initial="파"
          subject="파이토치 데이 코리아 2026"
          message=" 행사 D-13"
          time="08:00"
        />
      </ul>
    </div>
  ),
};

/** 받은 교환 요청(㉘-f): 요청한 사람의 이니셜 원에 명함 배지, 행 안 버튼은 수락 하나(거절 버튼은 없다). 30일 뒤 만료 */
export const ExchangeRequest: Story = {
  render: () => (
    <div>
      <X.DateHeader date={new Date(2026, 10, 21)} />
      <ul role="list">
        <X.NotificationRow
          kind="card"
          initial="이"
          subject="이서연"
          message="님이 명함 교환을 요청했어요 · 파이토치 데이 코리아 2026"
          time="14:40"
          unread
          action={
            <X.ExchangeButton
              state="accept"
              aria-label="이서연 교환 수락"
              onClick={fn()}
            />
          }
        />
        <X.NotificationRow
          kind="event"
          logo="img/logo-pytorch.png"
          initial="파"
          subject="파이토치 데이 코리아 2026"
          message=" 행사 D-DAY"
          time="08:00"
        />
      </ul>
    </div>
  ),
};

/** 종류 배지 다섯: 선발 · 새 모집 · 마감 · 행사 · 명함(화면 읽기에는 종류 이름이 문장 앞에 읽힌다) */
export const Kinds: Story = {
  render: () => (
    <ul role="list">
      {(Object.keys(X.NOTIFICATION_KINDS) as X.NotificationKind[]).map((k) => (
        <X.NotificationRow
          key={k}
          kind={k}
          logo={k === 'card' ? undefined : 'img/logo-22.png'}
          initial={k === 'card' ? '이' : '카'}
          subject={k === 'card' ? '이서연' : '카카오'}
          message={`님 ${X.NOTIFICATION_KINDS[k].label} 알림`}
          time="09:00"
        />
      ))}
    </ul>
  ),
};

/** 컴파운드로 바꿔 조립: 시각과 썸네일 없이 로고와 문장만 */
export const Composed: Story = {
  render: (args) => (
    <ul role="list">
      <X.NotificationRow
        {...(args as ComponentProps<typeof X.NotificationRow>)}
      >
        <X.NotificationRow.Media />
        <div className="min-w-0 flex-1">
          <X.NotificationRow.Message />
        </div>
      </X.NotificationRow>
    </ul>
  ),
};

/** 불러오는 동안(NotificationRowSkeleton): 같은 간격. 썸네일 자리는 `cover`로 */
export const Skeleton: Story = {
  parameters: { width: 722 },
  render: () => (
    <SideBySide width={345}>
      <ul role="list">
        <X.NotificationRow
          kind="open"
          logo="img/logo-22.png"
          initial="카"
          subject="카카오"
          message="에서 새 모집을 열었어요 · 카카오테크 부트캠프 6기"
          time="09:00"
          thumb="img/cover-22.jpg"
        />
      </ul>
      <ul role="list">
        <X.NotificationRowSkeleton cover />
      </ul>
    </SideBySide>
  ),
};
