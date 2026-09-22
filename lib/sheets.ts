// دوال مساعدة لقراءة البيانات من Google Sheets

const PRODUCTS_SHEET_ID = "1UGzkraNFkVpJJrqXPaiug_SAbis-b57xdIi7UBrWEzk";
const WAREHOUSES_SHEET_ID = "1fgrf0PPdX7lZvaLT83iZjrjwqmxd9F7zNjTCjZxUiM0";
const ORDERS_SHEET_ID = "1pRfLpDQf2JLk_FG_M4PeZqn9953UtOZcsHWcFa5sGxE";

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
  priceJalgheef: number;
  bonusJalgheef: string;
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
  const res = await fetch(url, { next: { revalidate: 60 } }); // كاش دقيقة
  if (!res.ok) throw new Error("فشل تحميل البيانات من Google Sheets");
  const text = await res.text();
  return text
    .trim()
    .split("\n")
    .map((row) => row.split(",").map((cell) => cell.trim()));
}

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await fetchCsv(sheetToCsvUrl(PRODUCTS_SHEET_ID));
    // تخطي الهيدر
    return rows.slice(1).map((r) => ({
      id: r[0] || "",
      tradeName: r[1] || "",
      scientificName: r[2] || "",
      company: r[3] || "",
      form: r[4] || "",
      strength: r[5] || "",
      unit: r[6] || "",
      priceFawaz: Number(r[7]) || 0,
      bonusFawaz: r[8] || "",
      priceJalgheef: Number(r[9]) || 0,
      bonusJalgheef: r[10] || "",
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getWarehouses(): Promise<Warehouse[]> {
  try {
    const rows = await fetchCsv(sheetToCsvUrl(WAREHOUSES_SHEET_ID));
    return rows.slice(1).map((r) => ({
      id: r[0] || "",
      name: r[1] || "",
      city: r[2] || "",
      phone: r[3] || "",
      isPriority: r[4] === "نعم",
      coverage: r[5] || "",
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}
