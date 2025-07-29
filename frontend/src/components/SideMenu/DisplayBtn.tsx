import { useSelector, useDispatch } from "react-redux";

import { setSmallDisplay } from "src/store/reducers/navigationSlice";
import type { State } from "src/store";

interface Props {
  openMenu: boolean;
}

function DisplayBtn({ openMenu }: Props) {
  const dispatch = useDispatch();
  const smallDisplay = useSelector(
    (state: State) => state.navigation.smallDisplay
  );

  const toggleDisplay = () => {
    dispatch(setSmallDisplay(!smallDisplay));
  };

  return (
    <>
      <button
        className="my-2 flex w-max hover:cursor-pointer hover:text-indigo-400 hover:font-bold"
        onClick={toggleDisplay}
      >
        {smallDisplay ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 hover:size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 hover:size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>
        )}
        {openMenu && (
          <div className="mx-2">
            {smallDisplay ? "Large Display" : "Small Display"}
          </div>
        )}
      </button>
    </>
  );
}

export default DisplayBtn;
