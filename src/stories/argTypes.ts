import { ICONS } from '@/icons';

/** 아이콘 고르기 Controls. optional이면 맨 앞에 `없음`(icon 없음)을 둔다 */
export function iconArgType(optional = true) {
  return {
    control: { type: 'select' as const, labels: { none: '없음' } },
    options: [...(optional ? ['none'] : []), ...Object.keys(ICONS)],
    mapping: { none: undefined },
  };
}
