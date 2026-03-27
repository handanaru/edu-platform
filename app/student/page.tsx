"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const DEMO_ACCOUNTS = [
  { id: "student01", pw: "sodo1234" },
  { id: "student02", pw: "study1234" },
];

const missions = [
  { title: "중2 함수 개념 정리", due: "오늘 21:00", status: "진행중", progress: 42, remain: "약 35분" },
  { title: "연립방정식 응용 10문제", due: "내일 18:00", status: "미시작", progress: 0, remain: "약 50분" },
  { title: "서술형 오답노트 복습", due: "목요일 20:00", status: "완료", progress: 100, remain: "완료" },
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

const growth = [72, 76, 81, 86, 89];

const statusClass: Record<string, string> = {
  진행중: "bg-blue-100 text-blue-700",
  미시작: "bg-amber-100 text-amber-700",
  완료: "bg-emerald-100 text-emerald-700",
  채점대기: "bg-indigo-100 text-indigo-700",
  피드백완료: "bg-emerald-100 text-emerald-700",
};

export default function StudentPage() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem("sodomatch-student-auth") === "1";
    } catch {
      return false;
    }
  });
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [loginError, setLoginError] = useState("");

  const linePath = useMemo(() => {
    const width = 260;
    const height = 92;
    const step = width / (growth.length - 1);
    const mapY = (v: number) => Math.round(height - ((v - 60) / 40) * 72 - 10);
    return growth.map((v, i) => `${i === 0 ? "M" : "L"} ${Math.round(i * step)} ${mapY(v)}`).join(" ");
  }, []);

  const jump = (id: string, menu: string) => {
    setActiveMenu(menu);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const doLogin = () => {
    const id = loginId.trim();
    const pw = loginPw.trim();
    if (!id || !pw) {
      setLoginError("아이디/비밀번호를 입력해줘.");
      return;
    }

    const ok = DEMO_ACCOUNTS.some((acc) => acc.id === id && acc.pw === pw);
    if (!ok) {
      setLoginError("임시 계정 정보가 맞지 않아. 다시 확인해줘.");
      return;
    }

    try { localStorage.setItem("sodomatch-student-auth", "1"); } catch {}
    setLoginError("");
    setLoggedIn(true);
  };

  const doLogout = () => {
    try { localStorage.removeItem("sodomatch-student-auth"); } catch {}
    setLoggedIn(false);
    setLoginError("");
  };

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-[#F8F9FA] text-slate-900 grid place-items-center px-4">
        <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-2xl font-extrabold tracking-tight text-indigo-600">SODOMATCH</p>
          <h1 className="mt-2 text-2xl font-bold">학생 로그인</h1>
          <p className="mt-1 text-sm text-slate-600">학습 대시보드를 보려면 로그인해줘.</p>
          <div className="mt-5 space-y-3">
            <input
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              placeholder="아이디"
            />
            <input
              value={loginPw}
              onChange={(e) => setLoginPw(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") doLogin(); }}
              type="password"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              placeholder="비밀번호"
            />
            {loginError ? <p className="text-xs text-rose-600">{loginError}</p> : null}
            <button onClick={doLogin} className="h-11 w-full rounded-xl bg-indigo-600 font-semibold text-white hover:bg-indigo-500">
              로그인
            </button>
            <div className="rounded-lg bg-slate-50 p-2 text-xs text-slate-600">
              임시 계정: <b>student01 / sodo1234</b><br/>
              예비 계정: <b>student02 / study1234</b>
            </div>
            <Link href="/" className="block text-center text-sm text-slate-500 hover:text-slate-800">서비스 소개로 이동</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_1fr]">
        <aside className="border-r border-slate-200 bg-white px-5 py-6">
          <div className="mb-8">
            <p className="text-2xl font-extrabold tracking-tight text-indigo-600">SODOMATCH</p>
            <p className="mt-1 text-xs text-slate-500">학생 학습 포털</p>
          </div>

          <nav className="space-y-1 text-sm">
            <button onClick={() => jump("section-dashboard", "dashboard")} className={`w-full rounded-lg px-3 py-2 text-left ${activeMenu === "dashboard" ? "bg-indigo-50 font-semibold text-indigo-700" : "text-slate-700 hover:bg-slate-100"}`}>대시보드</button>
            <button onClick={() => jump("section-mission", "mission")} className={`w-full rounded-lg px-3 py-2 text-left ${activeMenu === "mission" ? "bg-indigo-50 font-semibold text-indigo-700" : "text-slate-700 hover:bg-slate-100"}`}>오늘의 미션</button>
            <Link href="/student/assignments" className="block w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100">과제 목록</Link>
            <button onClick={() => jump("section-report", "report")} className={`w-full rounded-lg px-3 py-2 text-left ${activeMenu === "report" ? "bg-indigo-50 font-semibold text-indigo-700" : "text-slate-700 hover:bg-slate-100"}`}>학습 리포트</button>
            <button onClick={() => jump("section-wrongnote", "wrong" )} className={`w-full rounded-lg px-3 py-2 text-left ${activeMenu === "wrong" ? "bg-indigo-50 font-semibold text-indigo-700" : "text-slate-700 hover:bg-slate-100"}`}>AI 오답 노트</button>
            <button onClick={() => jump("section-submission", "submit")} className={`w-full rounded-lg px-3 py-2 text-left ${activeMenu === "submit" ? "bg-indigo-50 font-semibold text-indigo-700" : "text-slate-700 hover:bg-slate-100"}`}>제출 내역</button>
            <button onClick={() => jump("section-account", "account")} className={`w-full rounded-lg px-3 py-2 text-left ${activeMenu === "account" ? "bg-indigo-50 font-semibold text-indigo-700" : "text-slate-700 hover:bg-slate-100"}`}>계정 관리</button>
          </nav>

          <div className="mt-10 border-t border-slate-200 pt-4 space-y-2">
            <button onClick={doLogout} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-left text-sm font-semibold hover:bg-slate-100">로그아웃(상단)</button>
            <Link href="/" className="block text-xs text-slate-500 hover:text-slate-800">서비스 소개로 이동</Link>
          </div>
        </aside>

        <section className="px-6 py-8 lg:px-10" id="section-dashboard">
          <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold">학습 대시보드</h1>
              <p className="mt-1 text-sm text-slate-600">미션, 오답, 제출 상태를 한 번에 확인하고 오늘 할 일을 정리해.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-11 rounded-xl border border-slate-300 px-4 text-sm font-semibold hover:bg-slate-100">🔔</button>
              <button onClick={doLogout} className="h-11 rounded-xl border border-slate-300 px-4 text-sm font-semibold hover:bg-slate-100">로그아웃(상단)</button>
              <button onClick={() => jump("section-wrongnote", "wrong")} className="h-11 rounded-xl border border-slate-300 px-4 text-sm font-semibold hover:bg-slate-100">AI 오답노트 열기</button>
              <Link href="/teacher/live?from=student" className="h-11 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-400">선생님과 실시간 연결</Link>
              <button onClick={() => setUploadOpen(true)} className="h-11 rounded-xl bg-indigo-600 px-4 font-semibold text-white hover:bg-indigo-500">풀이 사진 업로드</button>
            </div>
          </header>

          <section className="mb-5 grid gap-3 md:grid-cols-3" id="section-report">
            {reports.map((r) => (
              <article key={r.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">{r.label}</p>
                <strong className="mt-1 block text-3xl leading-none">{r.value}</strong>
              </article>
            ))}
          </section>

          <div className="grid gap-5 xl:grid-cols-[1.5fr_.9fr]">
            <section className="space-y-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" id="section-mission">
                <h2 className="text-lg font-semibold">오늘의 미션</h2>
                <div className="mt-4 space-y-4">
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
                      <p className="mt-2 text-xs text-slate-500">진행률 {m.progress}% · 남은 시간 {m.remain}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" id="section-submission">
                <h2 className="text-lg font-semibold">제출 내역</h2>
                <div className="mt-3 space-y-2">
                  {submissions.map((s) => (
                    <div key={s.task} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                      <div>
                        <p className="text-sm font-medium">{s.task}</p>
                        <p className="text-xs text-slate-500">제출: {s.submittedAt}</p>
                      </div>
                      <button
                        onClick={() => s.state === "피드백완료" && setFeedbackOpen(true)}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[s.state]}`}
                      >
                        {s.state}
                      </button>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <aside className="space-y-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-base font-semibold">나의 성장 그래프</h3>
                <svg viewBox="0 0 260 92" className="mt-3 w-full">
                  <path d={linePath} stroke="#14b8a6" strokeWidth="3" fill="none" />
                  {growth.map((v, i) => (
                    <circle key={i} cx={(260 / (growth.length - 1)) * i} cy={Math.round(92 - ((v - 60) / 40) * 72 - 10)} r="3.8" fill="#14b8a6" />
                  ))}
                </svg>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" id="section-wrongnote">
                <h3 className="text-base font-semibold">AI 오답 노트</h3>
                <div className="mt-3 space-y-2">
                  {wrongNote.map((w) => (
                    <div key={w.unit} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-sm font-medium">{w.unit}</p>
                      <p className="mt-1 text-xs text-slate-600">오류 원인: {w.reason}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xs text-indigo-700">재풀이 권장: {w.retry}</p>
                        <button onClick={() => alert(`${w.unit} 유사 문제 세트를 불러올게.`)} className="rounded-md border border-slate-300 px-2 py-1 text-xs hover:bg-white">유사 문제 풀기</button>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </aside>
          </div>

          <section id="section-account" className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">계정 관리</h2>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              <button onClick={() => alert("비밀번호 변경 화면은 다음 단계에서 연결할게.")} className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">비밀번호 변경</button>
              <button onClick={() => alert("알림 수신 설정을 저장했어.")} className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">알림 설정</button>
              <button onClick={() => alert("학습 데이터 내보내기 요청 완료.")} className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">학습 데이터 내보내기</button>
            </div>
          </section>

        </section>
      </div>

      <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full bg-indigo-700 px-4 py-2 text-xs font-medium text-white shadow-lg">
        선생님이 학습을 모니터링 중입니다.
      </div>

      {feedbackOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4" onClick={() => setFeedbackOpen(false)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h4 className="text-lg font-semibold">피드백 상세</h4>
            <p className="mt-2 text-sm text-slate-600">선생님 음성 피드백: “2번 풀이에서 식 정리 순서만 고치면 정답이야.”</p>
            <p className="mt-2 text-sm text-slate-600">판서 캡처: 함수 그래프 교점 표시 완료</p>
            <button className="mt-4 h-10 w-full rounded-lg bg-indigo-600 text-white" onClick={() => setFeedbackOpen(false)}>닫기</button>
          </div>
        </div>
      )}

      {uploadOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4" onClick={() => setUploadOpen(false)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h4 className="text-lg font-semibold">풀이 사진 업로드</h4>
            <p className="mt-2 text-sm text-slate-600">사진 업로드 기능은 다음 단계에서 연결해. 현재는 UX 동선만 활성화했어.</p>
            <button className="mt-4 h-10 w-full rounded-lg bg-indigo-600 text-white" onClick={() => setUploadOpen(false)}>확인</button>
          </div>
        </div>
      )}
    </main>
  );
}
