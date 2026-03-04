import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "student" | "admin" | "faculty";

interface AuthUser {
  role: UserRole;
  name: string;
  id: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (role: UserRole, username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const credentials: Record<UserRole, { username: string; password: string; name: string }> = {
  student: { username: "student", password: "123", name: "Aarav Mehta" },
  admin: { username: "admin", password: "admin123", name: "Admin User" },
  faculty: { username: "faculty", password: "faculty123", name: "Dr. Priya Sharma" },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback((role: UserRole, username: string, password: string) => {
    const cred = credentials[role];
    if (username === cred.username && password === cred.password) {
      setUser({ role, name: cred.name, id: "1" });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
