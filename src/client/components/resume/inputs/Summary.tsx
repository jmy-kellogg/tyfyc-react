import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { divider } from "../../../../utils";
import { setPersonal } from "../../../store/reducers/personalSlice";
import type { State } from "../../../store";

function Summary() {
  const dispatch = useDispatch();
  const personal = useSelector((state: State) => state.personal);
  const [hover, setHover] = useState(false);

  const updateData = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
        <h2>Summary</h2>
        {hover ? (
          <div className="mt-2">
            <textarea
              id="summary"
              name="summary"
              className="block w-full rounded-md bg-white px-3 py-1.5 h-32 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-sm/6"
              value={personal.summary}
              onChange={updateData}
            ></textarea>
          </div>
        ) : (
          <div className="body-sub-section">
            <p>{personal.summary}</p>
          </div>
        )}
      </div>
      <p className="divider">{divider()}</p>
    </>
  );
}

export default Summary;
