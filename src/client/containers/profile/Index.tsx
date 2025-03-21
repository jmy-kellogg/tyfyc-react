import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Tabs from "@/components/Tabs";

import Title from "./inputs/Title";
import Contact from "./inputs/Contact";
import Summary from "./inputs/Summary";
import Skills from "./inputs/Skills";
import JobsHistory from "./inputs/JobsHistory";
import Education from "./inputs/Education";
import Projects from "./inputs/Projects";
import { getActiveTab } from "@/reducers/settingsSlice";
import type { State } from "@store";

function Profile() {
  const [showDisplay, setShowDisplay] = useState<boolean>(true);
  const [lockEdit, setLockEdit] = useState<boolean>(false);
  const [editAll, setEditAll] = useState<boolean>(false);

  const activeTab = useSelector(getActiveTab);
  const showProfile = useSelector((state: State) => state.settings.showProfile);
  const smallDisplay = useSelector(
    (state: State) => state.settings.smallDisplay
  );

  useEffect(() => {
    const show = smallDisplay ? activeTab === "profile" : showProfile;
    setShowDisplay(show);
  }, [smallDisplay, activeTab, showProfile]);

  return (
    <>
      {showDisplay && (
        <div>
          {!smallDisplay && (
            <Tabs
              tabs={[
                {
                  label: "Profile",
                  value: "profile",
                },
              ]}
              active="profile"
            />
          )}
          <div className="m-3 flex justify-end">
            {!lockEdit && (
              <button
                className="rounded-full border-2 border-indigo-600 p-2 text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
                onClick={() => setEditAll(!editAll)}
              >
                {editAll ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                )}
              </button>
            )}
            {!editAll && (
              <button
                className="rounded-full mx-2 border-2 border-indigo-600 p-2 text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
                onClick={() => setLockEdit(!lockEdit)}
              >
                {lockEdit ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
          <div className="w-3xl my-5">
            <div>
              <div>
                <Title editAll={editAll} lockEdit={lockEdit} />
                <Contact editAll={editAll} lockEdit={lockEdit} />
              </div>

              <div className="px-5">
                <Summary editAll={editAll} lockEdit={lockEdit} />
                <Skills editAll={editAll} lockEdit={lockEdit} />
                <JobsHistory editAll={editAll} lockEdit={lockEdit} />
                <Education editAll={editAll} lockEdit={lockEdit} />
                <Projects editAll={editAll} lockEdit={lockEdit} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
