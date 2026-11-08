import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/foundations/Icon';
import { InputGroup, InputGroupAddon } from './input-group';

// shadcn Command(cmdk) + Dearby: 위 검색 칸(InputGroup: glass는 SearchBar 캡슐, filled는 시트 안 채움 칸),
// 아래 묶음 목록(Item과 같은 행·구분선). 키보드로 고른 행은 Item의 포커스처럼 옅은 민트
function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return <CommandPrimitive data-slot="command" className={cn('flex w-full flex-col gap-3 text-foreground', className)} {...props} />;
}

function CommandInput({ className, variant = 'filled', ...props }: React.ComponentProps<typeof CommandPrimitive.Input> & { variant?: 'glass' | 'filled' }) {
  return (
    <InputGroup variant={variant}>
      <InputGroupAddon><Icon name="search" /></InputGroupAddon>
      <CommandPrimitive.Input data-slot="input-group-control" className={cn(
        'w-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:opacity-50', variant === 'glass' ? 'text-body' : 'text-body-lg', className)} {...props} />
    </InputGroup>
  );
}

/** 높이는 정하지 않는다. Command의 높이를 막으면(시트 안 등) 목록만 스크롤된다 */
function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List data-slot="command-list" className={cn(
    'min-h-0 flex-1 scroll-py-1 overflow-y-auto overflow-x-hidden [&_[cmdk-list-sizer]]:flex [&_[cmdk-list-sizer]]:flex-col [&_[cmdk-list-sizer]]:gap-3', className)} {...props} />;
}

function CommandEmpty({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty data-slot="command-empty" className={cn('py-6 text-center text-body text-muted-foreground', className)} {...props} />;
}

/** heading은 묶음 위 작은 회색 글자, 행들은 둥근 채움 면에 담긴다(ItemGroup grouped와 같은 모양) */
function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return <CommandPrimitive.Group data-slot="command-group" className={cn(
    '[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:text-caption [&_[cmdk-group-heading]]:text-muted-foreground',
    '[&_[cmdk-group-items]]:overflow-hidden [&_[cmdk-group-items]]:rounded-md [&_[cmdk-group-items]]:bg-muted [&_[cmdk-item]+[cmdk-item]]:border-t',
    className)} {...props} />;
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return <CommandPrimitive.Item data-slot="command-item" className={cn(
    'relative flex min-h-11 w-full cursor-default select-none items-center gap-3 px-4 py-2 text-left text-body-lg outline-none transition-colors',
    'data-[selected=true]:bg-accent/60 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-45 [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:text-accent-foreground',
    className)} {...props} />;
}

/** 행 오른쪽 값(값 종류·꺾쇠). 이름은 shadcn을 따랐다 */
function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="command-shortcut" className={cn('ml-auto flex shrink-0 items-center gap-1.5 text-body text-muted-foreground [&_svg]:size-3.5 [&_svg]:text-muted-foreground/60', className)} {...props} />;
}

export { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut };
