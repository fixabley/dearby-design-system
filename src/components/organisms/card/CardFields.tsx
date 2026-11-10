import { createContext, useContext, type ReactNode } from 'react';
import type { IconName } from '@/icons';
import { ListGroup, ListRow } from '@/components/molecules/shared/ListGroup';
import { LockToggle } from '@/components/atoms/shared/LockToggle';
import { Text } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { cn } from '@/lib/utils';

/** 늘 보이는 네 항목의 값(끌 수 없다) */
export type CardFixedFields = {
  name: string;
  handle: string;
  job: string;
  bio: string;
};

/** 켜고 끌 수 있는 항목 하나: `checked`가 켜짐(= 이 명함에 보임 = 열린 자물쇠) */
export type CardFieldItem = {
  key: string;
  label: string;
  icon?: IconName;
  checked: boolean;
  disabled?: boolean;
};

export type CardFieldGroup = { title: string; items: CardFieldItem[] };

const FIXED_LABELS: [keyof CardFixedFields, string][] = [
  ['name', '이름'],
  ['handle', '핸들'],
  ['job', '직업'],
  ['bio', '소개'],
];

type CardFieldsContextValue = {
  fixed: CardFixedFields;
  groups: CardFieldGroup[];
  onCheckedChange?: (key: string, checked: boolean) => void;
};
const CardFieldsContext = createContext<CardFieldsContextValue | null>(null);

function useCardFields(part: string) {
  const ctx = useContext(CardFieldsContext);
  if (!ctx) throw new Error(`CardFields.${part}는 <CardFields> 안에서 쓴다`);
  return ctx;
}

/** 항상 보임 묶음: 이름 · 핸들 · 직업 · 소개. 값은 오른쪽(길면 말줄임), 끝의 잠금 아이콘은 끌 수 없다는 표시라 누르지 못한다 */
function Fixed({ className }: { className?: string }) {
  const { fixed } = useCardFields('Fixed');
  return (
    <ListGroup title="항상 보임" className={className}>
      {FIXED_LABELS.map(([k, label]) => (
        <ListRow key={k} title={label}>
          <ListRow.Body />
          <ListRow.Trailing className="min-w-0 max-w-[55%]">
            <Text variant="body" tone="muted" truncate>
              {k === 'handle' ? `@${fixed[k]}` : fixed[k]}
            </Text>
            <Icon name="lock" className="size-3.5 shrink-0" />
          </ListRow.Trailing>
        </ListRow>
      ))}
    </ListGroup>
  );
}

/** 켜고 끄는 묶음 하나(index번째): 제목 + 항목마다 줄(아이콘 · 이름 · 자물쇠 토글) */
function Group({ index, className }: { index: number; className?: string }) {
  const { groups, onCheckedChange } = useCardFields('Group');
  const g = groups[index];
  return (
    <ListGroup title={g.title} className={className}>
      {g.items.map((it) => (
        <ListRow
          key={it.key}
          icon={it.icon}
          title={it.label}
          trailing={
            <LockToggle
              checked={it.checked}
              disabled={it.disabled}
              onCheckedChange={(v) => onCheckedChange?.(it.key, v)}
              aria-label={`${it.label} 공개`}
              className="-mr-[9px]"
            />
          }
        />
      ))}
    </ListGroup>
  );
}

function CardFieldsRoot({
  fixed,
  groups,
  onCheckedChange,
  className,
  children,
}: {
  fixed: CardFixedFields;
  groups: CardFieldGroup[];
  onCheckedChange?: (key: string, checked: boolean) => void;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <CardFieldsContext.Provider value={{ fixed, groups, onCheckedChange }}>
      <div className={cn('flex flex-col', className)}>
        {children ?? (
          <>
            <Fixed />
            {groups.map((g, i) => (
              <Group key={g.title} index={i} />
            ))}
          </>
        )}
      </div>
    </CardFieldsContext.Provider>
  );
}

/**
 * 명함에 보일 항목 고르기(컴파운드): Fixed(항상 보임: 이름 · 핸들 · 직업 · 소개) · 묶음마다 Group(항목 줄 + 자물쇠 토글 `LockToggle`).
 * 켜짐(`checked`) = 이 명함에 보임. 값은 쓰는 쪽이 갖고(`onCheckedChange(key, checked)`로 알림), 새 명함은 모두 꺼진 채 시작하는 규칙도 쓰는 쪽 몫이다.
 * 기본 조립은 `<CardFields fixed={…} groups={…} onCheckedChange={…} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<CardFields fixed={…} groups={…}><CardFields.Fixed /><CardFields.Group index={1} /></CardFields>`
 */
export const CardFields = Object.assign(CardFieldsRoot, { Fixed, Group });
