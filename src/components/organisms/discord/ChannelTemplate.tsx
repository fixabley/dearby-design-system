import type { ReactNode } from 'react';
import type { Channel, ChannelType } from '@/types';
import type { IconName } from '@/icons';
import { ListGroup, ListRow } from '@/components/molecules/shared/ListGroup';

const CH: Record<ChannelType, { icon: IconName; label: string }> = { forum: { icon: 'forum', label: '포럼' }, text: { icon: 'hash', label: '채팅' }, voice: { icon: 'voice', label: '음성' } };

/** 채널 한 줄: 종류 아이콘 · 이름 · 종류 · 끌기 손잡이 */
function ChannelTemplateChannel({ channel: c, className }: { channel: Channel; className?: string }) {
  return <ListRow icon={CH[c.type].icon} title={c.name} subtitle={CH[c.type].label} className={className}
    trailing={<span aria-hidden className="h-2.5 w-4 shrink-0 opacity-50" style={{ background: 'linear-gradient(currentColor 0 1.5px,transparent 1.5px 4px,currentColor 4px 5.5px,transparent 5.5px 8px,currentColor 8px 9.5px,transparent 9.5px)' }} />} />;
}

/** 채널 추가 줄 */
function Add({ className }: { className?: string }) {
  return <ListRow icon="add" title="채널 추가" add onClick={() => {}} className={className} />;
}

function ChannelTemplateRoot({ channels, children }: { channels: Channel[]; children?: ReactNode }) {
  return <ListGroup title="채널">{children ?? <>{channels.map((c) => <ChannelTemplateChannel key={c.name} channel={c} />)}<Add /></>}</ListGroup>;
}

/**
 * 스터디 공간에 만들 채널 양식(컴파운드, 끌어서 순서): 채널마다 Channel + Add(채널 추가).
 * 기본 조립은 `<ChannelTemplate channels={channels} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ChannelTemplate channels={channels}>{channels.map((c) => <ChannelTemplate.Channel key={c.name} channel={c} />)}</ChannelTemplate>`
 */
export const ChannelTemplate = Object.assign(ChannelTemplateRoot, { Channel: ChannelTemplateChannel, Add });
