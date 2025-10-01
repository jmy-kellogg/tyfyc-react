import { useSelector } from "react-redux";

import SideMenu from "./components/SideMenu/index";
import SmallDisplayView from "./containers/SmallDisplayView";
import LargeDisplayView from "./containers/LargeDisplayView";

import type { State } from "./store";
import NewJobModal from "@/components/NewJobModal";

function App() {
  const token = useSelector((state: State) => state.auth.token);
  const smallDisplay = useSelector(
    (state: State) => state.navigation.smallDisplay
  );

  return (
    <>
      {token && (
        <>
          <NewJobModal />
          <div className="flex">
            <SideMenu />
            <div className="m-3 w-full">
              {smallDisplay ? <SmallDisplayView /> : <LargeDisplayView />}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
