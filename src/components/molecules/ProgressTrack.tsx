import { createContext, useContext, type ReactNode } from 'react';
import type { Step } from '@/types';
import { Text } from '@/components/atoms/Text';
import { cn } from '@/lib/utils';

const SEG = { past: 'bg-primary', cur: 'bg-background ring-[1.5px] ring-inset ring-primary', up: 'bg-muted' };

type ProgressTrackContextValue = { steps: Step[]; more?: number };
const ProgressTrackContext = createContext<ProgressTrackContextValue | null>(null);

function useProgressTrack(part: string) {
  const ctx = useContext(ProgressTrackContext);
  if (!ctx) throw new Error(`ProgressTrack.${part}는 <ProgressTrack> 안에서 쓴다`);
  return ctx;
}

/** 막대: 지난 단계 청록, 지금 단계 테두리, 앞 단계 채움 + 남은 단계 수 */
function Bar({ className }: { className?: string }) {
  const { steps, more } = useProgressTrack('Bar');
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {steps.map((s, i) => <i key={i} className={cn('h-1.5 flex-1 rounded-[3px] transition-colors duration-300', SEG[s.state])} />)}
      {more ? <Text as="em" variant="micro" weight="bold" tone="muted" className="not-italic">+{more}</Text> : null}
    </div>
  );
}

/** 단계 이름(지금 이름만 굵게) */
function Labels({ className }: { className?: string }) {
  const { steps, more } = useProgressTrack('Labels');
  return (
    <div className={cn('mt-1 flex gap-1', className)}>
      {steps.map((s, i) => <Text key={i} variant="micro" truncate weight={s.state === 'cur' ? 'bold' : undefined} tone={s.state === 'cur' ? 'default' : 'muted'} className="flex-1">{s.name}</Text>)}
      {more ? <em className="w-3.5 shrink-0" /> : null}
    </div>
  );
}

function ProgressTrackRoot({ steps, more, className, children }: { steps: Step[]; more?: number; className?: string; children?: ReactNode }) {
  return (
    <ProgressTrackContext.Provider value={{ steps, more }}>
      <div className={className}>{children ?? <><Bar /><Labels /></>}</div>
    </ProgressTrackContext.Provider>
  );
}

/**
 * 진행 단계 트랙(컴파운드): Bar(지난 단계 청록, 지금 단계 테두리, 앞 단계 채움) · Labels(지금 이름만 굵게).
 * 기본 조립은 `<ProgressTrack steps={steps} more={1} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<ProgressTrack steps={steps}><ProgressTrack.Bar /></ProgressTrack>`
 */
export const ProgressTrack = Object.assign(ProgressTrackRoot, { Bar, Labels });
