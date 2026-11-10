import type {
  FormProject,
  FormQuestion,
} from '@/components/organisms/form/form';

/** ㉙-i의 첫 질문: 예/아니오, 필수, 예만 참여 */
export const SWIFT_Q: FormQuestion = {
  text: 'Swift로 앱을 출시해 본 적이 있나요?',
  kind: 'bool',
  required: true,
  passAnswer: 'yes',
};

/** ㉙-i의 둘째 질문: 하나 고르기, 필수 */
export const ROLE_Q: FormQuestion = {
  text: '면접 준비 중인 직무',
  kind: 'one',
  required: true,
  options: ['iOS', 'Android', '백엔드'],
};

/** ㉙-i의 셋째 질문: 긴 답 */
export const GOAL_Q: FormQuestion = {
  text: '이 스터디에서 얻고 싶은 것',
  kind: 'long',
  required: false,
};

/** ㉙-i의 참여 폼 */
export const FORM_QUESTIONS: FormQuestion[] = [SWIFT_Q, ROLE_Q, GOAL_Q];

/** 시안에 답 틀이 없는 종류의 예시 */
export const LINK_Q: FormQuestion = {
  text: '포트폴리오 링크',
  kind: 'link',
  required: false,
};
export const MANY_Q: FormQuestion = {
  text: '관심 있는 주제',
  kind: 'many',
  required: false,
  options: ['동시성', '테스트', '접근성'],
};
export const SHORT_Q: FormQuestion = {
  text: '자기소개 한 줄',
  kind: 'short',
  required: true,
};
export const PROJECT_Q: FormQuestion = {
  text: '가장 자신 있는 프로젝트',
  kind: 'project',
  required: true,
};

/** ㉙-j5의 내 프로젝트 */
export const FORM_PROJECTS: FormProject[] = [
  {
    id: 'moa',
    name: '모아 가계부',
    verified: true,
    platforms: ['Android', 'iOS'],
    released: true,
  },
  { id: 'llm', name: '온디바이스 LLM 데모', verified: true },
];

/** ㉙-i3: 민감 정보 문구 검사의 예시. 실제 검사는 쓰는 쪽(서버 계약)이 정한다 */
export const SENSITIVE = /주민등록|계좌|카드번호|건강|종교|정치/;
