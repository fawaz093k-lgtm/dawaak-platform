import { getProducts, type Product } from "./sheets";

export type SearchResult = {
  product: Product;
  warehouses: {
    name: string;
    price: number;
    bonus: string;
  }[];
};

export async function searchMedicine(query: string): Promise<SearchResult[]> {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) return [];

  const products = await getProducts();

  const matched = products.filter((p) => {
    const haystack = [p.tradeName, p.scientificName, p.company, p.form, p.strength]
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
    return { product: p, warehouses };
  });
}

export function formatSearchReply(query: string, results: SearchResult[]): string {
  if (results.length === 0) {
    return `❌ ما لقيت نتائج لـ "${query}"\n\nجرب تكتب جزء من الاسم التجاري.\nمثال: املودبين أو اوميغ أو فولتاميد`;
  }

  let text = `🔍 نتائج البحث عن: <b>${query}</b>\n🏪 مستودع الفواز\n\n`;

  for (const r of results.slice(0, 8)) {
    text += `💊 <b>${r.product.tradeName}</b>\n`;
    if (r.product.company) text += `   الشركة: ${r.product.company}\n`;
    if (r.warehouses.length === 0) {
      text += `   ⚠️ غير متوفر\n`;
    } else {
      const w = r.warehouses[0];
      text += `   السعر: <b>${w.price.toLocaleString()} ل.س</b>`;
      if (w.bonus && w.bonus !== "—") text += ` | بونص: ${w.bonus}`;
      text += `\n`;
    }
    text += `\n`;
  }

  if (results.length > 8) {
    text += `... و ${results.length - 8} نتائج إضافية\n`;
  }

  return text.trim();
}
