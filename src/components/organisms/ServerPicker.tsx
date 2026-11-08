import { Icon } from '@/components/foundations/Icon';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ListRow } from '@/components/molecules/ListGroup';

/** 디스코드 서버 고르기(shadcn RadioGroup + Item) */
export function ServerPicker({ servers, value, onChange }: { servers: { name: string; sub: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <section>
      <h4 className="mb-1.5 mt-5 px-4 text-caption text-muted-foreground">서버</h4>
      <RadioGroup value={value} onValueChange={onChange} aria-label="서버" className="overflow-hidden rounded-md bg-muted [&>*+*]:border-t [&>*+*]:border-border">
        {servers.map((s) => (
          <Item key={s.name} asChild selected={s.name === value}>
            <label>
              <ItemMedia variant="icon" className="text-[#5865F2]"><Icon name="discord" /></ItemMedia>
              <ItemContent><ItemTitle>{s.name}</ItemTitle><ItemDescription>{s.sub}</ItemDescription></ItemContent>
              <ItemActions><RadioGroupItem value={s.name} /></ItemActions>
            </label>
          </Item>
        ))}
        <ListRow icon="add" title="다른 서버에 Dearby 초대" add onClick={() => {}} />
      </RadioGroup>
    </section>
  );
}
