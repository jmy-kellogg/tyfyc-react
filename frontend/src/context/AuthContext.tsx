import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, fetchUserProfile, registerUser } from "../api/auth";
import type { RegisterUserReq } from "../types";

interface AuthContextType {
  token: string | null;
  user: RegisterUserReq | null;
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
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<RegisterUserReq | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const userProfile = await fetchUserProfile(token);
          setUser(userProfile);
        } catch {
          navigate("/login");
        }
      };
      getUser();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const login = async (username: string, password: string): Promise<void> => {
    const response = await loginUser({ username, password });

    if (response?.accessToken) {
      setToken(response.accessToken);
      localStorage.setItem("token", response.accessToken);
      const userProfile = await fetchUserProfile(response.accessToken);
      setUser(userProfile);
      navigate("/");
    }
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

  const logout = (): void => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
