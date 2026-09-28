// Public storefront/listing reads + purchase. getListingBySlug uses
// auth:true not because it's required (the route works fine with no
// token) but so a logged-in owner's token rides along when present —
// that's what lets the server decide whether to include fullContent.
import { apiRequest } from "../utils/apiClient";

export const getPublisherStorefront = (slug) =>
  apiRequest(`/marketplace/publishers/${slug}`, { auth: false });

// If the session can't be refreshed (apiRequest has already logged the
// user out by then), still show the public preview instead of an error.
export const getListingBySlug = async (slug, listingSlug) => {
  const path = `/marketplace/publishers/${slug}/${listingSlug}`;
  try {
    return await apiRequest(path, { auth: true });
  } catch (err) {
    if (err.message === "Session expired. Please log in again.") {
      return apiRequest(path, { auth: false });
    }
    throw err;
  }
};

export const getMyPurchases = () => apiRequest("/marketplace/me/purchases", { auth: true });

export const initiatePurchase = (listingId) =>
  apiRequest("/marketplace/purchase", { method: "POST", body: { listingId }, auth: true });
