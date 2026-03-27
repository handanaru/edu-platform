"use client";

import Link from "next/link";
import { useState } from "react";
import { assignments, submissions } from "@/lib/data";

// 데모: s01 학생(김민지) 기준으로 필터
const MY_STUDENT_ID = "s01";

const difficultyColor: Record<string, string> = {
  하: "bg-emerald-100 text-emerald-700",
  중: "bg-amber-100 text-amber-700",
  상: "bg-rose-100 text-rose-700",
};

const submissionStateColor: Record<string, string> = {
  피드백완료: "bg-emerald-100 text-emerald-700",
  채점중: "bg-indigo-100 text-indigo-700",
  미제출: "bg-slate-100 text-slate-600",
};

export default function StudentAssignmentsPage() {
  const [tab, setTab] = useState<"진행중" | "완료">("진행중");

  const myAssignments = assignments.filter((a) =>
    a.targetStudents.includes(MY_STUDENT_ID)
  );

  const mySubmissions = submissions.filter((s) => s.studentId === MY_STUDENT_ID);

  const getSubmission = (assignmentId: string) =>
    mySubmissions.find((s) => s.assignmentId === assignmentId);

  const inProgress = myAssignments.filter((a) => a.status !== "채점완료");
  const done = myAssignments.filter((a) => a.status === "채점완료");

  const list = tab === "진행중" ? inProgress : done;

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_1fr]">
        {/* 사이드바 */}
        <aside className="border-r border-slate-200 bg-white px-5 py-6">
          <div className="mb-8">
            <p className="text-2xl font-extrabold tracking-tight text-teal-600">SODOMATCH</p>
            <p className="mt-1 text-xs text-slate-500">학생 학습 포털</p>
          </div>
          <nav className="space-y-1 text-sm">
            <Link href="/student" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">대시보드</Link>
            <Link href="/student/assignments" className="block rounded-lg bg-teal-50 px-3 py-2 font-semibold text-teal-700">과제 목록</Link>
            <Link href="/student" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">오답 노트</Link>
            <Link href="/student" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">성장 리포트</Link>
            <Link href="/student" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">선생님 채팅</Link>
          </nav>
          <div className="mt-10 border-t border-slate-200 pt-4">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-800">서비스 소개로 이동</Link>
          </div>
        </aside>

        {/* 메인 */}
        <section className="px-6 py-8 lg:px-10">
          {/* 헤더 */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">과제 목록</h1>
            <p className="mt-1 text-sm text-slate-500">선생님이 보내준 과제를 확인하고 제출하세요.</p>
          </div>

          {/* 요약 */}
          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            {[
              { label: "전체 과제", value: myAssignments.length + "개" },
              { label: "진행 중", value: inProgress.length + "개", color: "text-amber-600" },
              { label: "피드백 완료", value: mySubmissions.filter((s) => s.state === "피드백완료").length + "개", color: "text-emerald-600" },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">{c.label}</p>
                <p className={`mt-1 text-2xl font-bold ${c.color ?? "text-slate-900"}`}>{c.value}</p>
              </div>
            ))}
          </div>

          {/* 탭 */}
          <div className="mb-5 flex gap-2 border-b border-slate-200">
            {(["진행중", "완료"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`-mb-px px-4 pb-3 text-sm font-semibold transition-colors ${
                  tab === t
                    ? "border-b-2 border-teal-600 text-teal-700"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t} ({t === "진행중" ? inProgress.length : done.length})
              </button>
            ))}
          </div>

          {/* 과제 카드 목록 */}
          <div className="space-y-3">
            {list.length === 0 && (
              <div className="py-12 text-center text-slate-400">
                <p className="text-lg">과제가 없습니다.</p>
              </div>
            )}
            {list.map((assignment) => {
              const sub = getSubmission(assignment.id);
              const daysLeft = sub
                ? null
                : Math.ceil(
                    (new Date(assignment.dueDate).getTime() - Date.now()) /
                      (1000 * 60 * 60 * 24)
                  );

              return (
                <div
                  key={assignment.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold">{assignment.title}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${difficultyColor[assignment.difficulty]}`}>
                          난이도 {assignment.difficulty}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                          {assignment.type}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        단원: {assignment.unit} · {assignment.questionCount}문항
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        마감일: {assignment.dueDate}
                        {daysLeft !== null && daysLeft >= 0 && (
                          <span className={`ml-2 font-semibold ${daysLeft <= 1 ? "text-rose-500" : "text-amber-500"}`}>
                            (D-{daysLeft})
                          </span>
                        )}
                        {daysLeft !== null && daysLeft < 0 && (
                          <span className="ml-2 font-semibold text-rose-500">(기간 초과)</span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {sub ? (
                        <>
                          {sub.score !== null && (
                            <span className="text-lg font-bold text-teal-600">{sub.score}점</span>
                          )}
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${submissionStateColor[sub.state]}`}>
                            {sub.state}
                          </span>
                          {sub.state === "피드백완료" && (
                            <Link
                              href={`/student/assignments/${sub.id}`}
                              className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-500"
                            >
                              결과 보기
                            </Link>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={() => alert("풀이 제출 화면은 다음 단계에서 연결됩니다.")}
                          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                        >
                          풀기 시작
                        </button>
                      )}
                    </div>
                  </div>

                  {sub?.state === "피드백완료" && sub.teacherFeedback && (
                    <div className="mt-4 rounded-xl bg-amber-50 px-4 py-3">
                      <p className="text-xs font-semibold text-amber-700">선생님 피드백</p>
                      <p className="mt-1 text-sm text-amber-900">{sub.teacherFeedback}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
