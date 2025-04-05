import { useState, useContext, useEffect } from "react";

import Divider from "src/components/Divider";

import { AuthContext } from "@/context/AuthContext";
import { updateUser } from "@/api/user";

interface Props {
  editAll: boolean;
  lockEdit: boolean;
}

function Title({ editAll, lockEdit }: Props) {
  const { user } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || "");
  const [hover, setHover] = useState(false);

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
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {!lockEdit && (editAll || hover) ? (
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
                  onMouseLeave={updateData}
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
                  onMouseLeave={updateData}
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
                onMouseLeave={updateData}
              />
            </div>
          </form>
        ) : (
          <div className="text-center">
            <h1>{firstName + " " + lastName}</h1>
            <h3>{jobTitle}</h3>
          </div>
        )}
      </div>
      <Divider />
    </>
  );
}

export default Title;
