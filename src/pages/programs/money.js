// Kobo -> "₦15,000".
export const naira = (kobo) => `₦${(Number(kobo || 0) / 100).toLocaleString("en-NG")}`;
