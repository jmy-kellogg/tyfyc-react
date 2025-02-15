import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  smallDisplay: boolean;
  showResume: boolean;
  showApplications: boolean;
}

const initialState: SettingsState = {
  smallDisplay: false,
  showResume: true,
  showApplications: true,
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
    setShowApplications: (
      state: SettingsState,
      action: PayloadAction<boolean>
    ) => {
      state.showApplications = action.payload;
    },
  },
});

export const { setSmallDisplay, setShowResume, setShowApplications } =
  settingsSlice.actions;
export default settingsSlice.reducer;
