import { useId } from 'react';
import { Text } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import { ListRow } from '@/components/molecules/shared/ListGroup';
import { Badge } from '@/components/ui/badge';
import { ItemGroup } from '@/components/ui/item';
import { RadioChoice, RadioChoices } from './ChoiceRows';
import type { FormProject } from './form';

/**
 * 프로젝트 고르기(시안 ㉙-j5 시트 안쪽): 내 프로젝트 행(글자 원 · 이름 · 태그 `확인됨` · 플랫폼 · `출시` · 라디오)과 `새 프로젝트` 행.
 * 시트 머리 · `고르기` 버튼 · 새 프로젝트를 만드는 화면은 쓰는 쪽 몫이다(`onCreate`는 누른 것만 알린다).
 * 값(고른 id)은 제어형이다. `새 프로젝트`는 라디오 묶음 밖 자기 목록에 둔다(ServerPicker의 초대 줄과 같은 이유)
 */
export function FormProjectList({
  projects,
  value,
  onChange,
  onCreate,
  className,
}: {
  projects: FormProject[];
  value: string | null;
  onChange?: (id: string) => void;
  onCreate?: () => void;
  className?: string;
}) {
  const labelId = useId();
  return (
    <div className={className}>
      <span id={labelId} className="sr-only">
        프로젝트
      </span>
      {projects.length > 0 && (
        <RadioChoices value={value} onChange={onChange} labelledBy={labelId}>
          {projects.map((p) => (
            <RadioChoice
              key={p.id}
              value={p.id}
              media={
                <Text
                  as="span"
                  variant="innerTitle"
                  weight="bold"
                  tone="inverse"
                  aria-hidden
                  className="grid size-[34px] shrink-0 place-items-center rounded-[9px] bg-linear-[140deg] from-primary to-[#2fb3b4]"
                >
                  {p.name.slice(0, 1)}
                </Text>
              }
              meta={
                (p.verified || p.platforms?.length || p.released) && (
                  <span className="mt-1 flex flex-wrap items-center gap-1.5">
                    {p.verified && (
                      <Badge variant="mint" size="sm" icon="github">
                        <span className="sr-only">, </span>확인됨
                      </Badge>
                    )}
                    {p.platforms?.map((pl) => (
                      <Badge key={pl} variant="muted" size="sm">
                        <span className="sr-only">, </span>
                        {pl}
                      </Badge>
                    ))}
                    {p.released && (
                      <Badge variant="mint" size="sm">
                        <span className="sr-only">, </span>출시
                      </Badge>
                    )}
                  </span>
                )
              }
            >
              {p.name}
            </RadioChoice>
          ))}
        </RadioChoices>
      )}
      <ItemGroup className={projects.length ? 'mt-3' : undefined}>
        <ListRow
          add
          icon="addCircle"
          title="새 프로젝트"
          onClick={onCreate}
          trailing={<Icon name="chevronRight" className="size-4" />}
        />
      </ItemGroup>
    </div>
  );
}
