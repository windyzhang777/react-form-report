import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { FlexCenter, FlexColumn } from "src/commons/Box";
import CommonLoader from "src/commons/CommonLoader";
import { SelectedStatus, UserPermission } from "src/commons/types";
import Header from "src/components/header/Header";
import HomeScreen from "src/components/homescreen/HomeScreen";
import { clearLocalStorage } from "src/helpers";
import { getAllSdrs } from "src/redux/ducks/getAllSdrs";
import { getProfile } from "src/redux/ducks/getProfile";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import config from "src/utils/env.config";
import { useAuth } from "src/utils/oauth2-pkce";

const App = () => {
  const {
    loading: loadingProfileData,
    profileData,
    auth,
  } = useAppSelector((state) => state.profile);
  const { authService } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  let empId: string;

  const resetApp = () => {
    if (config.REACT_APP_ENVIRONMENT === "localhost") empId = "V130186";
    dispatch(getProfile(sessionStorage.id || empId || "v130186"));
    if (profileData) {
      dispatch(getAllSdrs(SelectedStatus.Open));
      dispatch(getAllSdrs(SelectedStatus.ApprovedWithFollowUp));
      dispatch(getAllSdrs(SelectedStatus.Approved));
    }
  };

  useEffect(() => {
    if (window.location.host.indexOf("ual.com") >= 0) {
      const urlParams = new URLSearchParams(window.location.search);

      if (authService) {
        setLoginError(null);
        if (authService && !authService.isAuthenticated() && !authService.isPending()) {
          authService.authorize();
        } else {
          try {
            const logginedUserData = authService.getUser();
            const vid = logginedUserData["cognito:username"]
              .replace("oamqa_", "")
              .replace("oam_", "")
              .replace("@united.com", "");
            sessionStorage.setItem("id", vid);
            dispatch(getProfile(vid));
          } catch (error) {
            if (!urlParams.get("code")) {
              sessionStorage.clear();
              clearLocalStorage();
              if (error instanceof Error) {
                if (error.message === "Invalid token specified") {
                  // The page will reload when "auth" in localStorage doesn't have any value
                  // This is to avoid the manual requirement of reloading the page by the user (which is currently done in Station Plan)
                  window.location.reload();
                } else {
                  setLoginError(error.message);
                }
              }
            }
          }
        }
        if (urlParams.get("error_description") || urlParams.get("error")) {
          sessionStorage.clear();
          clearLocalStorage();
          setLoginError(urlParams.get("error_description"));
        }
      }
    } else {
      dispatch(getProfile(sessionStorage.id || "v130186"));
    }
  }, []);

  if (loadingProfileData) {
    return <CommonLoader />;
  }

  if (loginError) {
    return <FlexCenter className="h-full select-none">{loginError}</FlexCenter>;
  }

  if (profileData && auth === UserPermission.Invalid) {
    return (
      <FlexCenter className="h-full select-none">
        Please contact your manager for access.
      </FlexCenter>
    );
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
