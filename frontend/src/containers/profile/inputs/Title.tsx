import React, { useState, useEffect, ChangeEvent, FocusEvent } from "react";

import Divider from "src/components/Divider";
import { updateUser } from "@/api/user";

import type { User } from "@/types";

interface TitleProps {
  lockEdit: boolean;
  user: User | null;
}

const Title: React.FC<TitleProps> = ({ lockEdit, user }) => {
  const [firstName, setFirstName] = useState<string>(user?.firstName || "");
  const [lastName, setLastName] = useState<string>(user?.lastName || "");
  const [jobTitle, setJobTitle] = useState<string>(user?.jobTitle || "");

  const validateData = (): boolean => {
    if (!firstName || !lastName || !jobTitle) {
      return false;
    } else if (
      firstName === user?.firstName &&
      lastName === user?.lastName &&
      jobTitle === user?.jobTitle
    ) {
      return false;
    } else {
      return true;
    }
  };

  const updateData = (): void => {
    if (validateData()) {
      updateUser({ firstName, lastName, jobTitle });
    }
  };

  useEffect((): void => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setJobTitle(user.jobTitle || "");
    }
  }, [user]);

  return (
    <>
      {lockEdit ? (
        <div className="text-center">
          <h1>{firstName + " " + lastName}</h1>
          <h3>{jobTitle}</h3>
        </div>
      ) : (
        <form>
          <div className="flex justify-center">
            <div className="m-1">
              <input
                id="first-name"
                name="firstName"
                type="text"
                placeholder="First Name"
                className="text-center block w-full h-10 rounded-md bg-white px-3 py-1 font-bold outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={firstName}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  setFirstName(e.target.value)
                }
                onBlur={(e: FocusEvent<HTMLInputElement>): void => {
                  e.stopPropagation();
                  if (user?.firstName !== firstName) {
                    updateData();
                  }
                }}
              />
            </div>
            <div className="m-1">
              <input
                id="last-name"
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="text-center block w-full h-10 rounded-md bg-white px-3 py-1 font-bold outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={lastName}
                onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                  setLastName(e.target.value)
                }
                onBlur={(e: FocusEvent<HTMLInputElement>): void => {
                  e.stopPropagation();
                  if (user?.lastName !== lastName) {
                    updateData();
                  }
                }}
              />
            </div>
          </div>
          <div className="m-1 w-100 justify-self-center">
            <input
              id="job-title"
              name="jobTitle"
              type="text"
              placeholder="Target Job Title"
              className="text-center block w-full rounded-md bg-white px-3 py-1 font-bold outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
              value={jobTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                setJobTitle(e.target.value)
              }
              onBlur={(e: FocusEvent<HTMLInputElement>): void => {
                e.stopPropagation();
                if (user?.jobTitle !== jobTitle) {
                  updateData();
                }
              }}
            />
          </div>
        </form>
      )}
      <Divider />
    </>
  );
};

export default Title;
