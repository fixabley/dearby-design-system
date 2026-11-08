import { useId } from 'react';
import { Input, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/** 묶음 목록 안의 입력 칸: 위 작은 라벨 + 플랫폼 기본 입력. 비어 있으면 `선택` */
export function Field({ label, value, placeholder = '선택', multiline, onChange }: { label: string; value?: string; placeholder?: string; multiline?: boolean; onChange?: (v: string) => void }) {
  const id = useId();
  const p = { id, defaultValue: value, placeholder, onChange: (e: { target: { value: string } }) => onChange?.(e.target.value) };
  return (
    <div className="px-4 py-2.5">
      <Label htmlFor={id}>{label}</Label>
      {multiline ? <Textarea {...p} /> : <Input {...p} />}
    </div>
  );
}
