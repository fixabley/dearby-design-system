import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from 'react';
import { Text } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { ListGroup, ListRow } from '@/components/molecules/shared/ListGroup';
import { Segmented } from '@/components/molecules/shared/Segmented';
import { FieldError } from '@/components/ui/field';
import { Input, Textarea } from '@/components/ui/input';
import { InputGroup } from '@/components/ui/input-group';
import { cn } from '@/lib/utils';
import {
  CheckChoice,
  CheckChoices,
  RadioChoice,
  RadioChoices,
} from './ChoiceRows';
import {
  isHttpsUrl,
  type FormAnswerValue,
  type FormProject,
  type FormQuestion,
} from './form';

type FormAnswerInputContextValue = {
  question: FormQuestion;
  value: FormAnswerValue;
  onChange?: (value: FormAnswerValue) => void;
  projects: FormProject[];
  onPickProject?: () => void;
  labelId: string;
};
const FormAnswerInputContext =
  createContext<FormAnswerInputContextValue | null>(null);

function useFormAnswerInput(part: string) {
  const ctx = useContext(FormAnswerInputContext);
  if (!ctx)
    throw new Error(`FormAnswerInput.${part}는 <FormAnswerInput> 안에서 쓴다`);
  return ctx;
}

/** 질문 글(시안 `.fq b`) + 필수 표시. 필수는 색이 아니라 `필수` 글자로 전한다 */
function Label({ className }: { className?: string }) {
  const { question, labelId } = useFormAnswerInput('Label');
  return (
    <Text
      as="p"
      id={labelId}
      variant="rowTitle"
      className={cn('mx-1 mb-2.5', className)}
    >
      {question.text}
      {question.required && (
        <Text
          as="span"
          variant="micro"
          weight="semibold"
          tone="accent"
          className="ml-1"
        >
          <span className="sr-only">, </span>필수
        </Text>
      )}
    </Text>
  );
}

function ShortText() {
  const { question, value, onChange, labelId } = useFormAnswerInput('Answer');
  return (
    <InputGroup>
      <Input
        aria-labelledby={labelId}
        aria-required={question.required || undefined}
        autoComplete="off"
        value={(value as string) ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </InputGroup>
  );
}

function LongText() {
  const { question, value, onChange, labelId } = useFormAnswerInput('Answer');
  return (
    <InputGroup className="items-start py-2.5">
      <Textarea
        aria-labelledby={labelId}
        aria-required={question.required || undefined}
        className="min-h-[76px]"
        value={(value as string) ?? ''}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </InputGroup>
  );
}

/** 링크: https 주소만. 틀린 형식은 입력을 마친 뒤(포커스를 떠난 뒤) 알린다(타이핑 중에 알림이 울리지 않게) */
function LinkText() {
  const { question, value, onChange, labelId } = useFormAnswerInput('Answer');
  const errorId = useId();
  const [touched, setTouched] = useState(false);
  const text = (value as string) ?? '';
  const invalid = touched && text.trim() !== '' && !isHttpsUrl(text);
  return (
    <>
      <InputGroup>
        <Input
          type="url"
          inputMode="url"
          autoComplete="off"
          placeholder="https://"
          aria-labelledby={labelId}
          aria-required={question.required || undefined}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? errorId : undefined}
          value={text}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={() => setTouched(true)}
        />
      </InputGroup>
      {invalid && (
        <FieldError id={errorId} className="mx-1 mt-1.5">
          https로 시작하는 주소를 넣어 주세요
        </FieldError>
      )}
    </>
  );
}

function BoolChoice() {
  const { value, onChange, labelId } = useFormAnswerInput('Answer');
  return (
    <Segmented
      items={['yes', 'no'] as const}
      labels={{ yes: '예', no: '아니오' }}
      value={value === true ? 'yes' : value === false ? 'no' : null}
      onChange={(v) => onChange?.(v === 'yes')}
      labelledBy={labelId}
    />
  );
}

function OneChoice() {
  const { question, value, onChange, labelId } = useFormAnswerInput('Answer');
  return (
    <RadioChoices
      value={(value as string | null) ?? null}
      labelledBy={labelId}
      onChange={onChange}
    >
      {(question.options ?? []).map((o) => (
        <RadioChoice key={o} value={o}>
          {o}
        </RadioChoice>
      ))}
    </RadioChoices>
  );
}

function ManyChoice() {
  const { question, value, onChange, labelId } = useFormAnswerInput('Answer');
  const picked = (value as string[] | null) ?? [];
  return (
    <CheckChoices labelledBy={labelId}>
      {(question.options ?? []).map((o) => (
        <CheckChoice
          key={o}
          checked={picked.includes(o)}
          onChange={(on) =>
            onChange?.(on ? [...picked, o] : picked.filter((p) => p !== o))
          }
        >
          {o}
        </CheckChoice>
      ))}
    </CheckChoices>
  );
}

/** 프로젝트: 고른 프로젝트 이름(없으면 `프로젝트 고르기`)을 보이는 줄. 누르면 `onPickProject`로 고르기 시트를 연다 */
function ProjectChoice() {
  const { question, value, projects, onPickProject } =
    useFormAnswerInput('Answer');
  const picked = projects.find((p) => p.id === value);
  return (
    <ListGroup>
      <ListRow
        title={
          <>
            <span className="sr-only">{question.text}, </span>
            {picked ? picked.name : '프로젝트 고르기'}
          </>
        }
        onClick={onPickProject}
        trailing={<Icon name="chevronRight" className="size-4" />}
      />
    </ListGroup>
  );
}

/** 질문 종류에 맞는 입력 하나 */
function Answer({ className }: { className?: string }) {
  const { question } = useFormAnswerInput('Answer');
  const input = {
    short: <ShortText />,
    long: <LongText />,
    link: <LinkText />,
    bool: <BoolChoice />,
    one: <OneChoice />,
    many: <ManyChoice />,
    project: <ProjectChoice />,
  }[question.kind];
  return <div className={className}>{input}</div>;
}

function FormAnswerInputRoot({
  question,
  value,
  onChange,
  projects = [],
  onPickProject,
  className,
  children,
}: {
  question: FormQuestion;
  /** 답(제어형). `emptyFormAnswer(question)`로 시작한다 */
  value: FormAnswerValue;
  onChange?: (value: FormAnswerValue) => void;
  /** 프로젝트 질문에서 고른 id(`value`)를 이름으로 바꾸는 목록 */
  projects?: FormProject[];
  /** 프로젝트 질문의 줄을 눌렀을 때: 쓰는 쪽이 `FormProjectList` 시트를 연다 */
  onPickProject?: () => void;
  className?: string;
  children?: ReactNode;
}) {
  const labelId = useId();
  return (
    <FormAnswerInputContext.Provider
      value={{ question, value, onChange, projects, onPickProject, labelId }}
    >
      <div className={className}>
        {children ?? (
          <>
            <Label />
            <Answer />
          </>
        )}
      </div>
    </FormAnswerInputContext.Provider>
  );
}

/**
 * 참여 폼 답변 입력(컴파운드, 시안 ㉙-j · j5): Label(질문 글 + `필수`) · Answer(종류에 맞는 입력 하나).
 * 짧은 답 · 긴 답 · 링크는 채움 입력, 예/아니오는 분할 전환(처음엔 고른 칸이 없다), 하나 고르기는 라디오 줄, 여러 개 고르기는 체크박스 줄,
 * 프로젝트는 고른 이름을 보이는 줄이다. 값은 쓰는 쪽이 갖는 제어형이고 제출 가능한지는 `isFormAnswerComplete`로 본다.
 * 기본 조립은 `<FormAnswerInput question={q} value={v} onChange={setV} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<FormAnswerInput question={q} value={v}><FormAnswerInput.Label /><FormAnswerInput.Answer /></FormAnswerInput>`
 */
export const FormAnswerInput = Object.assign(FormAnswerInputRoot, {
  Label,
  Answer,
});
