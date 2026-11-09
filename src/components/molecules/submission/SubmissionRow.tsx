import { createContext, useContext, type ReactNode } from 'react';
import type { Submission } from '@/types';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';

const TAG: Record<Submission['state'], React.ReactNode> = {
  pass: (
    <Badge variant="mint" size="sm">
      통과
    </Badge>
  ),
  retry: (
    <Badge variant="outline" size="sm">
      다시 해 보기
    </Badge>
  ),
  pending: (
    <Badge variant="mint" size="sm" icon="github">
      평가 전
    </Badge>
  ),
  none: (
    <Badge variant="muted" size="sm">
      아직
    </Badge>
  ),
};

type SubmissionRowContextValue = { s: Submission };
const SubmissionRowContext = createContext<SubmissionRowContextValue | null>(
  null,
);

function useSubmissionRow(part: string) {
  const ctx = useContext(SubmissionRowContext);
  if (!ctx)
    throw new Error(`SubmissionRow.${part}는 <SubmissionRow> 안에서 쓴다`);
  return ctx;
}

/** 제출한 사람 아바타 */
function SubmissionRowAvatar({ className }: { className?: string }) {
  const { s } = useSubmissionRow('Avatar');
  return (
    <ItemMedia className={className}>
      <Avatar fallback={s.initial} />
    </ItemMedia>
  );
}

/** 이름 · PR·시각 */
function SubmissionRowText({ className }: { className?: string }) {
  const { s } = useSubmissionRow('Text');
  return (
    <ItemContent className={className}>
      <ItemTitle>{s.name}</ItemTitle>
      <ItemDescription>{s.sub}</ItemDescription>
    </ItemContent>
  );
}

/** 평가 상태 배지 */
function Status({ className }: { className?: string }) {
  const { s } = useSubmissionRow('Status');
  return <ItemActions className={className}>{TAG[s.state]}</ItemActions>;
}

function SubmissionRowRoot({
  s,
  selected,
  onSelect,
  children,
}: {
  s: Submission;
  selected?: boolean;
  onSelect?: () => void;
  children?: ReactNode;
}) {
  const body = children ?? (
    <>
      <SubmissionRowAvatar />
      <SubmissionRowText />
      <Status />
    </>
  );
  return (
    <SubmissionRowContext.Provider value={{ s }}>
      {onSelect ? (
        <Item asChild selected={selected}>
          <button type="button" onClick={onSelect}>
            {body}
          </button>
        </Item>
      ) : (
        <Item selected={selected}>{body}</Item>
      )}
    </SubmissionRowContext.Provider>
  );
}

/**
 * 과제 제출 한 줄(shadcn Item, 컴파운드): Avatar · Text(이름 · PR·시각) · Status(평가 상태). ItemGroup 안에 넣어 쓴다.
 * 기본 조립은 `<SubmissionRow s={s} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<SubmissionRow s={s}><SubmissionRow.Status /><SubmissionRow.Text /></SubmissionRow>`
 */
export const SubmissionRow = Object.assign(SubmissionRowRoot, {
  Avatar: SubmissionRowAvatar,
  Text: SubmissionRowText,
  Status,
});
