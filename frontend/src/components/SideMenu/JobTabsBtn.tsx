import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "src/store/reducers/navigationSlice";
import type { State } from "src/store";
interface Props {
  openMenu: boolean;
  activeTab: string;
}

function JobTabsBtn({ openMenu, activeTab }: Props) {
  const dispatch = useDispatch();
  const jobTabs = useSelector((state: State) => state.navigation.jobTabs);
  const toggleJob = (jobId: string) => {
    dispatch(setActiveTab(jobId));
  };

  return (
    <>
      {jobTabs.map(({ label, value }) => (
        <button
          key={value}
          className="flex my-2 hover:cursor-pointer hover:text-indigo-400 hover:font-bold"
          onClick={() => {
            toggleJob(value);
          }}
        >
          <span
            className={`w-6 text-xl font-bold border rounded-md hover:text-2xl ${
              value === activeTab
                ? "text-white bg-slate-800 hover:bg-indigo-400"
                : "hover:text-indigo-400 hover:bg-indigo-100"
            }`}
          >
            {label[0].toLocaleUpperCase()}
          </span>
          {openMenu && (
            <div
              className={`${activeTab === value ? "font-bold" : ""} mx-2 content-center`}
            >
              {label}
            </div>
          )}
        </button>
      ))}
    </>
  );
}

export default JobTabsBtn;
