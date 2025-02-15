import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SettingsState } from "../../../types";

const initialState: SettingsState = {
  smallDisplay: false,
  showResume: true,
  showApplications: true,
  activeTab: "",
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
    setActiveTab: (state: SettingsState, action: PayloadAction<string>) => {
      const tab = action.payload;
      state.activeTab = tab;
    },
  },
});

export const {
  setSmallDisplay,
  setShowResume,
  setShowApplications,
  setActiveTab,
} = settingsSlice.actions;
export default settingsSlice.reducer;
