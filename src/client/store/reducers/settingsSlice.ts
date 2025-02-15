import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  smallDisplay: boolean;
  showResume: boolean;
}

const initialState: SettingsState = {
  smallDisplay: false,
  showResume: true,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSmallDisplay: (state: SettingsState, action: PayloadAction<boolean>) => {
      state.smallDisplay = action.payload;
    },
    setShowResume: (state: SettingsState, action: PayloadAction<boolean>) => {
      state.showResume = action.payload;
    },
  },
});

export const { setSmallDisplay, setShowResume } = settingsSlice.actions;
export default settingsSlice.reducer;
