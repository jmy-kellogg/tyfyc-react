import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "@/context/AuthContext";

import SideMenu from "./components/SideMenu";
import Alerts from "./components/Alerts";
import SmallDisplayView from "./containers/SmallDisplayView";
import LargeDisplayView from "./containers/LargeDisplayView";

import { getFeatureFlags } from "@/api/auth";
import { fetchUser } from "@/api/user";
import { setUser, setFlags } from "src/store/reducers/authSlice";
import type { State } from "./store";

function App() {
  const dispatch = useDispatch();
  const { logout } = useContext(AuthContext);
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
