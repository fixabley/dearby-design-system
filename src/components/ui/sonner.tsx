import { Toaster as Sonner, toast, type ToasterProps } from 'sonner';

// shadcn Sonner + Dearby 토스트(시안 ㉖-d2): 아래 가운데 검정 85% 캡슐, 흰 13/600 글자, 행동은 밝은 청록 굵은 글자.
// 시안은 두 모드를 같게 정했지만 다크에서는 캡슐이 바탕에 묻혀 다크만 밝은 회색 캡슐로 한다(2026-11-09 사용자 결정, 값과 대비는 styles.css --toast).
// sonner 기본 겉모양(styled)은 끄고(unstyled) 토큰(toast · toast-action · primary-foreground)으로 다시 입힌다. 쌓임·밀어 닫기는 sonner 그대로.
// 캡슐은 글자 폭만큼(최대 330). 600px 이하에서 sonner가 토스트를 꽉 채우는 규칙(폭·right)만 !로 덮어 가운데에 둔다
function Toaster({ toastOptions, ...props }: ToasterProps) {
  return (
    <Sonner
      position="bottom-center"
      toastOptions={{
        unstyled: true,
        ...toastOptions,
        classNames: {
          toast: [
            'flex w-fit! max-w-[min(330px,calc(100vw-32px))] items-center gap-3 rounded-full bg-toast px-4.5 py-2.75 font-sans text-primary-foreground shadow-control',
            'data-[x-position=center]:inset-x-0 data-[x-position=center]:mx-auto data-[x-position=right]:ml-auto max-[601px]:right-[calc(var(--mobile-offset-left)*2)]!',
          ].join(' '),
          content: 'flex min-w-0 flex-col gap-0.5',
          title: 'text-caption font-semibold',
          description: 'text-caption text-primary-foreground/70',
          icon: 'relative flex size-5 shrink-0 items-center justify-center text-toast-action [&_svg]:size-5',
          actionButton:
            'ml-auto shrink-0 rounded-sm text-caption font-bold text-toast-action outline-none focus-visible:ring-2 focus-visible:ring-toast-action',
          cancelButton:
            'shrink-0 rounded-sm text-caption font-semibold text-primary-foreground/70 outline-none focus-visible:ring-2 focus-visible:ring-toast-action',
          error: '[&_[data-icon]]:text-destructive',
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  );
}

export { Toaster, toast };
