import { getProducts } from "@/lib/sheets";
import ChangeNotifier from "@/components/ChangeNotifier";

export default async function Home() {
  const products = await getProducts();

  // بصمة بسيطة لاكتشاف أي تغيير في الأسعار أو عدد المنتجات
  const dataSignature = products
    .map((p) => `${p.id}:${p.priceFawaz}:${p.priceJalgheef}:${p.bonusFawaz}`)
    .join("|");

  return (
    <main className="min-h-screen p-4 md:p-8">
      <ChangeNotifier dataSignature={dataSignature} intervalSeconds={30} />

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
        <a
          href="/login"
          className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover transition"
        >
          تسجيل الدخول
        </a>
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
        <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] text-center">
          <p className="font-semibold text-accent">{products.length}+ منتج</p>
        </div>
        <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] text-center">
          <p className="font-semibold text-accent">3 مستودعات</p>
        </div>
        <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] text-center">
          <p className="font-semibold text-accent">أسعار محدثة</p>
        </div>
        <div className="p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] text-center">
          <p className="font-semibold text-accent">إشعارات فورية</p>
        </div>
      </div>

      {/* Products from Google Sheets */}
      <h2 className="text-xl font-bold mb-4">الأدوية المتوفرة</h2>

      {products.length === 0 ? (
        <p className="text-[var(--text-secondary)]">جاري تحميل البيانات من Google Sheets...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-sm"
            >
              <h3 className="font-bold text-lg mb-1">{p.tradeName}</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-1">{p.scientificName}</p>
              <p className="text-xs text-[var(--text-secondary)] mb-3">{p.company} • {p.form}</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>مستودع الفواز</span>
                  <span className="font-semibold text-accent">
                    {p.priceFawaz.toLocaleString()} ل.س
                    {p.bonusFawaz && (
                      <span className="text-xs text-[var(--text-secondary)] mr-1">
                        ({p.bonusFawaz})
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>مستودع الجلجيف</span>
                  <span className="font-semibold">
                    {p.priceJalgheef.toLocaleString()} ل.س
                    {p.bonusJalgheef && (
                      <span className="text-xs text-[var(--text-secondary)] mr-1">
                        ({p.bonusJalgheef})
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <a
                href={`/product/${p.id}`}
                className="mt-4 block w-full py-2 rounded-xl bg-accent text-white text-center hover:bg-accent-hover transition"
              >
                عرض التفاصيل
              </a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
