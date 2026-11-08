import type { Submission } from '@/types';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';

const TAG: Record<Submission['state'], React.ReactNode> = {
  pass: <Badge variant="mint" size="sm">통과</Badge>,
  retry: <Badge variant="outline" size="sm">다시 해 보기</Badge>,
  pending: <Badge variant="mint" size="sm" icon="github">평가 전</Badge>,
  none: <Badge variant="muted" size="sm">아직</Badge>,
};

/** 과제 제출 한 줄(shadcn Item): 사람 · PR·시각 · 평가 상태. ItemGroup 안에 넣어 쓴다 */
export function SubmissionRow({ s, selected, onSelect }: { s: Submission; selected?: boolean; onSelect?: () => void }) {
  const body = (
    <>
      <ItemMedia><Avatar fallback={s.initial} /></ItemMedia>
      <ItemContent><ItemTitle>{s.name}</ItemTitle><ItemDescription>{s.sub}</ItemDescription></ItemContent>
      <ItemActions>{TAG[s.state]}</ItemActions>
    </>
  );
  return onSelect ? <Item asChild selected={selected}><button type="button" onClick={onSelect}>{body}</button></Item> : <Item selected={selected}>{body}</Item>;
}
