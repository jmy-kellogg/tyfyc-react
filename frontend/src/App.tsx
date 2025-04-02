import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AuthContext } from "@/context/AuthContext";
import ApplicationDetails from "./containers/ApplicationDetails";
import Profile from "./containers/Profile";
import Resume from "./containers/Resume";
import ApplicationsList from "./containers/ApplicationsList";
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
                  {activeTab === "applications" && <ApplicationsList />}
                  {!["profile", "resume", "applications"].includes(
                    activeTab
                  ) && <ApplicationDetails />}
                </div>
              </>
            ) : (
              <div className="flex gap-4">
                <Profile />
                <Resume />
                <ApplicationsList />
                <ApplicationDetails />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
