import { createContext, useContext } from "react";

interface AuthContextType {
  login: ((username: string, password: string) => Promise<void>) | null;
  register:
    | ((
        username: string,
        email: string,
        password: string,
        firstName: string,
        lastName: string
      ) => Promise<void>)
    | null;
  logout: (() => void) | null;
  flags: string[];
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = (): AuthContextType => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuthContext must be used in AuthProvider");
  }

  return authContext;
};
