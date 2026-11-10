import { Text } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { ListRow } from '@/components/molecules/shared/ListGroup';
import { Badge } from '@/components/ui/badge';
import { FORM_KIND_LABEL, formatFormPass, type FormQuestion } from './form';

/**
 * 질문 행(시안 ㉙-i `.qrow`): 번호 원 · 질문 글(여러 줄) · 종류 + 태그(`필수` · `조건 · 예만 참여`) · 꺾쇠. 누르면 고치기(`onEdit`).
 * `ListGroup` 안에서 쓴다. 지우기는 행에 두지 않고 고치기 시트의 CTA 줄(왼쪽 정사각 휴지통)에 둔다.
 * 읽기 이름은 `1번 질문, 글, 종류, 필수, 조건 …`이고 번호 원은 화면 읽기에서 숨긴다.
 * `warning`은 민감한 개인정보 경고가 붙은 질문의 표시(빨강 + 아이콘 + 글자, 시안에 없는 추천안)
 */
export function FormQuestionRow({
  number,
  question,
  warning,
  onEdit,
  className,
}: {
  /** 1부터 세는 번호 */
  number: number;
  question: FormQuestion;
  warning?: boolean;
  onEdit?: () => void;
  className?: string;
}) {
  const pass = formatFormPass(question);
  return (
    <ListRow
      title={question.text}
      onClick={onEdit}
      className={className}
      media={
        <Text
          as="span"
          variant="badge"
          tone="inherit"
          aria-hidden
          className="grid size-[22px] place-items-center rounded-full bg-accent text-mint-foreground"
        >
          {number}
        </Text>
      }
    >
      <ListRow.Media />
      <ListRow.Body className="gap-0.5 py-0.5">
        <Text as="span" variant="bodyLarge" className="block">
          <span className="sr-only">{number}번 질문, </span>
          {question.text}
        </Text>
        <span className="flex flex-wrap items-center gap-1.5">
          <Text as="span" variant="caption" tone="muted">
            <span className="sr-only">, </span>
            {FORM_KIND_LABEL[question.kind]}
          </Text>
          {question.required && (
            <Badge variant="muted" size="sm">
              <span className="sr-only">, </span>필수
            </Badge>
          )}
          {pass && (
            <Badge variant="mint" size="sm" icon="check" className="max-w-full">
              <span className="sr-only">, </span>
              <span className="truncate">조건 · {pass}</span>
            </Badge>
          )}
          {warning && (
            <Badge
              variant="destructive"
              size="sm"
              icon="info"
              className="max-w-full"
            >
              <span className="sr-only">, </span>
              <span className="truncate">민감 정보 확인</span>
            </Badge>
          )}
        </span>
      </ListRow.Body>
      <ListRow.Trailing>
        <Icon name="chevronRight" className="size-4" />
      </ListRow.Trailing>
    </ListRow>
  );
}
