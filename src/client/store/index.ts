import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import personalReducer from './reducers/personalSlice'; 
import educationReducer from './reducers/educationSlice'; 
import jobsReducer from './reducers/jobsSlice';
import skillsReducer from './reducers/skillsSlice';

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
    personal: personalReducer,
    education: educationReducer,
    jobs: jobsReducer,
    skills: skillsReducer
  }
)

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

export default store;
export const persistor = persistStore(store);

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']




