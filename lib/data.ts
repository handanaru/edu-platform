// 공유 더미 데이터 — 나중에 DB/API로 교체 예정

export type StudentStatus = "양호" | "주의" | "긴급";
export type TaskState = "완료" | "채점대기" | "미제출" | "진행중";
export type AssignmentType = "객관식" | "서술형" | "혼합";
export type SubmissionState = "피드백완료" | "채점중" | "미제출";

export interface Student {
  id: string;
  name: string;
  grade: string;
  school: string;
  subject: string;
  progress: number;
  score: number;
  avgScore: number;
  task: TaskState;
  status: StudentStatus;
  joinDate: string;
  phone: string;
  parentPhone: string;
  memo: string;
  scoreHistory: number[];
  weakUnits: string[];
}

export interface Assignment {
  id: string;
  title: string;
  type: AssignmentType;
  unit: string;
  difficulty: "하" | "중" | "상";
  questionCount: number;
  dueDate: string;
  createdAt: string;
  targetStudents: string[];
  status: "진행중" | "마감" | "채점완료";
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  assignmentTitle: string;
  unit: string;
  submittedAt: string;
  score: number | null;
  totalScore: number;
  state: SubmissionState;
  teacherFeedback: string;
  aiFeedback: string;
  questions: QuestionResult[];
}

export interface QuestionResult {
  no: number;
  question: string;
  myAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  score: number;
  maxScore: number;
  aiComment: string;
}

// ─── 학생 목록 ────────────────────────────────────────────
export const students: Student[] = [
  {
    id: "s01",
    name: "김민지",
    grade: "중2",
    school: "서울중학교",
    subject: "수학",
    progress: 72,
    score: 84,
    avgScore: 79,
    task: "채점대기",
    status: "주의",
    joinDate: "2024-03-05",
    phone: "010-1234-5678",
    parentPhone: "010-9876-5432",
    memo: "이차함수 부분 집중 보강 필요. 응용 문제에서 실수 잦음.",
    scoreHistory: [62, 68, 71, 75, 79, 84],
    weakUnits: ["이차함수", "연립방정식"],
  },
  {
    id: "s02",
    name: "박준호",
    grade: "중3",
    school: "한강중학교",
    subject: "수학",
    progress: 88,
    score: 91,
    avgScore: 88,
    task: "완료",
    status: "양호",
    joinDate: "2024-02-10",
    phone: "010-2345-6789",
    parentPhone: "010-8765-4321",
    memo: "꾸준히 향상 중. 수능형 문제 연습 시작.",
    scoreHistory: [74, 78, 82, 85, 88, 91],
    weakUnits: ["확률과 통계"],
  },
  {
    id: "s03",
    name: "이서연",
    grade: "고1",
    school: "강남고등학교",
    subject: "수학",
    progress: 54,
    score: 62,
    avgScore: 58,
    task: "미제출",
    status: "긴급",
    joinDate: "2024-01-15",
    phone: "010-3456-7890",
    parentPhone: "010-7654-3210",
    memo: "최근 2주 과제 미제출. 연락 필요. 기초 개념부터 재점검 중.",
    scoreHistory: [52, 55, 58, 56, 60, 62],
    weakUnits: ["지수·로그", "삼각함수", "수열"],
  },
  {
    id: "s04",
    name: "최도윤",
    grade: "고2",
    school: "마포고등학교",
    subject: "수학",
    progress: 67,
    score: 77,
    avgScore: 73,
    task: "채점대기",
    status: "주의",
    joinDate: "2024-04-01",
    phone: "010-4567-8901",
    parentPhone: "010-6543-2109",
    memo: "수능 2등급 목표. 미적분 심화 과정 진행 중.",
    scoreHistory: [65, 68, 70, 72, 74, 77],
    weakUnits: ["미적분", "벡터"],
  },
  {
    id: "s05",
    name: "정하은",
    grade: "중1",
    school: "은평중학교",
    subject: "수학",
    progress: 91,
    score: 95,
    avgScore: 92,
    task: "완료",
    status: "양호",
    joinDate: "2024-03-20",
    phone: "010-5678-9012",
    parentPhone: "010-5432-1098",
    memo: "최우수 학생. 선행 학습 진행 중(중2 과정).",
    scoreHistory: [82, 85, 88, 91, 93, 95],
    weakUnits: [],
  },
  {
    id: "s06",
    name: "강민준",
    grade: "고3",
    school: "노원고등학교",
    subject: "수학",
    progress: 79,
    score: 85,
    avgScore: 81,
    task: "진행중",
    status: "양호",
    joinDate: "2023-12-01",
    phone: "010-6789-0123",
    parentPhone: "010-4321-0987",
    memo: "수능 D-60. 기출 위주 마무리 정리 중.",
    scoreHistory: [72, 75, 78, 80, 82, 85],
    weakUnits: ["기하", "확률"],
  },
];

// ─── 과제 목록 ────────────────────────────────────────────
export const assignments: Assignment[] = [
  {
    id: "a01",
    title: "이차함수 심화 특훈",
    type: "혼합",
    unit: "이차함수",
    difficulty: "상",
    questionCount: 15,
    dueDate: "2026-03-30",
    createdAt: "2026-03-20",
    targetStudents: ["s01", "s04"],
    status: "진행중",
  },
  {
    id: "a02",
    title: "연립방정식 기본 점검",
    type: "객관식",
    unit: "연립방정식",
    difficulty: "중",
    questionCount: 10,
    dueDate: "2026-03-28",
    createdAt: "2026-03-18",
    targetStudents: ["s01"],
    status: "채점완료",
  },
  {
    id: "a03",
    title: "수능 기출 미적분 실전",
    type: "서술형",
    unit: "미적분",
    difficulty: "상",
    questionCount: 8,
    dueDate: "2026-03-29",
    createdAt: "2026-03-22",
    targetStudents: ["s04", "s06"],
    status: "진행중",
  },
  {
    id: "a04",
    title: "지수·로그 기초 개념",
    type: "객관식",
    unit: "지수·로그",
    difficulty: "하",
    questionCount: 12,
    dueDate: "2026-03-31",
    createdAt: "2026-03-23",
    targetStudents: ["s03"],
    status: "진행중",
  },
  {
    id: "a05",
    title: "확률 통계 실전 모의고사",
    type: "혼합",
    unit: "확률과 통계",
    difficulty: "중",
    questionCount: 20,
    dueDate: "2026-04-05",
    createdAt: "2026-03-25",
    targetStudents: ["s02", "s06"],
    status: "진행중",
  },
];

// ─── 제출 내역 ────────────────────────────────────────────
export const submissions: Submission[] = [
  {
    id: "sub01",
    assignmentId: "a02",
    studentId: "s01",
    assignmentTitle: "연립방정식 기본 점검",
    unit: "연립방정식",
    submittedAt: "2026-03-25 14:32",
    score: 82,
    totalScore: 100,
    state: "피드백완료",
    teacherFeedback:
      "3번 문제에서 대입법 대신 가감법을 쓰면 더 빠르게 풀 수 있어. 전반적으로 개념은 잡혔으니 응용 문제 연습을 늘려봐.",
    aiFeedback:
      "연립방정식 풀이 과정에서 부호 실수가 2번 반복되었습니다. 계산 전 부호 체크 루틴을 습관화하면 점수를 5~10점 올릴 수 있습니다.",
    questions: [
      { no: 1, question: "2x + 3y = 12, x - y = 1 을 풀어라", myAnswer: "x=3, y=2", correctAnswer: "x=3, y=2", isCorrect: true, score: 10, maxScore: 10, aiComment: "완벽한 풀이입니다." },
      { no: 2, question: "3x - 2y = 7, x + y = 6 을 풀어라", myAnswer: "x=19/5, y=11/5", correctAnswer: "x=19/5, y=11/5", isCorrect: true, score: 10, maxScore: 10, aiComment: "정확합니다." },
      { no: 3, question: "x + 2y = 8, 2x - y = 6 을 풀어라", myAnswer: "x=3, y=2", correctAnswer: "x=4, y=2", isCorrect: false, score: 5, maxScore: 10, aiComment: "대입 과정에서 부호 실수가 있습니다. x 대입 시 다시 확인하세요." },
      { no: 4, question: "4x + y = 11, x - 2y = -2 를 풀어라", myAnswer: "x=8/3, y=5/3", correctAnswer: "x=8/3, y=5/3", isCorrect: true, score: 10, maxScore: 10, aiComment: "훌륭합니다." },
      { no: 5, question: "5x - 3y = 1, 2x + y = 10 을 풀어라", myAnswer: "x=2, y=5", correctAnswer: "x=31/11, y=48/11", isCorrect: false, score: 0, maxScore: 10, aiComment: "계산 실수. 가감법 재확인 필요합니다." },
    ],
  },
  {
    id: "sub02",
    assignmentId: "a01",
    studentId: "s01",
    assignmentTitle: "이차함수 심화 특훈",
    unit: "이차함수",
    submittedAt: "2026-03-27 09:15",
    score: null,
    totalScore: 100,
    state: "채점중",
    teacherFeedback: "",
    aiFeedback: "채점 진행 중입니다.",
    questions: [],
  },
  {
    id: "sub03",
    assignmentId: "a03",
    studentId: "s04",
    assignmentTitle: "수능 기출 미적분 실전",
    unit: "미적분",
    submittedAt: "2026-03-26 20:40",
    score: 75,
    totalScore: 100,
    state: "피드백완료",
    teacherFeedback: "미분 파트는 잘 됐어. 적분 계산에서 상수 처리를 좀 더 꼼꼼히 해봐.",
    aiFeedback: "적분 문제 3번·5번에서 적분 상수 C 누락이 반복됩니다. 서술형 감점 포인트이니 주의하세요.",
    questions: [
      { no: 1, question: "f(x) = x³ - 3x² + 2x 의 극값을 구하여라", myAnswer: "극대: f(1/3)=4/27, 극소: f(1)=0", correctAnswer: "극대: x=1/3, 극소: x=1", isCorrect: true, score: 12, maxScore: 12, aiComment: "정확합니다." },
      { no: 2, question: "∫(2x+1)dx 를 구하여라", myAnswer: "x² + x", correctAnswer: "x² + x + C", isCorrect: false, score: 8, maxScore: 13, aiComment: "적분 상수 C 누락. 반드시 포함해야 합니다." },
    ],
  },
];

// ─── 유저 계정 (데모) ──────────────────────────────────────
export const demoAccounts = [
  { id: "teacher01", password: "1234", role: "teacher" as const, name: "김선생" },
  { id: "student01", password: "1234", role: "student" as const, name: "김민지", studentId: "s01" },
  { id: "student02", password: "1234", role: "student" as const, name: "박준호", studentId: "s02" },
];
