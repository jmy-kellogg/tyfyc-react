import { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPersonal } from "../../store/reducers/personalSlice";
import JobsHistory from "./inputs/JobsHistory";
import Education from "./inputs/Education";
import Skills from "./inputs/Skills";
import DocUploader from "./inputs/DocUploader";
import Projects from "./inputs/Projects";

import type { State } from "../../store";

function ResumeEdit() {
  const dispatch = useDispatch();
  const personal = useSelector((state: State) => state.personal);

  const updateData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = e.target.name;
    const value = e.target.value;
    dispatch(setPersonal({ [field]: value }));
  };

  return (
    <>
      <form>
        <DocUploader />
        <h2>
          <b>Personal</b>
        </h2>
        <div className="grid gap-x-1 gap-y-6 grid-cols-4">
          <div className="col-span-2">
            <label className="block text-sm/6 font-medium">First name</label>
            <div className="mt-2">
              <input
                id="first-name"
                name="firstName"
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={personal.firstName}
                onChange={updateData}
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm/6 font-medium">Last name</label>
            <div className="mt-2">
              <input
                id="last-name"
                name="lastName"
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={personal.lastName}
                onChange={updateData}
              />
            </div>
          </div>
          <div className="col-span-full">
            <label className="block text-sm/6 font-medium">
              Target Job Title
            </label>
            <div className="mt-2">
              <input
                id="job-title"
                name="jobTitle"
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={personal.jobTitle}
                onChange={updateData}
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm/6 font-medium">Email address</label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={personal.email}
                onChange={updateData}
              />
            </div>
          </div>
          <div className="col-span-2">
            <label className="block text-sm/6 font-medium">Phone</label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="tel"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={personal.phone}
                onChange={updateData}
              />
            </div>
          </div>

          <div className="col-span-3">
            <label className="block text-sm/6 font-medium">City</label>
            <div className="mt-2">
              <input
                id="city"
                name="city"
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={personal.city}
                onChange={updateData}
              />
            </div>
          </div>

          <div className="col-span-1">
            <label className="block text-sm/6 font-medium">State</label>
            <div className="mt-2">
              <input
                name="state"
                id="state"
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={personal.state}
                onChange={updateData}
              />
            </div>
          </div>
          <div className="col-span-2">
            <label className="block text-sm/6 font-medium">LinkedIn</label>
            <div className="mt-2">
              <input
                id="linkedin"
                name="linkedIn"
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={personal.linkedIn || "www.linkedin.com/in/"}
                onChange={updateData}
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm/6 font-medium">GitHub</label>
            <div className="mt-2">
              <input
                id="github"
                name="gitHub"
                type="text"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={personal.gitHub || "www.github.com/"}
                onChange={updateData}
              />
            </div>
          </div>

          <div className="col-span-full">
            <label className="block text-sm/6 font-medium">Summary</label>
            <div className="mt-2">
              <textarea
                id="summary"
                name="summary"
                className="block w-full rounded-md bg-white px-3 py-1.5 h-32 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
                value={personal.summary}
                onChange={updateData}
              ></textarea>
            </div>
          </div>
          <Skills />
          <JobsHistory />
          <Education />
          <Projects />
        </div>
      </form>
    </>
  );
}

export default ResumeEdit;
