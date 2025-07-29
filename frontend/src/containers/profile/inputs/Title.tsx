import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Divider from "src/components/Divider";
import { updateUser } from "@/api/user";
import type { State } from "@/store";

interface Props {
  lockEdit: boolean;
}

function Title({ lockEdit }: Props) {
  const user = useSelector((state: State) => state.auth.user);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || "");

  const validateData = () => {
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

  const updateData = () => {
    if (validateData()) {
      updateUser({ firstName, lastName, jobTitle });
    }
  };

  useEffect(() => {
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
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={() => {
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
                onChange={(e) => setLastName(e.target.value)}
                onBlur={() => {
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
              onChange={(e) => setJobTitle(e.target.value)}
              onBlur={() => {
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
}

export default Title;
