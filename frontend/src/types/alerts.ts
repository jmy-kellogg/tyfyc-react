export type AlertType = "success" | "error" | "warning" | "info";

export interface Alert {
  id: string;
  message: string;
  type: AlertType;
}

export interface AlertContextType {
  alerts: Alert[];
  addSuccess: (message: string) => void;
  addError: (message: string) => void;
  addWarning: (message: string) => void;
  addInfo: (message: string) => void;
  removeAlert: (id: string) => void;
  clearAlerts: () => void;
}
