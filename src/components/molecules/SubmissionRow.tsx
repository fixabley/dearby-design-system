import type { Submission } from '@/types';
import { Icon } from '@/components/atoms/Icon';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ListRow } from './ListGroup';

const TAG: Record<Submission['state'], React.ReactNode> = {
  pass: <Badge variant="mint" size="sm">통과</Badge>,
  retry: <Badge variant="outline" size="sm">다시 해 보기</Badge>,
  pending: <Badge variant="mint" size="sm"><Icon name="github" />평가 전</Badge>,
  none: <Badge variant="muted" size="sm">아직</Badge>,
};
/** 과제 제출 한 줄(사람 · PR·시각 · 평가 상태) */
export function SubmissionRow({ s, selected, onSelect }: { s: Submission; selected?: boolean; onSelect?: () => void }) {
  return <ListRow title={s.name} subtitle={s.sub} trailing={TAG[s.state]} selected={selected} onClick={onSelect}><Avatar fallback={s.initial} /></ListRow>;
}
