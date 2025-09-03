import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Login Demo",
  description: "Next.js login flow with localStorage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="">{children}</body>
    </html>
  );
}
