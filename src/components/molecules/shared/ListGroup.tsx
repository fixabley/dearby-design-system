import { createContext, useContext, type ReactNode } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import type { IconName } from '@/icons';
import { Text } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  itemVariants,
} from '@/components/ui/item';
import { cn } from '@/lib/utils';

/** iOS 묶음 목록(shadcn ItemGroup). 위에 작은 머리 */
export function ListGroup({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      {title && (
        <Text
          as="h4"
          variant="caption"
          tone="muted"
          className="mb-1.5 mt-5 px-4"
        >
          {title}
        </Text>
      )}
      <ItemGroup>{children}</ItemGroup>
    </section>
  );
}

type ListRowContextValue = {
  icon?: IconName;
  media?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  add?: boolean;
};
const ListRowContext = createContext<ListRowContextValue | null>(null);

function useListRow(part: string) {
  const ctx = useContext(ListRowContext);
  if (!ctx) throw new Error(`ListRow.${part}는 <ListRow> 안에서 쓴다`);
  return ctx;
}

/** 앞 요소: media로 준 요소(아바타 등), 없으면 청록 아이콘 */
function Media({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { icon, media } = useListRow('Media');
  const node = children ?? media;
  if (node) return <ItemMedia className={className}>{node}</ItemMedia>;
  return icon ? (
    <ItemMedia variant="icon" className={className}>
      <Icon name={icon} />
    </ItemMedia>
  ) : null;
}

/** 제목(추가 행이면 청록) */
function Title({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { title, add } = useListRow('Title');
  return (
    <ItemTitle className={cn(add && 'text-accent-foreground', className)}>
      {children ?? title}
    </ItemTitle>
  );
}

/** 보조 줄 */
function Subtitle({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { subtitle } = useListRow('Subtitle');
  const node = children ?? subtitle;
  return node ? (
    <ItemDescription className={className}>{node}</ItemDescription>
  ) : null;
}

/** 글 열: 제목 · 보조 줄. children을 주면 그 조립으로 바꾼다 */
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
          <Title />
          <Subtitle />
        </>
      )}
    </ItemContent>
  );
}

/** 오른쪽 값 · 스위치 · 라디오 */
function Trailing({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { trailing } = useListRow('Trailing');
  const node = children ?? trailing;
  return node != null ? (
    <ItemActions className={className}>{node}</ItemActions>
  ) : null;
}

function ListRowRoot({
  icon,
  media,
  title,
  subtitle,
  trailing,
  action,
  add,
  selected,
  onClick,
  asChild,
  className,
  children,
}: {
  icon?: IconName;
  media?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  action?: ReactNode;
  add?: boolean;
  selected?: boolean;
  onClick?: () => void;
  asChild?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  // asChild면 children은 링크 요소라 조립은 기본 조립
  const body = (asChild ? null : children) ?? (
    <>
      <Media />
      <Body />
      <Trailing />
    </>
  );
  const Comp = asChild ? Slot : 'button';
  return (
    <ListRowContext.Provider
      value={{ icon, media, title, subtitle, trailing, add }}
    >
      {onClick || asChild ? (
        // 줄(listitem) 안에 button 또는 링크: 그 요소에 listitem 역할을 덮으면 버튼 · 링크로 읽히지 않는다.
        // 최소 높이는 줄이 갖고(구분선 포함 44) 누르는 요소는 그 높이를 채운다.
        // action은 누르는 요소 밖 형제라 버튼 · 링크가 겹치지 않고, 누르는 요소는 남은 폭을 모두 갖는다.
        // hover는 줄(group/item) 어디에 있든 두 칸 모두 칠하고, 누름은 누른 요소만 칠한다(값은 pressable과 같음)
        <Item selected={selected} className="gap-0 p-0">
          <Comp
            type={asChild ? undefined : 'button'}
            onClick={onClick}
            className={cn(
              itemVariants(),
              'min-h-0 min-w-0 flex-1 self-stretch group-hover/item:bg-accent/60 active:bg-accent active:transition-none [-webkit-tap-highlight-color:transparent]',
              className,
            )}
          >
            {body}
            {asChild && <Slottable>{children}</Slottable>}
          </Comp>
          {action && (
            <div className="flex shrink-0 items-center self-stretch pr-1.5 transition-colors duration-200 group-hover/item:bg-accent/60">
              {action}
            </div>
          )}
        </Item>
      ) : (
        <Item selected={selected} className={className}>
          {body}
        </Item>
      )}
    </ListRowContext.Provider>
  );
}

/**
 * 묶음 목록의 행(shadcn Item, 컴파운드): Media(아이콘 또는 media로 준 앞 요소) · Body(Title · Subtitle) · Trailing(오른쪽 값·스위치·라디오).
 * onClick을 주면 줄(listitem) 안에 줄 전체를 덮는 button을 두고, className은 그 button에 붙는다.
 * asChild면 button 대신 children으로 준 링크 요소 하나(`<a href>` · Next `Link`)를 같은 자리에 두고 그 안에 기본 조립을 넣는다.
 * href · target · rel은 그 요소에 준다: `<ListRow asChild icon="profile" title="프로필" trailing={…}><Link href="/settings/profile" /></ListRow>`.
 * 링크 요소는 비워 둔다(안에 부품을 놓으면 기본 조립과 함께 두 번 그려진다). asChild로 바꿔 조립하는 것은 아직 받지 않는다.
 * action은 onClick · asChild 줄의 오른쪽 끝, 줄을 덮는 요소 밖에 따로 누르는 버튼 · 링크 하나를 둔다(아이콘 버튼 `Button variant="plain" size="icon-sm"`).
 * 누르지 않는 줄의 스위치 · 버튼은 trailing에 넣는다.
 * 기본 조립은 `<ListRow icon="calendar" title="시작" trailing="11월 30일 (월)" />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ListRow title="한유진" subtitle="멘토"><ListRow.Body><ListRow.Subtitle /><ListRow.Title /></ListRow.Body><ListRow.Trailing /></ListRow>`
 */
export const ListRow = Object.assign(ListRowRoot, {
  Media,
  Body,
  Title,
  Subtitle,
  Trailing,
});
