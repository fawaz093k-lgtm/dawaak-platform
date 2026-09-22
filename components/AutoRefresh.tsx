"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AutoRefresh({ intervalSeconds = 30 }: { intervalSeconds?: number }) {
  const router = useRouter();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [countdown, setCountdown] = useState(intervalSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.refresh(); // يحدث البيانات من السيرفر
          setLastUpdate(new Date());
          return intervalSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [intervalSeconds, router]);

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--card-bg)] border border-[var(--border)] text-xs text-[var(--text-secondary)] shadow-sm">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      <span>تحديث تلقائي خلال {countdown}ث</span>
    </div>
  );
}
