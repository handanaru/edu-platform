import Link from "next/link";

const valueProps = [
  {
    icon: "⚡",
    title: "과제 제작 시간 70~80% 단축",
    desc: "AI가 학생별 단원/난이도 기반으로 과제를 자동 구성",
  },
  {
    icon: "🎯",
    title: "내신·수능 맞춤 관리",
    desc: "진도·점수·오답 패턴을 묶어 우선순위를 즉시 파악",
  },
  {
    icon: "🧠",
    title: "채점·피드백 자동화",
    desc: "객관식 자동 채점 + 서술형 AI 분석 + 교사 최종 확인",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] text-slate-900">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <header className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1.15fr_.85fr] md:p-9">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              <span>✨</span> SODOMATCH AI 학습 관리
            </p>
            <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
              1:1 온택트 과외로
              <br />
              내신 & 수능 대비를 더 정확하게
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-slate-600">
              선생 1명이 10~50명의 학생을 밀착 관리할 수 있도록,
              과제 생성·채점·피드백·리포트를 하나의 화면으로 통합했어.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/student"
                className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                학생 데모 보기
              </Link>
              <Link
                href="/teacher"
                className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold hover:bg-slate-100"
              >
                선생 데모 보기
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
            <h2 className="text-lg font-semibold">로그인</h2>
            <p className="mt-1 text-sm text-slate-600">교사/학생 테스트 계정으로 바로 체험</p>
            <form className="mt-4 space-y-3">
              <input className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm" placeholder="아이디 (예: student01)" />
              <input className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm" placeholder="비밀번호" type="password" />
              <button type="button" className="h-11 w-full rounded-xl bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-500">
                로그인하고 시작하기
              </button>
            </form>
            <p className="mt-3 text-xs text-slate-500">* 테스트 계정은 데모 환경에서 순차 제공</p>
          </aside>
        </header>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {valueProps.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-lg">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold leading-6">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
