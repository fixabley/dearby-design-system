import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Text } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover';
import { parseTime } from '@/lib/date';
import { cn } from '@/lib/utils';

/** 목록은 30분 단위 */
const STEP = 30;
const SLOTS = Array.from({ length: (24 * 60) / STEP }, (_, i) => `${String(Math.floor((i * STEP) / 60)).padStart(2, '0')}:${String((i * STEP) % 60).padStart(2, '0')}`);
const nearest = (t: string) => { const [h, m] = t.split(':').map(Number); return Math.min(SLOTS.length - 1, Math.round((h * 60 + m) / STEP)); };
/** 입력 중에 목록이 따라갈 글자: 시만('21'), 네 자리('2130'), 쌍점('21:30'). 세 자리('213')는 2:13인지 21:3인지 몰라 기다린다 */
const settled = (t: string) => /^(\d{1,2}|\d{4}|\d{1,2}:\d{2})$/.test(t);

/**
 * 24시간 'HH:mm'을 직접 입력하는 칸(shadcn InputGroup) + 30분 단위 목록 말풍선(Popover). 브라우저 시간 입력(type=time)은 쓰지 않는다.
 * 칸을 누르거나 ↓ · ↑로 목록을 열면 지금 값 근처가 가운데 보인다. ↓ · ↑는 칸 글자를 목록 값으로 바꾸고, Enter나 칸 밖으로 나가면 확정, Esc는 되돌린다.
 * 직접 입력은 '9' → 09:00, '930' → 09:30, '2130' → 21:30처럼 맞추고, 맞지 않으면 앞 값으로 되돌린다. label은 화면 읽기용 칸 이름(보이지 않음).
 */
export function TimePicker({ value = '', onChange, placeholder = '선택', label = '시간', open, onOpenChange, id, className }: {
  value?: string; onChange?: (time: string) => void; placeholder?: string; label?: string; open?: boolean; onOpenChange?: (open: boolean) => void; id?: string; className?: string;
}) {
  const listId = useId();
  const [text, setText] = useState(value);
  const [innerOpen, setInnerOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [committed, setCommitted] = useState(value);
  const anchorRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const isOpen = open ?? innerOpen;
  const setOpen = (o: boolean) => { if (o !== isOpen) { setInnerOpen(o); onOpenChange?.(o); } };

  useEffect(() => { setCommitted(value); setText(value); }, [value]);

  /** 목록 칸 i가 보이게. center면 가운데로 */
  const reveal = (i: number, center = false) => {
    const list = listRef.current;
    const el = list?.children[i] as HTMLElement | undefined;
    if (!list || !el) return;
    if (center) list.scrollTop = el.offsetTop - (list.clientHeight - el.offsetHeight) / 2;
    else if (el.offsetTop < list.scrollTop) list.scrollTop = el.offsetTop;
    else if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight;
  };
  const point = (i: number, center = false) => { setActive(i); reveal(i, center); };

  const commit = (t: string) => {
    const p = parseTime(t);
    if (!p) return setText(committed);
    setText(p);
    if (p !== committed) { setCommitted(p); onChange?.(p); }
  };
  const choose = (t: string) => { commit(t); setOpen(false); };
  const move = (d: 1 | -1) => {
    const i = active < 0 ? (d > 0 ? 0 : SLOTS.length - 1) : Math.min(SLOTS.length - 1, Math.max(0, active + d));
    point(i);
    setText(SLOTS[i]);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (isOpen) move(e.key === 'ArrowDown' ? 1 : -1);
      else setOpen(true);
    } else if (e.key === 'Enter') {
      if (isOpen) e.preventDefault();
      choose(text);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <InputGroup ref={anchorRef} className={cn('w-20 bg-background px-3 shadow-control', className)}>
          <InputGroupInput id={id} value={text} placeholder={placeholder} inputMode="numeric" autoComplete="off" maxLength={5}
            role="combobox" aria-label={label} aria-expanded={isOpen} aria-controls={isOpen ? listId : undefined}
            aria-activedescendant={isOpen && active >= 0 ? `${listId}-${active}` : undefined}
            className="text-center tabular-nums"
            onChange={(e) => {
              const t = e.target.value.replace(/[^\d:]/g, '');
              const p = parseTime(t);
              setText(t);
              if (isOpen && p && settled(t)) point(nearest(p), true);
            }}
            onClick={() => setOpen(true)} onKeyDown={onKeyDown} onBlur={() => choose(text)} />
        </InputGroup>
      </PopoverAnchor>
      {/* 초점은 늘 칸에 둔다(목록 칸은 aria-activedescendant로 가리키고, 목록을 눌러도 초점이 칸을 떠나지 않는다). 목록이 붙은 뒤(onOpenAutoFocus)
          지금 값 근처를 가운데로. 칸을 눌러도 닫혔다 다시 열리지 않게 칸은 바깥으로 치지 않는다 */}
      <PopoverContent align="start" className="w-auto p-1"
        onOpenAutoFocus={(e) => { e.preventDefault(); const t = parseTime(text) ?? (committed || null); if (t) point(nearest(t), true); else setActive(-1); }}
        onCloseAutoFocus={(e) => e.preventDefault()} onEscapeKeyDown={() => setText(committed)}
        onInteractOutside={(e) => { if (anchorRef.current?.contains(e.target as Node)) e.preventDefault(); }}>
        <div ref={listRef} id={listId} role="listbox" aria-label={label} className="relative max-h-60 w-28 overflow-y-auto" onMouseDown={(e) => e.preventDefault()}>
          {SLOTS.map((t, i) => (
            <div key={t} id={`${listId}-${i}`} role="option" aria-selected={i === active} data-active={i === active || undefined}
              className="flex min-h-11 cursor-default select-none items-center justify-between rounded-[10px] px-3 hover:bg-muted data-[active]:bg-muted"
              onClick={() => choose(t)}>
              <Text as="span" variant="body" tabular weight={t === committed ? 'semibold' : 'regular'} tone={t === committed ? 'accent' : 'inherit'}>{t}</Text>
              {t === committed && <Icon name="check" size={16} className="text-accent-foreground" />}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
