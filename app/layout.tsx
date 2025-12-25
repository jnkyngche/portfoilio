import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "zeroth Playground",
  description: "zeroth playground - 웹에서 하고 싶은 개발을 마구 해보는 곳",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
