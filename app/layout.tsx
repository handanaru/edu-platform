import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 수학 학습 플랫폼 | SODOMATCH",
  description: "AI 기반 맞춤형 수학 학습 플랫폼 MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
