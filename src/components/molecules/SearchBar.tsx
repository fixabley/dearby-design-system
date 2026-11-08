import { Icon } from '@/components/atoms/Icon';
import { Input } from '@/components/ui/input';
import { glass } from './GlassGroup';

/** 검색 캡슐 + 필터 원형 버튼(아래 가운데 떠 있는 바) */
export function SearchBar({ placeholder = '프로그램·활동·태그 검색', onFilter }: { placeholder?: string; onFilter?: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <label className={`flex h-11 flex-1 items-center gap-2 rounded-full px-4 text-muted-foreground [&_svg]:size-[18px] ${glass}`}>
        <Icon name="search" /><Input placeholder={placeholder} className="text-body" aria-label="검색" />
      </label>
      <button type="button" aria-label="필터" onClick={onFilter} className={`grid size-11 place-items-center rounded-full text-accent-foreground transition-transform active:scale-90 [&_svg]:size-5 ${glass}`}><Icon name="filter" /></button>
    </div>
  );
}
