import { Dispatch } from "react";
import {
  ProfileActionType,
  ProfileDispatchFuncType,
  ProfileReducerAction,
  ProfileStateType,
  UserPermission,
} from "src/commons/types";
import { getUserPermission } from "src/helpers";
import { GetProfileResResult, UserPolicy } from "src/types/GetProfilerRes";
import axiosInstance from "src/utils/axiosInstance";
import config from "src/utils/env.config";

const initialState: ProfileStateType = {
  loading: false,
  profileData: null,
  auth: UserPermission.Invalid,
  error: "",
};

const initFetch = () => {
  return { type: ProfileActionType.FETCH_PROFILE };
};

const fetchSuccess = (data: GetProfileResResult) => {
  return {
    type: ProfileActionType.FETCH_PROFILE_SUCCESS,
    data,
  };
};

const fetchFailure = (message: string) => {
  return {
    type: ProfileActionType.FETCH_PROFILE_FAILURE,
    message,
  };
};

const profileReducer = (state: ProfileStateType = initialState, action: ProfileReducerAction) => {
  switch (action.type) {
    case ProfileActionType.FETCH_PROFILE: {
      return { ...state, loading: true, auth: UserPermission.Invalid };
    }
    case ProfileActionType.FETCH_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        profileData: action.data.Employee,
        auth: getUserPermission(action.data.TechOpsSecurityUserPolicies),
        error: "",
      };
    }
    case ProfileActionType.FETCH_PROFILE_FAILURE: {
      return { ...state, loading: false, profileData: null, error: action.message };
    }
    default:
      return state;
  }
};

export const getProfile = (empID: string) => {
  return function (dispatch: Dispatch<ProfileDispatchFuncType>) {
    dispatch(initFetch());
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_GET_PROFILE}`, { EmployeeId: empID })
      .then((res) => {
        const userProfileResult = res?.data?.Result;
        if (userProfileResult) {
          const { EmployeeId, Station, FirstName, LastName, JobRole } = userProfileResult.Employee;
          const policyName = userProfileResult.TechOpsSecurityUserPolicies.find(
            (p: UserPolicy) => p.AppName === "ESFR"
          )?.PolicyName;
          if (EmployeeId !== null) {
            sessionStorage.setItem("id", EmployeeId);
            sessionStorage.setItem("station", Station);
            sessionStorage.setItem("fname", FirstName);
            sessionStorage.setItem("lname", LastName);
            sessionStorage.setItem("jobRole", policyName || JobRole);
            sessionStorage.setItem("isBase", userProfileResult.IsBaseFlow);
          }
          dispatch(fetchSuccess(userProfileResult));
        }
      })
      .catch((error) => dispatch(fetchFailure(error.message)));
  };
};

export default profileReducer;
