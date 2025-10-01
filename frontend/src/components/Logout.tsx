import React, { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext.ts";

const Logout: React.FC = () => {
  const { logout } = useAuthContext();

  useEffect(() => {
    if (logout) {
      logout();
    }
  }, [logout]);

  return (
    <>
      <div>Logged Out</div>
    </>
  );
};

export default Logout;
