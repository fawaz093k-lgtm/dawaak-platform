import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "دواءك | منصة الأدوية للصيدليات",
  description: "منصة B2B تربط الصيدليات بمستودعات الأدوية",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
