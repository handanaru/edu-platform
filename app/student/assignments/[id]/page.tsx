"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { submissions } from "@/lib/data";
import { useState } from "react";

export default function SubmissionResultPage() {
  const params = useParams();
  const submission = submissions.find((s) => s.id === params.id);
  const [showAll, setShowAll] = useState(false);

  if (!submission) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F9FA]">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-700">결과를 찾을 수 없습니다.</p>
          <Link href="/student/assignments" className="mt-4 inline-block rounded-xl bg-teal-600 px-4 py-2 text-sm text-white hover:bg-teal-500">
            과제 목록으로
          </Link>
        </div>
      </main>
    );
  }

  const correctCount = submission.questions.filter((q) => q.isCorrect).length;
  const totalCount = submission.questions.length;
  const percentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  const visibleQuestions = showAll ? submission.questions : submission.questions.slice(0, 3);

  const scoreColor =
    (submission.score ?? 0) >= 90
      ? "text-emerald-600"
      : (submission.score ?? 0) >= 70
      ? "text-indigo-600"
      : "text-rose-600";

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
          {/* 브레드크럼 */}
          <nav className="mb-5 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/student/assignments" className="hover:text-teal-600">과제 목록</Link>
            <span>/</span>
            <span className="font-medium text-slate-800">{submission.assignmentTitle}</span>
          </nav>

          {/* 결과 헤더 카드 */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold">{submission.assignmentTitle}</h1>
                <p className="mt-1 text-sm text-slate-500">
                  단원: {submission.unit} · 제출: {submission.submittedAt}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-4xl font-extrabold ${scoreColor}`}>
                  {submission.score}
                  <span className="text-lg font-normal text-slate-400">/{submission.totalScore}</span>
                </p>
                <p className="text-sm text-slate-500">
                  정답 {correctCount}/{totalCount}문항 ({percentage}%)
                </p>
              </div>
            </div>

            {/* 점수 바 */}
            <div className="mt-5">
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all ${
                    (submission.score ?? 0) >= 90
                      ? "bg-emerald-500"
                      : (submission.score ?? 0) >= 70
                      ? "bg-indigo-500"
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${submission.score ?? 0}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>0</span>
                <span>50</span>
                <span>70</span>
                <span>90</span>
                <span>100</span>
              </div>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {/* 문항별 결과 */}
            <div className="space-y-4 lg:col-span-2">
              <h2 className="text-base font-semibold">문항별 결과</h2>
              {submission.questions.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-400">
                  채점 결과가 아직 없습니다.
                </div>
              ) : (
                <>
                  {visibleQuestions.map((q) => (
                    <div
                      key={q.no}
                      className={`rounded-2xl border p-5 ${
                        q.isCorrect ? "border-emerald-200 bg-emerald-50/30" : "border-rose-200 bg-rose-50/30"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                              q.isCorrect
                                ? "bg-emerald-500 text-white"
                                : "bg-rose-500 text-white"
                            }`}
                          >
                            {q.isCorrect ? "O" : "X"}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{q.question}</p>
                            <div className="mt-2 space-y-1 text-xs">
                              <p>
                                <span className="text-slate-500">내 답: </span>
                                <span className={q.isCorrect ? "text-emerald-700 font-semibold" : "text-rose-700 font-semibold"}>
                                  {q.myAnswer}
                                </span>
                              </p>
                              {!q.isCorrect && (
                                <p>
                                  <span className="text-slate-500">정답: </span>
                                  <span className="text-emerald-700 font-semibold">{q.correctAnswer}</span>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-slate-700">
                            {q.score}/{q.maxScore}점
                          </p>
                        </div>
                      </div>

                      {/* AI 코멘트 */}
                      <div className="mt-3 flex items-start gap-2 rounded-lg bg-indigo-50 px-3 py-2">
                        <span className="mt-0.5 text-xs font-bold text-indigo-600">AI</span>
                        <p className="text-xs text-indigo-700">{q.aiComment}</p>
                      </div>
                    </div>
                  ))}

                  {submission.questions.length > 3 && (
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="w-full rounded-xl border border-slate-300 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                      {showAll ? "접기" : `나머지 ${submission.questions.length - 3}문항 더 보기`}
                    </button>
                  )}
                </>
              )}
            </div>

            {/* 피드백 사이드 */}
            <div className="space-y-4">
              {/* 선생님 피드백 */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">T</div>
                  <h3 className="text-sm font-semibold text-amber-900">선생님 피드백</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-amber-900">
                  {submission.teacherFeedback || "피드백이 아직 없습니다."}
                </p>
              </div>

              {/* AI 피드백 */}
              <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">AI</div>
                  <h3 className="text-sm font-semibold text-indigo-900">AI 분석</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-indigo-900">{submission.aiFeedback}</p>
              </div>

              {/* 다음 행동 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold">다음 학습 추천</h3>
                <div className="mt-3 space-y-2">
                  <button
                    onClick={() => alert("유사 문제 세트를 불러옵니다.")}
                    className="w-full rounded-xl border border-slate-300 py-2.5 text-sm hover:bg-slate-50"
                  >
                    유사 문제 더 풀기
                  </button>
                  <button
                    onClick={() => alert("오답 노트에 저장되었습니다.")}
                    className="w-full rounded-xl bg-teal-600 py-2.5 text-sm font-semibold text-white hover:bg-teal-500"
                  >
                    오답 노트에 저장
                  </button>
                  <Link
                    href="/student/assignments"
                    className="block w-full rounded-xl border border-slate-300 py-2.5 text-center text-sm hover:bg-slate-50"
                  >
                    과제 목록으로
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
