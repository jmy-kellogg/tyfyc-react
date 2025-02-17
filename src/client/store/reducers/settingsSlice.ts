import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SettingsState, Tab } from "../../../types";

const initialState: SettingsState = {
  smallDisplay: false,
  showResume: true,
  showApplications: true,
  activeTab: "",
  tabs: [
    { label: "Resume", value: "resume" },
    { label: "Applications", value: "applications" },
  ],
  jobTabs: [],
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
    setDefaultTab: (state: SettingsState) => {
      const tabsList = state.smallDisplay ? state.tabs : state.jobTabs;
      const defaultTab = state.smallDisplay ? state.tabs[0] : state.jobTabs[0];

      if (!tabsList?.find(({ value }) => value === state.activeTab)) {
        state.activeTab = defaultTab?.value || "";
      }
    },
    setTabs: (state: SettingsState) => {
      const jobTabs = state.jobTabs || [];
      if (state.smallDisplay) {
        const tabs = [];
        if (state.showResume) {
          tabs.push({ label: "Resume", value: "resume" });
        }
        if (state.showApplications) {
          tabs.push({ label: "Applications", value: "applications" });
        }
        state.tabs = [...tabs, ...jobTabs];
      } else {
        state.tabs = [];
      }
    },
    addJobTabs: (state: SettingsState, action: PayloadAction<Tab>) => {
      if (!state.jobTabs?.find(({ value }) => value === action.payload.value)) {
        const jobTabs = state.jobTabs || [];
        state.jobTabs = [...jobTabs, action.payload];
      }
    },
    removeJobTab: (state: SettingsState, action: PayloadAction<string>) => {
      state.jobTabs = state.jobTabs.filter(
        ({ value }) => value !== action.payload
      );
      if (action.payload === state.activeTab) {
        const newActive = state.jobTabs.pop();
        state.activeTab = newActive?.value || "resume";
      }
    },
  },
});

export const {
  setSmallDisplay,
  setShowResume,
  setShowApplications,
  setActiveTab,
  setTabs,
  addJobTabs,
  removeJobTab,
  setDefaultTab,
} = settingsSlice.actions;
export default settingsSlice.reducer;
