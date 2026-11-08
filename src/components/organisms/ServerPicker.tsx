import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ListGroup, ListRow } from '@/components/molecules/ListGroup';
import { Icon } from '@/components/atoms/Icon';

/** 디스코드 서버 고르기(shadcn RadioGroup) */
export function ServerPicker({ servers, value, onChange }: { servers: { name: string; sub: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <ListGroup title="서버">
      <RadioGroup value={value} onValueChange={onChange} aria-label="서버" className="[&>*+*]:border-t [&>*+*]:border-border">
        {servers.map((s) => (
          <label key={s.name} className="flex min-h-11 cursor-pointer items-center gap-3 px-4 py-2 [&_svg]:size-[22px]">
            <span className="text-[#5865F2]"><Icon name="discord" /></span>
            <span className="min-w-0 flex-1"><b className="block text-[17px] font-normal">{s.name}</b><small className="text-[12px] text-muted-foreground">{s.sub}</small></span>
            <RadioGroupItem value={s.name} />
          </label>
        ))}
      </RadioGroup>
      <ListRow icon="add" title="다른 서버에 Dearby 초대" add onClick={() => {}} />
    </ListGroup>
  );
}
