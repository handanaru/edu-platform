"use client";

import Link from "next/link";
import { useState } from "react";

const students = [
  { name: "김민지", grade: "중2", progress: 72, score: 84, task: "채점대기", status: "주의" },
  { name: "박준호", grade: "중3", progress: 88, score: 91, task: "완료", status: "양호" },
  { name: "이서연", grade: "고1", progress: 54, score: 62, task: "미제출", status: "긴급" },
  { name: "최도윤", grade: "고2", progress: 67, score: 77, task: "채점대기", status: "주의" },
];

const statusColor: Record<string, string> = {
  양호: "bg-emerald-100 text-emerald-700",
  주의: "bg-amber-100 text-amber-700",
  긴급: "bg-rose-100 text-rose-700",
};

const taskColor: Record<string, string> = {
  완료: "bg-emerald-100 text-emerald-700",
  채점대기: "bg-indigo-100 text-indigo-700",
  미제출: "bg-rose-100 text-rose-700",
};

export default function TeacherPage() {
  const [openAssignModal, setOpenAssignModal] = useState(false);

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_1fr]">
        <aside className="border-r border-slate-200 bg-white px-5 py-6">
          <div className="mb-8">
            <p className="text-2xl font-extrabold tracking-tight text-indigo-600">SODOMATCH</p>
            <p className="mt-1 text-xs text-slate-500">교사 관리 포털</p>
          </div>

          <nav className="space-y-1 text-sm">
            <button className="w-full rounded-lg bg-indigo-50 px-3 py-2 text-left font-semibold text-indigo-700">대시보드</button>
            <button className="w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100">학생 관리</button>
            <button className="w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100">과제 생성</button>
            <button className="w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100">채점 대기함</button>
            <button className="w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100">학습 리포트</button>
            <button className="w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100">실시간 채팅</button>
          </nav>

          <div className="mt-10 border-t border-slate-200 pt-4">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-800">서비스 소개로 이동</Link>
          </div>
        </aside>

        <section className="px-6 py-8 lg:px-10">
          <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold">교사 대시보드</h1>
              <p className="mt-1 text-sm text-slate-600">학생 현황, 과제, 채점을 한 화면에서 관리해.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-11 rounded-xl border border-slate-300 px-4 text-sm font-semibold hover:bg-slate-100">🔔 알림</button>
              <Link href="/teacher/live" className="h-11 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100">
                화상 코칭 강의실
              </Link>
              <button
                className="h-11 rounded-xl bg-indigo-600 px-4 font-semibold text-white hover:bg-indigo-500"
                onClick={() => setOpenAssignModal(true)}
              >
                AI 과제 생성
              </button>
            </div>
          </header>

          <section className="mb-5 grid gap-3 md:grid-cols-4">
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs text-slate-500">관리 학생 수</p>
              <strong className="mt-1 block text-3xl leading-none">36명</strong>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs text-slate-500">채점 대기</p>
              <strong className="mt-1 block text-3xl leading-none">12건</strong>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs text-slate-500">오늘 생성 과제</p>
              <strong className="mt-1 block text-3xl leading-none">8개</strong>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs text-slate-500">실시간 질문</p>
              <strong className="mt-1 block text-3xl leading-none">5건</strong>
            </article>
          </section>

          <div className="grid gap-5 xl:grid-cols-[1.45fr_.95fr]">
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-semibold">학생 현황 (신호등 우선순위)</h2>
              <div className="mt-3 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-slate-500">
                      <th className="px-2 py-2">학생</th>
                      <th className="px-2 py-2">진도율</th>
                      <th className="px-2 py-2">최근 점수</th>
                      <th className="px-2 py-2">과제 상태</th>
                      <th className="px-2 py-2">위험도</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr key={s.name} className="border-b border-slate-100">
                        <td className="px-2 py-3 font-medium">{s.name} · {s.grade}</td>
                        <td className="px-2 py-3">{s.progress}%</td>
                        <td className="px-2 py-3">{s.score}점</td>
                        <td className="px-2 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${taskColor[s.task]}`}>{s.task}</span>
                        </td>
                        <td className="px-2 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor[s.status]}`}>{s.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="space-y-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="text-base font-semibold">실시간 질문/채팅</h2>
                <div className="mt-3 space-y-2 text-sm">
                  <p className="rounded-lg bg-slate-100 p-2">민지: 3번 응용문제 힌트 부탁해요.</p>
                  <p className="rounded-lg bg-slate-100 p-2">준호: 과제 제출 완료했어요.</p>
                  <p className="rounded-lg bg-slate-100 p-2">서연: 미분 개념 다시 설명 부탁해요.</p>
                </div>
                <button className="mt-3 h-10 w-full rounded-lg border border-slate-300 text-sm font-semibold hover:bg-slate-100">채팅창 열기</button>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="text-base font-semibold">오늘의 우선 조치</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  <li>미제출 학생 1명 리마인드 전송</li>
                  <li>채점대기 12건 중 긴급 3건 우선 처리</li>
                  <li>주말 대비 심화 과제 세트 생성</li>
                </ul>
              </article>
            </aside>
          </div>
        </section>
      </div>

      {openAssignModal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4" onClick={() => setOpenAssignModal(false)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold">AI 과제 생성</h3>
            <p className="mt-1 text-sm text-slate-600">학생/단원/난이도 선택 후 맞춤 과제를 생성해.</p>
            <div className="mt-4 space-y-3 text-sm">
              <select className="w-full rounded-lg border border-slate-300 px-3 py-2">
                <option>학생 선택</option>
                <option>김민지 (중2)</option>
                <option>박준호 (중3)</option>
                <option>이서연 (고1)</option>
              </select>
              <select className="w-full rounded-lg border border-slate-300 px-3 py-2">
                <option>단원 선택</option>
                <option>일차함수</option>
                <option>연립방정식</option>
                <option>수열</option>
              </select>
              <select className="w-full rounded-lg border border-slate-300 px-3 py-2">
                <option>난이도 선택</option>
                <option>기본</option>
                <option>응용</option>
                <option>심화</option>
              </select>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="h-10 rounded-lg border border-slate-300" onClick={() => setOpenAssignModal(false)}>취소</button>
              <button className="h-10 rounded-lg bg-indigo-600 text-white">생성 시작</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
