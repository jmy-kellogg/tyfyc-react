import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import applicationsReducer, {
  ApplicationsState,
} from "./reducers/applicationsSlice";
import educationReducer, { EducationState } from "./reducers/educationSlice";
import jobHistoryReducer, { JobsState } from "./reducers/jobHistorySlice";
import personalReducer, { PersonalState } from "./reducers/personalSlice";
import navigationReducer, { NavigationState } from "./reducers/navigationSlice";
import skillsReducer, { SkillsState } from "./reducers/skillsSlice";
import projectsReducer, { ProjectsState } from "./reducers/projectsSlice";
import alertsReducer, { AlertsState } from "./reducers/alertsSlice";

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export interface State {
  applications: ApplicationsState;
  education: EducationState;
  jobHistory: JobsState;
  personal: PersonalState;
  navigation: NavigationState;
  skills: SkillsState;
  projects: ProjectsState;
  alerts: AlertsState;
}

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  applications: applicationsReducer,
  education: educationReducer,
  jobHistory: jobHistoryReducer,
  personal: personalReducer,
  navigation: navigationReducer,
  skills: skillsReducer,
  projects: projectsReducer,
  alerts: alertsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
