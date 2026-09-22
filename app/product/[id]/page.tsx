export default function ProductPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 pb-24">
      <header className="flex items-center gap-3 mb-6">
        <a href="/" className="text-accent">←</a>
        <h1 className="text-lg font-bold">تفاصيل المنتج</h1>
      </header>

      {/* Product Info */}
      <div className="p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] mb-6">
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-xl bg-accent/10 flex items-center justify-center text-3xl">💊</div>
          <div>
            <h2 className="text-xl font-bold">اتورفاستاتين 10 ملغ</h2>
            <p className="text-[var(--text-secondary)]">Atorvastatin 10 mg</p>
            <p className="text-sm mt-1">شركة ابن الهيثم</p>
            <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs">
              حب • علبة 30
            </span>
          </div>
        </div>
      </div>

      {/* Price Comparison */}
      <h3 className="font-bold mb-3">مقارنة الأسعار والمكافآت</h3>
      <div className="space-y-3 mb-8">
        {[
          { name: "مستودع الفواز", city: "دمشق", price: "10,100", bonus: "1+10", best: true },
          { name: "مستودع الجلجيف", city: "حلب", price: "10,400", bonus: "1+7", best: false },
          { name: "مسعود فارما", city: "دمشق", price: "10,800", bonus: "—", best: false },
        ].map((w, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl border ${w.best ? "border-accent bg-accent/5" : "border-[var(--border)] bg-[var(--card-bg)]"}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{w.name}</p>
                <p className="text-xs text-[var(--text-secondary)]">{w.city}</p>
              </div>
              <div className="text-left">
                <p className="font-bold text-accent">{w.price} ل.س</p>
                <p className="text-xs text-[var(--text-secondary)]">بونص: {w.bonus}</p>
              </div>
            </div>
            <button className="mt-3 w-full py-2 rounded-lg bg-accent text-white text-sm hover:bg-accent-hover transition">
              أضف للسلة
            </button>
          </div>
        ))}
      </div>

      {/* Stock Alert */}
      <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] flex items-center justify-between">
        <div>
          <p className="font-medium">نبهني عند التوفر</p>
          <p className="text-sm text-[var(--text-secondary)]">لو نفذ من كل المستودعات</p>
        </div>
        <button className="px-4 py-2 rounded-lg border border-accent text-accent text-sm">
          تفعيل التنبيه
        </button>
      </div>
    </main>
  );
}
