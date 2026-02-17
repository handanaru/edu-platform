import Link from "next/link";

const students = [
  { name: "김민지", grade: "중2", progress: 72, score: 84, task: "채점대기", status: "주의" },
  { name: "박준호", grade: "중3", progress: 88, score: 91, task: "완료", status: "양호" },
  { name: "이서연", grade: "고1", progress: 54, score: 62, task: "미제출", status: "긴급" },
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
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-indigo-600">Teacher Dashboard</p>
            <h1 className="text-3xl font-bold">선생 페이지</h1>
          </div>
          <div className="flex gap-2">
            <button className="h-11 rounded-xl bg-indigo-600 px-4 font-semibold text-white hover:bg-indigo-500">AI 과제 생성</button>
            <Link href="/teacher/live" className="h-11 rounded-xl border border-slate-300 px-4 py-2.5 font-semibold hover:bg-slate-100">
              화상 코칭 열기
            </Link>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.6fr_.8fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold">학생 현황</h2>
            <div className="mt-4 grid gap-3">
              {students.map((s) => (
                <article key={s.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">{s.name} · {s.grade}</p>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[s.status]}`}>{s.status}</span>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-slate-700 md:grid-cols-3">
                    <p>진도율 <strong>{s.progress}%</strong></p>
                    <p>최근 점수 <strong>{s.score}점</strong></p>
                    <p>
                      과제 상태 <span className={`ml-1 rounded-full px-2 py-0.5 text-xs ${taskColor[s.task]}`}>{s.task}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold">실시간 질문/채팅</h2>
            <div className="mt-4 space-y-2 text-sm">
              <p className="rounded-lg bg-slate-100 p-2">민지: 3번 문제 풀이가 막혔어요.</p>
              <p className="rounded-lg bg-slate-100 p-2">준호: 오늘 과제 제출 완료했어요.</p>
              <p className="rounded-lg bg-slate-100 p-2">서연: 미분 개념 다시 설명 부탁해요.</p>
            </div>
            <button className="mt-4 h-10 w-full rounded-lg border border-slate-300 text-sm font-semibold hover:bg-slate-100">채팅창 열기</button>
          </aside>
        </div>
      </section>
    </main>
  );
}
