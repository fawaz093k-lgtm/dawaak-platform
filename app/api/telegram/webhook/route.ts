import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";
import { searchMedicine, formatSearchReply } from "@/lib/search";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

async function reply(chatId: number | string, text: string) {
  if (!BOT_TOKEN) return;
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();
    const message = update?.message;
    if (!message?.chat?.id) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const text = (message.text || "").trim();

    // أوامر ثابتة
    if (text === "/start") {
      await reply(
        chatId,
        `مرحباً بك في <b>دواءك</b> 💊\n\nاكتب اسم الدواء (تجاري أو علمي) وأنا أقولك وين متوفر وبأي سعر.\n\nالأوامر:\n/prices - آخر التحديثات\n/help - المساعدة`
      );
      return NextResponse.json({ ok: true });
    }

    if (text === "/help") {
      await reply(
        chatId,
        `📋 <b>المساعدة</b>\n\n• اكتب اسم أي دواء مباشرة\n• مثال: <code>اتورفاستاتين</code> أو <code>فالسارتان</code>\n\n/start - البداية\n/prices - تحديثات الأسعار\n/help - هالرسالة`
      );
      return NextResponse.json({ ok: true });
    }

    if (text === "/prices" || text === "/status") {
      await reply(
        chatId,
        `📊 الأسعار تتحدث تلقائياً من Google Sheets كل 30 ثانية.\n\nاكتب اسم الدواء عشان تشوف التوفر الحالي.`
      );
      return NextResponse.json({ ok: true });
    }

    if (text === "/alerts") {
      await reply(
        chatId,
        `🔔 إشعارات تغير الأسعار مفعّلة لهذا الحساب.\nلما يتغير سعر راح توصلك رسالة هنا.`
      );
      return NextResponse.json({ ok: true });
    }

    // أي نص آخر = بحث عن دواء
    if (text && !text.startsWith("/")) {
      await reply(chatId, `⏳ جاري البحث عن "${text}"...`);
      const results = await searchMedicine(text);
      const replyText = formatSearchReply(text, results);
      await reply(chatId, replyText);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Telegram webhook error:", e);
    return NextResponse.json({ ok: true }); // Telegram يتوقع 200 دائماً
  }
}

// Telegram أحياناً يرسل GET للتحقق
export async function GET() {
  return NextResponse.json({ status: "Telegram webhook is alive" });
}
