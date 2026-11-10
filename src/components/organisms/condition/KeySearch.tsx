import { createContext, useContext, type ReactNode } from 'react';
import { Text } from '@/components/atoms/shared/Text';
import { Icon } from '@/components/foundations/Icon';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import { formatKeyKind, type ConditionKey } from './condition';

type KeySearchContextValue = {
  keys: ConditionKey[];
  query: string;
  onQueryChange?: (query: string) => void;
  onSelect?: (key: ConditionKey) => void;
  onPropose?: () => void;
};
const KeySearchContext = createContext<KeySearchContextValue | null>(null);

function useKeySearch(part: string) {
  const ctx = useContext(KeySearchContext);
  if (!ctx) throw new Error(`KeySearch.${part}는 <KeySearch> 안에서 쓴다`);
  return ctx;
}

/** 검색어가 이름에 들어 있는 키(공백은 무시) */
function matching(keys: ConditionKey[], query: string) {
  const q = query.replace(/\s+/g, '').toLowerCase();
  return q
    ? keys.filter((k) => k.label.replace(/\s+/g, '').toLowerCase().includes(q))
    : keys;
}

/** 검색 입력(채움 면, 기존 `CommandInput`: 돋보기 + 입력) */
function Input({ className }: { className?: string }) {
  const { query, onQueryChange } = useKeySearch('Input');
  return (
    <CommandInput
      value={query}
      onValueChange={onQueryChange}
      placeholder="자격 검색"
      className={className}
    />
  );
}

/** 이름이 검색어를 담은 키로 거른 목록. 키마다 이름 · 오른쪽 값 종류(`범위` · `예/아니오 · 사용자 제안`) · 꺾쇠, 아이콘은 없다(시안 ㉙-l). 맞는 키가 없으면 비운다 */
function Results() {
  const { keys, query, onSelect } = useKeySearch('Results');
  const found = matching(keys, query);
  if (!found.length) return null;
  return (
    <CommandGroup>
      {found.map((k) => (
        <CommandItem key={k.id} value={k.id} onSelect={() => onSelect?.(k)}>
          <span className="min-w-0 truncate">{k.label}</span>
          <CommandShortcut>
            <Text
              as="span"
              variant="body"
              tone="muted"
              truncate
              className="max-w-48"
            >
              {formatKeyKind(k)}
            </Text>
            <Icon name="chevronRight" />
          </CommandShortcut>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

/** 별도 묶음의 `새 자격 제안` 행(청록 ⊕). 찾는 키가 없을 때 가는 길이라 검색어와 상관없이 늘 보인다 */
function Propose() {
  const { onPropose } = useKeySearch('Propose');
  return (
    <CommandGroup forceMount>
      <CommandItem
        value="propose"
        onSelect={onPropose}
        className="text-accent-foreground"
      >
        <Icon name="addCircle" />새 자격 제안
      </CommandItem>
    </CommandGroup>
  );
}

function KeySearchRoot({
  keys,
  query,
  onQueryChange,
  onSelect,
  onPropose,
  className,
  children,
}: {
  /** 고를 수 있는 공용 키 */
  keys: ConditionKey[];
  /** 검색어(제어형) */
  query: string;
  onQueryChange?: (query: string) => void;
  /** 키를 눌렀을 때: 쓰는 쪽이 그 키의 값 입력 시트로 간다 */
  onSelect?: (key: ConditionKey) => void;
  /** `새 자격 제안` 행을 눌렀을 때 */
  onPropose?: () => void;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <KeySearchContext.Provider
      value={{ keys, query, onQueryChange, onSelect, onPropose }}
    >
      {/* 거르기는 이름 부분 일치로 직접 한다(cmdk의 흐릿한 일치 대신): 같은 검색어에 늘 같은 목록 */}
      <Command label="자격 검색" shouldFilter={false} className={className}>
        {children ?? (
          <>
            <Input />
            <CommandList>
              <Results />
              <Propose />
            </CommandList>
          </>
        )}
      </Command>
    </KeySearchContext.Provider>
  );
}

/**
 * 자격 키 검색(컴파운드, 시안 ㉙-l): Input(검색 입력) · Results(거른 키 목록) · Propose(`새 자격 제안` 행).
 * 기존 `Command`(cmdk) 위에 조립했다. 키 목록은 쓰는 쪽이 주고(`keys`, 승인된 키만) 거르기는 이름 부분 일치로 이 부품이 한다. 검색어는 쓰는 쪽이 갖는 제어형이다.
 * 기본 조립은 `<KeySearch keys={keys} query={q} onQueryChange={setQ} onSelect={…} onPropose={…} />`.
 * 바꿔 조립하려면 부품을 직접 놓는다: `<KeySearch keys={keys} query={q}><KeySearch.Input /><CommandList><KeySearch.Results /></CommandList></KeySearch>`
 */
export const KeySearch = Object.assign(KeySearchRoot, {
  Input,
  Results,
  Propose,
});
