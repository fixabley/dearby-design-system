import type { ReactNode } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from '@/components/ui/item';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

// 통과 답(편집)과 고르기 답(입력)이 함께 쓰는 내부 부품이라 내보내지 않는다.
// 라디오 · 체크박스 줄은 ServerPicker처럼 label 안에 두어 줄 어디를 눌러도 고른다

// ItemGroup의 묶음 모양(채움 면 · 둥근 모서리 · 줄 사이 선)을 RadioGroup · group에 입힌 것: RadioGroup 루트가 role=radiogroup이라 ItemGroup(role=list)을 겹칠 수 없다
const GROUP =
  'overflow-hidden rounded-md bg-muted [&>*+*]:border-t [&>*+*]:border-border';

/** 라디오 묶음: 이름은 `labelledBy`(보이는 글자의 id) 또는 `label` */
export function RadioChoices({
  value,
  onChange,
  labelledBy,
  label,
  className,
  children,
}: {
  value: string | null;
  onChange?: (value: string) => void;
  labelledBy?: string;
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <RadioGroup
      value={value ?? ''}
      onValueChange={onChange}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={cn(GROUP, className)}
    >
      {children}
    </RadioGroup>
  );
}

/** 라디오 줄(listitem 역할을 지운 label) */
export function RadioChoice({
  value,
  children,
  media,
  meta,
}: {
  value: string;
  children: ReactNode;
  media?: ReactNode;
  /** 제목 아래 줄(태그들) */
  meta?: ReactNode;
}) {
  return (
    <Item asChild role="none" className="pressable">
      <label>
        {media}
        <ItemContent>
          <ItemTitle>{children}</ItemTitle>
          {meta}
        </ItemContent>
        <ItemActions>
          <RadioGroupItem value={value} />
        </ItemActions>
      </label>
    </Item>
  );
}

/** 체크박스 묶음: 이름은 보이는 글자의 id */
export function CheckChoices({
  labelledBy,
  className,
  children,
}: {
  labelledBy: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      role="group"
      aria-labelledby={labelledBy}
      className={cn(GROUP, className)}
    >
      {children}
    </div>
  );
}

/** 체크박스 줄(listitem 역할을 지운 label) */
export function CheckChoice({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Item asChild role="none" className="pressable">
      <label>
        <ItemContent>
          <ItemTitle>{children}</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Checkbox
            checked={checked}
            onCheckedChange={(c) => onChange?.(c === true)}
          />
        </ItemActions>
      </label>
    </Item>
  );
}
