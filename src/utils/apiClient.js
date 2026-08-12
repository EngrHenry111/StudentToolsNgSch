// Shared fetch wrapper for the Pro (authenticated) side of the app.
//
// Access tokens only last 15 minutes. Without this, anyone taking a
// quiz longer than that gets silently logged out mid-quiz. This wrapper
// catches an expired-token response, silently exchanges the refresh
// token for a new access token, updates localStorage, and retries the
// original request once — the user never notices.
//
// It also fires window events so AuthContext (or anything else) can stay
// in sync without every API file needing to know about React state.

const BASE = "https://studenttoolsserver.onrender.com/api";

export const TOKEN_REFRESHED_EVENT = "st-token-refreshed";
export const AUTH_LOGOUT_EVENT = "st-auth-logout";

let refreshInFlight = null;

const doRefresh = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const res = await fetch(`${BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: refreshToken })
  });

  if (!res.ok) {
    throw new Error("Refresh failed");
  }

  const data = await res.json();

  localStorage.setItem("token", data.accessToken);
  window.dispatchEvent(new CustomEvent(TOKEN_REFRESHED_EVENT, { detail: data.accessToken }));

  return data.accessToken;
};

// De-dupes concurrent refresh attempts (e.g. several quiz calls firing
// at once right as the token expires) into a single network request.
const refreshAccessToken = () => {
  if (!refreshInFlight) {
    refreshInFlight = doRefresh().finally(() => {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
};

/**
 * apiRequest(path, { method, body, token, auth })
 * - path: e.g. "/quiz/adaptive" (no BASE prefix)
 * - token: current access token (optional convenience — falls back to localStorage)
 * - auth: whether this endpoint requires a Bearer token (default true)
 */
export const apiRequest = async (path, { method = "GET", body, token, auth = true } = {}) => {
  const runOnce = async (accessToken) => {
    const headers = { "Content-Type": "application/json" };

    if (auth) {
      const t = accessToken || token || localStorage.getItem("token");
      if (t) headers.Authorization = `Bearer ${t}`;
    }

    const res = await fetch(`${BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    return res;
  };

  let res = await runOnce();

  if (res.status === 401 && auth) {
    let data = {};
    try { data = await res.clone().json(); } catch { /* ignore */ }

    if (data.code === "TOKEN_EXPIRED" || data.message === "Token expired") {
      try {
        const newToken = await refreshAccessToken();
        res = await runOnce(newToken);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.dispatchEvent(new CustomEvent(AUTH_LOGOUT_EVENT));
        throw new Error("Session expired. Please log in again.");
      }
    }
  }

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error((data && data.message) || `Request failed (${res.status})`);
  }

  return data;
};

export { BASE };
