import React, { useContext, MouseEvent } from "react";
import { AuthContext } from "@/context/AuthContext";

interface LogoutBtnProps {
  openMenu: boolean;
}

const LogoutBtn: React.FC<LogoutBtnProps> = ({ openMenu }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (logout) {
      logout();
    }
  };

  return (
    <button
      className="m-2 flex w-max hover:cursor-pointer hover:text-indigo-400 hover:font-bold"
      onClick={handleLogout}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 hover:size-7"
        id="menu-logout"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
        />
      </svg>
      {openMenu && <div className="mx-2 content-center">Logout</div>}
    </button>
  );
};

export default LogoutBtn;
