import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AuthContext } from "@/context/AuthContext";
import Application from "./containers/Application";
import Profile from "./containers/Profile";
import Resume from "./containers/Resume";
import Applications from "./containers/Applications";
import Tabs from "./components/Tabs";
import SideMenu from "./components/SideMenu";
import Alerts from "./components/Alerts";

import {
  setActiveTab,
  getTabs,
  getActiveTab,
} from "./store/reducers/settingsSlice";
import type { State } from "./store";

function App() {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const tabs = useSelector(getTabs);
  const activeTab = useSelector(getActiveTab);
  const { smallDisplay } = useSelector((state: State) => state.settings);

  const setActive = (activeValue: string) => {
    dispatch(setActiveTab(activeValue));
  };

  return (
    <>
      {token && (
        <div className="flex">
          <SideMenu />
          <div className="m-3">
            {smallDisplay ? (
              <>
                <Tabs tabs={tabs} active={activeTab} setActive={setActive} />
                <div className="flex bg-white justify-center">
                  {activeTab === "profile" && <Profile />}
                  {activeTab === "resume" && <Resume />}
                  {activeTab === "applications" && <Applications />}
                  {!["profile", "resume", "applications"].includes(
                    activeTab
                  ) && <Application />}
                </div>
              </>
            ) : (
              <div className="flex gap-4">
                <Profile />
                <Resume />
                <Applications />
                <Application />
              </div>
            )}
          </div>
          <Alerts />
        </div>
      )}
    </>
  );
}

export default App;
