import { useState } from 'react';
import type { Channel } from '@/types';
import { Icon } from '@/components/foundations/Icon';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { FieldGroup } from '@/components/ui/field';
import { TextField } from '@/components/molecules/TextField';
import { ChannelSelect } from '@/components/molecules/ChannelSelect';
import { ListGroup, ListRow } from '@/components/molecules/ListGroup';
import { renderLite } from '@/lib/markdown';

/**
 * 공지 쓰기: 원문(줄인 마크다운) + 보낼 곳 + 올리기.
 * channels를 주면(디스코드가 연결된 모임) 디스코드에도 올리기 스위치와, 켰을 때 채널 고르기 줄이 나온다. 기본 채널은 defaultChannel(없으면 첫 채팅 채널)
 */
export function NoticeForm({ title, body, onTitle, onBody, channels, defaultChannel, onSubmit }: {
  title: string; body: string; onTitle: (v: string) => void; onBody: (v: string) => void; channels?: Channel[]; defaultChannel?: string; onSubmit?: (to: { discordChannel?: string; notify: boolean }) => void;
}) {
  const [toDiscord, setToDiscord] = useState(!!channels?.length);
  const [channel, setChannel] = useState(defaultChannel ?? channels?.find((c) => c.type === 'text')?.name);
  const [notify, setNotify] = useState(true);
  const forum = channels?.find((c) => c.name === channel)?.type === 'forum';
  return (
    <div className="flex flex-col gap-3">
      <FieldGroup><TextField label="제목" value={title} onChange={onTitle} /><TextField label="내용" value={body} onChange={onBody} multiline /></FieldGroup>
      <ListGroup>
        {!!channels?.length && <ListRow title="디스코드에도 올리기" trailing={<Switch checked={toDiscord} onCheckedChange={setToDiscord} aria-label="디스코드에도 올리기" />}><span className="text-[#5865F2] [&_svg]:size-[22px]"><Icon name="discord" /></span></ListRow>}
        {!!channels?.length && toDiscord && (
          <ListRow className="animate-in fade-in-0 slide-in-from-top-1 duration-200" title="채널" subtitle={forum ? `‘${title}’ 제목으로 새 글이 올라가요` : undefined}
            trailing={<ChannelSelect channels={channels} value={channel} onValueChange={setChannel} />} />
        )}
        <ListRow title="참여자에게 알림 보내기" trailing={<Switch checked={notify} onCheckedChange={setNotify} aria-label="참여자에게 알림 보내기" />} />
      </ListGroup>
      <Button size="lg" block onClick={() => onSubmit?.({ discordChannel: toDiscord ? channel : undefined, notify })}>올리기</Button>
    </div>
  );
}

/** 공지 미리보기(원문을 바로 렌더) */
export function NoticePreview({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md p-3.5 ring-1 ring-inset ring-border">
      <small className="text-[12px] text-muted-foreground">미리보기</small>
      <b className="mt-1 block text-body font-semibold">{title}</b>
      <p className="mt-1 whitespace-pre-line text-body leading-relaxed">{renderLite(body)}</p>
    </div>
  );
}
