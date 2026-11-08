import { createContext, useContext, useState, type ReactNode } from 'react';
import { Segmented } from '@/components/atoms/Segmented';
import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { TextField } from '@/components/molecules/TextField';
import { ListGroup, ListRow } from '@/components/molecules/ListGroup';

type Result = 'pass' | 'retry';
type EvaluationFormContextValue = { repo: string; submitted: string; feedback?: string; onSend?: () => void; result: Result; setResult: (r: Result) => void };
const EvaluationFormContext = createContext<EvaluationFormContextValue | null>(null);

function useEvaluationForm(part: string) {
  const ctx = useContext(EvaluationFormContext);
  if (!ctx) throw new Error(`EvaluationForm.${part}는 <EvaluationForm> 안에서 쓴다`);
  return ctx;
}

/** 제출한 PR · 시각 */
function Submission({ className }: { className?: string }) {
  const { repo, submitted } = useEvaluationForm('Submission');
  return <ListGroup className={className}><ListRow icon="github" title={repo} subtitle={submitted} /></ListGroup>;
}

/** 통과 | 다시 해 보기 */
function Verdict({ className }: { className?: string }) {
  const { result, setResult } = useEvaluationForm('Verdict');
  return <Segmented items={['pass', 'retry'] as const} labels={{ pass: '통과', retry: '다시 해 보기' }} value={result} onChange={setResult} className={className} />;
}

/** 피드백 */
function Feedback({ className }: { className?: string }) {
  const { feedback } = useEvaluationForm('Feedback');
  return <FieldGroup className={className}><TextField label="피드백" value={feedback} multiline /></FieldGroup>;
}

/** 평가 보내기 + 볼 수 있는 사람 안내 */
function Submit({ className }: { className?: string }) {
  const { onSend } = useEvaluationForm('Submit');
  return <div className={className}><Button size="lg" block onClick={onSend}>평가 보내기</Button><Text as="p" variant="caption" tone="muted" className="mt-2 text-center">제출한 사람과 개설자만 볼 수 있어요</Text></div>;
}

function EvaluationFormRoot({ repo, submitted, feedback, onSend, children }: { repo: string; submitted: string; feedback?: string; onSend?: () => void; children?: ReactNode }) {
  const [result, setResult] = useState<Result>('pass');
  return (
    <EvaluationFormContext.Provider value={{ repo, submitted, feedback, onSend, result, setResult }}>
      <div className="flex flex-col gap-3.5">{children ?? <><Submission /><Verdict /><Feedback /><Submit /></>}</div>
    </EvaluationFormContext.Provider>
  );
}

/**
 * 과제 평가(컴파운드): Submission(제출 PR) · Verdict(통과 | 다시 해 보기) · Feedback(피드백) · Submit(평가 보내기).
 * 기본 조립은 `<EvaluationForm repo={…} submitted={…} onSend={…} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<EvaluationForm repo={…} submitted={…}><EvaluationForm.Verdict /><EvaluationForm.Submit /></EvaluationForm>`
 */
export const EvaluationForm = Object.assign(EvaluationFormRoot, { Submission, Verdict, Feedback, Submit });
