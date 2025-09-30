import { createContext, useContext } from "react";
import type { AlertContextType } from "@/types";

export const AlertContext = createContext<AlertContextType | null>(null);

export const useAlertContext = (): AlertContextType => {
  const alertContext = useContext(AlertContext);
  if (!alertContext) {
    throw new Error("useAlertContext must be used in provider");
  }
  return alertContext;
};
