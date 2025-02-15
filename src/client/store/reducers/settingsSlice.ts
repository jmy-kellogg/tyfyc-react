import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  smallDisplay: boolean;
}

const initialState: SettingsState = {
  smallDisplay: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSmallDisplay: (state: SettingsState, action: PayloadAction<boolean>) => {
      state.smallDisplay = action.payload;
    },
  },
});

export const { setSmallDisplay } = settingsSlice.actions;
export default settingsSlice.reducer;
