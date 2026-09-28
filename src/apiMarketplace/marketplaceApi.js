// Public storefront/listing reads + purchase. getListingBySlug uses
// auth:true not because it's required (the route works fine with no
// token) but so a logged-in owner's token rides along when present —
// that's what lets the server decide whether to include fullContent.
import { apiRequest } from "../utils/apiClient";

export const getPublisherStorefront = (slug) =>
  apiRequest(`/marketplace/publishers/${slug}`, { auth: false });

export const getListingBySlug = (slug, listingSlug) =>
  apiRequest(`/marketplace/publishers/${slug}/${listingSlug}`, { auth: true });

export const initiatePurchase = (listingId) =>
  apiRequest("/marketplace/purchase", { method: "POST", body: { listingId }, auth: true });
