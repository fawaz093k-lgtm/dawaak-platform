export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-secondary)]">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] shadow-lg">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-xl bg-accent flex items-center justify-center text-white text-2xl font-bold mb-3">
            +
          </div>
          <h1 className="text-2xl font-bold text-accent">دواءك</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">تسجيل الدخول للصيدليات والمستودعات</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-sm mb-1.5">رقم الهاتف</label>
            <input
              type="tel"
              placeholder="09xxxxxxxx"
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm mb-1.5">كلمة المرور</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent-hover transition"
          >
            تسجيل الدخول
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-[var(--text-secondary)]">
          ما عندك حساب؟{" "}
          <a href="/register" className="text-accent font-medium hover:underline">
            إنشاء حساب جديد
          </a>
        </p>
      </div>
    </main>
  );
}
