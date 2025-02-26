import {
  createSlice,
  PayloadAction,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";
import type { Tab, TabsList } from "../../../types";
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

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSmallDisplay: (state: SettingsState, action: PayloadAction<boolean>) => {
      state.smallDisplay = action.payload;
    },
    setShowResume: (state: SettingsState, action: PayloadAction<boolean>) => {
      const tabExists = state.tabs.map(({ value }) => value).includes("resume");
      state.showResume = action.payload;
      if (action.payload) {
        if (!tabExists) {
          state.tabs.unshift({ label: "Resume", value: "resume" });
        }
        if (state.smallDisplay) {
          state.activeTab = "resume";
        }
      } else if (!action.payload && tabExists) {
        state.tabs.shift();
      }
    },
    setShowApplications: (
      state: SettingsState,
      action: PayloadAction<boolean>
    ) => {
      const tabExists = state.tabs
        .map(({ value }) => value)
        .includes("applications");
      state.showApplications = action.payload;

      if (action.payload) {
        if (!tabExists) {
          state.tabs.push({
            label: "Applications",
            value: "applications",
          });
        }
        if (state.smallDisplay) {
          state.activeTab = "applications";
        }
      } else if (!action.payload && tabExists) {
        state.tabs.pop();
      }
    },
    setActiveTab: (state: SettingsState, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
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
  addJobTabs,
  removeJobTab,
  updateTab,
} = settingsSlice.actions;
export default settingsSlice.reducer;

const selectSettings = (state: State) => state.settings;

export const getTabs = createDraftSafeSelector(selectSettings, (settings) => {
  if (settings.smallDisplay) {
    return [...settings.tabs, ...settings.jobTabs];
  } else {
    return settings.jobTabs;
  }
});

export const getActiveTabs = createDraftSafeSelector(
  selectSettings,
  (settings) => {
    const tabs = settings.smallDisplay
      ? [...settings.tabs, ...settings.jobTabs]
      : settings.jobTabs;
    if (!tabs.map(({ value }) => value).includes(settings.activeTab)) {
      return tabs[tabs.length - 1]?.value || "";
    }
    return settings.activeTab;
  }
);
