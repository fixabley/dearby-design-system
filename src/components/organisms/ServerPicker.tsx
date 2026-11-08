import { createContext, useContext, type ReactNode } from 'react';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/foundations/Icon';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ListRow } from '@/components/molecules/ListGroup';

type ServerOption = { name: string; sub: string };
type ServerPickerContextValue = { value: string };
const ServerPickerContext = createContext<ServerPickerContextValue | null>(null);

function useServerPicker(part: string) {
  const ctx = useContext(ServerPickerContext);
  if (!ctx) throw new Error(`ServerPicker.${part}는 <ServerPicker> 안에서 쓴다`);
  return ctx;
}

/** 서버 한 줄(라디오): 디스코드 아이콘 · 이름 · 보조 줄 */
function Server({ server: s, className }: { server: ServerOption; className?: string }) {
  const { value } = useServerPicker('Server');
  return (
    <Item asChild selected={s.name === value} className={className}>
      <label>
        <ItemMedia variant="icon" className="text-[#5865F2]"><Icon name="discord" /></ItemMedia>
        <ItemContent><ItemTitle>{s.name}</ItemTitle><ItemDescription>{s.sub}</ItemDescription></ItemContent>
        <ItemActions><RadioGroupItem value={s.name} /></ItemActions>
      </label>
    </Item>
  );
}

/** 다른 서버에 초대하는 줄 */
function Invite({ className }: { className?: string }) {
  return <ListRow icon="add" title="다른 서버에 Dearby 초대" add onClick={() => {}} className={className} />;
}

function ServerPickerRoot({ servers, value, onChange, children }: { servers: ServerOption[]; value: string; onChange: (v: string) => void; children?: ReactNode }) {
  return (
    <ServerPickerContext.Provider value={{ value }}>
      <section>
        <Text as="h4" variant="caption" tone="muted" className="mb-1.5 mt-5 px-4">서버</Text>
        <RadioGroup value={value} onValueChange={onChange} aria-label="서버" className="overflow-hidden rounded-md bg-muted [&>*+*]:border-t [&>*+*]:border-border">
          {children ?? <>{servers.map((s) => <Server key={s.name} server={s} />)}<Invite /></>}
        </RadioGroup>
      </section>
    </ServerPickerContext.Provider>
  );
}

/**
 * 디스코드 서버 고르기(shadcn RadioGroup + Item, 컴파운드): 머리 `서버` 아래 서버마다 Server + Invite(다른 서버에 초대).
 * 기본 조립은 `<ServerPicker servers={servers} value={value} onChange={setValue} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ServerPicker servers={servers} value={value} onChange={setValue}>{servers.map((s) => <ServerPicker.Server key={s.name} server={s} />)}</ServerPicker>`
 */
export const ServerPicker = Object.assign(ServerPickerRoot, { Server, Invite });
