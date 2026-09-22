import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage, notifyPriceChange } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // نوع الإشعار
    if (body.type === "price_change") {
      const ok = await notifyPriceChange(
        body.productName,
        body.oldPrice,
        body.newPrice,
        body.warehouse
      );
      return NextResponse.json({ success: ok });
    }

    // إشعار عام
    if (body.message) {
      const ok = await sendTelegramMessage(body.message);
      return NextResponse.json({ success: ok });
    }

    return NextResponse.json({ error: "missing data" }, { status: 400 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
