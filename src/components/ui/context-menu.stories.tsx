import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { content, event, state } from '@/stories/argTypes';

type MenuItem = { label: string; variant?: 'default' | 'destructive' };

const meta: Meta = {
  title: 'Molecules/shadcn/ContextMenu',
  id: 'ui-shadcn-contextmenu',
  tags: ['shadcn'],
  component: X.ContextMenu,
  args: {
    items: [{ label: '프로필 보기' }, { label: '신고', variant: 'destructive' }, { label: '차단', variant: 'destructive' }],
    name: '이서연', handle: '@seoyeon', role: '프론트엔드 개발자', bio: '웹 접근성과 디자인 시스템에 관심이 많아요.',
    disabled: false, modal: true, onSelect: fn(), onOpenChange: fn(),
  },
  argTypes: {
    items: content('메뉴 행(variant destructive는 빨강, 종류가 바뀌는 자리에 구분선)'),
    name: content('참여자 이름'), handle: content('핸들'), role: content('직업'), bio: content('소개 한 줄'),
    disabled: state('트리거 끔(오른쪽 클릭해도 열리지 않음)'),
    modal: state('열린 동안 바깥 스크롤·포인터 막기'),
    onSelect: event('행 고름'),
    onOpenChange: event(),
  },
  // ㉘-d3 참여자 길게 누르기(웹은 오른쪽 클릭): 프로필 보기 · 신고 · 차단
  render: ({ items, name, handle, role, bio, disabled, modal, onSelect, onOpenChange }) => (
    <X.ItemGroup variant="plain"><X.ContextMenu modal={modal} onOpenChange={onOpenChange}>
      <X.ContextMenuTrigger asChild disabled={disabled}>
        <X.Item size="row" className="-mx-3 w-[calc(100%+24px)] cursor-default px-3 py-3 data-[state=open]:bg-muted">
          <X.Avatar size="md" fallback={name.slice(0, 1)} className="size-11" />
          <X.ItemContent>
            <X.ItemTitle className="flex items-baseline gap-1.5 font-semibold">{name}<span className="truncate text-caption font-normal text-muted-foreground">{handle}</span></X.ItemTitle>
            <span className="text-body">{role}</span>
            <X.ItemDescription>{bio}</X.ItemDescription>
          </X.ItemContent>
          <X.Button variant="mint" size="sm" className="self-center">교환 요청</X.Button>
        </X.Item>
      </X.ContextMenuTrigger>
      <X.ContextMenuContent>
        {(items as MenuItem[]).map((it, i, all) => (
          <Fragment key={it.label}>
            {i > 0 && (it.variant ?? 'default') !== (all[i - 1].variant ?? 'default') && <X.ContextMenuSeparator />}
            <X.ContextMenuItem variant={it.variant} onSelect={() => onSelect?.(it.label)}>{it.label}</X.ContextMenuItem>
          </Fragment>
        ))}
      </X.ContextMenuContent>
    </X.ContextMenu></X.ItemGroup>
  ),
  parameters: { width: 345 },
};
export default meta;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다. 행을 오른쪽 클릭하면 열린다 */
export const Playground: StoryObj<typeof meta> = {};
