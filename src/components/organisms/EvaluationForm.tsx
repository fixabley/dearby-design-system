import { useState } from 'react';
import { Segmented } from '@/components/atoms/Segmented';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { TextField } from '@/components/molecules/TextField';
import { ListGroup, ListRow } from '@/components/molecules/ListGroup';

/** 과제 평가: 제출 PR · 통과/다시 해 보기 · 피드백 · 보내기 */
export function EvaluationForm({ repo, submitted, feedback, onSend }: { repo: string; submitted: string; feedback?: string; onSend?: () => void }) {
  const [v, setV] = useState<'pass' | 'retry'>('pass');
  return (
    <div className="flex flex-col gap-3.5">
      <ListGroup><ListRow icon="github" title={repo} subtitle={submitted} /></ListGroup>
      <Segmented items={['pass', 'retry'] as const} labels={{ pass: '통과', retry: '다시 해 보기' }} value={v} onChange={setV} />
      <FieldGroup><TextField label="피드백" value={feedback} multiline /></FieldGroup>
      <div><Button size="lg" block onClick={onSend}>평가 보내기</Button><p className="mt-2 text-center text-caption text-muted-foreground">제출한 사람과 개설자만 볼 수 있어요</p></div>
    </div>
  );
}
