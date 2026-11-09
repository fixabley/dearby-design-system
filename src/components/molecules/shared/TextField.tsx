import { useId } from 'react';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input, Textarea } from '@/components/ui/input';

/** 입력 칸(shadcn Field + Label + Input/Textarea). FieldGroup 안에 넣으면 iOS 묶음 모양. 비어 있으면 `선택` */
export function TextField({
  label,
  value,
  placeholder = '선택',
  multiline,
  onChange,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  multiline?: boolean;
  onChange?: (v: string) => void;
}) {
  const id = useId();
  const p = {
    id,
    defaultValue: value,
    placeholder,
    onChange: (e: { target: { value: string } }) => onChange?.(e.target.value),
  };
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {multiline ? <Textarea {...p} /> : <Input {...p} />}
    </Field>
  );
}
