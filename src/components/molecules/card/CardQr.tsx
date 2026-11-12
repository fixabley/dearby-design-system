import { createContext, useContext, type ReactNode } from 'react';
import { Text } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

/** 위 명함 고르기에 나오는 내 명함 */
export type QrCardChoice = { id: string; name: string };
/** 활동 칩에 나오는 활동(오늘 진행 중인 내 활동) */
export type QrActivityChoice = { id: string; title: string };

type CardQrContextValue = {
  cards: QrCardChoice[];
  cardId: string;
  onCardIdChange?: (id: string) => void;
  qr: ReactNode;
  name: string;
  handle: string;
  activities: QrActivityChoice[];
  activityId?: string;
  onActivityIdChange?: (id: string) => void;
};
const CardQrContext = createContext<CardQrContextValue | null>(null);

function useCardQr(part: string) {
  const ctx = useContext(CardQrContext);
  if (!ctx) throw new Error(`CardQr.${part}는 <CardQr> 안에서 쓴다`);
  return ctx;
}

/** 알약 트리거(높이 36)와 라디오 메뉴 하나: 위 명함 고르기와 아래 활동 칩이 같은 짜임 */
function PillMenu({
  label,
  current,
  value,
  onValueChange,
  options,
  triggerClassName,
  icon,
}: {
  label: string;
  current: string;
  value: string | undefined;
  onValueChange?: (id: string) => void;
  options: { id: string; text: string }[];
  triggerClassName: string;
  icon?: 'calendar';
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            'inline-flex h-9 max-w-full items-center gap-1.5 rounded-full px-3.5 outline-none pressable focus-visible:ring-2 focus-visible:ring-ring [&_svg]:shrink-0',
            triggerClassName,
          )}
        >
          {icon && <Icon name={icon} className="size-[15px]" />}
          <span className="sr-only">{label} </span>
          <Text variant="innerTitle" tone="inherit" truncate>
            {current}
          </Text>
          <Icon name="chevronDown" className="size-3.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-60">
        <DropdownMenuRadioGroup
          aria-label={label}
          value={value}
          onValueChange={onValueChange}
        >
          {options.map((o) => (
            <DropdownMenuRadioItem key={o.id} value={o.id}>
              {o.text}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** 위 명함 고르기: 지금 보여 주는 명함 이름 알약. 누르면 내 명함 메뉴가 열리고, 바꾸면 쓰는 쪽이 그 명함 코드로 새로 그린다 */
function CardPicker({ className }: { className?: string }) {
  const { cards, cardId, onCardIdChange } = useCardQr('CardPicker');
  const current = cards.find((c) => c.id === cardId)?.name ?? '';
  return (
    <div className={cn('mt-[22px] first:mt-0', className)}>
      <PillMenu
        label="보여 줄 명함"
        current={current}
        value={cardId}
        onValueChange={onCardIdChange}
        options={cards.map((c) => ({ id: c.id, text: c.name }))}
        triggerClassName="border border-border text-foreground [&_svg]:text-muted-foreground"
      />
    </div>
  );
}

/** QR 자리: 쓰는 쪽이 그림(svg · img)을 `qr`로 넘긴다. 흰 상자 250은 다크에서도 흰색이다(스캔 여백). 화면 읽기에는 그림 하나로 읽힌다 */
function Code({ className, label }: { className?: string; label?: string }) {
  const { qr, name } = useCardQr('Code');
  return (
    <div
      role="img"
      aria-label={label ?? `${name}의 명함 QR 코드`}
      className={cn(
        'mt-[22px] size-[250px] shrink-0 rounded-3xl bg-white p-[18px] shadow-control first:mt-0 [&>img]:block [&>img]:size-full [&>svg]:block [&>svg]:size-full',
        className,
      )}
    >
      {qr}
    </div>
  );
}

/** 이름 · @핸들 */
function Name({ className }: { className?: string }) {
  const { name, handle } = useCardQr('Name');
  return (
    <div
      className={cn(
        'mt-[22px] flex flex-col items-center first:mt-0',
        className,
      )}
    >
      <Text as="b" variant="section" className="text-center">
        {name}
      </Text>
      <Text variant="body" tone="muted" className="mt-0.5">
        @{handle}
      </Text>
    </div>
  );
}

/** 활동 칩: 오늘 진행 중인 내 활동(청록 민트 알약). 누르면 다른 활동으로 바꾼다. 활동이 없으면 그리지 않는다 */
function Activity({ className }: { className?: string }) {
  const { activities, activityId, onActivityIdChange } = useCardQr('Activity');
  const current = activities.find((a) => a.id === activityId);
  if (activities.length === 0) return null;
  return (
    <div className={cn('mt-[26px] max-w-full first:mt-0', className)}>
      <PillMenu
        label="활동"
        current={current?.title ?? '활동 고르기'}
        value={activityId}
        onValueChange={onActivityIdChange}
        options={activities.map((a) => ({ id: a.id, text: a.title }))}
        triggerClassName="bg-accent text-mint-foreground"
        icon="calendar"
      />
    </div>
  );
}

function CardQrRoot({
  cards,
  cardId,
  onCardIdChange,
  qr,
  name,
  handle,
  activities = [],
  activityId,
  onActivityIdChange,
  className,
  children,
}: {
  /** 고를 수 있는 내 명함 */
  cards: QrCardChoice[];
  /** 지금 QR이 가리키는 명함(시안의 기본은 `SNS`) */
  cardId: string;
  onCardIdChange?: (id: string) => void;
  /** QR 그림(svg · img). 그리는 일은 쓰는 쪽 몫이고 부품은 자리와 크기만 잡는다 */
  qr: ReactNode;
  name: string;
  /** `@` 없이 */
  handle: string;
  /** 오늘 진행 중인 내 활동. 비어 있으면 활동 칩이 없다 */
  activities?: QrActivityChoice[];
  activityId?: string;
  onActivityIdChange?: (id: string) => void;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <CardQrContext.Provider
      value={{
        cards,
        cardId,
        onCardIdChange,
        qr,
        name,
        handle,
        activities,
        activityId,
        onActivityIdChange,
      }}
    >
      <div className={cn('flex flex-col items-center', className)}>
        {children ?? (
          <>
            <CardPicker />
            <Code />
            <Name />
            <Activity />
          </>
        )}
      </div>
    </CardQrContext.Provider>
  );
}

/**
 * QR 카드(컴파운드): CardPicker(위 명함 고르기) · Code(QR 자리 250) · Name(이름 · @핸들) · Activity(활동 칩).
 * QR 그림은 만들지 않는다: `qr`에 쓰는 쪽이 만든 svg · img를 넘긴다. 닫기 · QR 새로 만들기 같은 화면 위쪽 버튼은 화면 몫이다.
 * 기본 조립은 `<CardQr cards={cards} cardId="sns" qr={<svg …/>} name="김도윤" handle="doyun" activities={…} activityId="…" />`
 */
export const CardQr = Object.assign(CardQrRoot, {
  CardPicker,
  Code,
  Name,
  Activity,
});
