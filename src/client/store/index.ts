import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import applicationsReducer, {
  ApplicationsState,
} from "./reducers/applicationsSlice";
import educationReducer, { EducationState } from "./reducers/educationSlice";
import jobsReducer, { JobsState } from "./reducers/jobsSlice";
import personalReducer, { PersonalState } from "./reducers/personalSlice";
import settingsReducer, { SettingsState } from "./reducers/settingsSlice";
import skillsReducer, { SkillsState } from "./reducers/skillsSlice";

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export interface State {
  applications: ApplicationsState;
  education: EducationState;
  jobs: JobsState;
  personal: PersonalState;
  settings: SettingsState;
  skills: SkillsState;
}

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  applications: applicationsReducer,
  education: educationReducer,
  jobs: jobsReducer,
  personal: personalReducer,
  settings: settingsReducer,
  skills: skillsReducer,
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
