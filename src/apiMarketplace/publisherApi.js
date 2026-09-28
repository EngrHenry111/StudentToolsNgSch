// Publisher workspace — authenticated, owner-only. Mirrors the same
// apiRequest pattern used by apiQuiz/institutionApi.js and every other
// Pro-side API file, since publishers authenticate exactly like any
// other student (see the brief: "same login, no second auth flow").
import { apiRequest, apiRequestMultipart } from "../utils/apiClient";

export const getBanks = () => apiRequest("/publishers/banks", { auth: true });

export const registerPublisher = (payload) =>
  apiRequest("/publishers/register", { method: "POST", body: payload, auth: true });

// 404 (not an error state here) means "this user has no publisher
// workspace yet" — callers (RequirePublisher, the dashboard banner)
// branch on that instead of treating it as a failure.
export const getMyPublisherProfile = async () => {
  try {
    return await apiRequest("/publishers/me", { auth: true });
  } catch (err) {
    if (err.message?.includes("404") || err.message === "No publisher workspace found") {
      return null;
    }
    throw err;
  }
};

export const getMyOverview = () => apiRequest("/publishers/me/overview", { auth: true });

export const getMyOrders = () => apiRequest("/publishers/me/orders", { auth: true });

export const getMyListings = () => apiRequest("/publishers/me/listings", { auth: true });

export const getMyListingById = (id) => apiRequest(`/publishers/me/listings/${id}`, { auth: true });

export const deleteListing = (id) =>
  apiRequest(`/publishers/me/listings/${id}`, { method: "DELETE", auth: true });

// These two carry a possible cover image file, so they go through the
// multipart wrapper instead of apiRequest.
export const createListing = (formData) =>
  apiRequestMultipart("/publishers/me/listings", formData, { method: "POST" });

export const updateListing = (id, formData) =>
  apiRequestMultipart(`/publishers/me/listings/${id}`, formData, { method: "PUT" });
