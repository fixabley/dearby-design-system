import { ICONS } from '@/icons';

/** Controls 묶음 이름. 묶음 순서는 처음 나오는 행 기준이라, 내용(글자·아이콘)이 늘 맨 위에 온다 */
export const CAT = {
  content: '내용',
  look: '모양',
  state: '상태',
  event: '이벤트',
  data: '데이터',
} as const;
const cat = (category: string, description?: string) => ({
  table: { category },
  ...(description ? { description } : {}),
});

/** 아이콘 고르기 Controls. optional이면 맨 앞에 `없음`(icon 없음)을 둔다 */
export function iconArgType(
  optional = true,
  description = '글자 앞에 넣을 아이콘. 크기는 size를 따른다',
) {
  return {
    control: { type: 'select' as const, labels: { none: '없음' } },
    options: [...(optional ? ['none'] : []), ...Object.keys(ICONS)],
    mapping: { none: undefined },
    ...cat(CAT.content, description),
  };
}

export const content = (description?: string) => cat(CAT.content, description);
export const look = (description?: string) => cat(CAT.look, description);
export const state = (description?: string) => cat(CAT.state, description);
export const event = (description?: string) => cat(CAT.event, description);
