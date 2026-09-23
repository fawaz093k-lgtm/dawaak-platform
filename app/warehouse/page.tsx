export default function WarehouseDashboard() {
  return (
    <main className="min-h-screen p-4 md:p-8 pb-24">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <a href="/" className="text-accent text-xl">←</a>
          <div>
            <h1 className="text-xl font-bold">لوحة المستودع</h1>
            <p className="text-sm text-[var(--text-secondary)]">مستودع الفواز</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs dark:bg-green-900/30 dark:text-green-300">
          نشط
        </span>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
          <p className="text-xs text-[var(--text-secondary)] mb-1">طلبات اليوم</p>
          <p className="text-2xl font-bold text-accent">12</p>
        </div>
        <div className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
          <p className="text-xs text-[var(--text-secondary)] mb-1">قيد المعالجة</p>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
          <p className="text-xs text-[var(--text-secondary)] mb-1">تم التسليم</p>
          <p className="text-2xl font-bold text-green-600">7</p>
        </div>
        <div className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]">
          <p className="text-xs text-[var(--text-secondary)] mb-1">تنبيهات مخزون</p>
          <p className="text-2xl font-bold text-orange-500">3</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">أحدث الطلبات</h2>
        <a href="/orders" className="text-sm text-accent">عرض الكل</a>
      </div>

      <div className="space-y-3 mb-8">
        {[
          { id: "ORD-1025", pharmacy: "صيدلية الشفاء", amount: "45,200", status: "جديد", color: "bg-blue-100 text-blue-700" },
          { id: "ORD-1024", pharmacy: "صيدلية النهضة", amount: "18,500", status: "قيد التجهيز", color: "bg-yellow-100 text-yellow-700" },
          { id: "ORD-1023", pharmacy: "صيدلية الأمل", amount: "32,100", status: "تم الشحن", color: "bg-purple-100 text-purple-700" },
          { id: "ORD-1022", pharmacy: "صيدلية النور", amount: "9,800", status: "تم التسليم", color: "bg-green-100 text-green-700" },
        ].map((order) => (
          <div
            key={order.id}
            className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{order.id}</p>
              <p className="text-sm text-[var(--text-secondary)]">{order.pharmacy}</p>
            </div>
            <div className="text-left">
              <p className="font-semibold">{order.amount} ل.س</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${order.color}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="font-bold text-lg mb-3">إجراءات سريعة</h2>
      <div className="grid grid-cols-2 gap-3">
        <a
          href="/warehouse/inventory"
          className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] text-center hover:border-accent transition"
        >
          <p className="text-2xl mb-1">📦</p>
          <p className="font-medium text-sm">إدارة المخزون</p>
        </a>
        <a
          href="/warehouse/prices"
          className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] text-center hover:border-accent transition"
        >
          <p className="text-2xl mb-1">💰</p>
          <p className="font-medium text-sm">تحديث الأسعار</p>
        </a>
        <a
          href="/orders"
          className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] text-center hover:border-accent transition"
        >
          <p className="text-2xl mb-1">📋</p>
          <p className="font-medium text-sm">كل الطلبات</p>
        </a>
        <a
          href="/warehouse/offers"
          className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] text-center hover:border-accent transition"
        >
          <p className="text-2xl mb-1">🎁</p>
          <p className="font-medium text-sm">العروض والبونص</p>
        </a>
      </div>
    </main>
  );
}
