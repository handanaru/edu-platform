"use client";

import Link from "next/link";
import { useState } from "react";
import { students } from "@/lib/data";

type Difficulty = "하" | "중" | "상";
type AssignmentType = "객관식" | "서술형" | "혼합";

const unitsByGrade: Record<string, string[]> = {
  중1: ["자연수와 정수", "유리수", "방정식", "함수의 기초", "도형의 기초"],
  중2: ["유리수와 순환소수", "연립방정식", "부등식", "일차함수", "도형의 성질"],
  중3: ["이차방정식", "이차함수", "확률", "통계", "삼각비"],
  고1: ["다항식", "방정식과 부등식", "도형의 방정식", "집합과 명제", "함수"],
  고2: ["지수·로그", "삼각함수", "수열", "극한", "미분"],
  고3: ["적분", "벡터", "확률과 통계", "수능 실전", "기출 분석"],
};

export default function NewAssignmentPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    grade: "고2",
    unit: "",
    difficulty: "중" as Difficulty,
    type: "혼합" as AssignmentType,
    questionCount: 10,
    dueDate: "",
    targetStudents: [] as string[],
    aiGenerate: true,
  });
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const units = unitsByGrade[form.grade] || [];

  function toggleStudent(id: string) {
    setForm((f) => ({
      ...f,
      targetStudents: f.targetStudents.includes(id)
        ? f.targetStudents.filter((s) => s !== id)
        : [...f.targetStudents, id],
    }));
  }

  function handleAIGenerate() {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1800);
  }

  function handleSubmit() {
    alert(
      `과제가 생성되었습니다!\n\n제목: ${form.title || "(" + form.unit + ") " + form.difficulty + " 난이도 과제"}\n단원: ${form.unit}\n대상: ${form.targetStudents.length}명\n문항수: ${form.questionCount}문항`
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[240px_1fr]">
        {/* 사이드바 */}
        <aside className="border-r border-slate-200 bg-white px-5 py-6">
          <div className="mb-8">
            <p className="text-2xl font-extrabold tracking-tight text-indigo-600">SODOMATCH</p>
            <p className="mt-1 text-xs text-slate-500">교사 관리 포털</p>
          </div>
          <nav className="space-y-1 text-sm">
            <Link href="/teacher" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">대시보드</Link>
            <Link href="/teacher/students" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">학생 관리</Link>
            <Link href="/teacher/assignments/new" className="block rounded-lg bg-indigo-50 px-3 py-2 font-semibold text-indigo-700">과제 생성</Link>
            <Link href="/teacher" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">채점 대기함</Link>
            <Link href="/teacher" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">학습 리포트</Link>
          </nav>
          <div className="mt-10 border-t border-slate-200 pt-4">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-800">서비스 소개로 이동</Link>
          </div>
        </aside>

        {/* 메인 */}
        <section className="px-6 py-8 lg:px-10">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">AI 과제 생성</h1>
            <p className="mt-1 text-sm text-slate-500">학생별 수준에 맞는 맞춤 과제를 AI가 자동으로 구성합니다.</p>
          </div>

          {/* 스텝 인디케이터 */}
          <div className="mb-8 flex items-center gap-3">
            {["과제 설정", "대상 학생", "AI 생성 & 확인"].map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    step > i + 1
                      ? "bg-emerald-500 text-white"
                      : step === i + 1
                      ? "bg-indigo-600 text-white"
                      : "border-2 border-slate-200 bg-white text-slate-400"
                  }`}
                >
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span className={`hidden text-sm sm:inline ${step === i + 1 ? "font-semibold text-slate-900" : "text-slate-400"}`}>
                  {label}
                </span>
                {i < 2 && <div className="h-px w-8 bg-slate-200" />}
              </div>
            ))}
          </div>

          <div className="max-w-2xl">
            {/* STEP 1: 과제 설정 */}
            {step === 1 && (
              <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold">과제 설정</h2>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">과제 제목 (선택)</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="비워두면 AI가 자동 생성합니다"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">학년</label>
                    <select
                      value={form.grade}
                      onChange={(e) => setForm({ ...form, grade: e.target.value, unit: "" })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400"
                    >
                      {Object.keys(unitsByGrade).map((g) => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">단원</label>
                    <select
                      value={form.unit}
                      onChange={(e) => setForm({ ...form, unit: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400"
                    >
                      <option value="">단원 선택</option>
                      {units.map((u) => (
                        <option key={u}>{u}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">난이도</label>
                  <div className="flex gap-2">
                    {(["하", "중", "상"] as Difficulty[]).map((d) => (
                      <button
                        key={d}
                        onClick={() => setForm({ ...form, difficulty: d })}
                        className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                          form.difficulty === d
                            ? "border-indigo-500 bg-indigo-600 text-white"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {d === "하" ? "기초 (하)" : d === "중" ? "심화 (중)" : "최고 (상)"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">유형</label>
                  <div className="flex gap-2">
                    {(["객관식", "서술형", "혼합"] as AssignmentType[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setForm({ ...form, type: t })}
                        className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                          form.type === t
                            ? "border-indigo-500 bg-indigo-600 text-white"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">문항 수</label>
                    <input
                      type="number"
                      min={5}
                      max={30}
                      value={form.questionCount}
                      onChange={(e) => setForm({ ...form, questionCount: parseInt(e.target.value) })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">마감일</label>
                    <input
                      type="date"
                      value={form.dueDate}
                      onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!form.unit}
                  className="mt-2 h-11 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
                >
                  다음: 대상 학생 선택
                </button>
              </div>
            )}

            {/* STEP 2: 대상 학생 */}
            {step === 2 && (
              <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold">대상 학생 선택</h2>
                <p className="text-sm text-slate-500">
                  과제를 보낼 학생을 선택하세요. 여러 명 선택 가능합니다.
                </p>

                <div className="space-y-2">
                  {students.map((s) => (
                    <label
                      key={s.id}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-colors ${
                        form.targetStudents.includes(s.id)
                          ? "border-indigo-400 bg-indigo-50"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={form.targetStudents.includes(s.id)}
                          onChange={() => toggleStudent(s.id)}
                          className="rounded"
                        />
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-700">
                          {s.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{s.name}</p>
                          <p className="text-xs text-slate-400">{s.grade} · {s.school}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-indigo-600">평균 {s.avgScore}점</p>
                        {s.weakUnits.includes(form.unit) && (
                          <p className="text-[10px] text-rose-500">취약 단원</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="h-11 flex-1 rounded-xl border border-slate-300 text-sm font-semibold hover:bg-slate-50"
                  >
                    이전
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={form.targetStudents.length === 0}
                    className="h-11 flex-[2] rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
                  >
                    다음: AI 문제 생성 ({form.targetStudents.length}명 선택)
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: AI 생성 */}
            {step === 3 && (
              <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold">AI 문제 생성 & 최종 확인</h2>

                {/* 요약 */}
                <div className="rounded-xl bg-slate-50 p-4 text-sm">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      ["단원", form.unit],
                      ["학년", form.grade],
                      ["난이도", form.difficulty],
                      ["유형", form.type],
                      ["문항 수", form.questionCount + "문항"],
                      ["대상 학생", form.targetStudents.length + "명"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-slate-500">{k}</span>
                        <span className="font-semibold">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI 생성 버튼 */}
                {!generated ? (
                  <button
                    onClick={handleAIGenerate}
                    disabled={generating}
                    className="h-12 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-semibold text-white hover:from-indigo-500 hover:to-violet-500 disabled:opacity-60"
                  >
                    {generating ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        AI가 문제를 생성 중입니다...
                      </span>
                    ) : (
                      "✨ AI로 문제 자동 생성"
                    )}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3">
                      <span className="text-emerald-600">✓</span>
                      <p className="text-sm text-emerald-700 font-medium">
                        {form.questionCount}개 문제가 생성되었습니다.
                      </p>
                    </div>

                    {/* 샘플 문제 미리보기 */}
                    <div className="rounded-xl border border-slate-200 p-4 space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">미리보기 (처음 3문항)</p>
                      {[
                        { no: 1, q: `[${form.unit}] 기본 개념 확인: 다음 중 올바른 것은?`, type: "객관식" },
                        { no: 2, q: `[${form.unit}] 계산 응용: 주어진 조건에서 값을 구하시오.`, type: form.type === "혼합" ? "서술형" : form.type },
                        { no: 3, q: `[${form.unit}] 심화: 다음 문제를 풀고 과정을 서술하시오.`, type: "서술형" },
                      ].map((q) => (
                        <div key={q.no} className="flex items-start gap-3 text-sm">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                            {q.no}
                          </span>
                          <div>
                            <p className="text-slate-700">{q.q}</p>
                            <span className="text-xs text-slate-400">[{q.type}]</span>
                          </div>
                        </div>
                      ))}
                      <p className="text-xs text-slate-400">+ {form.questionCount - 3}문항 더...</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="h-11 flex-1 rounded-xl border border-slate-300 text-sm font-semibold hover:bg-slate-50"
                  >
                    이전
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!generated}
                    className="h-11 flex-[2] rounded-xl bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
                  >
                    과제 발송하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
