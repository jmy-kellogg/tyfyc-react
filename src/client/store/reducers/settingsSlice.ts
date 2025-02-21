import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Tab, TabsList } from "../../../types";

export interface SettingsState {
  smallDisplay: boolean;
  showResume: boolean;
  showApplications: boolean;
  activeTab: string;
  tabs: TabsList;
  jobTabs: TabsList;
}

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
      if (state.smallDisplay && action.payload) {
        state.activeTab = "resume";
      }
    },
    setShowApplications: (
      state: SettingsState,
      action: PayloadAction<boolean>
    ) => {
      state.showApplications = action.payload;
      if (state.smallDisplay && action.payload) {
        state.activeTab = "applications";
      }
    },
    setActiveTab: (state: SettingsState, action: PayloadAction<string>) => {
      const tab = action.payload;
      state.activeTab = tab;
    },
    setDefaultTab: (state: SettingsState) => {
      const tabs = state.tabs;
      if (!tabs?.find(({ value }) => value === state.activeTab)) {
        state.activeTab = tabs[tabs.length - 1]?.value || "";
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
        state.tabs = [...jobTabs];
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
    },
    updateTab: (state: SettingsState, action: PayloadAction<Tab>) => {
      const index = state.jobTabs.findIndex(
        ({ value }) => value === action.payload.value
      );
      state.jobTabs[index] = action.payload;
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
  updateTab,
} = settingsSlice.actions;
export default settingsSlice.reducer;
