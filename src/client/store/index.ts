import { configureStore } from '@reduxjs/toolkit';
import personalReducer from './reducers/personalSlice'; 
import educationReducer from './reducers/educationSlice'; 
import jobsReducer from './reducers/jobsSlice';
import skillsReducer from './reducers/skillsSlice';


const store = configureStore({
  reducer: {
    personal: personalReducer,
    education: educationReducer,
    jobs: jobsReducer,
    skills: skillsReducer
  }
})

export default store;

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
