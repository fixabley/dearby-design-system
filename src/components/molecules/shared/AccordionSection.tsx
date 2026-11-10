import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from 'react';
import type { IconName } from '@/icons';
import { Text } from '@/components/atoms/shared/Text';
import { NewDot } from '@/components/atoms/shared/NewDot';
import { Icon } from '@/components/foundations/Icon';
import { cn } from '@/lib/utils';

type AccordionSectionContextValue = {
  icon: IconName;
  title: string;
  count?: number;
  fresh: boolean;
  open: boolean;
  toggle: () => void;
  headingAs: 'h2' | 'h3' | 'h4';
  buttonId: string;
  panelId: string;
};
const AccordionSectionContext =
  createContext<AccordionSectionContextValue | null>(null);

function useAccordionSection(part: string) {
  const ctx = useContext(AccordionSectionContext);
  if (!ctx)
    throw new Error(
      `AccordionSection.${part}는 <AccordionSection> 안에서 쓴다`,
    );
  return ctx;
}

/** 종류 아이콘 원 32 */
function SectionIcon({ className }: { className?: string }) {
  const { icon } = useAccordionSection('Icon');
  return (
    <span
      className={cn(
        'grid size-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground [&_svg]:size-[17px]',
        className,
      )}
    >
      <Icon name={icon} />
    </span>
  );
}

function Title({ className }: { className?: string }) {
  const { title } = useAccordionSection('Title');
  return (
    <Text as="span" variant="rowTitle" className={className}>
      {title}
    </Text>
  );
}

/** 개수. 주지 않으면 그리지 않는다 */
function Count({ className }: { className?: string }) {
  const { count } = useAccordionSection('Count');
  if (count == null) return null;
  return (
    <Text as="span" variant="body" tone="muted" tabular className={className}>
      {count}
    </Text>
  );
}

/** 새 모집 점 */
function Dot({ className }: { className?: string }) {
  const { fresh } = useAccordionSection('Dot');
  return fresh ? <NewDot size="sm" className={className} /> : null;
}

/** 오른쪽 끝 꺾쇠: 펼치면 아래로 돈다 */
function Chevron({ className }: { className?: string }) {
  return (
    <Icon
      name="chevronRight"
      className={cn(
        'ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-250 group-aria-expanded:rotate-90',
        className,
      )}
    />
  );
}

/** 머리 행 전체가 누르는 버튼(높이 56). children을 주면 그 조립으로 바꾼다 */
function Header({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const {
    open,
    toggle,
    headingAs: Heading,
    buttonId,
    panelId,
  } = useAccordionSection('Header');
  return (
    // 덧칠(pressable)이 글자에 붙지 않게 옆으로 12 넓히고 같은 만큼 안쪽 여백을 줘 자리를 그대로 둔다
    <Heading className="-mx-3">
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className={cn(
          'group flex min-h-14 w-full items-center gap-2.5 rounded-xl px-3 text-left outline-none pressable focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
      >
        {children ?? (
          <>
            <SectionIcon />
            <Title />
            <Count />
            <Dot />
            <Chevron />
          </>
        )}
      </button>
    </Heading>
  );
}

/**
 * 펼치는 내용. 닫혀 있으면 보이지도 초점을 받지도 않는다(inert). 높이는 0.25초에 열리고 닫힌다.
 * 옆으로 16 넓힌 칸 안에 두어 카드 그림자가 잘리지 않는다
 */
function Panel({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { open, buttonId, panelId } = useAccordionSection('Panel');
  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={buttonId}
      inert={!open}
      className={cn(
        'grid transition-[grid-template-rows,visibility] duration-250 ease-out-soft',
        open ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]',
      )}
    >
      <div className="-mx-4 min-h-0 overflow-hidden px-4">
        <div className={cn('pb-[18px] pt-0.5', className)}>{children}</div>
      </div>
    </div>
  );
}

function AccordionSectionRoot({
  icon,
  title,
  count,
  fresh = false,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  headingAs = 'h3',
  header,
  className,
  children,
}: {
  icon: IconName;
  title: string;
  count?: number;
  /** 새 모집이 있는 항목이 안에 있음(청록 점) */
  fresh?: boolean;
  /** 펼침(제어). 펼친 상태를 기기에 기억하는 쪽이 값을 넘긴다 */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** 머리의 제목 수준. 화면의 제목 수준에 맞춘다 */
  headingAs?: 'h2' | 'h3' | 'h4';
  /** 머리를 바꿔 조립한다: `<AccordionSection.Header><AccordionSection.Icon />…</AccordionSection.Header>` */
  header?: ReactNode;
  className?: string;
  /** 펼치는 내용 */
  children?: ReactNode;
}) {
  const [inner, setInner] = useState(defaultOpen);
  const open = openProp ?? inner;
  const id = useId();
  const toggle = () => {
    if (openProp === undefined) setInner(!open);
    onOpenChange?.(!open);
  };
  return (
    <AccordionSectionContext.Provider
      value={{
        icon,
        title,
        count,
        fresh,
        open,
        toggle,
        headingAs,
        buttonId: `${id}-header`,
        panelId: `${id}-panel`,
      }}
    >
      <div
        className={cn(
          'border-b-[.5px] border-border last:border-b-0',
          className,
        )}
      >
        {header ?? <Header />}
        <Panel>{children}</Panel>
      </div>
    </AccordionSectionContext.Provider>
  );
}

/**
 * 접히는 섹션(컴파운드): Header(Icon · Title · Count · Dot · Chevron) · Panel(펼치는 내용).
 * 머리 행 전체가 버튼(`aria-expanded` · `aria-controls`)이고 그림자가 없다. 섹션 사이 구분선은 각 섹션의 아래 선(마지막 제외)이라 따로 묶는 부품이 없다.
 * `open` · `onOpenChange`로 제어하거나(펼친 상태를 기억할 때) `defaultOpen`으로 시작만 정한다.
 * 기본 조립은 `<AccordionSection icon="group" title="조직" count={3} fresh>…내용…</AccordionSection>`
 */
export const AccordionSection = Object.assign(AccordionSectionRoot, {
  Header,
  Icon: SectionIcon,
  Title,
  Count,
  Dot,
  Chevron,
  Panel,
});
