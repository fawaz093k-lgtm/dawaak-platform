import { getProducts, type Product } from "./sheets";

export type SearchResult = {
  product: Product;
  warehouses: {
    name: string;
    price: number;
    bonus: string;
  }[];
};

/** بحث بسيط بالاسم التجاري أو العلمي أو الشركة */
export async function searchMedicine(query: string): Promise<SearchResult[]> {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) return [];

  const products = await getProducts();

  const matched = products.filter((p) => {
    const haystack = [
      p.tradeName,
      p.scientificName,
      p.company,
      p.form,
      p.strength,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });

  return matched.map((p) => {
    const warehouses: SearchResult["warehouses"] = [];

    if (p.priceFawaz > 0) {
      warehouses.push({
        name: "مستودع الفواز",
        price: p.priceFawaz,
        bonus: p.bonusFawaz || "—",
      });
    }
    if (p.priceJalgheef > 0) {
      warehouses.push({
        name: "مستودع الجلجيف",
        price: p.priceJalgheef,
        bonus: p.bonusJalgheef || "—",
      });
    }

    return { product: p, warehouses };
  });
}

/** صياغة رد تيليجرام */
export function formatSearchReply(query: string, results: SearchResult[]): string {
  if (results.length === 0) {
    return `❌ ما لقيت نتائج لـ "${query}"\n\nجرب تكتب الاسم التجاري أو العلمي بشكل أوضح.`;
  }

  let text = `🔍 نتائج البحث عن: <b>${query}</b>\n\n`;

  for (const r of results.slice(0, 5)) {
    // أقصى 5 نتائج عشان الرسالة ما تطول
    text += `💊 <b>${r.product.tradeName}</b>\n`;
    if (r.product.scientificName) text += `   ${r.product.scientificName}\n`;
    text += `   الشركة: ${r.product.company}\n`;

    if (r.warehouses.length === 0) {
      text += `   ⚠️ غير متوفر حالياً\n`;
    } else {
      for (const w of r.warehouses) {
        text += `   🏪 ${w.name}: <b>${w.price.toLocaleString()} ل.س</b>`;
        if (w.bonus && w.bonus !== "—") text += ` (${w.bonus})`;
        text += `\n`;
      }
    }
    text += `\n`;
  }

  if (results.length > 5) {
    text += `... و ${results.length - 5} نتائج إضافية\n`;
  }

  return text.trim();
}
