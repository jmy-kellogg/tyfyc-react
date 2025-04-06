import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Alert {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export interface CreateAlert {
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export interface AlertsState {
  list: Alert[];
  showAlerts: boolean;
}

const initialState: AlertsState = {
  list: [],
  showAlerts: true,
};

export const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    addAlert: (state: AlertsState, action: PayloadAction<CreateAlert>) => {
      state.list.push({ ...action.payload, id: uuidv4() });
    },
    removeAlert(state: AlertsState, action: PayloadAction<string>) {
      state.list = state.list.filter(({ id }) => id !== action.payload);
    },
    toggleAlerts(state: AlertsState) {
      state.showAlerts = !state.showAlerts;
    },
    clearAlerts(state: AlertsState) {
      state.list = [];
    },
  },
});

export const { addAlert, removeAlert, toggleAlerts, clearAlerts } =
  alertsSlice.actions;
export default alertsSlice.reducer;
