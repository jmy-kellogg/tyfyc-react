import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";

function Logout() {
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
}

export default Logout;
