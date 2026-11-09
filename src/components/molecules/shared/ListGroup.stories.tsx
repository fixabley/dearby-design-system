import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import { content, event, iconArgType, look, state } from '@/stories/argTypes';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/Shared/ListGroup',
  id: 'molecules-listgroup',
  component: X.ListRow,
  args: {
    groupTitle: '기간',
    icon: 'calendar',
    title: '시작',
    subtitle: '',
    trailing: '11월 30일 (월)',
    add: false,
    selected: false,
  },
  argTypes: {
    children: { table: { disable: true } },
    asChild: { table: { disable: true } },
    action: { table: { disable: true } },
    onClick: event(),
    title: content('제목'),
    subtitle: content('보조 줄'),
    trailing: content('오른쪽 값'),
    icon: iconArgType(true, '앞 아이콘'),
    groupTitle: content('묶음 머리'),
    add: look('추가 행(청록 글자)'),
    selected: state('고른 행(민트 면)'),
  },
  render: ({ groupTitle, ...args }) => (
    <X.ListGroup title={groupTitle}>
      <X.ListRow {...(args as ComponentProps<typeof X.ListRow>)} />
      <X.ListRow icon="repeat" title="반복" trailing="매주" />
      <X.ListRow
        title="참여자에게 알림 보내기"
        trailing={<X.Switch defaultChecked />}
      />
      <X.ListRow icon="add" title="사람 추가" add onClick={() => {}} />
    </X.ListGroup>
  ),
  parameters: { width: 345 },
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

/**
 * 이동하는 줄(asChild): 줄 안에 줄 전체를 덮는 링크. 앱 안으로 가면 꺾쇠, 앱 밖(메일 쓰기)으로 나가면 ↗.
 * Storybook에는 Next가 없어 `<a>`로 둔다. 웹은 같은 자리에 Next `Link`를 준다
 */
export const Links: Story = {
  render: () => (
    <X.ListGroup title="환경설정">
      <X.ListRow
        asChild
        icon="bell"
        title="알림"
        trailing={<X.Icon name="chevronRight" className="size-4" />}
      >
        <a href="#notifications" />
      </X.ListRow>
      <X.ListRow
        asChild
        icon="settings"
        title="화면 모드"
        trailing={
          <>
            시스템
            <X.Icon name="chevronRight" className="size-4" />
          </>
        }
      >
        <a href="#theme" />
      </X.ListRow>
      <X.ListRow
        asChild
        icon="chat"
        title="지원팀 문의하기"
        trailing={<X.Icon name="link" className="size-4" />}
      >
        <a href="mailto:help@dearby.app" />
      </X.ListRow>
    </X.ListGroup>
  ),
};

/**
 * 연락처(프로필): 줄 전체는 값 복사(onClick, 토스트로 알린다), 오른쪽 action은 기본 앱으로 열기(메일 쓰기 · 전화 걸기 · Instagram 새 탭).
 * 왼쪽은 종류 아이콘이고 종류 이름은 화면 읽기 글자로 남긴다(버튼 이름 "이메일 seoyeon@example.com 복사").
 * 디스코드는 열 주소가 없어 복사만 하고, 복사 표시를 줄 안에 둔다. Instagram 로고는 넣지 않아(README 서비스 로고) 링크 아이콘이다.
 * 이메일은 시안 ㉗-b의 말풍선(chat)이고, 전화 아이콘은 아직 정하지 않아 비워 둔다
 */
export const Contacts: Story = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <X.Toaster />
      </>
    ),
  ],
  render: () => {
    const value = (kind: string, v: string) => (
      <>
        <span className="sr-only">{kind} </span>
        {v}
        <span className="sr-only"> 복사</span>
      </>
    );
    const copy = (v: string) => () =>
      navigator.clipboard.writeText(v).then(
        () => X.toast('복사했어요'),
        () => X.toast('복사하지 못했어요'),
      );
    return (
      <X.ListGroup title="연락처">
        <X.ListRow
          icon="chat"
          title={value('이메일', 'seoyeon@example.com')}
          onClick={copy('seoyeon@example.com')}
          action={
            <X.Button asChild variant="plain" size="icon-sm" icon="link">
              <a href="mailto:seoyeon@example.com" aria-label="메일 보내기" />
            </X.Button>
          }
        />
        <X.ListRow
          title={value('전화', '010-1234-5678')}
          onClick={copy('010-1234-5678')}
          action={
            <X.Button asChild variant="plain" size="icon-sm" icon="link">
              <a href="tel:01012345678" aria-label="전화 걸기" />
            </X.Button>
          }
        />
        <X.ListRow
          icon="link"
          title={value('Instagram', '@seoyeon')}
          onClick={copy('@seoyeon')}
          action={
            <X.Button asChild variant="plain" size="icon-sm" icon="link">
              <a
                href="https://www.instagram.com/seoyeon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram 열기 (새 탭)"
              />
            </X.Button>
          }
        />
        <X.ListRow
          icon="discord"
          title={value('디스코드', 'seoyeon')}
          onClick={copy('seoyeon')}
          trailing={<X.Icon name="copy" className="size-5" />}
        />
      </X.ListGroup>
    );
  },
};

/** 컴파운드로 바꿔 조립: 앞 요소는 아바타, 보조 줄을 제목 위로 */
export const Composed: Story = {
  render: () => (
    <X.ListGroup title="주도하는 사람">
      <X.ListRow
        title="한유진"
        subtitle="멘토 · @yujin"
        media={<X.Avatar fallback="한" />}
        trailing="수업"
      >
        <X.ListRow.Media />
        <X.ListRow.Body>
          <X.ListRow.Subtitle />
          <X.ListRow.Title />
        </X.ListRow.Body>
        <X.ListRow.Trailing />
      </X.ListRow>
    </X.ListGroup>
  ),
};
