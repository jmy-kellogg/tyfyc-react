import {
  createSlice,
  PayloadAction,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";
import type { Tab, TabsList } from "@/types";
import type { State } from "../index";

export interface NavigationState {
  smallDisplay: boolean;
  showSettings: boolean;
  showProfile: boolean;
  showResume: boolean;
  showStats: boolean;
  showJobBoards: boolean;
  showApplications: boolean;
  activeTab: string;
  tabs: TabsList;
  jobTabs: TabsList;
}

const initialState: NavigationState = {
  smallDisplay: false,
  showSettings: false,
  showProfile: true,
  showResume: true,
  showStats: false,
  showJobBoards: false,
  showApplications: true,
  activeTab: "",
  tabs: [
    // ToDo: get tab preference from database
    { label: "Profile", value: "profile" },
    { label: "Resume", value: "resume" },
    { label: "Stats", value: "stats" },
    { label: "Job Boards", value: "jobBoards" },
    { label: "Applications", value: "applications" },
  ],
  jobTabs: [],
};

const checkForTab = (tabs: TabsList, tabValue: string): boolean => {
  return !!tabs.map(({ value }) => value).includes(tabValue);
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setSmallDisplay: (
      state: NavigationState,
      action: PayloadAction<boolean>
    ) => {
      state.smallDisplay = action.payload;
    },
    setShowSettings: (
      state: NavigationState,
      action: PayloadAction<boolean>
    ) => {
      const tabExists = checkForTab(state.tabs, "settings");
      state.showSettings = action.payload;

      if (action.payload && state.smallDisplay) {
        state.activeTab = "settings";
      }
      if (action.payload && !tabExists) {
        state.tabs.unshift({ label: "Settings", value: "settings" });
      } else if (!action.payload && tabExists) {
        state.tabs = state.tabs.filter(({ value }) => value !== "settings");
      }
    },
    setShowProfile: (
      state: NavigationState,
      action: PayloadAction<boolean>
    ) => {
      const tabExists = checkForTab(state.tabs, "profile");
      state.showProfile = action.payload;

      if (action.payload && state.smallDisplay) {
        state.activeTab = "profile";
      }
      if (action.payload && !tabExists) {
        state.tabs.unshift({ label: "Profile", value: "profile" });
      } else if (!action.payload && tabExists) {
        state.tabs = state.tabs.filter(({ value }) => value !== "profile");
      }
    },
    setShowStats: (state: NavigationState, action: PayloadAction<boolean>) => {
      const tabExists = checkForTab(state.tabs, "stats");
      state.showProfile = action.payload;

      if (action.payload && state.smallDisplay) {
        state.activeTab = "stats";
      }
      if (action.payload && !tabExists) {
        state.tabs.unshift({ label: "Stats", value: "stats" });
      } else if (!action.payload && tabExists) {
        state.tabs = state.tabs.filter(({ value }) => value !== "stats");
      }
    },
    setShowResume: (state: NavigationState, action: PayloadAction<boolean>) => {
      const tabExists = checkForTab(state.tabs, "resume");
      state.showResume = action.payload;

      if (action.payload && state.smallDisplay) {
        state.activeTab = "resume";
      }
      if (action.payload && !tabExists) {
        state.tabs.unshift({ label: "Resume", value: "resume" });
      } else if (!action.payload && tabExists) {
        state.tabs = state.tabs.filter(({ value }) => value !== "resume");
      }
    },
    setShowJobBoards: (
      state: NavigationState,
      action: PayloadAction<boolean>
    ) => {
      const tabExists = checkForTab(state.tabs, "jobBoards");
      state.showResume = action.payload;

      if (action.payload && state.smallDisplay) {
        state.activeTab = "jobBoards";
      }
      if (action.payload && !tabExists) {
        state.tabs.unshift({ label: "Job Boards", value: "jobBoards" });
      } else if (!action.payload && tabExists) {
        state.tabs = state.tabs.filter(({ value }) => value !== "jobBoards");
      }
    },
    setShowApplications: (
      state: NavigationState,
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
    setActiveTab: (state: NavigationState, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    addJobTabs: (state: NavigationState, action: PayloadAction<Tab>) => {
      const tabExists = checkForTab(state.jobTabs, action.payload.value);
      if (!tabExists) {
        const jobTabs = state.jobTabs || [];
        state.jobTabs = [...jobTabs, action.payload];
      }
    },
    removeJobTab: (state: NavigationState, action: PayloadAction<string>) => {
      state.jobTabs = state.jobTabs.filter(
        ({ value }) => value !== action.payload
      );
    },
    setJobTab: (state: NavigationState, action: PayloadAction<Tab>) => {
      const index = state.jobTabs.findIndex(
        ({ value }) => value === action.payload.value
      );
      state.jobTabs[index] = action.payload;
    },
    setTabsToDefault: (state: NavigationState) => {
      state.tabs = [
        { label: "Profile", value: "profile" },
        { label: "Applications", value: "applications" },
      ];
      state.jobTabs = [];
    },
  },
});

export const {
  setSmallDisplay,
  setShowSettings,
  setShowProfile,
  setShowStats,
  setShowResume,
  setShowJobBoards,
  setShowApplications,
  setActiveTab,
  setJobTab,
  addJobTabs,
  removeJobTab,
  setTabsToDefault,
} = navigationSlice.actions;
export default navigationSlice.reducer;

const selectNavigation = (state: State) => state.navigation;

export const getTabs = createDraftSafeSelector(
  selectNavigation,
  (navigation) => {
    return [...navigation.tabs, ...navigation.jobTabs];
  }
);

export const getActiveTab = createDraftSafeSelector(
  selectNavigation,
  (navigation) => {
    const tabs = navigation.smallDisplay
      ? [...navigation.tabs, ...navigation.jobTabs]
      : [...navigation.jobTabs];
    const tabExists = checkForTab(tabs, navigation.activeTab);

    if (!tabExists) {
      return tabs.pop()?.value || "";
    }
    return navigation.activeTab;
  }
);

export const isApplicationDetail = createDraftSafeSelector(
  selectNavigation,
  (navigation) => {
    const nonDetailPage = ["profile", "resume", "applications"];
    return !nonDetailPage.includes(navigation.activeTab);
  }
);
