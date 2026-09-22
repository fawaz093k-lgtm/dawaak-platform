/**
 * إرسال إشعارات عبر تيليجرام
 * يحتاج متغيرين في .env:
 * TELEGRAM_BOT_TOKEN=xxx
 * TELEGRAM_CHAT_ID=xxx
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramMessage(text: string): Promise<boolean> {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn("Telegram credentials missing");
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram error:", err);
      return false;
    }
    return true;
  } catch (e) {
    console.error("Telegram send failed:", e);
    return false;
  }
}

/** إشعار عند تغير أسعار */
export async function notifyPriceChange(productName: string, oldPrice: number, newPrice: number, warehouse: string) {
  const direction = newPrice > oldPrice ? "📈 ارتفع" : "📉 انخفض";
  const msg = `
🔔 <b>تحديث سعر</b>

الدواء: <b>${productName}</b>
المستودع: ${warehouse}
${direction}: من ${oldPrice.toLocaleString()} إلى ${newPrice.toLocaleString()} ل.س
`.trim();

  return sendTelegramMessage(msg);
}

/** إشعار عام */
export async function notifyGeneral(title: string, body: string) {
  return sendTelegramMessage(`🔔 <b>${title}</b>\n\n${body}`);
}
