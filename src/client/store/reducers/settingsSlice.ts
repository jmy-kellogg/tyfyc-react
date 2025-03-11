import {
  createSlice,
  PayloadAction,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";
import type { Tab, TabsList } from "@types";
import type { State } from "../index";

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

const checkForTab = (tabs: TabsList, tabValue: string): boolean => {
  return !!tabs.map(({ value }) => value).includes(tabValue);
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSmallDisplay: (state: SettingsState, action: PayloadAction<boolean>) => {
      state.smallDisplay = action.payload;
    },
    setShowResume: (state: SettingsState, action: PayloadAction<boolean>) => {
      const tabExists = checkForTab(state.tabs, "resume");
      state.showResume = action.payload;

      if (action.payload && state.smallDisplay) {
        state.activeTab = "resume";
      }
      if (action.payload && !tabExists) {
        state.tabs.unshift({ label: "Resume", value: "resume" });
      } else if (!action.payload && tabExists) {
        state.tabs.shift();
      }
    },
    setShowApplications: (
      state: SettingsState,
      action: PayloadAction<boolean>
    ) => {
      const tabExists = checkForTab(state.tabs, "applications");
      state.showApplications = action.payload;

      if (action.payload && state.smallDisplay) {
        state.activeTab = "applications";
      }
      if (action.payload && !tabExists) {
        state.tabs.push({
          label: "Applications",
          value: "applications",
        });
      } else if (!action.payload && tabExists) {
        state.tabs.pop();
      }
    },
    setActiveTab: (state: SettingsState, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    addJobTabs: (state: SettingsState, action: PayloadAction<Tab>) => {
      const tabExists = checkForTab(state.jobTabs, action.payload.value);
      if (!tabExists) {
        const jobTabs = state.jobTabs || [];
        state.jobTabs = [...jobTabs, action.payload];
      }
    },
    removeJobTab: (state: SettingsState, action: PayloadAction<string>) => {
      state.jobTabs = state.jobTabs.filter(
        ({ value }) => value !== action.payload
      );
    },
    setJobTab: (state: SettingsState, action: PayloadAction<Tab>) => {
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
  setJobTab,
  addJobTabs,
  removeJobTab,
} = settingsSlice.actions;
export default settingsSlice.reducer;

const selectSettings = (state: State) => state.settings;

export const getTabs = createDraftSafeSelector(selectSettings, (settings) => {
  return [...settings.tabs, ...settings.jobTabs];
});

export const getActiveTab = createDraftSafeSelector(
  selectSettings,
  (settings) => {
    const tabs = settings.smallDisplay
      ? [...settings.tabs, ...settings.jobTabs]
      : [...settings.jobTabs];
    const tabExists = checkForTab(tabs, settings.activeTab);

    if (!tabExists) {
      return tabs.pop()?.value || "";
    }
    return settings.activeTab;
  }
);
