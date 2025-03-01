import { useSelector, useDispatch } from "react-redux";

import JobPosting from "./components/jobsTracker/jobPosting/Index";
import Resume from "./components/resume/Index";
import Applications from "./components/jobsTracker/Applications";
import Tabs from "./components/Tabs";
import SideMenu from "./components/SideMenu";

import {
  setActiveTab,
  getTabs,
  getActiveTabs,
} from "./store/reducers/settingsSlice";
import type { State } from "./store";

function App() {
  const dispatch = useDispatch();
  const tabs = useSelector(getTabs);
  const activeTab = useSelector(getActiveTabs);
  const smallDisplay = useSelector(
    ({ settings }: State) => settings.smallDisplay
  );

  const setActive = (activeValue: string) => {
    dispatch(setActiveTab(activeValue));
  };

  return (
    <>
      <div className="flex">
        <div className="h-screen absolute">
          <SideMenu />
        </div>
        <div className="m-3 ml-15 w-full">
          {smallDisplay && (
            <Tabs tabs={tabs} active={activeTab} setActive={setActive} />
          )}

          <div
            className={`${
              smallDisplay
                ? "flex justify-center bg-white w-full h-full"
                : "flex gap-4"
            }`}
          >
            <Resume />
            <Applications />
            <JobPosting />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
