import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
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
    clearAuth: () => {
      localStorage.removeItem("token");
      return initialState;
    },
  },
});

export const { setToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
