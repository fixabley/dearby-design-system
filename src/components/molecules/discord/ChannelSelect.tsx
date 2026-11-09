import type { Channel, ChannelType } from '@/types';
import type { IconName } from '@/icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ICON: Record<ChannelType, IconName> = {
  text: 'hash',
  forum: 'forum',
  voice: 'voice',
};

/** 공지를 올릴 디스코드 채널 고르기(shadcn Select). 글을 올릴 수 없는 음성 채널은 빼고, 포럼은 새 글로 올라간다 */
export function ChannelSelect({
  channels,
  value,
  onValueChange,
  variant = 'inline',
}: {
  channels: Channel[];
  value?: string;
  onValueChange?: (name: string) => void;
  variant?: 'inline' | 'default';
}) {
  const postable = channels.filter((c) => c.type !== 'voice');
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        variant={variant}
        aria-label="디스코드 채널"
        className="group"
      >
        <SelectValue placeholder="채널 고르기" />
      </SelectTrigger>
      <SelectContent align="end">
        {postable.map((c) => (
          <SelectItem
            key={c.name}
            value={c.name}
            icon={ICON[c.type]}
            sub={
              c.type === 'forum' ? '공지 제목으로 새 글이 올라가요' : undefined
            }
          >
            {c.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
