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

const rowTint: Record<string, string> = {
  양호: "bg-white",
  주의: "bg-amber-50/40",
  긴급: "bg-rose-50/40",
};

const taskColor: Record<string, string> = {
  완료: "bg-emerald-100 text-emerald-700",
  채점대기: "bg-indigo-100 text-indigo-700",
  미제출: "bg-rose-100 text-rose-700",
};

export default function TeacherPage() {
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const jump = (id: string, menu: string) => {
    setActiveMenu(menu);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_1fr]">
        <aside className="border-r border-slate-200 bg-white px-5 py-6">
          <div className="mb-8">
            <p className="text-2xl font-extrabold tracking-tight text-indigo-600">SODOMATCH</p>
            <p className="mt-1 text-xs text-slate-500">교사 관리 포털</p>
          </div>

          <nav className="space-y-1 text-sm">
            <button onClick={() => jump("section-dashboard", "dashboard")} className={`w-full rounded-lg px-3 py-2 text-left ${activeMenu === "dashboard" ? "bg-indigo-50 font-semibold text-indigo-700" : "text-slate-700 hover:bg-slate-100"}`}>대시보드</button>
            <Link href="/teacher/students" className="block w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100">학생 관리</Link>
            <Link href="/teacher/assignments/new" className="block w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100">과제 생성</Link>
            <button onClick={() => jump("section-students", "grading")} className="w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100">채점 대기함</button>
            <button onClick={() => jump("section-priority", "report")} className="w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100">학습 리포트</button>
            <button onClick={() => jump("section-chat", "chat")} className="w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100">실시간 채팅 <span className="ml-1 rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] text-rose-700">3</span></button>
          </nav>

          <div className="mt-10 border-t border-slate-200 pt-4">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-800">서비스 소개로 이동</Link>
          </div>
        </aside>

        <section className="px-6 py-8 lg:px-10" id="section-dashboard">
          <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold">교사 대시보드</h1>
              <p className="mt-1 text-sm text-slate-600">학생 현황, 과제, 채점을 한 화면에서 관리해.</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => alert("새 알림 5건\n- 채점 대기 3건\n- 실시간 질문 2건")} className="h-11 rounded-xl border border-slate-300 px-4 text-sm font-semibold hover:bg-slate-100">🔔 접속 학생 12명</button>
              <Link href="/teacher/live" className="h-11 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100">
                화상 코칭 강의실
              </Link>
              <Link
                href="/teacher/assignments/new"
                className="flex h-11 items-center rounded-xl bg-indigo-600 px-4 font-semibold text-white hover:bg-indigo-500"
              >
                AI 과제 생성
              </Link>
            </div>
          </header>

          <section className="mb-5 grid gap-3 md:grid-cols-4">
            <button onClick={() => jump("section-students", "students")} className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50">
              <p className="text-xs text-slate-500">관리 학생 수</p>
              <strong className="mt-1 block text-3xl leading-none">36명</strong>
            </button>
            <button onClick={() => jump("section-students", "grading")} className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50">
              <p className="text-xs text-slate-500">채점 대기</p>
              <strong className="mt-1 block text-3xl leading-none">12건</strong>
            </button>
            <button onClick={() => setOpenAssignModal(true)} className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50">
              <p className="text-xs text-slate-500">오늘 생성 과제</p>
              <strong className="mt-1 block text-3xl leading-none">8개</strong>
            </button>
            <button onClick={() => jump("section-chat", "chat")} className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:bg-slate-50">
              <p className="text-xs text-slate-500">실시간 질문</p>
              <strong className="mt-1 block text-3xl leading-none">5건</strong>
            </button>
          </section>

          <div className="grid gap-5 xl:grid-cols-[1.45fr_.95fr]">
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" id="section-students">
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
                      <th className="px-2 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s, i) => (
                      <tr key={s.name} className={`border-b border-slate-100 ${rowTint[s.status]}`}>
                        <td className="px-2 py-3 font-medium"><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle" style={{ backgroundColor: s.status === "긴급" ? "#ef4444" : s.status === "주의" ? "#f59e0b" : "#10b981" }} />{s.name} · {s.grade}</td>
                        <td className="px-2 py-3">{s.progress}%</td>
                        <td className="px-2 py-3">{s.score}점</td>
                        <td className="px-2 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${taskColor[s.task]}`}>{s.task}</span>
                        </td>
                        <td className="px-2 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor[s.status]}`}>{s.status}</span>
                        </td>
                        <td className="px-2 py-3">
                          <Link href={`/teacher/students/s0${i + 1}`} className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs hover:bg-slate-100">상세</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="space-y-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" id="section-chat">
                <h2 className="text-base font-semibold">실시간 질문/채팅</h2>
                <div className="mt-3 space-y-2 text-sm">
                  {[
                    { n: "김민지", q: "3번 응용문제 힌트 부탁해요." },
                    { n: "박준호", q: "과제 제출 완료했어요." },
                    { n: "이서연", q: "미분 개념 다시 설명 부탁해요." },
                  ].map((c) => (
                    <div key={c.n} className="flex items-start gap-2 rounded-lg bg-slate-100 p-2">
                      <span className="mt-0.5 inline-grid h-6 w-6 place-items-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">{c.n.slice(0,1)}</span>
                      <div className="flex-1">
                        <p className="text-xs font-semibold">{c.n}</p>
                        <p className="text-xs text-slate-700">{c.q}</p>
                      </div>
                      <button onClick={() => alert(`${c.n}에게 답장창을 열었어.`)} className="rounded-md border border-slate-300 px-2 py-1 text-xs hover:bg-white">답장하기</button>
                    </div>
                  ))}
                </div>
                <button onClick={() => alert("채팅 전체창으로 이동") } className="mt-3 h-10 w-full rounded-lg border border-slate-300 text-sm font-semibold hover:bg-slate-100">채팅창 열기</button>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" id="section-priority">
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
              <button className="h-10 rounded-lg bg-indigo-600 text-white" onClick={() => { setOpenAssignModal(false); alert("맞춤 과제 생성을 시작했어."); }}>생성 시작</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
