import { useDispatch } from "react-redux";
import { removeOpenTab } from "../store/reducers/applicationsSlice";
import type { TabsList } from "../../types";
interface Props {
  tabs: TabsList;
  active: string;
  setActive?: (tabValue: string) => void;
}

function Tabs({ tabs, active, setActive }: Props) {
  const dispatch = useDispatch();

  const removeTab = (jobId: string) => {
    dispatch(removeOpenTab(jobId));
  };

  return (
    <>
      <div className="flex">
        {tabs.map(({ label, value, onCollapse }) => (
          <div
            key={value}
            className={`flex p-2 rounded-t-lg ${
              active == value ? " font-bold bg-white mb-0" : ""
            }`}
          >
            {!!onCollapse && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 m-auto hover:cursor-pointer hover:font-bold hover:text-blue-400"
                onClick={onCollapse}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            )}

            <button
              className={`m-1 hover:font-bold ${
                active !== value ? "hover:cursor-pointer" : ""
              }`}
              onClick={() => setActive && setActive(value)}
            >
              {label}
            </button>
            {value !== "resume" && value !== "applications" && (
              <button
                className="ml-1 align-sub rounded-lg hover:cursor-pointer hover:font-bold hover:bg-gray-300"
                onClick={() => removeTab(value)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Tabs;
