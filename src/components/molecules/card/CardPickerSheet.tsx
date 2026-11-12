import { createContext, useContext, useState, type ReactNode } from 'react';
import { CardGlyph } from '@/components/atoms/card/CardGlyph';
import { Text } from '@/components/atoms/shared/Text';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SheetHeader } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

/** 고를 수 있는 명함: `summary`는 무엇이 담겼는지 한 줄(`소셜 링크만` · `모든 항목` · `항목 4개`) */
export type CardOption = { id: string; name: string; summary: string };

type CardPickerContextValue = {
  cards: CardOption[];
  value: string | undefined;
  setValue: (id: string) => void;
  title: string;
  actionLabel: string;
  onSubmit?: (id: string) => void;
};
const CardPickerContext = createContext<CardPickerContextValue | null>(null);

function useCardPicker(part: string) {
  const ctx = useContext(CardPickerContext);
  if (!ctx)
    throw new Error(`CardPickerSheet.${part}는 <CardPickerSheet> 안에서 쓴다`);
  return ctx;
}

/** 머리: 제목 + 닫기(SheetHeader가 놓인 곳에 맞게 그린다) */
function Header({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { title } = useCardPicker('Header');
  return <SheetHeader title={children ?? title} className={className} />;
}

/** 명함 목록: 한 장만 고르는 라디오 묶음. 줄 전체가 라벨이라 어디를 눌러도 고른다 */
function Options({ className }: { className?: string }) {
  const { cards, value, setValue, title } = useCardPicker('Options');
  return (
    <RadioGroup
      aria-label={title}
      value={value}
      onValueChange={setValue}
      className={cn(
        'mt-3.5 overflow-hidden rounded-md border border-border',
        className,
      )}
    >
      {cards.map((c) => (
        <label
          key={c.id}
          className="pressable flex min-h-15 cursor-pointer items-center gap-3 px-4 py-2 transition-colors duration-200 not-first:border-t not-first:border-border has-focus-visible:bg-accent/60"
        >
          <CardGlyph />
          <span className="flex min-w-0 flex-1 flex-col">
            <Text variant="rowTitle" truncate>
              {c.name}
            </Text>
            <Text variant="caption" tone="muted" truncate>
              {c.summary}
            </Text>
          </span>
          <RadioGroupItem value={c.id} />
        </label>
      ))}
    </RadioGroup>
  );
}

/** 아래 확인 버튼(고정 CTA): 고른 명함의 id로 `onSubmit`을 부른다 */
function Footer({ className }: { className?: string }) {
  const { value, actionLabel, onSubmit } = useCardPicker('Footer');
  return (
    <Button
      size="lg"
      disabled={value === undefined}
      onClick={() => value !== undefined && onSubmit?.(value)}
      className={cn('mt-4 w-full', className)}
    >
      {actionLabel}
    </Button>
  );
}

function CardPickerSheetRoot({
  cards,
  value,
  defaultValue,
  onValueChange,
  title = '건넬 명함',
  actionLabel = '건네기',
  onSubmit,
  children,
}: {
  cards: CardOption[];
  /** 고른 명함 id(제어). 정하지 않으면 `defaultValue`로 시작해 안에서 바꾼다 */
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  /** 시트 머리 제목: `건넬 명함`(QR · 교환 요청) · `돌려줄 명함`(수락) */
  title?: string;
  /** 확인 버튼 글자: `건네기` · `교환 요청` · `수락` */
  actionLabel?: string;
  onSubmit?: (id: string) => void;
  children?: ReactNode;
}) {
  const [inner, setInner] = useState(defaultValue ?? cards[0]?.id);
  const current = value ?? inner;
  return (
    <CardPickerContext.Provider
      value={{
        cards,
        value: current,
        setValue: (id) => {
          setInner(id);
          onValueChange?.(id);
        },
        title,
        actionLabel,
        onSubmit,
      }}
    >
      {children ?? (
        <>
          <Header />
          <Options />
          <Footer />
        </>
      )}
    </CardPickerContext.Provider>
  );
}

/**
 * 명함 고르기 시트 내용(shadcn Sheet 안에 넣는다, 컴파운드): Header · Options(명함 한 장을 고르는 라디오 묶음) · Footer(확인 버튼).
 * 기본으로 고를 명함(`defaultValue`, 시안은 `SNS`)과 SNS를 지웠을 때의 대체는 쓰는 쪽이 정한다. 명함이 한 장이면 시트를 열지 않는 것도 쓰는 쪽 몫이다.
 * 기본 조립은 `<CardPickerSheet cards={cards} defaultValue="sns" title="건넬 명함" actionLabel="건네기" onSubmit={…} />`
 */
export const CardPickerSheet = Object.assign(CardPickerSheetRoot, {
  Header,
  Options,
  Footer,
});
