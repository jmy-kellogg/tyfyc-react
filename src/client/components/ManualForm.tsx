import { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePersonal } from "../store/reducers/personalSlice";
import Jobs from "./inputs/Jobs";
import type { State, PersonalState } from "../types";

function ManualForm() {
  const personal: PersonalState = useSelector((state: State) => state.personal);
  const dispatch = useDispatch();

  const updateData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = e.target.name;
    const value = e.target.value;
    dispatch(updatePersonal({ [field]: value }));
  };

  return (
    <>
      <div className="bg-white mr-5 p-5">
        <form>
          {/* <DocUploaderVue /> */}
          <h2>
            <b>Personal</b>
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium">First name</label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={personal.firstName}
                  onChange={updateData}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm/6 font-medium">Last name</label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={personal.lastName}
                  onChange={updateData}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm/6 font-medium">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={personal.email}
                  onChange={updateData}
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label className="block text-sm/6 font-medium">Phone</label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={personal.phone}
                  onChange={updateData}
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label className="block text-sm/6 font-medium">City</label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={personal.city}
                  onChange={updateData}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm/6 font-medium">State</label>
              <div className="mt-2">
                <input
                  name="state"
                  id="state"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={personal.state}
                  onChange={updateData}
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label className="block text-sm/6 font-medium">LinkedIn</label>
              <div className="mt-2">
                <input
                  id="linkedin"
                  name="linkedIn"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={personal.linkedIn}
                  onChange={updateData}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm/6 font-medium">GitHub</label>
              <div className="mt-2">
                <input
                  id="github"
                  name="gitHub"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={personal.gitHub}
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
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={personal.summary}
                  onChange={updateData}
                ></textarea>
              </div>
            </div>

            {/* <SkillsVue /> */}
            <Jobs />
            {/* <EducationVue />  */}
          </div>
        </form>
      </div>
    </>
  );
}

export default ManualForm;
