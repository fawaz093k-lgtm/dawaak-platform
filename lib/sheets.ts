// بيانات مستودع الفواز فقط — بروشور 25 (استخراج موسّع)

const PRODUCTS_SHEET_ID = "1cEE0ygaNTyJF2zc27zCBhZ_ybirMpk5TClzIDzqchIU";

function sheetToCsvUrl(sheetId: string) {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
}

export type Product = {
  id: string;
  tradeName: string;
  scientificName: string;
  company: string;
  form: string;
  strength: string;
  unit: string;
  priceFawaz: number;
  bonusFawaz: string;
};

export type Warehouse = {
  id: string;
  name: string;
  city: string;
  phone: string;
  isPriority: boolean;
  coverage: string;
};

async function fetchCsv(url: string): Promise<string[][]> {
  const res = await fetch(url, { next: { revalidate: 30 } });
  if (!res.ok) throw new Error("فشل تحميل البيانات من Google Sheets");
  const text = await res.text();
  if (text.includes("<!DOCTYPE") || text.includes("<html")) {
    throw new Error("الشيت غير عام — افتح المشاركة لأي شخص لديه الرابط");
  }
  return text
    .trim()
    .split("\n")
    .map((row) => row.split(",").map((cell) => cell.trim()));
}

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await fetchCsv(sheetToCsvUrl(PRODUCTS_SHEET_ID));
    return rows
      .slice(1)
      .filter((r) => r[0] && r[1])
      .map((r) => ({
        id: r[0] || "",
        tradeName: r[1] || "",
        scientificName: r[2] || "",
        company: r[3] || "",
        form: r[4] || "",
        strength: r[5] || "",
        unit: r[6] || "",
        priceFawaz: Number(r[7]) || 0,
        bonusFawaz: r[8] || "",
      }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getWarehouses(): Promise<Warehouse[]> {
  return [
    {
      id: "1",
      name: "مستودع الفواز",
      city: "دمشق",
      phone: "",
      isPriority: true,
      coverage: "دمشق وباقي المحافظات",
    },
  ];
}
