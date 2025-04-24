import React, { createContext, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser, registerUser } from "@/api/auth";
import { setTabsToDefault } from "src/store/reducers/navigationSlice";
import { setToken, clearAuth } from "src/store/reducers/authSlice";

import type { State } from "@/store";

interface AuthContextType {
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
  login: null,
  register: null,
  logout: null,
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: State) => state.auth.token);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const login = async (username: string, password: string): Promise<void> => {
    const response = await loginUser({ username, password });

    if (response?.accessToken) {
      dispatch(setToken(response.accessToken));
      navigate("/");
    }
  };

  const logout = (): void => {
    dispatch(clearAuth());
    dispatch(setTabsToDefault());
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
    if (token && pathname !== "/") {
      navigate("/");
    } else if (!token && pathname !== "/login") {
      navigate("/login");
    }
  }, [navigate, pathname, token]);

  return (
    <AuthContext.Provider value={{ login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
