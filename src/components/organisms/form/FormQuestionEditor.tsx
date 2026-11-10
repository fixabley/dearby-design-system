import {
  createContext,
  useContext,
  useId,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { Text } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { ListGroup, ListRow } from '@/components/molecules/shared/ListGroup';
import { PickerRow } from '@/components/organisms/shared/PickerRow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { InputGroup } from '@/components/ui/input-group';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { RadioChoice, RadioChoices } from './ChoiceRows';
import {
  BOOL_PASS_LABEL,
  FORM_KINDS,
  FORM_KIND_LABEL,
  canUseAsCondition,
  changeFormKind,
  setFormCondition,
  type FormQuestion,
  type FormQuestionKind,
} from './form';

type FormQuestionEditorContextValue = {
  value: FormQuestion;
  onChange?: (value: FormQuestion) => void;
  warning: boolean;
  warningId: string;
  passTitleId: string;
};
const FormQuestionEditorContext =
  createContext<FormQuestionEditorContextValue | null>(null);

function useFormQuestionEditor(part: string) {
  const ctx = useContext(FormQuestionEditorContext);
  if (!ctx)
    throw new Error(
      `FormQuestionEditor.${part}는 <FormQuestionEditor> 안에서 쓴다`,
    );
  return ctx;
}

/** 질문 입력 칸(시안 `.hin`, 채움 면). 경고가 있으면 잘못된 입력으로 표시하고 경고 글에 이어 읽힌다 */
function QuestionText({ className }: { className?: string }) {
  const { value, onChange, warning, warningId } = useFormQuestionEditor('Text');
  return (
    <InputGroup className={className}>
      <Input
        aria-label="질문"
        placeholder="질문을 입력하세요"
        autoComplete="off"
        aria-invalid={warning || undefined}
        aria-describedby={warning ? warningId : undefined}
        value={value.text}
        onChange={(e) => onChange?.({ ...value, text: e.target.value })}
      />
    </InputGroup>
  );
}

/**
 * 민감 정보 경고(시안 ㉙-i3 `.nwarn`): 기존 `Alert destructive`. 빨강 아이콘 + 제목 + 보조 글이라 색만으로 전하지 않는다.
 * 경고가 없으면 그리지 않는다. 문구를 검사하는 일은 쓰는 쪽 몫이고 `warning`으로만 알린다
 */
function Warning({
  title = '민감한 개인정보는 물을 수 없어요',
  detail = '주민등록번호·계좌·카드·건강·종교·정치 성향',
  className,
}: {
  title?: string;
  detail?: string;
  className?: string;
}) {
  const { warning, warningId } = useFormQuestionEditor('Warning');
  if (!warning) return null;
  return (
    <Alert variant="destructive" id={warningId} className={className}>
      <Icon name="info" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{detail}</AlertDescription>
    </Alert>
  );
}

/** 종류 행(시안 `종류` 행 + 메뉴): 일곱 종류를 고른다. 링크 앞에 구분선(시안 ㉙-i4) */
function Kind({ className }: { className?: string }) {
  const { value, onChange } = useFormQuestionEditor('Kind');
  return (
    <PickerRow
      icon="table"
      title="종류"
      value={value.kind}
      className={className}
      onValueChange={(kind) =>
        onChange?.(changeFormKind(value, kind as FormQuestionKind))
      }
      options={FORM_KINDS.map((k) => ({
        value: k,
        label: FORM_KIND_LABEL[k],
        separatorBefore: k === 'link',
      }))}
    />
  );
}

/** 필수 행: 스위치 */
function Required({ className }: { className?: string }) {
  const { value, onChange } = useFormQuestionEditor('Required');
  return (
    <ListRow
      title="필수"
      className={className}
      trailing={
        <Switch
          aria-label="필수"
          checked={value.required}
          onCheckedChange={(required) => onChange?.({ ...value, required })}
        />
      }
    />
  );
}

/**
 * 조건으로 쓰기 행: 스위치. 통과 답이 하나인 예/아니오와 하나 고르기(선택지가 있을 때)만 켤 수 있고 나머지 종류는 꺼진 채 비활성이다
 * (시안 ㉙-i3는 짧은 답에도 행을 보인다)
 */
function Condition({ className }: { className?: string }) {
  const { value, onChange } = useFormQuestionEditor('Condition');
  return (
    <ListRow
      title="조건으로 쓰기"
      className={className}
      trailing={
        <Switch
          aria-label="조건으로 쓰기"
          disabled={!canUseAsCondition(value)}
          checked={value.passAnswer !== undefined}
          onCheckedChange={(on) => onChange?.(setFormCondition(value, on))}
        />
      }
    />
  );
}

/** 설정 묶음(종류 · 필수 · 조건으로 쓰기). 바꿔 조립하면 안의 행을 직접 놓는다 */
function Settings({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <ListGroup className={className}>
      {children ?? (
        <>
          <Kind />
          <Required />
          <Condition />
        </>
      )}
    </ListGroup>
  );
}

/**
 * 통과 답(시안 ㉙-i2): 머리 `통과 답` + 라디오 줄(예/아니오 또는 선택지) + 안내 글(자기 신고라 인증이 아니다).
 * `조건으로 쓰기`가 꺼져 있으면 그리지 않는다
 */
function PassAnswer({ className }: { className?: string }) {
  const { value, onChange, passTitleId } = useFormQuestionEditor('PassAnswer');
  if (value.passAnswer === undefined) return null;
  const choices: [string, string][] =
    value.kind === 'bool'
      ? [
          ['yes', BOOL_PASS_LABEL.yes],
          ['no', BOOL_PASS_LABEL.no],
        ]
      : (value.options ?? []).map((o) => [o, o]);
  return (
    <section className={className}>
      <Text
        as="h4"
        id={passTitleId}
        variant="caption"
        tone="muted"
        className="mb-1.5 mt-5 px-4"
      >
        통과 답
      </Text>
      <RadioChoices
        value={value.passAnswer}
        labelledBy={passTitleId}
        onChange={(passAnswer) => onChange?.({ ...value, passAnswer })}
      >
        {choices.map(([v, label]) => (
          <RadioChoice key={v} value={v}>
            {label}
          </RadioChoice>
        ))}
      </RadioChoices>
      <Text as="p" variant="caption" tone="muted" className="mx-1 mt-2">
        자기 신고라 인증되지 않아요. 통과 답을 고른 사람만 참여할 수 있어요
      </Text>
    </section>
  );
}

function FormQuestionEditorRoot({
  value,
  onChange,
  warning = false,
  className,
  children,
  ...props
}: Omit<ComponentProps<'div'>, 'onChange' | 'children'> & {
  /** 질문(제어형) */
  value: FormQuestion;
  onChange?: (value: FormQuestion) => void;
  /** 민감 정보 경고가 있는지: 쓰는 쪽이 문구를 검사해 알린다. 경고가 있으면 완료를 막는 것도 쓰는 쪽 몫 */
  warning?: boolean;
  children?: ReactNode;
}) {
  const warningId = useId();
  const passTitleId = useId();
  return (
    <FormQuestionEditorContext.Provider
      value={{ value, onChange, warning, warningId, passTitleId }}
    >
      <div className={cn('flex flex-col gap-3', className)} {...props}>
        {children ?? (
          <>
            <QuestionText />
            <Warning />
            <Settings />
            <PassAnswer className="-mt-3" />
          </>
        )}
      </div>
    </FormQuestionEditorContext.Provider>
  );
}

/**
 * 참여 폼 질문 편집(컴파운드, 시안 ㉙-i2 · i3 · i4): Text(질문 입력) · Warning(민감 정보 경고) · Settings(Kind · Required · Condition) · PassAnswer(통과 답).
 * 시트 머리 · 완료 버튼 · 왼쪽 휴지통은 쓰는 쪽이 조립하고(완료는 `isFormQuestionComplete` 그리고 경고 없음일 때), 값은 제어형이다.
 * 선택지(`options`)를 고치는 칸은 시안에 없어 만들지 않았다(통과 답 줄이 `options`를 읽기만 한다).
 * 기본 조립은 `<FormQuestionEditor value={q} onChange={setQ} warning={w} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<FormQuestionEditor value={q}><FormQuestionEditor.Text /><FormQuestionEditor.Settings /></FormQuestionEditor>`
 */
export const FormQuestionEditor = Object.assign(FormQuestionEditorRoot, {
  Text: QuestionText,
  Warning,
  Settings,
  Kind,
  Required,
  Condition,
  PassAnswer,
});
