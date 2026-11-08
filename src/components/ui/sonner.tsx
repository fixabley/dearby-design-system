import { Toaster as Sonner, toast, type ToasterProps } from 'sonner';

// shadcn Sonner + Dearby 토스트: 아래 가운데 카드 면 캡슐, 13/600 글자, 행동은 청록 글자.
// sonner 기본 겉모양(styled)은 끄고(unstyled) 토큰으로 다시 입힌다. 쌓임·밀어 닫기 움직임은 sonner 그대로.
// 넓은 화면은 글자 폭만큼 가운데, 600px 이하는 sonner 규칙대로 좌우 16을 남기고 꽉 찬다
function Toaster({ toastOptions, ...props }: ToasterProps) {
  return (
    <Sonner
      position="bottom-center"
      toastOptions={{
        unstyled: true,
        ...toastOptions,
        classNames: {
          toast: 'flex w-fit max-w-full items-center gap-3 rounded-xl bg-popover px-4 py-3 font-sans text-popover-foreground shadow-control min-[601px]:data-[x-position=center]:inset-x-0 min-[601px]:data-[x-position=center]:mx-auto',
          content: 'flex min-w-0 flex-col gap-0.5',
          title: 'text-caption font-semibold',
          description: 'text-caption text-muted-foreground',
          icon: 'relative flex size-5 shrink-0 items-center justify-center text-accent-foreground [&_svg]:size-5',
          actionButton: 'ml-auto shrink-0 rounded-sm text-caption font-semibold text-accent-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring',
          cancelButton: 'shrink-0 rounded-sm text-caption font-semibold text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring',
          error: '[&_[data-icon]]:text-destructive',
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  );
}

export { Toaster, toast };
