import * as React from 'react';
import { cn } from '@/lib/utils';

// shadcn Input + iOS 그룹 입력 모양: 채움 바탕, 테두리 없음, 17 글자(앱에서 누르기 쉬운 높이). 초점은 3:1 링(InputGroup 안에서는 묶음이 링을 그려 안쪽은 끈다)
function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'w-full min-w-0 rounded-sm bg-transparent text-body-lg outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50',
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
        'field-sizing-content min-h-20 w-full resize-none rounded-sm bg-transparent text-body leading-relaxed outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      {...props}
    />
  );
}

export { Input, Textarea };
