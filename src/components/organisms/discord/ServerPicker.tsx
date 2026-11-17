import { createContext, useContext, type ReactNode } from 'react';
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
} from '@/components/ui/item';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ListRow } from '@/components/molecules/shared/ListGroup';
import { cn } from '@/lib/utils';

type ServerOption = { name: string; sub: string };
type ServerPickerContextValue = {
  servers: ServerOption[];
  value: string;
  onChange: (v: string) => void;
};
const ServerPickerContext = createContext<ServerPickerContextValue | null>(
  null,
);

function useServerPicker(part: string) {
  const ctx = useContext(ServerPickerContext);
  if (!ctx)
    throw new Error(`ServerPicker.${part}는 <ServerPicker> 안에서 쓴다`);
  return ctx;
}

/** 서버 한 줄(라디오): 디스코드 아이콘 · 이름 · 보조 줄 */
function Server({
  server: s,
  className,
}: {
  server: ServerOption;
  className?: string;
}) {
  const { value } = useServerPicker('Server');
  return (
    // 라디오 줄은 목록 항목이 아니라 Item의 listitem 역할을 지운다(label 안 라디오의 이름은 그대로)
    <Item
      asChild
      role="none"
      selected={s.name === value}
      className={cn('pressable', className)}
    >
      <label>
        <ItemMedia variant="icon">
          <Icon name="discord" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{s.name}</ItemTitle>
          <ItemDescription>{s.sub}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <RadioGroupItem value={s.name} />
        </ItemActions>
      </label>
    </Item>
  );
}

/** 서버 라디오 묶음: children이 없으면 servers로 Server를 그린다 */
function Servers({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const { servers, value, onChange } = useServerPicker('Servers');
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      aria-label="서버"
      className={cn('[&>*+*]:border-t [&>*+*]:border-border', className)}
    >
      {children ?? servers.map((s) => <Server key={s.name} server={s} />)}
    </RadioGroup>
  );
}

/** 다른 서버에 초대하는 줄: 라디오가 아니라 radiogroup 밖 자기 목록(list)에 둔다 */
function Invite({ className }: { className?: string }) {
  return (
    <ItemGroup variant="plain">
      <ListRow
        icon="add"
        title="다른 서버에 Dearby 초대"
        add
        onClick={() => {}}
        className={className}
      />
    </ItemGroup>
  );
}

function ServerPickerRoot({
  servers,
  value,
  onChange,
  children,
}: {
  servers: ServerOption[];
  value: string;
  onChange: (v: string) => void;
  children?: ReactNode;
}) {
  return (
    <ServerPickerContext.Provider value={{ servers, value, onChange }}>
      <section>
        <Text
          as="h4"
          variant="caption"
          tone="muted"
          className="mb-1.5 mt-5 px-4"
        >
          서버
        </Text>
        <div className="overflow-hidden rounded-md border border-border [&>*+*]:border-t [&>*+*]:border-border">
          {children ?? (
            <>
              <Servers />
              <Invite />
            </>
          )}
        </div>
      </section>
    </ServerPickerContext.Provider>
  );
}

/**
 * 디스코드 서버 고르기(shadcn RadioGroup + Item, 컴파운드): 머리 `서버` 아래 한 묶음 안에 Servers(라디오 묶음, 서버마다 Server) + Invite(다른 서버에 초대, 묶음 밖 목록).
 * 기본 조립은 `<ServerPicker servers={servers} value={value} onChange={setValue} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ServerPicker servers={servers} value={value} onChange={setValue}><ServerPicker.Servers>{servers.map((s) => <ServerPicker.Server key={s.name} server={s} />)}</ServerPicker.Servers></ServerPicker>`
 */
export const ServerPicker = Object.assign(ServerPickerRoot, {
  Servers,
  Server,
  Invite,
});
