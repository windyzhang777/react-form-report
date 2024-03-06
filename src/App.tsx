import { useEffect } from "react";
import CommonLoader from "src/commons/CommonLoader";
import { SdrStatus } from "src/commons/types";
import Header from "src/components/header/Header";
import HomeScreen from "src/components/homescreen/HomeScreen";
import { getAllSdrs } from "src/redux/ducks/getAllSdrs";
import { getProfile } from "src/redux/ducks/getProfile";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";

const App = () => {
  const { loading } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  let empId: string;

  useEffect(() => {
    if (process.env.REACT_APP_ENVIRONMENT === "local") empId = "v130186";
    dispatch(getProfile(empId || "v130186"));
    dispatch(getAllSdrs(SdrStatus.New));
    dispatch(getAllSdrs(SdrStatus.Flagged));
    dispatch(getAllSdrs(SdrStatus.Approved));
  }, []);

  return (
    <div className="app">
      {loading ? (
        <CommonLoader />
      ) : (
        <div>
          <Header />
          <div>
            <HomeScreen />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
