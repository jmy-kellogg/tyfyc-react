import { useDispatch } from "react-redux";
import { removeOpenTab } from "../store/reducers/applicationsSlice";
interface Props {
  tabs: Array<{ label: string; value: string }>;
  active: string;
  setActive: (tab: string) => void;
}

function Tabs({ tabs, active, setActive }: Props) {
  const dispatch = useDispatch();

  const removeTab = (jobId: string) => {
    dispatch(removeOpenTab(jobId));
  };

  return (
    <>
      <div className="flex">
        {tabs.map(({ label, value }) => (
          <div
            className={`p-2 rounded-t-lg ${
              active == value ? " font-bold bg-white mb-0" : ""
            }`}
          >
            <button
              key={value}
              className={`m-1 hover:font-bold ${
                active !== value ? "hover:cursor-pointer" : ""
              }`}
              onClick={() => setActive(value)}
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
                  className="size-5 "
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
