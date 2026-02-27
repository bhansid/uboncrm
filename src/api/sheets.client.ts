const BASE_URL =
  "https://script.google.com/macros/s/AKfycbzr1X4juNDVhrJcaZ_tIGkFyECF-AMU1iXQQygHVB5Cthfpy4knkM4xbK_uZJsZYZ5k/exec";

async function fetchSheet(sheet: string) {
  const res = await fetch(`${BASE_URL}?sheet=${sheet}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${sheet}`);
  }
  return res.json();
}

export function fetchRetailers() {
  return fetchSheet("Retailer_Master");
}

export function fetchAgents() {
  return fetchSheet("Agents");
}

export function fetchOrders() {
  return fetchSheet("Orders");
}

export function fetchOrderItems() {
  return fetchSheet("Order_Items");
}

export function fetchPayments() {
  return fetchSheet("Payments");
}
