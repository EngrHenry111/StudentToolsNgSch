import { createContext, useState, useEffect, useCallback } from "react";
import { apiRequest, TOKEN_REFRESHED_EVENT, AUTH_LOGOUT_EVENT } from "../utils/apiClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null); // full profile from /auth/me
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setUser(null);
  }, []);

  const login = (accessToken, refreshToken, userData) => {
    localStorage.setItem("token", accessToken);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    setToken(accessToken);
    if (userData) setUser(userData);
  };

  const refreshProfile = useCallback(async () => {
    try {
      const data = await apiRequest("/auth/me", { auth: true });
      setUser(data);
      return data;
    } catch (err) {
      console.error("Failed to load profile:", err.message);
      logout();
      return null;
    }
  }, [logout]);

  // On first load (or whenever the token changes, e.g. after a silent
  // refresh), fetch the real user profile from the server instead of
  // trusting the JWT payload alone.
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    refreshProfile().finally(() => setLoading(false));
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  // Stay in sync with the apiClient's silent token refresh / forced logout.
  useEffect(() => {
    const onRefreshed = (e) => setToken(e.detail);
    const onLogout = () => logout();

    window.addEventListener(TOKEN_REFRESHED_EVENT, onRefreshed);
    window.addEventListener(AUTH_LOGOUT_EVENT, onLogout);

    return () => {
      window.removeEventListener(TOKEN_REFRESHED_EVENT, onRefreshed);
      window.removeEventListener(AUTH_LOGOUT_EVENT, onLogout);
    };
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated: !!token,
        isPremium: !!user?.isPremium,
        login,
        logout,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
