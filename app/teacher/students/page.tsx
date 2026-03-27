"use client";

import Link from "next/link";
import { useState } from "react";
import { students } from "@/lib/data";

const statusColor: Record<string, string> = {
  양호: "bg-emerald-100 text-emerald-700",
  주의: "bg-amber-100 text-amber-700",
  긴급: "bg-rose-100 text-rose-700",
};

const taskColor: Record<string, string> = {
  완료: "bg-emerald-100 text-emerald-700",
  채점대기: "bg-indigo-100 text-indigo-700",
  미제출: "bg-rose-100 text-rose-700",
  진행중: "bg-amber-100 text-amber-700",
};

export default function StudentListPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("전체");

  const filtered = students.filter((s) => {
    const matchSearch =
      s.name.includes(search) || s.grade.includes(search) || s.school.includes(search);
    const matchStatus = filterStatus === "전체" || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

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
            <Link href="/teacher/students" className="block rounded-lg bg-indigo-50 px-3 py-2 font-semibold text-indigo-700">학생 관리</Link>
            <Link href="/teacher/assignments/new" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">과제 생성</Link>
            <Link href="/teacher" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">채점 대기함</Link>
            <Link href="/teacher" className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">학습 리포트</Link>
          </nav>
          <div className="mt-10 border-t border-slate-200 pt-4">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-800">서비스 소개로 이동</Link>
          </div>
        </aside>

        {/* 메인 */}
        <section className="px-6 py-8 lg:px-10">
          {/* 헤더 */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">학생 관리</h1>
              <p className="mt-1 text-sm text-slate-500">총 {students.length}명의 학생을 관리 중입니다.</p>
            </div>
            <Link
              href="/teacher/assignments/new"
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              + AI 과제 생성
            </Link>
          </div>

          {/* 필터 + 검색 */}
          <div className="mb-5 flex flex-wrap gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="이름, 학년, 학교 검색..."
              className="w-64 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm outline-none focus:border-indigo-400"
            />
            {["전체", "양호", "주의", "긴급"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  filterStatus === s
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* 요약 카드 */}
          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            {[
              { label: "전체 학생", value: students.length + "명", color: "text-slate-900" },
              { label: "주의 학생", value: students.filter((s) => s.status === "주의").length + "명", color: "text-amber-600" },
              { label: "긴급 학생", value: students.filter((s) => s.status === "긴급").length + "명", color: "text-rose-600" },
            ].map((card) => (
              <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">{card.label}</p>
                <p className={`mt-1 text-2xl font-bold ${card.color}`}>{card.value}</p>
              </div>
            ))}
          </div>

          {/* 학생 테이블 */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3.5">이름</th>
                  <th className="px-5 py-3.5">학년</th>
                  <th className="px-5 py-3.5 hidden sm:table-cell">학교</th>
                  <th className="px-5 py-3.5">진도</th>
                  <th className="px-5 py-3.5">최근점수</th>
                  <th className="px-5 py-3.5 hidden md:table-cell">과제</th>
                  <th className="px-5 py-3.5">상태</th>
                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-5 py-3.5 font-medium">{student.name}</td>
                    <td className="px-5 py-3.5 text-slate-600">{student.grade}</td>
                    <td className="hidden px-5 py-3.5 text-slate-600 sm:table-cell">{student.school}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-indigo-500"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-slate-800">{student.score}</span>
                      <span className="text-xs text-slate-400">점</span>
                    </td>
                    <td className="hidden px-5 py-3.5 md:table-cell">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${taskColor[student.task]}`}>
                        {student.task}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[student.status]}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/teacher/students/${student.id}`}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100"
                      >
                        상세보기
                      </Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-10 text-center text-slate-400">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
