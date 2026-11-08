import type { Channel, ChannelType } from '@/types';
import type { IconName } from '@/icons';
import { ListGroup, ListRow } from '@/components/molecules/ListGroup';

const CH: Record<ChannelType, { icon: IconName; label: string }> = { forum: { icon: 'forum', label: '포럼' }, text: { icon: 'hash', label: '채팅' }, voice: { icon: 'voice', label: '음성' } };
/** 스터디 공간에 만들 채널 양식(끌어서 순서) */
export function ChannelTemplate({ channels }: { channels: Channel[] }) {
  return (
    <ListGroup title="채널">
      {channels.map((c) => <ListRow key={c.name} icon={CH[c.type].icon} title={c.name} subtitle={CH[c.type].label}
        trailing={<span aria-hidden className="h-2.5 w-4 shrink-0 opacity-50" style={{ background: 'linear-gradient(currentColor 0 1.5px,transparent 1.5px 4px,currentColor 4px 5.5px,transparent 5.5px 8px,currentColor 8px 9.5px,transparent 9.5px)' }} />} />)}
      <ListRow icon="add" title="채널 추가" add onClick={() => {}} />
    </ListGroup>
  );
}
