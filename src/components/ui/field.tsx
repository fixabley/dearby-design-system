import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Label } from './label';

// shadcn Field + Dearby: iOS 묶음 안 입력 칸(위 작은 라벨, 아래 입력)
function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn('flex flex-col gap-1.5', className)}
      {...props}
    />
  );
}
function FieldLegend({ className, ...props }: React.ComponentProps<'legend'>) {
  return (
    <legend
      data-slot="field-legend"
      className={cn(
        'mb-1.5 px-4 text-caption text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}
function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        'overflow-hidden rounded-md border border-border [&>[data-slot=field]+[data-slot=field]]:border-t [&>[data-slot=field]+[data-slot=field]]:border-border',
        className,
      )}
      {...props}
    />
  );
}

const fieldVariants = cva(
  'group/field flex w-full gap-0.5 data-[invalid=true]:text-destructive',
  {
    variants: {
      orientation: {
        vertical: 'flex-col px-4 py-2.5',
        horizontal:
          'min-h-11 flex-row items-center justify-between gap-3 px-4 py-2',
      },
    },
    defaultVariants: { orientation: 'vertical' },
  },
);
function Field({
  className,
  orientation,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}
function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-content"
      className={cn('flex flex-1 flex-col', className)}
      {...props}
    />
  );
}
function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        'group-data-[orientation=horizontal]/field:text-body-lg group-data-[orientation=horizontal]/field:text-foreground',
        className,
      )}
      {...props}
    />
  );
}
function FieldTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-title"
      className={cn('text-body-lg', className)}
      {...props}
    />
  );
}
function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cn('text-caption text-muted-foreground', className)}
      {...props}
    />
  );
}
function FieldError({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  if (!children) return null;
  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn('text-caption text-destructive', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
};
