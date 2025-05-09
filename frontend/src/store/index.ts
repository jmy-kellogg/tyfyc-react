import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import applicationsReducer, {
  ApplicationsState,
} from "./reducers/applicationsSlice";
import navigationReducer, { NavigationState } from "./reducers/navigationSlice";
import alertsReducer, { AlertsState } from "./reducers/alertsSlice";
import authReducer, { AuthState } from "./reducers/authSlice";

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export interface State {
  applications: ApplicationsState;
  navigation: NavigationState;
  alerts: AlertsState;
  auth: AuthState;
}

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  applications: applicationsReducer,
  navigation: navigationReducer,
  alerts: alertsReducer,
  auth: authReducer,
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
