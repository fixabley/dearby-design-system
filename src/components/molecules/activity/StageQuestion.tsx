import {
  createContext,
  useContext,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { Text } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type StageQuestionContextValue = {
  variant: 'row' | 'card';
  question: string;
  label?: string;
  canFail: boolean;
  passLabel: string;
  failLabel: string;
  laterLabel: string;
  onPass?: () => void;
  onFail?: () => void;
  onLater?: () => void;
};
const StageQuestionContext = createContext<StageQuestionContextValue | null>(
  null,
);

function useStageQuestion(part: string) {
  const ctx = useContext(StageQuestionContext);
  if (!ctx)
    throw new Error(`StageQuestion.${part}는 <StageQuestion> 안에서 쓴다`);
  return ctx;
}

/** 카드 맨 위 라벨: 깃발 14 + `D-DAY · 서류 발표`. 행 질문에는 없다 */
function Label({ className }: { className?: string }) {
  const { label } = useStageQuestion('Label');
  if (!label) return null;
  return (
    <Text
      as="p"
      variant="badge"
      weight="semibold"
      tone="accent"
      className={cn(
        'mb-1.5 flex items-center gap-1.5 [&_svg]:size-3.5',
        className,
      )}
    >
      <Icon name="flag" />
      {label}
    </Text>
  );
}

/** 질문 글: 행은 15/600, 카드는 17/600 */
function Question({ className }: { className?: string }) {
  const { variant, question } = useStageQuestion('Question');
  return (
    <Text
      as="p"
      variant={variant === 'row' ? 'innerTitle' : 'subtitle'}
      className={cn(variant === 'row' ? 'mb-2' : 'mb-3', className)}
    >
      {question}
    </Text>
  );
}

/** 버튼 줄: 통과(청록 채움) · 탈락(흰 면 윤곽) · 아직 몰라요(글자). 탈락은 `canFail={false}`면 뺀다 */
function Actions({ className }: { className?: string }) {
  const { canFail, passLabel, failLabel, laterLabel, onPass, onFail, onLater } =
    useStageQuestion('Actions');
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button size="sm" className="h-[34px]" onClick={onPass}>
        {passLabel}
      </Button>
      {canFail && (
        <Button
          size="sm"
          variant="outline"
          className="h-[34px]"
          onClick={onFail}
        >
          {failLabel}
        </Button>
      )}
      <Button
        size="sm"
        variant="plain"
        className="h-[34px] px-1.5 text-foreground/70"
        onClick={onLater}
      >
        {laterLabel}
      </Button>
    </div>
  );
}

function StageQuestionRoot({
  variant = 'row',
  question,
  label,
  canFail = true,
  passLabel = '통과',
  failLabel = '탈락',
  laterLabel = '아직 몰라요',
  onPass,
  onFail,
  onLater,
  className,
  children,
  ...props
}: Omit<ComponentProps<'section'>, 'children'> & {
  /** `row`: 활동 행 아래 한 줄(민트 면) · `card`: 활동 상세의 질문 카드(면 없음) */
  variant?: 'row' | 'card';
  /** 묻는 글. 예: `서류 발표 결과를 남겨 주세요` */
  question: string;
  /** 카드 위 라벨. 예: `D-DAY · 서류 발표`. 카드에만 그린다 */
  label?: string;
  /** false면 탈락 버튼을 뺀다: 다음 단계가 시작되며 앞 단계를 묻는 꼴(`통과로 표시` · `아직 몰라요`) */
  canFail?: boolean;
  passLabel?: string;
  failLabel?: string;
  laterLabel?: string;
  onPass?: () => void;
  onFail?: () => void;
  onLater?: () => void;
  children?: ReactNode;
}) {
  return (
    <StageQuestionContext.Provider
      value={{
        variant,
        question,
        label: variant === 'card' ? label : undefined,
        canFail,
        passLabel,
        failLabel,
        laterLabel,
        onPass,
        onFail,
        onLater,
      }}
    >
      <section
        aria-label={question}
        data-variant={variant}
        className={cn(
          // 행: 활동 행 왼쪽 열(64) + 간격(12)만큼 들여 글 열에 맞추고 앞 행에 6 붙인다
          variant === 'row' &&
            '-mt-1.5 mb-3.5 ml-19 rounded-[14px] bg-accent px-3 py-2.5',
          className,
        )}
        {...props}
      >
        {children ?? (
          <>
            <Label />
            <Question />
            <Actions />
          </>
        )}
      </section>
    </StageQuestionContext.Provider>
  );
}

/**
 * 선발 결과 질문(컴파운드): Label(깃발 + 라벨, 카드만) · Question · Actions(통과 · 탈락 · 아직 몰라요).
 * `row`는 활동 행 바로 아래(ActivityRow의 형제로 놓는다, 왼쪽 76 들임), `card`는 활동 상세 머리 아래 일정 카드 위.
 * 버튼 셋은 고정이다: 통과는 그 단계의 PASSED 종류, 탈락은 FAILED 종류, 아직 몰라요는 기록 없이 둔다.
 * 어드민이 더한 OTHER 상태는 여기서 고르지 않는다. 답한 뒤 질문을 지우고 트랙을 바꾸는 것은 쓰는 쪽 몫이다.
 * 기본 조립은 `<StageQuestion question="…" onPass={…} onFail={…} onLater={…} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<StageQuestion variant="card" question="…"><StageQuestion.Question /><StageQuestion.Actions /></StageQuestion>`
 */
export const StageQuestion = Object.assign(StageQuestionRoot, {
  Label,
  Question,
  Actions,
});
