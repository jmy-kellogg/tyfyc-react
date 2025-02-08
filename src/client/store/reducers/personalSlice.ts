import {  createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PersonalState {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    city: string,
    state: string,
    linkedIn: string,
    gitHub: string,
    summary: string,
}

const initialState: PersonalState = {
    firstName: "Jess",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    linkedIn: "",
    gitHub: "",
    summary: "",
}

export const personalSlice = createSlice({
  name: 'personal',
  initialState,
  reducers: {
    updatePersonal: (state: PersonalState,  action: PayloadAction<PersonalState>) => {
      return {...state, ...action.payload}
    },
    // syncWithLocalStorage: state => {
    //   const personalData = localStorage.getItem("personal");
    //   if (personalData) {
    //     const parseData: PersonalState = JSON.parse(personalData);
    //     return {
    //       ...state,
    //       ...parseData
    //     }
    //   }
    // },
    // saveToLocalStorage(state) {
    //   localStorage.setItem("personal", JSON.stringify(state));
    // },
  }
})

export const { updatePersonal  } = personalSlice.actions
export default personalSlice.reducer