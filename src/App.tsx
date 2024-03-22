import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import CommonLoader from "src/commons/CommonLoader";
import Header from "src/components/header/Header";
import HomeScreen from "src/components/homescreen/HomeScreen";
import { getProfile } from "src/redux/ducks/getProfile";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import config from "src/utils/env.config";
import { FlexColumn } from "./commons/Box";

const App = () => {
  const { loading: loadingProfileData } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  let empId: string;

  const resetApp = () => {
    if (config.REACT_APP_ENVIRONMENT === "localhost") empId = "v130186";
    dispatch(getProfile(sessionStorage.id || empId));
  };

  useEffect(() => {
    resetApp();
  }, []);

  if (loadingProfileData) {
    return <CommonLoader />;
  }

  return (
    <FlexColumn className="app">
      <Header resetApp={resetApp} />
      <Routes>
        <Route path="/esfr" element={<HomeScreen />} />
      </Routes>
    </FlexColumn>
  );
};

export default App;
