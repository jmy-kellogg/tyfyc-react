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
  const [editAll, setEditAll] = useState<boolean>(false);

  return (
    <>
      <div className="page">
        <div className="flex justify-end">
          {!lockEdit && (
            <>
              {editAll ? (
                <button
                  className="rounded-full border-2 border-indigo-600 p-2 text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
                  onClick={() => {
                    setLockEdit(!lockEdit);
                    setEditAll(!editAll);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                    id="eye-icon"
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
                </button>
              ) : (
                <button
                  className="rounded-full border-2 border-indigo-600 p-2 text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
                  onClick={() => {
                    setLockEdit(!lockEdit);
                    setEditAll(!editAll);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                    id="pencil-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
              )}
            </>
          )}
          {!editAll && (
            <button
              className="rounded-full mx-2 border-2 border-indigo-600 p-2 text-indigo-600 shadow-md hover:bg-indigo-500 hover:text-white hover:cursor-pointer"
              onClick={() => {
                setLockEdit(!lockEdit);
                setEditAll(!editAll);
              }}
            >
              {lockEdit ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                  id="lock-icon"
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
                  id="unlock-icon"
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
        <div className="w-3xl justify-self-center">
          <Title editAll={editAll} lockEdit={lockEdit} />
          <Contact editAll={editAll} lockEdit={lockEdit} />
          <Summary editAll={editAll} lockEdit={lockEdit} />
          <Skills editAll={editAll} lockEdit={lockEdit} />
          <Employment editAll={editAll} lockEdit={lockEdit} />
          <Education editAll={editAll} lockEdit={lockEdit} />
          <Projects editAll={editAll} lockEdit={lockEdit} />
        </div>
      </div>
    </>
  );
}

export default Profile;
