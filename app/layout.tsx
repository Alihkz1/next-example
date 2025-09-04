import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dekamond",
  description: "Next.js login flow with localStorage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
