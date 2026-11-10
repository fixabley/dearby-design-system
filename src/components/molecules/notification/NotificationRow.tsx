import {
  createContext,
  useContext,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { Text, TextSkeleton } from '@/components/atoms/shared/Text';
import { NewDot } from '@/components/atoms/shared/NewDot';
import { Thumbnail } from '@/components/atoms/shared/Thumbnail';
import { Icon } from '@/components/foundations/Icon';
import { Avatar } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import type { IconName } from '@/icons';
import { cn } from '@/lib/utils';

/**
 * 알림 종류: 선발 결과 · 새 모집 · 마감 · 행사 · 명함 교환(시안 ㉗-g · ㉘-f).
 * 배지의 아이콘과 화면 읽기에 쓰는 종류 이름
 */
export const NOTIFICATION_KINDS = {
  result: { label: '선발', icon: 'flag' },
  open: { label: '새 모집', icon: 'sparkle' },
  deadline: { label: '마감', icon: 'clock' },
  event: { label: '행사', icon: 'calendarDot' },
  card: { label: '명함', icon: 'card' },
} as const satisfies Record<string, { label: string; icon: IconName }>;
export type NotificationKind = keyof typeof NOTIFICATION_KINDS;

/** 행(원래 부품과 스켈레톤이 함께 쓴다): 위아래 12, 사이 간격 12, 아래 .5px 구분선(마지막 제외) */
const ROW =
  'relative flex items-start gap-3 border-b-[.5px] border-border py-3 last:border-b-0';

type NotificationRowContextValue = {
  kind: NotificationKind;
  logo?: string;
  initial?: string;
  subject: string;
  message: string;
  time: string;
  thumb?: string;
  unread: boolean;
  action?: ReactNode;
};
const NotificationRowContext =
  createContext<NotificationRowContextValue | null>(null);

function useNotificationRow(part: string) {
  const ctx = useContext(NotificationRowContext);
  if (!ctx)
    throw new Error(`NotificationRow.${part}는 <NotificationRow> 안에서 쓴다`);
  return ctx;
}

/** 안 읽음 점: 행 왼쪽 바깥(-14)에 8 크기. 화면 옆 여백 안에 놓이니 목록 왼쪽에 14 이상 여백이 있어야 한다 */
function Unread({ className }: { className?: string }) {
  const { unread } = useNotificationRow('Unread');
  if (!unread) return null;
  return (
    <NewDot
      label="읽지 않음"
      className={cn('absolute -left-3.5 top-7', className)}
    />
  );
}

/** 앞 요소 44: 조직 로고(없으면 이니셜 원) + 오른쪽 아래에 겹친 종류 배지 20 */
function Media({ className }: { className?: string }) {
  const { kind, logo, initial } = useNotificationRow('Media');
  const { label, icon } = NOTIFICATION_KINDS[kind];
  return (
    <span className={cn('relative size-11 shrink-0', className)}>
      <Avatar
        size="row"
        src={logo}
        fallback={initial ?? ''}
        aria-hidden
        className={
          logo
            ? 'bg-white ring-[.5px] ring-black/8 dark:bg-[#2A2E31] dark:ring-white/6'
            : 'dark:ring-[.5px] dark:ring-white/6'
        }
      />
      <span
        aria-hidden
        className="absolute -right-[3px] -bottom-[3px] grid size-5 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_0_2px_var(--background)] dark:shadow-control [&_svg]:size-[11px]"
      >
        <Icon name={icon} />
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

/** 문장: 굵은 주어 뒤에 나머지가 이어진다. 시각은 문장 아래 */
function Message({ className }: { className?: string }) {
  const { subject, message } = useNotificationRow('Message');
  return (
    <Text as="p" variant="innerTitle" weight="regular" className={className}>
      <Text as="b" variant="innerTitle" weight="semibold" tone="inherit">
        {subject}
      </Text>
      {message}
    </Text>
  );
}

/** 시각(`17:02` 같은 실제 시각) */
function Time({ className }: { className?: string }) {
  const { time } = useNotificationRow('Time');
  return (
    <Text
      as="time"
      variant="caption"
      tone="muted"
      className={cn('block', className)}
    >
      {time}
    </Text>
  );
}

/** 오른쪽 프로그램 커버 썸네일 52. `thumb`이 없으면 그리지 않는다 */
function Cover({ className }: { className?: string }) {
  const { thumb } = useNotificationRow('Cover');
  if (!thumb) return null;
  return <Thumbnail thumb={{ cover: thumb }} size="xs" className={className} />;
}

function NotificationRowRoot({
  kind,
  logo,
  initial,
  subject,
  message,
  time,
  thumb,
  unread = false,
  action,
  className,
  children,
  ...props
}: Omit<ComponentProps<'li'>, 'children'> & {
  kind: NotificationKind;
  /** 조직 로고 주소 */
  logo?: string;
  /** 로고가 없거나 불러오지 못할 때 원에 들어가는 글자(사람이면 이름 첫 글자) */
  initial?: string;
  /** 굵게 보이는 주어(활동 · 조직 · 사람 이름) */
  subject: string;
  /** 주어 바로 뒤에 이어 붙는 나머지. 조사로 시작하면 붙여 쓰고, 아니면 앞에 공백을 넣는다(`'에서 새 모집을 열었어요'` · `' 행사 D-13'`) */
  message: string;
  /** 시각 글자(`HH:mm`) */
  time: string;
  /** 프로그램 커버 이미지 주소(있을 때만 오른쪽에 그림) */
  thumb?: string;
  /** 안 읽음(왼쪽 바깥 청록 점) */
  unread?: boolean;
  /** 시각 아래에 8 띄워 놓는 행 안 버튼(통과 · 탈락 · 아직 몰라요, 수락) */
  action?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <NotificationRowContext.Provider
      value={{
        kind,
        logo,
        initial,
        subject,
        message,
        time,
        thumb,
        unread,
        action,
      }}
    >
      <li
        data-slot="notification-row"
        className={cn(ROW, className)}
        {...props}
      >
        {children ?? (
          <>
            <Unread />
            <Media />
            <div className="min-w-0 flex-1">
              <Message />
              <Time />
              {action && <div className="mt-2">{action}</div>}
            </div>
            <Cover />
          </>
        )}
      </li>
    </NotificationRowContext.Provider>
  );
}

/**
 * 알림 행(컴파운드, 시안 ㉗-g · ㉘-f, `<ul>` 안에 놓는다): Unread(안 읽음 점) · Media(로고 또는 이니셜 원 + 종류 배지) · Message(굵은 주어 문장) · Time(시각) · Cover(오른쪽 썸네일).
 * 기본 조립은 `<NotificationRow kind="open" logo="…" subject="카카오" message="에서 새 모집을 열었어요 · 카카오테크 부트캠프 6기" time="09:00" thumb="…" unread />`.
 * 행 전체는 누르는 요소가 아니다. 행 안 버튼은 `action`에 넣는다(나중에 행을 눌러 들어가게 하면 `action`은 누르는 영역 밖 형제로 옮긴다: 버튼 안에 버튼이 들어가지 않게).
 * 바꿔 조립하려면 부품을 직접 놓는다: `<NotificationRow …><NotificationRow.Media /><NotificationRow.Message /></NotificationRow>`
 */
export const NotificationRow = Object.assign(NotificationRowRoot, {
  Unread,
  Media,
  Message,
  Time,
  Cover,
});

/** 불러오는 동안의 알림 행: 같은 간격(원 · 문장 두 줄 · 시각 · 썸네일 자리). 썸네일은 있을 때만이라 `cover`로 고른다 */
export function NotificationRowSkeleton({
  cover = false,
  className,
}: {
  cover?: boolean;
  className?: string;
}) {
  return (
    <li aria-hidden className={cn(ROW, className)}>
      <Skeleton className="size-11 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1">
        <TextSkeleton variant="innerTitle" lines={2} />
        <TextSkeleton variant="caption" className="w-1/4" />
      </div>
      {cover && <Skeleton className="size-13 shrink-0 rounded-[10px]" />}
    </li>
  );
}
