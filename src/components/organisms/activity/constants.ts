/** 개설자가 활동 하나를 운영하는 관리 화면의 탭. 값은 영문 키, 화면 글자는 MANAGE_TAB_LABEL(ManageLayout에 넘긴다) */
export const MANAGE_TABS = ['participants', 'assignments', 'teams', 'notices', 'timetable', 'discord'] as const;
export type ManageTab = (typeof MANAGE_TABS)[number];
export const MANAGE_TAB_LABEL: Record<ManageTab, string> = { participants: '참여자', assignments: '과제', teams: '팀', notices: '공지', timetable: '시간표', discord: '디스코드' };
