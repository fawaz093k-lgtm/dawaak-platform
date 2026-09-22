export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white font-bold text-xl">
            +
          </div>
          <div>
            <h1 className="text-2xl font-bold text-accent">دواءك</h1>
            <p className="text-sm text-[var(--text-secondary)]">منصة الأدوية للصيدليات</p>
          </div>
        </div>
        <button className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover transition">
          تسجيل الدخول
        </button>
      </header>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="ابحث بالاسم التجاري أو العلمي أو الشركة..."
            className="w-full px-5 py-4 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] text-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {["+25,000 منتج", "+1,250 مستودع", "أسعار محدثة يومياً", "توصيل سريع"].map(
          (item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] text-center"
            >
              <p className="font-semibold text-accent">{item}</p>
            </div>
          )
        )}
      </div>

      {/* Placeholder products */}
      <h2 className="text-xl font-bold mb-4">الأدوية الأكثر طلباً</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-sm"
          >
            <h3 className="font-bold text-lg mb-1">بانادول أكتفاست</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-3">باراسيتامول + كافيين</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>مستودع الفواز</span>
                <span className="font-semibold text-accent">27,000 ل.س</span>
              </div>
              <div className="flex justify-between">
                <span>مستودع الجلجيف</span>
                <span className="font-semibold">28,500 ل.س</span>
              </div>
            </div>
            <button className="mt-4 w-full py-2 rounded-xl bg-accent text-white hover:bg-accent-hover transition">
              أضف للسلة
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
