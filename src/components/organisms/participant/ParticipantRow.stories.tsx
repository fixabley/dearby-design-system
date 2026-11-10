import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { SideBySide } from '@/stories/SideBySide';
import { content, event, look } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Organisms/Participant/ParticipantRow',
  id: 'organisms-participantrow',
  component: X.ParticipantRow,
  args: {
    name: '이서연',
    handle: '@seoyeon',
    job: '프론트엔드 개발자',
    intro: '웹 접근성과 디자인 시스템에 관심이 많아요.',
    state: 'request',
    onExchange: fn(),
  },
  argTypes: {
    name: content('이름(이니셜 원은 첫 글자)'),
    handle: content('핸들(@까지)'),
    job: content('직업 · 소속(비우면 안 그림)'),
    intro: content('소개 한 줄(비우면 안 그림)'),
    state: {
      control: 'inline-radio',
      options: ['request', 'sent', 'accept', 'done'],
      ...look(
        '교환 상태. request 교환 요청 · sent 요청함 · accept 수락 · done 교환함',
      ),
    },
    onExchange: event('교환 요청 · 수락을 누름'),
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {
  render: (args) => (
    <ul role="list">
      <X.ParticipantRow
        {...(args as ComponentProps<typeof X.ParticipantRow>)}
      />
    </ul>
  ),
};

/** 참여자 목록(㉘-d2): 네 상태가 한 목록에. 요청 전 · 내가 보냄 · 맞교환 끝 · 상대가 먼저 보냄 · 요청 전 */
export const List: Story = {
  render: () => (
    <section>
      <X.Text variant="caption" tone="muted" className="mb-1.5 block">
        12명
      </X.Text>
      <ul role="list">
        <X.ParticipantRow
          name="이서연"
          handle="@seoyeon"
          job="프론트엔드 개발자"
          intro="웹 접근성과 디자인 시스템에 관심이 많아요."
          state="request"
          onExchange={fn()}
        />
        <X.ParticipantRow
          name="박지후"
          handle="@jihoo.p"
          job="ML 엔지니어"
          intro="온디바이스 추론 최적화를 공부하고 있어요."
          state="sent"
        />
        <X.ParticipantRow
          name="최민서"
          handle="@minseo"
          job="백엔드 개발자"
          intro="Kotlin·Spring으로 결제 시스템을 만들어요."
          state="done"
        />
        <X.ParticipantRow
          name="정하린"
          handle="@harin_j"
          job="프로덕트 디자이너"
          state="accept"
          onExchange={fn()}
        />
        <X.ParticipantRow
          name="한도현"
          handle="@dohyun"
          job="학생 · 컴퓨터공학"
          intro="파이토치로 첫 논문 구현 중이에요."
          state="request"
          onExchange={fn()}
        />
      </ul>
    </section>
  ),
};

/** 교환 상태 버튼 넷만 나란히: 누르는 둘(교환 요청 · 수락)과 누르지 않는 글자 둘(요청함 · 교환함) */
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <X.ExchangeButton state="request" onClick={fn()} />
      <X.ExchangeButton state="sent" />
      <X.ExchangeButton state="accept" onClick={fn()} />
      <X.ExchangeButton state="done" />
    </div>
  ),
};

/** 긴 이름 · 핸들 · 소개: 핸들이 먼저 말줄임, 소개는 한 줄 말줄임, 오른쪽 상태는 그대로 */
export const Long: Story = {
  parameters: { width: 320 },
  render: () => (
    <ul role="list">
      <X.ParticipantRow
        name="아주아주긴이름의참여자"
        handle="@a_very_long_handle_name"
        job="프론트엔드 개발자 · 디자인 시스템 팀 리드"
        intro="웹 접근성과 디자인 시스템 그리고 오픈소스 문서화에 관심이 아주 많아요."
        state="request"
        onExchange={fn()}
      />
    </ul>
  ),
};

/** 컴파운드로 바꿔 조립: 소개와 직업 없이 이름과 상태만 */
export const Composed: Story = {
  render: (args) => (
    <ul role="list">
      <X.ParticipantRow {...(args as ComponentProps<typeof X.ParticipantRow>)}>
        <X.ParticipantRow.Avatar />
        <div className="min-w-0 flex-1">
          <X.ParticipantRow.Name />
        </div>
        <X.ParticipantRow.Exchange />
      </X.ParticipantRow>
    </ul>
  ),
};

/** 불러오는 동안(ParticipantRowSkeleton): 같은 간격 */
export const Skeleton: Story = {
  parameters: { width: 722 },
  render: () => (
    <SideBySide width={345}>
      <ul role="list">
        <X.ParticipantRow
          name="이서연"
          handle="@seoyeon"
          job="프론트엔드 개발자"
          intro="웹 접근성과 디자인 시스템에 관심이 많아요."
          state="request"
        />
      </ul>
      <ul role="list">
        <X.ParticipantRowSkeleton />
      </ul>
    </SideBySide>
  ),
};
