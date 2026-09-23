// دوال مساعدة لقراءة البيانات من Google Sheets

const PRODUCTS_SHEET_ID = "1UGzkraNFkVpJJrqXPaiug_SAbis-b57xdIi7UBrWEzk";
const WAREHOUSES_SHEET_ID = "1fgrf0PPdX7lZvaLT83iZjrjwqmxd9F7zNjTCjZxUiM0";

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

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "1",
    tradeName: "اتورفاستاتين 10 ملغ",
    scientificName: "Atorvastatin 10mg",
    company: "ابن الهيثم",
    form: "حب",
    strength: "10 ملغ",
    unit: "علبة 30",
    priceFawaz: 10100,
    bonusFawaz: "1+10",
    priceJalgheef: 10400,
    bonusJalgheef: "1+7",
  },
  {
    id: "2",
    tradeName: "فالسارتان 80 ملغ",
    scientificName: "Valsartan 80mg",
    company: "ابن الهيثم",
    form: "حب",
    strength: "80 ملغ",
    unit: "علبة 30",
    priceFawaz: 12500,
    bonusFawaz: "1+10",
    priceJalgheef: 12500,
    bonusJalgheef: "1+5",
  },
  {
    id: "3",
    tradeName: "ازيترومايسين شراب 15 مل",
    scientificName: "Azithromycin",
    company: "ابن الهيثم",
    form: "شراب",
    strength: "15 مل",
    unit: "زجاجة",
    priceFawaz: 10400,
    bonusFawaz: "1+5",
    priceJalgheef: 10400,
    bonusJalgheef: "1+5",
  },
  {
    id: "4",
    tradeName: "تادافورت 10 ملغ",
    scientificName: "Tadalafil 10mg",
    company: "ابن الهيثم",
    form: "حب",
    strength: "10 ملغ",
    unit: "علبة",
    priceFawaz: 2900,
    bonusFawaz: "1+10",
    priceJalgheef: 2900,
    bonusJalgheef: "1+10",
  },
  {
    id: "5",
    tradeName: "غراندي فيتا 200 مل",
    scientificName: "Multivitamin",
    company: "ابن الهيثم",
    form: "شراب",
    strength: "200 مل",
    unit: "زجاجة",
    priceFawaz: 20000,
    bonusFawaz: "1+10",
    priceJalgheef: 20000,
    bonusJalgheef: "1+10",
  },
];

async function fetchCsv(url: string): Promise<string[][]> {
  const res = await fetch(url, { next: { revalidate: 30 } });
  if (!res.ok) throw new Error("فشل تحميل البيانات من Google Sheets");
  const text = await res.text();
  // لو رجع HTML (صفحة تسجيل دخول) اعتبره فشل
  if (text.includes("<!DOCTYPE") || text.includes("<html")) {
    throw new Error("الشيت غير عام");
  }
  return text
    .trim()
    .split("\n")
    .map((row) => row.split(",").map((cell) => cell.trim()));
}

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await fetchCsv(sheetToCsvUrl(PRODUCTS_SHEET_ID));
    const products = rows.slice(1).map((r) => ({
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
    return products.length > 0 ? products : FALLBACK_PRODUCTS;
  } catch (e) {
    console.error(e);
    return FALLBACK_PRODUCTS;
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
    return [
      { id: "1", name: "مستودع الفواز", city: "دمشق", phone: "", isPriority: true, coverage: "دمشق" },
      { id: "2", name: "مستودع الجلجيف", city: "حلب", phone: "", isPriority: false, coverage: "حلب" },
    ];
  }
}
