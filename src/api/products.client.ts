const BASE_URL =
  "https://script.google.com/macros/s/AKfycbzr1X4juNDVhrJcaZ_tIGkFyECF-AMU1iXQQygHVB5Cthfpy4knkM4xbK_uZJsZYZ5k/exec";

async function fetchSheet(sheet: string) {
  const res = await fetch(`${BASE_URL}?sheet=${sheet}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${sheet}`);
  }
  return res.json();
}

// Products sheet
export function fetchProducts() {
  return fetchSheet("Products");
}

// Retailer_Stock_Movements sheet
export function fetchRetailerStockMovements() {
  return fetchSheet("Retailer_Stock_Movements");
}
