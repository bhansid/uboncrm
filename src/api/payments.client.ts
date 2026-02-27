const BASE_URL =
  "https://script.google.com/macros/s/AKfycbzr1X4juNDVhrJcaZ_tIGkFyECF-AMU1iXQQygHVB5Cthfpy4knkM4xbK_uZJsZYZ5k/exec";

export async function approvePayment(
  paymentId: string,
  admin: string
) {
  await fetch(BASE_URL, {
    method: "POST",
    mode: "no-cors", // 🔥 REQUIRED
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "approvePayment",
      paymentId,
      admin,
    }),
  });
}

export async function rejectPayment(paymentId: string) {
  await fetch(BASE_URL, {
    method: "POST",
    mode: "no-cors", // 🔥 REQUIRED
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "rejectPayment",
      paymentId,
    }),
  });
}
