import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import JobPosting from "./components/jobPosting/Index";
import Resume from "./components/resume/Index";
import Applications from "./components/Applications";
import Tabs from "./components/Tabs";
import SideMenu from "./components/SideMenu";
import {
  setActiveTab,
  setTabs,
  setDefaultTab,
} from "./store/reducers/settingsSlice";

import type { State } from "../types";

function App() {
  const dispatch = useDispatch();
  const tabs = useSelector((state: State) => state.settings.tabs);
  const activeTab = useSelector((state: State) => state.settings.activeTab);
  const smallDisplay = useSelector(
    (state: State) => state.settings.smallDisplay
  );

  const setActive = (activeValue: string) => {
    dispatch(setActiveTab(activeValue));
  };

  useEffect(() => {
    dispatch(setTabs());
    dispatch(setDefaultTab());
  }, [smallDisplay, dispatch]);

  return (
    <>
      <div className="flex">
        <SideMenu />
        <div className="m-3">
          {smallDisplay && (
            <Tabs tabs={tabs || []} active={activeTab} setActive={setActive} />
          )}

          <div className="grid grid-flow-col gap-4">
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
