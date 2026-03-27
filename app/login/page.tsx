"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { demoAccounts } from "@/lib/data";

export default function LoginPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const account = demoAccounts.find((a) => a.id === id && a.password === pw);
      if (!account) {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        setLoading(false);
        return;
      }
      if (account.role === "teacher") {
        router.push("/teacher");
      } else {
        router.push("/student");
      }
    }, 600);
  }

  function quickLogin(accountId: string, password: string) {
    setId(accountId);
    setPw(password);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-50 px-4">
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="mb-8 text-center">
          <Link href="/">
            <p className="text-3xl font-extrabold tracking-tight text-indigo-600">SODOMATCH</p>
          </Link>
          <p className="mt-1 text-sm text-slate-500">AI 기반 맞춤형 수학 학습 플랫폼</p>
        </div>

        {/* 로그인 카드 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <h1 className="text-xl font-bold text-slate-900">로그인</h1>
          <p className="mt-1 text-sm text-slate-500">계정에 로그인하여 학습을 시작하세요.</p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">아이디</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="teacher01 또는 student01"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">비밀번호</label>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="1234"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
              />
            </div>

            {error && (
              <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>

          {/* 테스트 계정 */}
          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              데모 계정으로 체험하기
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                onClick={() => quickLogin("teacher01", "1234")}
                className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-left text-xs hover:bg-indigo-100"
              >
                <p className="font-semibold text-indigo-700">교사 계정</p>
                <p className="text-slate-500">teacher01 / 1234</p>
              </button>
              <button
                onClick={() => quickLogin("student01", "1234")}
                className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-xs hover:bg-emerald-100"
              >
                <p className="font-semibold text-emerald-700">학생 계정</p>
                <p className="text-slate-500">student01 / 1234</p>
              </button>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">버튼 클릭 후 로그인 버튼을 눌러주세요.</p>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-slate-500">
          <Link href="/" className="hover:text-indigo-600 hover:underline">
            ← 서비스 소개 보기
          </Link>
        </p>
      </div>
    </main>
  );
}
