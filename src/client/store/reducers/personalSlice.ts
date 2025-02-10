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
  }
})

export const { updatePersonal  } = personalSlice.actions
export default personalSlice.reducer