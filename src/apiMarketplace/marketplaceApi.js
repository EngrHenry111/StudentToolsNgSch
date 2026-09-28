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

// Research Library search/browse — public.
export const searchListings = ({ q = "", field = "", page = 1 } = {}) => {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (field) params.set("field", field);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return apiRequest(`/marketplace/listings${qs ? `?${qs}` : ""}`, { auth: false });
};

export const submitReview = (listingId, { rating, comment }) =>
  apiRequest(`/marketplace/listings/${listingId}/reviews`, {
    method: "POST",
    body: { rating, comment },
    auth: true
  });

export const initiatePurchase = (listingId) =>
  apiRequest("/marketplace/purchase", { method: "POST", body: { listingId }, auth: true });
