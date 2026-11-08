import { useState } from 'react';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Field } from '@/components/molecules/Field';
import { ListGroup, ListRow } from '@/components/molecules/ListGroup';
import { renderLite } from '@/lib/markdown';

/** 공지 쓰기: 원문(줄인 마크다운) + 보낼 곳 + 올리기 */
export function NoticeForm({ title, body, onTitle, onBody, discord }: { title: string; body: string; onTitle: (v: string) => void; onBody: (v: string) => void; discord?: boolean }) {
  const [toDiscord, setToDiscord] = useState(!!discord);
  const [notify, setNotify] = useState(true);
  return (
    <div className="flex flex-col gap-3">
      <ListGroup><Field label="제목" value={title} onChange={onTitle} /><Field label="내용" value={body} onChange={onBody} multiline /></ListGroup>
      <ListGroup>
        {discord && <ListRow title="디스코드 #자유 대화에도 올리기" trailing={<Switch checked={toDiscord} onCheckedChange={setToDiscord} />}><span className="text-[#5865F2] [&_svg]:size-[22px]"><Icon name="discord" /></span></ListRow>}
        <ListRow title="참여자에게 알림 보내기" trailing={<Switch checked={notify} onCheckedChange={setNotify} />} />
      </ListGroup>
      <Button size="lg" block>올리기</Button>
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
