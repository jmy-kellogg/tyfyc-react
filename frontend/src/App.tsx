import { useSelector, useDispatch } from "react-redux";

import ApplicationDetails from "./containers/applicationDetails/Index";
import Profile from "./containers/profile/Index";
import Resume from "./containers/resume/Index";
import ApplicationsList from "./containers/applicationsList/Index";
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
        <div className="m-3 w-full">
          {smallDisplay && (
            <Tabs tabs={tabs} active={activeTab} setActive={setActive} />
          )}

          <div className={`${smallDisplay ? "flex bg-white" : "flex gap-4"}`}>
            <Profile />
            <Resume />
            <ApplicationsList />
            <ApplicationDetails />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
