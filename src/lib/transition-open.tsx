import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

/**
 * 시트 · 대화상자 열고 닫기를 React Transition으로 만든다(2026-11-17 사용자 결정: 전환은 플랫폼 기본 부품의 것).
 * `<ViewTransition>`은 Transition · Suspense · useDeferredValue 안의 변경에만 켜지고 평범한 setState에는 켜지지 않는다.
 * 그래서 받아 쓰는 쪽이 `open`을 평범한 state로 넘겨도 되게 값을 useDeferredValue로 한 번 거쳐 Radix에 넘긴다.
 * `open`을 안 주는 쓰는 법(Trigger로 여닫기)은 여기서 state를 쥐고 startTransition 안에서 바꾼다
 */
export function TransitionRoot({
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  const [inner, setInner] = React.useState(defaultOpen ?? false);
  const shown = React.useDeferredValue(open ?? inner);
  return (
    <OpenContext.Provider value={shown}>
      <DialogPrimitive.Root
        {...props}
        open={shown}
        onOpenChange={(next) => {
          React.startTransition(() => setInner(next));
          onOpenChange?.(next);
        }}
      />
    </OpenContext.Provider>
  );
}

const OpenContext = React.createContext(false);

/**
 * 덮개 · 내용을 Portal 바로 아래에 둘 때 감싸는 층. Radix Portal은 자식마다 ref를 붙여 Presence에 넘기는데
 * `<ViewTransition>`의 ref는 DOM 요소가 아니라 그 자리에서 터지므로, ref를 받지 않는 이 함수 컴포넌트를 사이에 둔다.
 * 시트 · 대화상자가 열 때와 닫을 때 브라우저 기본 전환(교차 페이드)을 한다(enter · exit만, 다른 전환에는 끼지 않는다)
 */
export function TransitionLayer({ children }: { children: React.ReactNode }) {
  return (
    <React.ViewTransition enter="auto" exit="auto" default="none">
      {children}
    </React.ViewTransition>
  );
}

/**
 * 시트 · 대화상자의 덮개와 내용을 Portal에 둔다. Radix의 Presence는 열릴 때 한 박자 뒤(레이아웃 효과)에 그려서
 * 그 그림이 Transition 안에 들지 못해 전환이 안 켜진다. 그래서 Portal · 덮개 · 내용에 `forceMount`를 주고
 * 여닫는 것은 여기서 직접 한다: 열린 동안만 그리고, 같은 커밋에 넣고 빼서 enter · exit 전환이 켜진다
 */
export function TransitionPortal({
  overlay,
  content,
}: {
  overlay: React.ReactElement;
  content: React.ReactElement;
}) {
  const open = React.useContext(OpenContext);
  return (
    <DialogPrimitive.Portal forceMount>
      {open ? <TransitionLayer>{overlay}</TransitionLayer> : null}
      {open ? <TransitionLayer>{content}</TransitionLayer> : null}
    </DialogPrimitive.Portal>
  );
}
