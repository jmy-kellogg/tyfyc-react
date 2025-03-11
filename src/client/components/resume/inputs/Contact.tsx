import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { divider } from "../../../../utils";
import { setPersonal } from "../../../store/reducers/personalSlice";

import type { State } from "../../../store";

function Contact() {
  const dispatch = useDispatch();
  const personal = useSelector((state: State) => state.personal);
  const [hover, setHover] = useState(false);

  const updateData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = e.target.name;
    const value = e.target.value;
    dispatch(setPersonal({ [field]: value }));
  };

  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover ? (
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
          </form>
        ) : (
          <div>
            <p>
              Email: {personal.email} | Phone: {personal.phone} | Location:{" "}
              {personal.city + ", " + personal.state}
            </p>
            <p>
              LinkedIn: {personal.linkedIn} | GitHub: {personal.gitHub}
            </p>
          </div>
        )}
      </div>
      <p className="divider">{divider()}</p>
    </>
  );
}

export default Contact;
