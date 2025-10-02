import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { FeatureFlag } from "@/types";

export interface AuthState {
  token: string | null;
  flags: string[];
}

const initialState: AuthState = {
  token: null,

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
    setFlags: (state: AuthState, action: PayloadAction<FeatureFlag[]>) => {
      state.flags = action.payload
        .filter(({ isActive }) => isActive)
        .map(({ name }) => name);
    },
    clearAuth: () => {
      localStorage.removeItem("token");
      return initialState;
    },
  },
});

export const { setToken, setFlags, clearAuth } = authSlice.actions;
export default authSlice.reducer;
