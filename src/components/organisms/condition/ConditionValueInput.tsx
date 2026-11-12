import { createContext, useContext, useId, type ReactNode } from 'react';
import { Text } from '@/components/atoms/shared/Text';
import { Segmented } from '@/components/molecules/shared/Segmented';
import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { ConditionKey, ConditionValue } from './condition';

type ConditionValueInputContextValue = {
  keyDef: ConditionKey;
  value: ConditionValue;
  onChange?: (value: ConditionValue) => void;
};
const ConditionValueInputContext =
  createContext<ConditionValueInputContextValue | null>(null);

function useConditionValueInput(part: string) {
  const ctx = useContext(ConditionValueInputContext);
  if (!ctx)
    throw new Error(
      `ConditionValueInput.${part}는 <ConditionValueInput> 안에서 쓴다`,
    );
  return ctx;
}

/** 입력 글자에서 숫자만 남긴다. 비면 `undefined`(한쪽 비우기) */
function toNumber(text: string): number | undefined {
  const digits = text.replace(/\D/g, '').slice(0, 9);
  return digits ? Number(digits) : undefined;
}

function RangeBox({
  label,
  value,
  invalid,
  errorId,
  onChange,
}: {
  errorId: string;
  label: string;
  value?: number;
  invalid: boolean;
  onChange: (value?: number) => void;
}) {
  const id = useId();
  return (
    <Field
      data-invalid={invalid || undefined}
      className="rounded-md border border-border focus-within:ring-2 focus-within:ring-ring"
    >
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? errorId : undefined}
        value={value ?? ''}
        onChange={(e) => onChange(toNumber(e.target.value))}
      />
    </Field>
  );
}

/**
 * 범위 입력(시안 ㉙-l2): `부터` · `까지` 칸 둘과 `~`, 키의 단위(`세`). 한쪽은 비워 둘 수 있다.
 * 부터가 까지보다 크면 두 칸이 잘못된 입력으로 표시되고 한 줄 안내가 뜬다(시안에 없는 추천안)
 */
function Range({ className }: { className?: string }) {
  const { keyDef, value, onChange } = useConditionValueInput('Range');
  const errorId = useId();
  if (value.kind !== 'range') return null;
  const invalid =
    value.from != null && value.to != null && value.from > value.to;
  return (
    <FieldSet
      className={cn(
        'grid grid-cols-[1fr_auto_1fr_auto] items-center gap-2.5',
        className,
      )}
    >
      <FieldLegend className="sr-only">
        {keyDef.label}
        {keyDef.unit ? ` (${keyDef.unit})` : ''} 범위
      </FieldLegend>
      <RangeBox
        label="부터"
        value={value.from}
        invalid={invalid}
        errorId={errorId}
        onChange={(from) => onChange?.({ ...value, from })}
      />
      <Text as="span" variant="rowTitle" aria-hidden>
        ~
      </Text>
      <RangeBox
        label="까지"
        value={value.to}
        invalid={invalid}
        errorId={errorId}
        onChange={(to) => onChange?.({ ...value, to })}
      />
      <Text as="span" variant="rowTitle">
        {keyDef.unit}
      </Text>
      {invalid && (
        <FieldError id={errorId} className="col-span-4">
          부터는 까지보다 클 수 없어요
        </FieldError>
      )}
    </FieldSet>
  );
}

/** 예/아니오 입력(시안 ㉙-l3): 분할 전환 `예 | 아니오`(기존 `Segmented`) */
function Bool({ className }: { className?: string }) {
  const { keyDef, value, onChange } = useConditionValueInput('Bool');
  if (value.kind !== 'bool') return null;
  return (
    <Segmented
      items={['yes', 'no'] as const}
      labels={{ yes: '예', no: '아니오' }}
      value={value.value ? 'yes' : 'no'}
      onChange={(v) => onChange?.({ kind: 'bool', value: v === 'yes' })}
      label={keyDef.label}
      className={className}
    />
  );
}

function ConditionValueInputRoot({
  keyDef,
  value,
  onChange,
  className,
  children,
}: {
  /** 값을 입력할 키: 이름 · 단위를 쓴다 */
  keyDef: ConditionKey;
  /** 값(제어형). `emptyConditionValue(keyDef)`로 시작한다 */
  value: ConditionValue;
  onChange?: (value: ConditionValue) => void;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <ConditionValueInputContext.Provider value={{ keyDef, value, onChange }}>
      <div className={className}>
        {children ?? (
          <>
            <Range />
            <Bool />
          </>
        )}
      </div>
    </ConditionValueInputContext.Provider>
  );
}

/**
 * 조건 값 입력(컴파운드, 시안 ㉙-l2 · l3): Range(범위) · Bool(예/아니오). 기본 조립은 값 종류(`value.kind`)에 맞는 것 하나만 그린다.
 * 하나 · 여러 개 고르기(`one` · `many`)는 시안에 입력 틀이 없어 아직 그리지 않는다.
 * 값은 쓰는 쪽이 갖는 제어형이다. 시트 머리 · `추가` 버튼은 쓰는 쪽이 조립하고, 값이 다 찼는지는 `isConditionValueComplete`로 본다.
 * `<ConditionValueInput keyDef={key} value={value} onChange={setValue} />`
 */
export const ConditionValueInput = Object.assign(ConditionValueInputRoot, {
  Range,
  Bool,
});
