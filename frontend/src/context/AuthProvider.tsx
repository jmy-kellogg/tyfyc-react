import React, { useEffect, useState, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";

import { loginUser, registerUser, getFeatureFlags } from "@/api/auth";
import { getApplications, updateApplication } from "src/api/applications";
import { setTabsToDefault } from "src/store/reducers/navigationSlice";
import { setToken, clearAuth } from "src/store/reducers/authSlice";
import { addAlert } from "@/reducers/alertsSlice";

import { AuthContext } from "./AuthContext.ts";
import type { State } from "@/store";
import type { FeatureFlag } from "@/types";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();
  const [flags, setFlags] = useState<string[]>([]);
  const token: string | null = useSelector((state: State) => state.auth.token);
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
    const fetchData = async (): Promise<void> => {
      const featureFlags: FeatureFlag[] = (await getFeatureFlags()) || [];
      const activeFlags: string[] = featureFlags
        .filter(({ isActive }) => isActive)
        .map(({ name }) => name);

      setFlags(activeFlags);
    };

    if (token) {
      if (pathname === "/login") navigate("/");
      else fetchData();
    } else if (pathname !== "/login") {
      dispatch(setTabsToDefault());
      navigate("/login");
    }
  }, [navigate, pathname, dispatch, token]);

  return (
    <AuthContext.Provider value={{ login, register, logout, flags }}>
      {children}
    </AuthContext.Provider>
  );
};
