import Link from "next/link";

const valueProps = [
  { title: "과제 제작 시간 70~80% 단축", desc: "학생별 단원/난이도 기반으로 AI가 과제를 자동 구성" },
  { title: "학생별 맞춤 관리", desc: "진도·점수·오답 패턴을 묶어 우선순위를 한눈에 확인" },
  { title: "채점/피드백 자동화", desc: "객관식 자동 채점 + 서술형 AI 1차 분석 + 교사 최종 확인" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <header className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1.2fr_.8fr] md:p-8">
          <div>
            <p className="mb-2 text-sm font-semibold text-indigo-600">AI 온택트 수학 관리 플랫폼</p>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">1:1 온택트 과외로 내신 & 수능 대비 시작</h1>
            <p className="mt-4 max-w-xl text-slate-600">
              선생 1명이 10~50명의 학생을 밀착 관리할 수 있도록 과제 생성, 채점, 피드백을 하나의 대시보드로 통합했어.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/teacher" className="rounded-full bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-500">
                선생 페이지 보기
              </Link>
              <Link href="/student" className="rounded-full border border-slate-300 px-5 py-2.5 font-semibold hover:bg-slate-100">
                학생 페이지 보기
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-lg font-semibold">로그인</h2>
            <p className="mt-1 text-sm text-slate-600">교사/학생 계정으로 바로 시작</p>
            <form className="mt-4 space-y-3">
              <input className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm" placeholder="아이디" />
              <input className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm" placeholder="비밀번호" type="password" />
              <button type="button" className="h-11 w-full rounded-xl bg-indigo-600 font-semibold text-white hover:bg-indigo-500">
                로그인
              </button>
            </form>
          </aside>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {valueProps.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
