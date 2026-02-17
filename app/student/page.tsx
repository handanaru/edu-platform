import Link from "next/link";

const missions = [
  { title: "중2 함수 개념 정리", due: "오늘 21:00", status: "진행중", progress: 42 },
  { title: "연립방정식 응용 10문제", due: "내일 18:00", status: "미시작", progress: 0 },
  { title: "서술형 오답노트 복습", due: "목요일 20:00", status: "완료", progress: 100 },
];

const statusClass: Record<string, string> = {
  진행중: "bg-blue-100 text-blue-700",
  미시작: "bg-slate-100 text-slate-700",
  완료: "bg-emerald-100 text-emerald-700",
};

export default function StudentPage() {
  return (
    <main className="min-h-screen bg-[#f5f6f8] text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_1fr]">
        <aside className="border-r border-slate-200 bg-white px-5 py-6">
          <div className="mb-8">
            <p className="text-2xl font-extrabold tracking-tight">밀당Study</p>
            <p className="mt-1 text-xs text-slate-500">학생 학습 포털</p>
          </div>

          <nav className="space-y-1 text-sm">
            <button className="w-full rounded-lg bg-emerald-50 px-3 py-2 text-left font-semibold text-emerald-700">오늘의 미션</button>
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
              <h1 className="text-3xl font-bold">오늘의 미션</h1>
              <p className="mt-1 text-sm text-slate-600">오늘 해야 할 학습 분량을 완료하고 성장 그래프를 채워봐.</p>
            </div>
            <button className="h-11 rounded-xl bg-indigo-600 px-4 font-semibold text-white hover:bg-indigo-500">풀이 사진 업로드</button>
          </header>

          <div className="grid gap-5 xl:grid-cols-[1.5fr_.9fr]">
            <section className="space-y-3">
              {missions.map((m) => (
                <article key={m.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">{m.title}</h2>
                      <p className="mt-1 text-sm text-slate-600">마감: {m.due}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[m.status]}`}>{m.status}</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full rounded-full bg-indigo-500" style={{ width: `${m.progress}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">진행률 {m.progress}%</p>
                </article>
              ))}
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

              <article className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-center shadow-sm">
                <p className="text-sm text-slate-500">아직 분석 리포트가 없어요.</p>
                <button className="mt-3 rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100">리포트 생성하기</button>
              </article>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
