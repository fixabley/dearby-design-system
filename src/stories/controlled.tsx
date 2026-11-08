import type { ComponentType } from 'react';
import { useArgs } from 'storybook/preview-api';

/**
 * 제어 컴포넌트를 Controls 패널과 맞물리게 한다.
 * 캔버스에서 바꾸면(eventKey 호출) 그 값이 args[valueKey]로 돌아가 패널에도 보이고, 패널에서 바꾸면 그대로 그려진다.
 */
export function controlled<P extends object>(Comp: ComponentType<P>, valueKey: string, eventKey: string, pick: (...a: unknown[]) => unknown = (v) => v) {
  return function Render(args: Record<string, unknown>) {
    const [, update] = useArgs();
    const handler = (...a: unknown[]) => {
      (args[eventKey] as ((...x: unknown[]) => void) | undefined)?.(...a);
      update({ [valueKey]: pick(...a) });
    };
    return <Comp {...(args as P)} {...{ [eventKey]: handler }} />;
  };
}
