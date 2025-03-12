import { useSelector, useDispatch } from "react-redux";

import JobPosting from "./containers/jobsTracker/jobPosting/Index";
import Resume from "./containers/resume/Index";
import Applications from "./containers/jobsTracker/Applications";
import Tabs from "./components/Tabs";
import SideMenu from "./components/SideMenu";

import {
  setActiveTab,
  getTabs,
  getActiveTab,
} from "./store/reducers/settingsSlice";
import type { State } from "./store";

function App() {
  const dispatch = useDispatch();
  const tabs = useSelector(getTabs);
  const activeTab = useSelector(getActiveTab);
  const smallDisplay = useSelector(
    ({ settings }: State) => settings.smallDisplay
  );

  const setActive = (activeValue: string) => {
    dispatch(setActiveTab(activeValue));
  };

  return (
    <>
      <div className="flex">
        <SideMenu />
        <div className={`m-3 ${smallDisplay ? "w-210" : "w-full"}`}>
          {smallDisplay && (
            <Tabs tabs={tabs} active={activeTab} setActive={setActive} />
          )}

          <div
            className={`${
              smallDisplay
                ? "flex justify-center bg-white w-full"
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
