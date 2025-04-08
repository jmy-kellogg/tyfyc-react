import { useContext } from "react";
import { useSelector } from "react-redux";

import SideMenu from "./components/SideMenu";
import Alerts from "./components/Alerts";
import SmallDisplayView from "./containers/SmallDisplayView";
import LargeDisplayView from "./containers/LargeDisplayView";

import { AuthContext } from "@/context/AuthContext";
import type { State } from "./store";

function App() {
  const { token } = useContext(AuthContext);
  const { smallDisplay } = useSelector((state: State) => state.settings);

  return (
    <>
      {token && (
        <div className="flex">
          <SideMenu />
          <div className="m-3">
            {smallDisplay ? <SmallDisplayView /> : <LargeDisplayView />}
          </div>
          <Alerts />
        </div>
      )}
    </>
  );
}

export default App;
