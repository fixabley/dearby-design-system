import {
  createContext,
  useContext,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { Text, TextSkeleton } from '@/components/atoms/shared/Text';
import {
  ExchangeButton,
  type ExchangeState,
} from '@/components/molecules/participant/ExchangeButton';
import { Avatar } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

/** 행(원래 부품과 스켈레톤이 함께 쓴다): 위아래 12, 사이 간격 12, 아래 .5px 구분선(마지막 제외) */
const ROW =
  'flex items-start gap-3 border-b-[.5px] border-border py-3 last:border-b-0';

type ParticipantRowContextValue = {
  name: string;
  handle: string;
  job?: string;
  intro?: string;
  state: ExchangeState;
  onExchange?: () => void;
};
const ParticipantRowContext = createContext<ParticipantRowContextValue | null>(
  null,
);

function useParticipantRow(part: string) {
  const ctx = useContext(ParticipantRowContext);
  if (!ctx)
    throw new Error(`ParticipantRow.${part}는 <ParticipantRow> 안에서 쓴다`);
  return ctx;
}

/** 이니셜 원 44: 이름 첫 글자(이름이 바로 옆에 있어 화면 읽기에서는 숨긴다) */
function ParticipantAvatar({ className }: { className?: string }) {
  const { name } = useParticipantRow('Avatar');
  return (
    <Avatar
      size="row"
      fallback={name.slice(0, 1)}
      aria-hidden
      className={cn('dark:ring-[.5px] dark:ring-white/6', className)}
    />
  );
}

/** 이름(굵게) 옆에 핸들(흐리게). 한 줄이고 넘치면 핸들이 먼저 말줄임 */
function Name({ className }: { className?: string }) {
  const { name, handle } = useParticipantRow('Name');
  return (
    <div className={cn('flex items-baseline gap-1.5', className)}>
      <Text as="b" variant="rowTitle" nowrap className="shrink-0">
        {name}
      </Text>
      <Text variant="caption" tone="muted" truncate>
        {handle}
      </Text>
    </div>
  );
}

/** 직업 · 소속. 없으면 그리지 않는다 */
function Job({ className }: { className?: string }) {
  const { job } = useParticipantRow('Job');
  if (!job) return null;
  return (
    <Text
      as="span"
      variant="innerTitle"
      weight="regular"
      className={cn('mt-px', className)}
    >
      {job}
    </Text>
  );
}

/** 소개 한 줄(넘치면 말줄임). 없으면 그리지 않는다 */
function Intro({ className }: { className?: string }) {
  const { intro } = useParticipantRow('Intro');
  if (!intro) return null;
  return (
    <Text
      as="p"
      variant="caption"
      tone="muted"
      truncate
      className={cn('mt-[3px]', className)}
    >
      {intro}
    </Text>
  );
}

/** 오른쪽 교환 상태. 누르는 버튼의 이름에는 누구인지 붙인다("이서연에게 교환 요청") */
function Exchange({ className }: { className?: string }) {
  const { name, state, onExchange } = useParticipantRow('Exchange');
  const label =
    state === 'request'
      ? `${name}에게 교환 요청`
      : state === 'accept'
        ? `${name} 교환 수락`
        : undefined;
  return (
    <ExchangeButton
      state={state}
      onClick={onExchange}
      aria-label={label}
      className={cn('self-center', className)}
    />
  );
}

function ParticipantRowRoot({
  name,
  handle,
  job,
  intro,
  state,
  onExchange,
  className,
  children,
  ...props
}: Omit<ComponentProps<'li'>, 'children'> & {
  name: string;
  /** 핸들(`@seoyeon`처럼 @까지 적는다) */
  handle: string;
  /** 직업 · 소속 */
  job?: string;
  /** 소개 한 줄 */
  intro?: string;
  /** 명함 교환 상태. `request` · `accept`일 때만 누를 수 있다 */
  state: ExchangeState;
  /** `request`(교환 요청) · `accept`(수락)를 눌렀을 때 */
  onExchange?: () => void;
  children?: ReactNode;
}) {
  return (
    <ParticipantRowContext.Provider
      value={{ name, handle, job, intro, state, onExchange }}
    >
      <li data-slot="participant-row" className={cn(ROW, className)} {...props}>
        {children ?? (
          <>
            <ParticipantAvatar />
            <div className="flex min-w-0 flex-1 flex-col">
              <Name />
              <Job />
              <Intro />
            </div>
            <Exchange />
          </>
        )}
      </li>
    </ParticipantRowContext.Provider>
  );
}

/**
 * 참여자 행(컴파운드, 시안 ㉘-d2, `<ul>` 안에 놓는다): Avatar(이니셜 원 44) · Name(이름 + 핸들) · Job(직업) · Intro(소개 한 줄) · Exchange(교환 상태).
 * 기본 조립은 `<ParticipantRow name="이서연" handle="@seoyeon" job="프론트엔드 개발자" intro="…" state="request" onExchange={…} />`.
 * 행 전체는 누르는 요소가 아니고 오른쪽 교환 상태만 누른다(길게 누르기 · ⋯ 메뉴는 쓰는 쪽이 얹는다).
 * 바꿔 조립하려면 부품을 직접 놓는다: `<ParticipantRow …><ParticipantRow.Avatar /><ParticipantRow.Name /></ParticipantRow>`
 */
export const ParticipantRow = Object.assign(ParticipantRowRoot, {
  Avatar: ParticipantAvatar,
  Name,
  Job,
  Intro,
  Exchange,
});

/** 불러오는 동안의 참여자 행: 같은 간격(원 · 이름 줄 · 직업 줄 · 소개 줄 · 오른쪽 알약) */
export function ParticipantRowSkeleton({ className }: { className?: string }) {
  return (
    <li aria-hidden className={cn(ROW, className)}>
      <Skeleton className="size-11 shrink-0 rounded-full" />
      <div className="flex min-w-0 flex-1 flex-col">
        <TextSkeleton variant="rowTitle" className="w-1/2" />
        <TextSkeleton variant="innerTitle" className="mt-px w-1/3" />
        <TextSkeleton variant="caption" className="mt-[3px] w-4/5" />
      </div>
      <Skeleton className="h-8 w-[76px] self-center rounded-full" />
    </li>
  );
}
