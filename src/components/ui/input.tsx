import * as React from 'react';
import { cn } from '@/lib/utils';

// shadcn Input + iOS 그룹 입력 모양: 채움 바탕, 테두리 없음, 17 글자(앱에서 누르기 쉬운 높이)
function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'w-full min-w-0 bg-transparent text-body-lg outline-none placeholder:text-muted-foreground disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'field-sizing-content min-h-20 w-full resize-none bg-transparent text-body leading-relaxed outline-none placeholder:text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}

export { Input, Textarea };
