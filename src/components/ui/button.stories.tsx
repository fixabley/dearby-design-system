import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';
import { content, event, iconArgType, look, state } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Atoms/shadcn/Button',
  id: 'ui-shadcn-button', // 예전 'UI (shadcn)' 링크가 그대로 열리도록 고정
  tags: ['shadcn'],
  component: X.Button,
  args: {
    children: '캘린더 구독',
    icon: 'calendarAdd',
    variant: 'default',
    size: 'lg',
    block: false,
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    children: content('버튼 글자'),
    icon: iconArgType(),
    variant: {
      control: 'select',
      options: [
        'default',
        'mint',
        'outline',
        'ghost',
        'destructive',
        'destructive-fill',
        'glass',
        'link',
        'plain',
        'tile',
      ],
      ...look(
        'default 청록 채움 · mint 민트 · outline 흰 면 · ghost 글자 · destructive 빨강 글자 · destructive-fill 빨강 채움(되돌릴 수 없는 동작의 확인) · glass 글래스 · link 글자 링크 · plain 겉모양 없음 · tile 큰 타일 면',
      ),
    },
    size: {
      control: 'select',
      options: [
        'lg',
        'default',
        'sm',
        'icon',
        'icon-sm',
        'icon-lg',
        'tile',
        'tile-sm',
        'auto',
      ],
      ...look(
        'lg 52(고정 CTA) · default 44 · sm 32 · icon·icon-sm 아이콘만 있는 원형 버튼(44·40) · icon-lg CTA 옆 정사각 아이콘 버튼(52, 모서리는 lg와 같음) · tile 행동 타일 · tile-sm 시간표 버튼 · auto 글자 높이',
      ),
    },
    block: { ...look('칸 너비를 꽉 채움') },
    disabled: { ...state() },
    onClick: { ...event() },
    asChild: { table: { disable: true } },
  },
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
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      {(['default', 'mint', 'outline', 'ghost', 'destructive'] as const).map(
        (v) => (
          <div key={v} className="flex items-center gap-3">
            {(['lg', 'default', 'sm'] as const).map((s) => (
              <X.Button key={s} variant={v} size={s}>
                {v === 'destructive' ? '블록 지우기' : '후기 모두 보기'}
              </X.Button>
            ))}
            <X.Button variant={v} icon="calendarAdd">
              캘린더 구독
            </X.Button>
          </div>
        ),
      )}
      <div className="flex gap-2">
        <X.Button variant="glass" size="icon" aria-label="뒤로" icon="back" />
        <X.Button variant="glass" size="icon" aria-label="공유" icon="share" />
        <X.Button
          variant="outline"
          size="icon-lg"
          aria-label="지우기"
          icon="trash"
          className="text-destructive"
        />
      </div>
    </div>
  ),
};
/** 되돌릴 수 없는 동작(지우기·탈퇴)의 확인은 빨강 채움, 확인을 여는 버튼은 빨강 글자(destructive) */
export const Destructive: Story = {
  render: () => (
    <div className="flex w-[345px] flex-col gap-3">
      <X.Button variant="destructive-fill" size="lg" block>
        지우기
      </X.Button>
      <X.Button variant="destructive-fill" size="lg" block disabled>
        지우는 중
      </X.Button>
      <X.Button variant="destructive" block>
        프로젝트 지우기
      </X.Button>
    </div>
  ),
};
/** asChild: 버튼 모양·아이콘을 링크(<a>)에 입힌다. 아이콘은 링크 안 맨 앞에 들어간다 */
export const AsLink: Story = {
  render: () => (
    <X.Button asChild variant="mint" icon="link">
      <a href="https://kakaotechbootcamp.com" target="_blank" rel="noreferrer">
        공식 사이트
      </a>
    </X.Button>
  ),
};
