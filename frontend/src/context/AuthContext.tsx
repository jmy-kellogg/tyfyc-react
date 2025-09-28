import React, { createContext, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";

import { loginUser, registerUser } from "@/api/auth";
import { getApplications, updateApplication } from "src/api/applications";
import { setTabsToDefault } from "src/store/reducers/navigationSlice";
import { setToken, clearAuth } from "src/store/reducers/authSlice";
import { addAlert } from "@/reducers/alertsSlice";

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
  const dispatch = useDispatch<Dispatch>();
  const token: string | null = useSelector((state: State) => state.auth.token);
  const navigate = useNavigate();
  const { pathname }: { pathname: string } = useLocation();

  const checkForExpired = async (): Promise<void> => {
    const applications = await getApplications();
    const appExpireDate: Date = new Date();
    appExpireDate.setMonth(appExpireDate.getMonth() - 2);

    const applied = applications.filter(({ status }) => status === "applied");
    const expiredList = applied.filter(
      ({ dateApplied }) => new Date(dateApplied) < appExpireDate
    );

    if (expiredList.length) {
      await Promise.all(
        expiredList.map(async (application): Promise<void> => {
          dispatch(
            addAlert({
              type: "info",
              message: `Updating no response for ${application.company}. You may need to refresh the Application list`,
            })
          );
          await updateApplication({ ...application, status: "no_response" });
        })
      );
    }
  };

  const login = async (username: string, password: string): Promise<void> => {
    const response = await loginUser({ username, password });

    if (response?.accessToken) {
      dispatch(setToken(response.accessToken));
      checkForExpired();
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

  useEffect((): void => {
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
