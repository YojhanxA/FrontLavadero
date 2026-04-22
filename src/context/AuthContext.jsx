import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem("carwash_auth");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (payload) => {
    setAuth(payload);
    localStorage.setItem("carwash_auth", JSON.stringify(payload));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("carwash_auth");
  };

  const value = useMemo(
    () => ({
      auth,
      login,
      logout,
      isAuthenticated: Boolean(auth?.token)
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
