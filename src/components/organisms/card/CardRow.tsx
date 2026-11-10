import type { ReactNode } from 'react';
import { ListRow } from '@/components/molecules/shared/ListGroup';
import { CardGlyph } from '@/components/atoms/card/CardGlyph';
import { Text, TextSkeleton } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { Item, ItemContent, ItemMedia } from '@/components/ui/item';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

/**
 * 명함 목록 행(ListRow 위에 조립): 명함 글리프 · 이름 · 오른쪽에 무엇이 담겼는지 한 줄(`summary`: `모든 항목` · `소셜 링크만` · `항목 4개`) · 꺾쇠.
 * `ListGroup` 안에 놓는다. 누르면 그 명함을 고치러 가므로 `onClick`이거나 `asChild`(children은 링크 요소 하나, 안은 비워 둠)다.
 * `<ListGroup><CardRow name="SNS" summary="소셜 링크만" onClick={…} /></ListGroup>`
 */
export function CardRow({
  name,
  summary,
  onClick,
  asChild,
  className,
  children,
}: {
  name: string;
  summary: string;
  onClick?: () => void;
  asChild?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <ListRow
      media={<CardGlyph />}
      title={name}
      trailing={
        <>
          <Text as="span" variant="body" tone="muted" truncate>
            {summary}
          </Text>
          <Icon name="chevronRight" className="size-4" />
        </>
      }
      onClick={onClick}
      asChild={asChild}
      className={className}
    >
      {children}
    </ListRow>
  );
}

/** 불러오는 동안의 명함 행: 같은 높이 · 글리프 자리 · 이름 줄 · 요약 줄 */
export function CardRowSkeleton({ className }: { className?: string }) {
  return (
    <Item aria-hidden className={cn(className)}>
      <ItemMedia>
        <Skeleton className="h-[22px] w-[34px] rounded-[5px]" />
      </ItemMedia>
      <ItemContent>
        <TextSkeleton variant="bodyLarge" className="w-24" />
      </ItemContent>
      <TextSkeleton variant="body" className="w-16" />
    </Item>
  );
}
