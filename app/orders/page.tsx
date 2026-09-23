export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-1025",
      pharmacy: "صيدلية الشفاء",
      warehouse: "مستودع الفواز",
      items: 4,
      amount: "45,200",
      status: "جديد",
      statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      date: "23 سبتمبر - 10:30",
    },
    {
      id: "ORD-1024",
      pharmacy: "صيدلية النهضة",
      warehouse: "مستودع الجلجيف",
      items: 2,
      amount: "18,500",
      status: "قيد التجهيز",
      statusColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
      date: "23 سبتمبر - 09:15",
    },
    {
      id: "ORD-1023",
      pharmacy: "صيدلية الأمل",
      warehouse: "مستودع الفواز",
      items: 6,
      amount: "32,100",
      status: "تم الشحن",
      statusColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      date: "22 سبتمبر - 16:40",
    },
    {
      id: "ORD-1022",
      pharmacy: "صيدلية النور",
      warehouse: "مسعود فارما",
      items: 1,
      amount: "9,800",
      status: "تم التسليم",
      statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      date: "22 سبتمبر - 14:20",
    },
    {
      id: "ORD-1021",
      pharmacy: "صيدلية الشفاء",
      warehouse: "مستودع الفواز",
      items: 3,
      amount: "21,400",
      status: "ملغي",
      statusColor: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
      date: "21 سبتمبر - 11:00",
    },
  ];

  return (
    <main className="min-h-screen p-4 md:p-8 pb-24">
      <header className="flex items-center gap-3 mb-6">
        <a href="/" className="text-accent text-xl">←</a>
        <h1 className="text-xl font-bold">الطلبات</h1>
      </header>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
        {["الكل", "جديد", "قيد التجهيز", "تم الشحن", "تم التسليم", "ملغي"].map((f) => (
          <button
            key={f}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border ${
              f === "الكل"
                ? "bg-accent text-white border-accent"
                : "border-[var(--border)] bg-[var(--card-bg)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {orders.map((order) => (
          <a
            key={order.id}
            href={`/orders/${order.id}`}
            className="block p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] hover:border-accent transition"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold">{order.id}</p>
                <p className="text-sm text-[var(--text-secondary)]">{order.date}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full ${order.statusColor}`}>
                {order.status}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <div>
                <p>{order.pharmacy}</p>
                <p className="text-[var(--text-secondary)]">{order.warehouse} • {order.items} أصناف</p>
              </div>
              <p className="font-semibold text-accent">{order.amount} ل.س</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
