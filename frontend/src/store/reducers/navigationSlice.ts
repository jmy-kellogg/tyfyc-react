import {
  createSlice,
  PayloadAction,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";
import type { Tab, TabsList } from "@/types";
import type { State } from "../index";

export interface NavigationState {
  smallDisplay: boolean;
  showProfile: boolean;
  showResume: boolean;
  showApplications: boolean;
  activeTab: string;
  tabs: TabsList;
  jobTabs: TabsList;
}

const initialState: NavigationState = {
  smallDisplay: false,
  showProfile: true,
  showResume: true,
  showApplications: true,
  activeTab: "",
  tabs: [
    { label: "Profile", value: "profile" },
    { label: "Resume", value: "resume" },
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
        { label: "Resume", value: "resume" },
        { label: "Applications", value: "applications" },
      ];
      state.jobTabs = [];
    },
  },
});

export const {
  setSmallDisplay,
  setShowProfile,
  setShowResume,
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
