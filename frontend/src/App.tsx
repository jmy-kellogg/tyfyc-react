import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "@/context/AuthContext.ts";

import SideMenu from "./components/SideMenu/index";
import SmallDisplayView from "./containers/SmallDisplayView";
import LargeDisplayView from "./containers/LargeDisplayView";

import { getFeatureFlags } from "@/api/auth";
import { fetchUser } from "@/api/user";
import { setUser, setFlags } from "src/store/reducers/authSlice";
import type { State } from "./store";
import NewJobModal from "@/components/NewJobModal";

function App() {
  const dispatch = useDispatch();
  const { logout } = useAuthContext();
  const token = useSelector((state: State) => state.auth.token);
  const { smallDisplay } = useSelector((state: State) => state.navigation);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const userProfile = await fetchUser();
        dispatch(setUser(userProfile));

        const featureFlags = (await getFeatureFlags()) || [];
        dispatch(setFlags(featureFlags));
      };
      fetchData();
    } else if (logout) {
      logout();
    }
  }, [dispatch, logout, token]);

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
