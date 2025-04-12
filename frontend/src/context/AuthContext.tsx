import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, registerUser, getFeatureFlags } from "../api/auth";
import { fetchUser } from "../api/user";
import type { User } from "../types";

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: ((username: string, password: string) => Promise<void>) | null;
  register:
    | ((
        username: string,
        email: string,
        password: string,
        firstName: string,
        lastName: string
      ) => Promise<void>)
    | null;
  logout: (() => void) | null;
  flags: string[];
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: null,
  register: null,
  logout: null,
  flags: [],
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [flags, setFlags] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const login = async (username: string, password: string): Promise<void> => {
    const response = await loginUser({ username, password });

    if (response?.accessToken) {
      setToken(response.accessToken);
      localStorage.setItem("token", response.accessToken);
      const userProfile = await fetchUser();
      setUser(userProfile);
      navigate("/");
    }
  };

  const logout = (): void => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<void> => {
    await registerUser({ username, email, password, firstName, lastName });
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const userProfile = await fetchUser();
          if (userProfile) {
            setUser(userProfile);
          }
        } catch {
          setToken(null);
        }

        try {
          const featureFlags = (await getFeatureFlags()) || [];
          setFlags(
            featureFlags
              .filter(({ isActive }) => isActive)
              .map(({ name }) => name)
          );
        } catch {
          setFlags([]);
        }
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    if (user && pathname !== "/") {
      navigate("/");
    } else if (!token && pathname !== "/login") {
      navigate("/login");
    }
  }, [pathname, navigate, user, token]);

  return (
    <AuthContext.Provider
      value={{ token, user, login, register, logout, flags }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
