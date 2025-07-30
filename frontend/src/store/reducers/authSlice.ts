import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, FeatureFlag } from "@/types";

export interface Alert {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export interface CreateAlert {
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export interface AuthState {
  token: string | null;
  user: User | null;
  flags: string[];
}

const initialState: AuthState = {
  token: null,
  user: null,
  flags: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state: AuthState, action: PayloadAction<string | null>) => {
      const token = action.payload;
      state.token = token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    },
    setUser: (state: AuthState, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setFlags: (state: AuthState, action: PayloadAction<FeatureFlag[]>) => {
      state.flags = action.payload
        .filter(({ isActive }) => isActive)
        .map(({ name }) => name);
    },
    clearAuth: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("expiredAppCleanUp");
      return initialState;
    },
  },
});

export const { setToken, setUser, setFlags, clearAuth } = authSlice.actions;
export default authSlice.reducer;
