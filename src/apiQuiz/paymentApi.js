import { apiRequest } from "../utils/apiClient";

export const startPayment = async () => {
  return apiRequest("/payment/paystack/start", { method: "POST", auth: true });
};

export const subscribe = async () => {
  return apiRequest("/payment/paystack/subscribe", { method: "POST", auth: true });
};

export const cancelSubscription = async () => {
  return apiRequest("/payment/paystack/cancel", { method: "POST", auth: true });
};

export const getBilling = async () => {
  return apiRequest("/payment/billing", { auth: true });
};
