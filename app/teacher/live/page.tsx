import Link from "next/link";

export default function TeacherLivePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto w-full max-w-7xl px-6 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">실시간 화상 코칭 모드</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded-full bg-rose-500/20 px-3 py-1 text-rose-300">● 녹화중</span>
            <span className="rounded-full bg-white/10 px-3 py-1">수업시간 12:41</span>
            <Link href="/teacher" className="rounded-lg border border-white/20 px-3 py-1.5 hover:bg-white/10">대시보드</Link>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
          <aside className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h2 className="font-semibold">화상/채팅</h2>
            <div className="mt-3 grid gap-2">
              <div className="h-36 rounded-xl bg-slate-800 p-3 text-sm text-slate-300">교사 카메라</div>
              <div className="h-36 rounded-xl bg-slate-800 p-3 text-sm text-slate-300">학생 카메라</div>
            </div>
            <div className="mt-3 space-y-2 text-sm">
              <p className="rounded-lg bg-slate-800 px-3 py-2">학생: 4번 응용문제 설명 부탁해요.</p>
              <p className="rounded-lg bg-slate-800 px-3 py-2">교사: 지금 화이트보드에 풀이 적어줄게.</p>
            </div>
          </aside>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h2 className="font-semibold">공유 과제 + 실시간 판서</h2>
            <div className="mt-3 h-[520px] rounded-xl border border-dashed border-white/20 bg-slate-900/70 p-4 text-sm text-slate-300">
              DOCX/PDF 뷰어 + 화이트보드 레이어 영역
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
