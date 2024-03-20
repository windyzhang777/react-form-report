import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import CommonLoader from "src/commons/CommonLoader";
import Header from "src/components/header/Header";
import HomeScreen from "src/components/homescreen/HomeScreen";
import { getProfile } from "src/redux/ducks/getProfile";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import config from "src/utils/env.config";

const App = () => {
  const { profileData, loading: loadingProfileData } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  let empId: string;

  const resetApp = () => {
    if (config.REACT_APP_ENVIRONMENT === "development") empId = "v130186";
    if (!profileData) {
      dispatch(getProfile(sessionStorage.id || empId || "v130186"));
    }
  };

  useEffect(() => {
    resetApp();
  }, []);

  if (loadingProfileData) {
    return <CommonLoader />;
  }

  return (
    <div className="app">
      <Header resetApp={resetApp} />
      <Routes>
        <Route path="/esfr" element={<HomeScreen />} />
      </Routes>
    </div>
  );
};

export default App;
