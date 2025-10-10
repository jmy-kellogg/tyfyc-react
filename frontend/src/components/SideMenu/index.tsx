import React, { useState, MouseEvent } from "react";
import { useSelector } from "react-redux";

import { getActiveTab } from "src/store/reducers/navigationSlice";
import DisplayBtn from "./DisplayBtn";
import ProfileBtn from "./ProfileBtn";
import StatsBtn from "./StatsBtn";
import ResumeBtn from "./ResumeBtn";
import JobBoardsBtn from "./JobBoardsBtn";
import ApplicationBtn from "./ApplicationBtn";
import JobTabsBtn from "./JobTabsBtn";
import LogoutBtn from "./LogoutBtn";
import SettingsBtn from "./SettingsBtn";

const SideMenu: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(
    () => localStorage.getItem("openMenu") === "true"
  );
  const activeTab: string = useSelector(getActiveTab);

  const toggleMenu = (): void => {
    const menuStatus: boolean = !openMenu;
    localStorage.setItem("openMenu", menuStatus.toString());
    setOpenMenu(menuStatus);
  };

  return (
    <>
      <div
        className={`${openMenu ? "w-max" : "w-12"} h-screen sticky top-0 left-0 bg-white text-slate-800 shadow-lg flex flex-col justify-between`}
      >
        <button
          className="p-2 m-1 w-min rounded-lg hover:cursor-pointer hover:inset-shadow-sm hover:inset-shadow-slate-400 hover:text-indigo-400"
          onClick={(e: MouseEvent<HTMLButtonElement>): void => {
            e.stopPropagation();
            toggleMenu();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
            id="menu-toggle"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex flex-col h-full px-3">
          <DisplayBtn openMenu={openMenu} />
          <ProfileBtn openMenu={openMenu} activeTab={activeTab} />
          <ResumeBtn openMenu={openMenu} activeTab={activeTab} />
          <StatsBtn openMenu={openMenu} activeTab={activeTab} />
          <JobBoardsBtn openMenu={openMenu} activeTab={activeTab} />
          <ApplicationBtn openMenu={openMenu} activeTab={activeTab} />
          <JobTabsBtn openMenu={openMenu} activeTab={activeTab} />
        </div>
        <SettingsBtn openMenu={openMenu} activeTab={activeTab} />
        <LogoutBtn openMenu={openMenu} />
      </div>
    </>
  );
};

export default SideMenu;
