import Link from "next/link";

const missions = [
  { title: "중2 함수 개념 정리", due: "오늘 21:00", status: "진행중", progress: 42 },
  { title: "연립방정식 응용 10문제", due: "내일 18:00", status: "미시작", progress: 0 },
  { title: "서술형 오답노트 복습", due: "목요일 20:00", status: "완료", progress: 100 },
];

const wrongNote = [
  { unit: "일차함수", reason: "기울기 해석 실수", retry: "오늘" },
  { unit: "연립방정식", reason: "대입 순서 혼동", retry: "내일" },
];

const reports = [
  { label: "주간 학습시간", value: "11시간 20분" },
  { label: "이번 주 정답률", value: "82%" },
  { label: "누적 제출률", value: "94%" },
];

const submissions = [
  { task: "중2 함수 개념 정리", submittedAt: "오늘 19:12", state: "채점대기" },
  { task: "식의 계산 보충", submittedAt: "어제 21:43", state: "피드백완료" },
];

const statusClass: Record<string, string> = {
  진행중: "bg-blue-100 text-blue-700",
  미시작: "bg-slate-100 text-slate-700",
  완료: "bg-emerald-100 text-emerald-700",
  채점대기: "bg-indigo-100 text-indigo-700",
  피드백완료: "bg-emerald-100 text-emerald-700",
};

export default function StudentPage() {
  return (
    <main className="min-h-screen bg-[#f5f6f8] text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_1fr]">
        <aside className="border-r border-slate-200 bg-white px-5 py-6">
          <div className="mb-8">
            <p className="text-2xl font-extrabold tracking-tight text-indigo-600">SODOMATCH</p>
            <p className="mt-1 text-xs text-slate-500">학생 학습 포털</p>
          </div>

          <nav className="space-y-1 text-sm">
            <button className="w-full rounded-lg bg-indigo-50 px-3 py-2 text-left font-semibold text-indigo-700">대시보드</button>
            <button className="w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100">오늘의 미션</button>
            <button className="w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100">학습 리포트</button>
            <button className="w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100">AI 오답 노트</button>
            <button className="w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100">제출 내역</button>
            <button className="w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100">계정 관리</button>
          </nav>

          <div className="mt-10 border-t border-slate-200 pt-4">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-800">서비스 소개로 이동</Link>
          </div>
        </aside>

        <section className="px-6 py-8 lg:px-10">
          <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold">학습 대시보드</h1>
              <p className="mt-1 text-sm text-slate-600">미션, 오답, 제출 상태를 한 번에 확인하고 오늘 할 일을 정리해.</p>
            </div>
            <div className="flex gap-2">
              <button className="h-11 rounded-xl border border-slate-300 px-4 text-sm font-semibold hover:bg-slate-100">AI 오답노트 열기</button>
              <button className="h-11 rounded-xl bg-indigo-600 px-4 font-semibold text-white hover:bg-indigo-500">풀이 사진 업로드</button>
            </div>
          </header>

          <section className="mb-5 grid gap-3 md:grid-cols-3">
            {reports.map((r) => (
              <article key={r.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">{r.label}</p>
                <strong className="mt-1 block text-xl">{r.value}</strong>
              </article>
            ))}
          </section>

          <div className="grid gap-5 xl:grid-cols-[1.5fr_.9fr]">
            <section className="space-y-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="text-lg font-semibold">오늘의 미션</h2>
                <div className="mt-3 space-y-3">
                  {missions.map((m) => (
                    <div key={m.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold">{m.title}</h3>
                          <p className="mt-1 text-sm text-slate-600">마감: {m.due}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[m.status]}`}>{m.status}</span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full rounded-full bg-indigo-500" style={{ width: `${m.progress}%` }} />
                      </div>
                      <p className="mt-2 text-xs text-slate-500">진행률 {m.progress}%</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="text-lg font-semibold">제출 내역</h2>
                <div className="mt-3 space-y-2">
                  {submissions.map((s) => (
                    <div key={s.task} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                      <div>
                        <p className="text-sm font-medium">{s.task}</p>
                        <p className="text-xs text-slate-500">제출: {s.submittedAt}</p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[s.state]}`}>{s.state}</span>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <aside className="space-y-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-base font-semibold">나의 성장 그래프</h3>
                <div className="mt-3 space-y-2">
                  {[72, 76, 81, 86, 89].map((v, i) => (
                    <div key={i}>
                      <div className="mb-1 flex justify-between text-xs text-slate-500"><span>{i + 1}주차</span><span>{v}점</span></div>
                      <div className="h-2 rounded-full bg-slate-200"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${v}%` }} /></div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-base font-semibold">AI 오답 노트</h3>
                <div className="mt-3 space-y-2">
                  {wrongNote.map((w) => (
                    <div key={w.unit} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-sm font-medium">{w.unit}</p>
                      <p className="mt-1 text-xs text-slate-600">오류 원인: {w.reason}</p>
                      <p className="mt-1 text-xs text-indigo-700">재풀이 권장: {w.retry}</p>
                    </div>
                  ))}
                </div>
              </article>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
