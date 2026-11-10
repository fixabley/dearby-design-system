import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const dotVariants = cva('inline-block shrink-0 rounded-full bg-primary', {
  variants: {
    // 팔로우 카드 8 · 접히는 섹션 머리 7(시안)
    size: { md: 'size-2', sm: 'size-[7px]' },
  },
  defaultVariants: { size: 'md' },
});

/**
 * 새 모집이 열려 있다는 청록 점. 색만으로 전하지 않도록 화면 읽기용 글자를 함께 둔다(`label`).
 * 자리는 쓰는 쪽이 className으로 정한다
 */
export function NewDot({
  size,
  label = '새 모집 있음',
  className,
}: VariantProps<typeof dotVariants> & { label?: string; className?: string }) {
  return (
    <span className={cn(dotVariants({ size }), className)}>
      <span className="sr-only">{label}</span>
    </span>
  );
}
