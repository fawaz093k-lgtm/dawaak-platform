export default function CartPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 pb-28">
      <header className="flex items-center gap-3 mb-6">
        <a href="/" className="text-accent">←</a>
        <h1 className="text-xl font-bold">سلة المشتريات</h1>
      </header>

      <div className="mb-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm flex items-center gap-2">
        <span>✓</span>
        <span>أسعارك مؤمنة — الأسعار محجوزة الآن ولن تتغير عند تأكيد الطلب</span>
      </div>

      {/* Warehouse 1 */}
      <div className="mb-6 p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">🏪</div>
          <div>
            <h2 className="font-bold">مستودع الفواز</h2>
            <p className="text-xs text-[var(--text-secondary)]">دمشق</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">اتورفاستاتين 10 ملغ</p>
              <p className="text-sm text-[var(--text-secondary)]">ابن الهيثم</p>
            </div>
            <div className="text-left">
              <p className="font-semibold text-accent">10,100 ل.س</p>
              <div className="flex items-center gap-2 mt-1">
                <button className="w-7 h-7 rounded-lg border border-[var(--border)]">−</button>
                <span>2</span>
                <button className="w-7 h-7 rounded-lg border border-[var(--border)]">+</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[var(--border)] flex justify-between font-medium">
          <span>إجمالي مستودع الفواز</span>
          <span className="text-accent">20,200 ل.س</span>
        </div>
      </div>

      {/* Warehouse 2 */}
      <div className="mb-6 p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">🏪</div>
          <div>
            <h2 className="font-bold">مستودع الجلجيف</h2>
            <p className="text-xs text-[var(--text-secondary)]">حلب</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">فالسارتان 80 ملغ</p>
              <p className="text-sm text-[var(--text-secondary)]">ابن الهيثم</p>
            </div>
            <div className="text-left">
              <p className="font-semibold text-accent">12,500 ل.س</p>
              <div className="flex items-center gap-2 mt-1">
                <button className="w-7 h-7 rounded-lg border border-[var(--border)]">−</button>
                <span>1</span>
                <button className="w-7 h-7 rounded-lg border border-[var(--border)]">+</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[var(--border)] flex justify-between font-medium">
          <span>إجمالي مستودع الجلجيف</span>
          <span className="text-accent">12,500 ل.س</span>
        </div>
      </div>

      {/* Total + Confirm */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--card-bg)] border-t border-[var(--border)]">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--text-secondary)]">الإجمالي الكلي</p>
            <p className="text-xl font-bold text-accent">32,700 ل.س</p>
          </div>
          <button className="px-8 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent-hover transition">
            تأكيد الطلب 🔒
          </button>
        </div>
      </div>
    </main>
  );
}
