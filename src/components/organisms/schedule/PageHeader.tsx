import { Text } from '@/components/atoms/shared/Text';
import { Button } from '@/components/ui/button';
import { SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

/**
 * 시트 안 하위 화면의 머리(시안 ㉙-c7 `.hsh`): 뒤로(이전 화면 이름) · 가운데 제목 · 완료. 뒤로와 완료는 모두 이전 화면으로 돌아가는 일이다.
 * 시트 머리(`SheetHeader`)와 달리 닫기가 아니라 화면 이동이라 시트마다 하나인 제목 요소(`SheetTitle`)를 이 머리가 맡는다
 */
export function PageHeader({
  title,
  backLabel,
  onBack,
  onDone,
  autoFocus,
  className,
}: {
  title: string;
  backLabel: string;
  onBack?: () => void;
  onDone?: () => void;
  /** 화면을 옮긴 직후 초점을 뒤로 버튼에 둔다(메뉴가 닫히며 초점이 사라지므로) */
  autoFocus?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex min-h-10 shrink-0 items-center justify-between gap-2 py-2',
        className,
      )}
    >
      <Button
        variant="link"
        size="auto"
        icon="back"
        autoFocus={autoFocus}
        aria-label={`뒤로, ${backLabel}`}
        onClick={onBack}
        className="-mx-1 gap-0.5 rounded-md px-1 [&_svg]:size-4"
      >
        {backLabel}
      </Button>
      <SheetTitle asChild>
        <Text as="h2" variant="rowTitle">
          {title}
        </Text>
      </SheetTitle>
      <Button
        variant="link"
        size="auto"
        onClick={onDone}
        className="-mx-1 rounded-md px-1"
      >
        완료
      </Button>
    </div>
  );
}
