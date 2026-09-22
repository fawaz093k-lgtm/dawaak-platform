"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  /** بصمة بسيطة للبيانات الحالية (مثلاً عدد المنتجات + مجموع الأسعار) */
  dataSignature: string;
  intervalSeconds?: number;
};

export default function ChangeNotifier({ dataSignature, intervalSeconds = 30 }: Props) {
  const router = useRouter();
  const prevSignature = useRef<string>(dataSignature);
  const [showToast, setShowToast] = useState(false);
  const [countdown, setCountdown] = useState(intervalSeconds);

  // عداد التحديث التلقائي
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.refresh();
          return intervalSeconds;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [intervalSeconds, router]);

  // اكتشاف التغير بعد الـ refresh
  useEffect(() => {
    if (prevSignature.current && prevSignature.current !== dataSignature) {
      setShowToast(true);
      // إخفاء الإشعار بعد 5 ثواني
      const t = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(t);
    }
    prevSignature.current = dataSignature;
  }, [dataSignature]);

  return (
    <>
      {/* عداد التحديث */}
      <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--card-bg)] border border-[var(--border)] text-xs text-[var(--text-secondary)] shadow-sm">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span>تحديث خلال {countdown}ث</span>
      </div>

      {/* إشعار التغير الفوري */}
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-accent text-white shadow-lg">
            <span className="text-lg">🔔</span>
            <div>
              <p className="font-medium">تم تحديث الأسعار</p>
              <p className="text-sm opacity-90">في تغييرات جديدة في البيانات</p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="ml-2 opacity-70 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
