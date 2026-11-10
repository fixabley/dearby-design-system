// 참여 폼의 값 모양과 순수 도우미(시안 ㉙-i · i2 · i3 · i4 · j · j5).
// 서버 계약(참여 폼 이슈)이 아직 없어 시안의 낱말을 영문으로 옮긴 최소한이다. 계약이 생기면 맞춘다.

/** 질문 종류: 짧은 답 · 긴 답 · 하나 고르기 · 여러 개 고르기 · 예/아니오 · 링크 · 프로젝트(시안 ㉙-i4 종류 메뉴 순서) */
export type FormQuestionKind =
  'short' | 'long' | 'one' | 'many' | 'bool' | 'link' | 'project';

export const FORM_KINDS: readonly FormQuestionKind[] = [
  'short',
  'long',
  'one',
  'many',
  'bool',
  'link',
  'project',
];

export const FORM_KIND_LABEL: Record<FormQuestionKind, string> = {
  short: '짧은 답',
  long: '긴 답',
  one: '하나 고르기',
  many: '여러 개 고르기',
  bool: '예/아니오',
  link: '링크',
  project: '프로젝트',
};

/** 예/아니오 질문의 통과 답 값 */
export const BOOL_PASS_LABEL = { yes: '예', no: '아니오' } as const;

/**
 * 질문 하나. 선택지(`options`)는 화면에 보이는 글자다(`one` · `many`만).
 * `passAnswer`가 있으면 `조건으로 쓰기`가 켜진 것이다: 예/아니오는 `'yes'` | `'no'`, 하나 고르기는 선택지 글자.
 * 자기 신고라 인증이 아니다(시안 ㉙-i2 안내)
 */
export type FormQuestion = {
  text: string;
  kind: FormQuestionKind;
  required: boolean;
  options?: string[];
  passAnswer?: string;
};

/** 답: 글(짧은 답 · 긴 답 · 링크), 예/아니오(`null`은 아직 답하지 않음), 고른 선택지 글자, 고른 선택지들, 고른 프로젝트 id */
export type FormAnswerValue = string | boolean | string[] | null;

/** 프로젝트 질문에서 고르는 내 프로젝트(시안 ㉙-j5의 태그를 옮긴 것) */
export type FormProject = {
  id: string;
  name: string;
  /** `확인됨` 태그 */
  verified?: boolean;
  /** 플랫폼 태그(`Android` · `iOS`) */
  platforms?: string[];
  /** `출시` 태그 */
  released?: boolean;
};

/** 통과 답을 조건으로 쓸 수 있는 종류(시안 ㉙-i2 "예/아니오·고르기만"): 통과 답이 하나인 예/아니오와 하나 고르기만 둔다 */
export function canUseAsCondition(question: FormQuestion): boolean {
  if (question.kind === 'bool') return true;
  return question.kind === 'one' && filledOptions(question).length > 0;
}

/** 글자가 있는 선택지 */
function filledOptions(question: FormQuestion): string[] {
  return (question.options ?? []).filter((o) => o.trim());
}

/** `조건으로 쓰기`가 켜져 있는지: 통과 답이 있다(편집의 스위치 · 행의 조건 태그가 같은 판정을 쓴다) */
export function hasFormCondition(question: FormQuestion): boolean {
  return !!question.passAnswer;
}

/** `조건으로 쓰기`를 켜고 끈다. 켤 때 통과 답은 예/아니오는 `예`, 하나 고르기는 첫 선택지 */
export function setFormCondition(
  question: FormQuestion,
  on: boolean,
): FormQuestion {
  if (!on || !canUseAsCondition(question)) {
    const { passAnswer: _removed, ...rest } = question;
    void _removed;
    return rest;
  }
  return {
    ...question,
    passAnswer: question.kind === 'bool' ? 'yes' : filledOptions(question)[0],
  };
}

/** 종류를 바꾼다. 선택지는 하나 · 여러 개 고르기 사이에서만 남고, 통과 답은 종류가 바뀌면 지운다 */
export function changeFormKind(
  question: FormQuestion,
  kind: FormQuestionKind,
): FormQuestion {
  if (kind === question.kind) return question;
  const keepOptions =
    (kind === 'one' || kind === 'many') &&
    (question.kind === 'one' || question.kind === 'many');
  const { options, passAnswer: _pass, ...rest } = question;
  void _pass;
  return {
    ...rest,
    kind,
    ...(keepOptions && options ? { options } : {}),
  };
}

/** 질문 행의 조건 글: `예만 참여` · `iOS만 참여`. 조건이 아니면 빈 글자 */
export function formatFormPass(question: FormQuestion): string {
  const pass = question.passAnswer;
  if (!pass) return '';
  const label =
    question.kind === 'bool'
      ? BOOL_PASS_LABEL[pass as keyof typeof BOOL_PASS_LABEL]
      : pass;
  return label ? `${label}만 참여` : '';
}

/** 완료를 열 수 있는지: 문구가 있고, 고르기 질문은 선택지가 둘 이상이다 */
export function isFormQuestionComplete(question: FormQuestion): boolean {
  if (!question.text.trim()) return false;
  if (question.kind === 'one' || question.kind === 'many')
    if (filledOptions(question).length < 2) return false;
  // 통과 답이 있으면 그 종류가 받는 값이어야 한다(밖에서 선택지를 바꿔 어긋난 경우)
  if (question.passAnswer) {
    if (!canUseAsCondition(question)) return false;
    if (question.kind === 'bool')
      return question.passAnswer === 'yes' || question.passAnswer === 'no';
    return filledOptions(question).includes(question.passAnswer);
  }
  return true;
}

/** https 주소인지(시안 ㉙-i4 "https만, 형식 검사") */
export function isHttpsUrl(text: string): boolean {
  try {
    return new URL(text.trim()).protocol === 'https:';
  } catch {
    return false;
  }
}

/** 질문을 막 열었을 때의 답: 글은 빈 글자, 예/아니오는 `null`, 여러 개 고르기는 빈 목록, 하나 고르기 · 프로젝트는 `null` */
export function emptyFormAnswer(question: FormQuestion): FormAnswerValue {
  switch (question.kind) {
    case 'short':
    case 'long':
    case 'link':
      return '';
    case 'many':
      return [];
    default:
      return null;
  }
}

/** 답이 채워졌는지(제출 가능). 필수가 아니면 비어 있어도 되지만 링크는 적었다면 https여야 한다 */
export function isFormAnswerComplete(
  question: FormQuestion,
  value: FormAnswerValue,
): boolean {
  const empty =
    value == null ||
    (typeof value === 'string' && !value.trim()) ||
    (Array.isArray(value) && value.length === 0);
  if (empty) return !question.required;
  if (question.kind === 'link') return isHttpsUrl(value as string);
  return true;
}
