import { createContext, useContext, type ReactNode } from 'react';
import type { Program } from '@/types';
import {
  HostLine,
  HostLineSkeleton,
} from '@/components/molecules/program/HostLine';
import {
  KindLabel,
  KindLabelSkeleton,
} from '@/components/atoms/activity/KindLabel';
import { Text, TextSkeleton } from '@/components/atoms/shared/Text';
import { Thumbnail } from '@/components/atoms/shared/Thumbnail';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
} from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type ProgramRowContextValue = { p: Program };
const ProgramRowContext = createContext<ProgramRowContextValue | null>(null);

function useProgramRow(part: string) {
  const ctx = useContext(ProgramRowContext);
  if (!ctx) throw new Error(`ProgramRow.${part}는 <ProgramRow> 안에서 쓴다`);
  return ctx;
}

/** 왼쪽 열: 종류 · 썸네일 */
function Media({ className }: { className?: string }) {
  const { p } = useProgramRow('Media');
  return (
    <ItemMedia className={cn('w-16 flex-col gap-[5px]', className)}>
      <KindLabel kind={p.kind} />
      <Thumbnail thumb={p.thumb} />
    </ItemMedia>
  );
}

/** 조직 줄(· 활동 n개) */
function Host({ className }: { className?: string }) {
  const { p } = useProgramRow('Host');
  return <HostLine {...p.host} count={p.count} className={className} />;
}

/** 프로그램 이름(두 줄까지) */
function Title({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { p } = useProgramRow('Title');
  return (
    <Text variant="rowTitle" lines={2} className={cn('mt-[3px]', className)}>
      {children ?? p.title}
    </Text>
  );
}

/** 소개(두 줄까지) */
function Description({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { p } = useProgramRow('Description');
  return (
    <ItemDescription
      className={cn('mt-0.5 line-clamp-2 whitespace-normal', className)}
    >
      {children ?? p.desc}
    </ItemDescription>
  );
}

/** 글 열: 조직 줄 · 이름 · 소개. children을 주면 그 조립으로 바꾼다 */
function Body({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <ItemContent className={className}>
      {children ?? (
        <>
          <Host />
          <Title />
          <Description />
        </>
      )}
    </ItemContent>
  );
}

function ProgramRowRoot({
  p,
  selected,
  onSelect,
  children,
}: {
  p: Program;
  selected?: boolean;
  onSelect?: (p: Program) => void;
  children?: ReactNode;
}) {
  return (
    <ProgramRowContext.Provider value={{ p }}>
      <Item
        asChild
        size="row"
        selected={selected}
        // 고른 면 · 누름 덧칠은 글 자리 밖으로 좌우 12씩 넓힌다(글 자리는 그대로)
        className="-mx-3 w-[calc(100%+24px)] px-3 py-3.5 pressable"
      >
        <a
          href={`/programs/${p.id}`}
          aria-current={selected || undefined}
          onClick={(e) => {
            e.preventDefault();
            onSelect?.(p);
          }}
        >
          {children ?? (
            <>
              <Media />
              <Body />
            </>
          )}
        </a>
      </Item>
    </ProgramRowContext.Provider>
  );
}

/**
 * 발견의 프로그램 행(shadcn Item 링크, 컴파운드): 왼쪽 열(Media) + 글 열(Body = Host · Title · Description). 고르면 민트 면.
 * 기본 조립은 `<ProgramRow p={p} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ProgramRow p={p}><ProgramRow.Media /><ProgramRow.Body><ProgramRow.Title /><ProgramRow.Description /></ProgramRow.Body></ProgramRow>`
 */
export const ProgramRow = Object.assign(ProgramRowRoot, {
  Media,
  Body,
  Host,
  Title,
  Description,
});

/** 불러오는 동안의 프로그램 행: 같은 칸과 간격(종류 · 썸네일 | 조직 줄 · 이름 한 줄 · 소개 두 줄) */
export function ProgramRowSkeleton() {
  return (
    <Item size="row" aria-hidden className="py-3.5">
      <ItemMedia className="w-16 flex-col gap-[5px]">
        <KindLabelSkeleton />
        <Skeleton className="size-16" />
      </ItemMedia>
      <ItemContent>
        <HostLineSkeleton />
        <TextSkeleton variant="rowTitle" className="mt-[3px] w-3/4" />
        <TextSkeleton variant="caption" lines={2} className="mt-0.5" />
      </ItemContent>
    </Item>
  );
}
