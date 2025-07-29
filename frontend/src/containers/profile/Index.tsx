import { useState } from "react";

import Title from "./Inputs/Title";
import Contact from "./Inputs/Contact";
import Summary from "./Inputs/Summary";
import Skills from "./Inputs/Skills";
import Employment from "./Inputs/Employment";
import Education from "./Inputs/Education";
import Projects from "./Inputs/Projects";

function Profile() {
  const [lockEdit, setLockEdit] = useState<boolean>(true);

  return (
    <>
      <div className="page">
        <div className="flex justify-end">
          {lockEdit ? (
            <button
              className="rounded-full border-2 border-indigo-600 p-2 text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
              onClick={() => {
                setLockEdit(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                id="lock-profile"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </button>
          ) : (
            <button
              className="rounded-full border-2 border-indigo-600 p-2 text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
              onClick={() => {
                setLockEdit(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                id="unlock-profile"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="w-3xl justify-self-center">
          <Title lockEdit={lockEdit} />
          <Contact lockEdit={lockEdit} />
          <Summary lockEdit={lockEdit} />
          <Skills lockEdit={lockEdit} />
          <Employment lockEdit={lockEdit} />
          <Education lockEdit={lockEdit} />
          <Projects lockEdit={lockEdit} />
        </div>
      </div>
    </>
  );
}

export default Profile;
