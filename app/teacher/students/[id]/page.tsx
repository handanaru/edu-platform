"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { students, submissions, assignments } from "@/lib/data";

const statusColor: Record<string, string> = {
  양호: "bg-emerald-100 text-emerald-700",
  주의: "bg-amber-100 text-amber-700",
  긴급: "bg-rose-100 text-rose-700",
};

const submissionStateColor: Record<string, string> = {
  피드백완료: "bg-emerald-100 text-emerald-700",
  채점중: "bg-indigo-100 text-indigo-700",
  미제출: "bg-rose-100 text-rose-700",
};

export default function StudentDetailPage() {
  const params = useParams();
  const student = students.find((s) => s.id === params.id);

  if (!student) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9FA]">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-700">학생을 찾을 수 없습니다.</p>
          <Link href="/teacher/students" className="mt-4 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500">
            목록으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  const studentSubmissions = submissions.filter((s) => s.studentId === student.id);
  const studentAssignments = assignments.filter((a) => a.targetStudents.includes(student.id));
  const maxScore = Math.max(...student.scoreHistory);
  const minScore = Math.min(...student.scoreHistory);

  // SVG 라인 차트 경로
  const chartW = 280, chartH = 80;
  const pts = student.scoreHistory.map((v, i) => {
    const x = (chartW / (student.scoreHistory.length - 1)) * i;
    const y = chartH - ((v - minScore + 5) / (maxScore - minScore + 10)) * (chartH - 10);
    return `${x},${y}`;
  });
  const linePath = `M ${pts.join(" L ")}`;

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_1fr]">
        {/* 사이드바 */}
        <aside className="border-r border-slate-200 bg-white px-5 py-6">
          <div className="mb-8">
            <p className="text-2xl font-extrabold tracking-tight text-indigo-600">SODOMATCH</p>
            <p className="mt-1 text-xs text-slate-500">교사 관리 포털</p>
          </div>
          <nav className="space-y-1 text-sm">
            <Link href="/teacher" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">대시보드</Link>
            <Link href="/teacher/students" className="block rounded-lg bg-indigo-50 px-3 py-2 font-semibold text-indigo-700">학생 관리</Link>
            <Link href="/teacher/assignments/new" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">과제 생성</Link>
            <Link href="/teacher" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">채점 대기함</Link>
            <Link href="/teacher" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">학습 리포트</Link>
          </nav>
          <div className="mt-10 border-t border-slate-200 pt-4">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-800">서비스 소개로 이동</Link>
          </div>
        </aside>

        {/* 메인 */}
        <section className="px-6 py-8 lg:px-10">
          {/* 브레드크럼 */}
          <nav className="mb-5 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/teacher/students" className="hover:text-indigo-600">학생 관리</Link>
            <span>/</span>
            <span className="font-medium text-slate-800">{student.name}</span>
          </nav>

          {/* 프로필 헤더 */}
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-xl font-bold text-indigo-700">
                {student.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold">{student.name}</h1>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColor[student.status]}`}>
                    {student.status}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-slate-500">
                  {student.grade} · {student.school} · 가입일 {student.joinDate}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  학생 {student.phone} · 학부모 {student.parentPhone}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="/teacher/assignments/new"
                className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                + 과제 생성
              </Link>
              <button
                onClick={() => alert("메시지 발송 기능은 다음 단계에서 연결됩니다.")}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                메시지 보내기
              </button>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {/* 왼쪽 2/3 */}
            <div className="space-y-5 lg:col-span-2">
              {/* 학습 지표 */}
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "현재 진도율", value: student.progress + "%", sub: "전체 커리큘럼 대비" },
                  { label: "최근 시험 점수", value: student.score + "점", sub: `평균 ${student.avgScore}점` },
                  { label: "이번 달 과제", value: studentAssignments.length + "개", sub: `완료 ${studentSubmissions.filter((s) => s.state === "피드백완료").length}개` },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs text-slate-500">{item.label}</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">{item.value}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{item.sub}</p>
                  </div>
                ))}
              </div>

              {/* 점수 추이 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold">점수 추이</h2>
                <p className="mt-0.5 text-xs text-slate-400">최근 6회 시험 기록</p>
                <svg viewBox={`0 0 ${chartW} ${chartH + 20}`} className="mt-4 w-full">
                  <path d={linePath} stroke="#6366f1" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
                  {student.scoreHistory.map((v, i) => {
                    const x = (chartW / (student.scoreHistory.length - 1)) * i;
                    const y = chartH - ((v - minScore + 5) / (maxScore - minScore + 10)) * (chartH - 10);
                    return (
                      <g key={i}>
                        <circle cx={x} cy={y} r="4" fill="#6366f1" />
                        <text x={x} y={y - 8} textAnchor="middle" className="text-[9px]" fill="#64748b" fontSize="9">
                          {v}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* 과제 내역 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold">과제 내역</h2>
                <div className="mt-3 space-y-2">
                  {studentSubmissions.length === 0 ? (
                    <p className="py-4 text-center text-sm text-slate-400">제출된 과제가 없습니다.</p>
                  ) : (
                    studentSubmissions.map((sub) => (
                      <div key={sub.id} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                        <div>
                          <p className="text-sm font-medium">{sub.assignmentTitle}</p>
                          <p className="text-xs text-slate-400">제출: {sub.submittedAt} · {sub.unit}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {sub.score !== null && (
                            <span className="text-sm font-bold text-indigo-600">{sub.score}점</span>
                          )}
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${submissionStateColor[sub.state]}`}>
                            {sub.state}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* 오른쪽 1/3 */}
            <div className="space-y-5">
              {/* 취약 단원 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold">AI 취약 단원 분석</h2>
                <div className="mt-3 space-y-2">
                  {student.weakUnits.length === 0 ? (
                    <p className="py-3 text-center text-sm text-slate-400">취약 단원 없음</p>
                  ) : (
                    student.weakUnits.map((unit) => (
                      <div key={unit} className="flex items-center justify-between rounded-lg bg-rose-50 px-3 py-2.5">
                        <span className="text-sm text-rose-700">{unit}</span>
                        <button
                          onClick={() => alert(`${unit} 맞춤 과제를 생성합니다.`)}
                          className="rounded-md bg-rose-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-rose-500"
                        >
                          과제 생성
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* 메모 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold">교사 메모</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{student.memo}</p>
                <button
                  onClick={() => alert("메모 편집 기능은 다음 단계에서 연결됩니다.")}
                  className="mt-3 w-full rounded-lg border border-slate-300 py-1.5 text-xs font-medium hover:bg-slate-50"
                >
                  메모 편집
                </button>
              </div>

              {/* 할당된 과제 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold">진행 중 과제</h2>
                <div className="mt-3 space-y-2">
                  {studentAssignments.map((a) => (
                    <div key={a.id} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
                      <p className="text-xs font-semibold text-slate-700">{a.title}</p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        마감: {a.dueDate} · {a.questionCount}문항 · 난이도 {a.difficulty}
                      </p>
                    </div>
                  ))}
                  {studentAssignments.length === 0 && (
                    <p className="py-3 text-center text-sm text-slate-400">진행 중인 과제 없음</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
