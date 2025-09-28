import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";

const Logout: React.FC = () => {
  const { logout } = useContext(AuthContext);

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
