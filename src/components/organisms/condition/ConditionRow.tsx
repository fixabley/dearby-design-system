import { Text } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { ListRow } from '@/components/molecules/shared/ListGroup';
import {
  conditionTitle,
  formatConditionSummary,
  type ConditionNode,
} from './condition';

/**
 * 조건 행(시안 ㉙-c2 `.prow`): 청록 사람 원 아이콘 · 키 이름 · 오른쪽 요약(`19~34세` · `하나라도` · `예 · 제안 중`) · 꺾쇠.
 * 누르면 고치기로 들어간다(`onEdit`). 지우기는 행이 아니라 고치기 시트의 버튼이 맡는다(시트 결정: 왼쪽 정사각 휴지통). 묶음은 제목이 안의 키 이름들(`재학상태 · 취업상태`)이고 요약이 `모두` · `하나라도`다.
 * `ListGroup` 안에서 쓴다. 묶음 안의 행은 아이콘이 없다(`icon={null}`, 시안 ㉙-l4)
 */
export function ConditionRow({
  node,
  icon = 'profile',
  onEdit,
  className,
}: {
  node: ConditionNode;
  /** 앞 아이콘. `null`이면 없다 */
  icon?: 'profile' | null;
  onEdit?: () => void;
  className?: string;
}) {
  const title = conditionTitle(node);
  const summary = formatConditionSummary(node);
  return (
    <ListRow
      icon={icon ?? undefined}
      title={title}
      onClick={onEdit}
      className={className}
      trailing={
        <>
          {summary && (
            <Text
              as="span"
              variant="body"
              tone="muted"
              truncate
              className="max-w-48"
            >
              {summary}
            </Text>
          )}
          <Icon name="chevronRight" className="size-4" />
        </>
      }
    />
  );
}
