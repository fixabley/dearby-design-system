import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Channel } from '@/types';
import { Text } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { FieldGroup } from '@/components/ui/field';
import { TextField } from '@/components/molecules/shared/TextField';
import { ChannelSelect } from '@/components/molecules/discord/ChannelSelect';
import { ListGroup, ListRow } from '@/components/molecules/shared/ListGroup';
import { renderLite } from '@/lib/markdown';
import { cn } from '@/lib/utils';

type NoticeFormContextValue = {
  title: string;
  body: string;
  onTitle: (v: string) => void;
  onBody: (v: string) => void;
  channels?: Channel[];
  toDiscord: boolean;
  setToDiscord: (v: boolean) => void;
  channel?: string;
  setChannel: (v: string) => void;
  notify: boolean;
  setNotify: (v: boolean) => void;
  submit: () => void;
};
const NoticeFormContext = createContext<NoticeFormContextValue | null>(null);

function useNoticeForm(part: string) {
  const ctx = useContext(NoticeFormContext);
  if (!ctx) throw new Error(`NoticeForm.${part}는 <NoticeForm> 안에서 쓴다`);
  return ctx;
}

/** 제목 · 내용(줄인 마크다운) 입력 */
function Fields({ className }: { className?: string }) {
  const { title, body, onTitle, onBody } = useNoticeForm('Fields');
  return (
    <FieldGroup className={className}>
      <TextField label="제목" value={title} onChange={onTitle} />
      <TextField label="내용" value={body} onChange={onBody} multiline />
    </FieldGroup>
  );
}

/** 디스코드에도 올리기 스위치(디스코드가 연결된 모임만) */
function Discord({ className }: { className?: string }) {
  const { channels, toDiscord, setToDiscord } = useNoticeForm('Discord');
  return channels?.length ? (
    <ListRow
      title="디스코드에도 올리기"
      className={className}
      media={
        <span className="text-[#5865F2] [&_svg]:size-[22px]">
          <Icon name="discord" />
        </span>
      }
      trailing={
        <Switch
          checked={toDiscord}
          onCheckedChange={setToDiscord}
          aria-label="디스코드에도 올리기"
        />
      }
    />
  ) : null;
}

/** 올릴 채널 고르기(디스코드에도 올릴 때만). 포럼이면 공지 제목으로 새 글이 올라간다 */
function NoticeFormChannel({ className }: { className?: string }) {
  const { title, channels, toDiscord, channel, setChannel } =
    useNoticeForm('Channel');
  if (!channels?.length || !toDiscord) return null;
  const forum = channels.find((c) => c.name === channel)?.type === 'forum';
  return (
    <ListRow
      className={cn(
        'animate-in fade-in-0 slide-in-from-top-1 duration-200',
        className,
      )}
      title="채널"
      subtitle={forum ? `‘${title}’ 제목으로 새 글이 올라가요` : undefined}
      trailing={
        <ChannelSelect
          channels={channels}
          value={channel}
          onValueChange={setChannel}
        />
      }
    />
  );
}

/** 참여자에게 알림 보내기 스위치 */
function Notify({ className }: { className?: string }) {
  const { notify, setNotify } = useNoticeForm('Notify');
  return (
    <ListRow
      title="참여자에게 알림 보내기"
      className={className}
      trailing={
        <Switch
          checked={notify}
          onCheckedChange={setNotify}
          aria-label="참여자에게 알림 보내기"
        />
      }
    />
  );
}

/** 올리기 */
function Submit({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { submit } = useNoticeForm('Submit');
  return (
    <Button size="lg" block className={className} onClick={submit}>
      {children ?? '올리기'}
    </Button>
  );
}

function NoticeFormRoot({
  title,
  body,
  onTitle,
  onBody,
  channels,
  defaultChannel,
  onSubmit,
  children,
}: {
  title: string;
  body: string;
  onTitle: (v: string) => void;
  onBody: (v: string) => void;
  channels?: Channel[];
  defaultChannel?: string;
  onSubmit?: (to: { discordChannel?: string; notify: boolean }) => void;
  children?: ReactNode;
}) {
  const [toDiscord, setToDiscord] = useState(!!channels?.length);
  const [channel, setChannel] = useState(
    defaultChannel ?? channels?.find((c) => c.type === 'text')?.name,
  );
  const [notify, setNotify] = useState(true);
  const submit = () =>
    onSubmit?.({ discordChannel: toDiscord ? channel : undefined, notify });
  return (
    <NoticeFormContext.Provider
      value={{
        title,
        body,
        onTitle,
        onBody,
        channels,
        toDiscord,
        setToDiscord,
        channel,
        setChannel,
        notify,
        setNotify,
        submit,
      }}
    >
      <div className="flex flex-col gap-3">
        {children ?? (
          <>
            <Fields />
            <ListGroup>
              <Discord />
              <NoticeFormChannel />
              <Notify />
            </ListGroup>
            <Submit />
          </>
        )}
      </div>
    </NoticeFormContext.Provider>
  );
}

/**
 * 공지 쓰기(컴파운드): Fields(제목 · 내용, 줄인 마크다운) + 보낼 곳(Discord · Channel · Notify, ListGroup에 담는다) + Submit(올리기).
 * channels를 주면(디스코드가 연결된 모임) 디스코드에도 올리기 스위치와, 켰을 때 채널 고르기 줄이 나온다. 기본 채널은 defaultChannel(없으면 첫 채팅 채널).
 * 기본 조립은 `<NoticeForm title={…} body={…} onTitle={…} onBody={…} channels={…} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<NoticeForm {...props}><NoticeForm.Fields /><ListGroup><NoticeForm.Notify /></ListGroup><NoticeForm.Submit /></NoticeForm>`
 */
export const NoticeForm = Object.assign(NoticeFormRoot, {
  Fields,
  Discord,
  Channel: NoticeFormChannel,
  Notify,
  Submit,
});

/** 공지 미리보기(원문을 바로 렌더) */
export function NoticePreview({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-md p-3.5 ring-1 ring-inset ring-border">
      <Text as="small" variant="caption" tone="muted">
        미리보기
      </Text>
      <Text as="b" variant="innerTitle" block className="mt-1">
        {title}
      </Text>
      <Text variant="body" pre className="mt-1">
        {renderLite(body)}
      </Text>
    </div>
  );
}
