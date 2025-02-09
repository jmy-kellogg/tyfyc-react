import {  createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { PersonalState} from "../../../types"

type PersonalStateUpdate  = Partial<PersonalState>

const initialState: PersonalState = {
    firstName: "",
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
    updatePersonal: (state: PersonalState,  action: PayloadAction<PersonalStateUpdate>) => {
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