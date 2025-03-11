import { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPersonal } from "../../../store/reducers/personalSlice";

import type { State } from "../../../store";

function Contact() {
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
        <div className="flex justify-center">
          <div className="m-1">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
              value={personal.email}
              onChange={updateData}
            />
          </div>
          <div className="m-1">
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
              value={personal.phone}
              onChange={updateData}
            />
          </div>
          <div className="m-1">
            <input
              id="city"
              name="city"
              type="text"
              placeholder="City"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
              value={personal.city}
              onChange={updateData}
            />
          </div>
          <div className="m-1 w-20">
            <input
              name="state"
              id="state"
              type="text"
              placeholder="State"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
              value={personal.state}
              onChange={updateData}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="m-1 w-90">
            <input
              id="linkedin"
              name="linkedIn"
              type="text"
              placeholder="LinkedIn"
              className="text-center block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
              value={personal.linkedIn || "www.linkedin.com/in/"}
              onChange={updateData}
            />
          </div>
          <div className="m-1 w-90">
            <input
              id="github"
              name="gitHub"
              type="text"
              placeholder="GitHub"
              className="text-center block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
              value={personal.gitHub || "www.github.com/"}
              onChange={updateData}
            />
          </div>
        </div>
        <hr className="col-span-full h-px my-2 bg-gray-300 border-0" />
      </form>
    </>
  );
}

export default Contact;
