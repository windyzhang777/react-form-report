import { Dispatch } from "react";
import {
  ProfileActionType,
  ProfileDispatchFuncType,
  ProfileReducerAction,
  ProfileStateType,
} from "src/commons/types";
import { Employee } from "src/types/GetProfilerRes";
import axiosInstance from "src/utils/axiosInstance";
import config from "src/utils/env.config";

const FETCH_PROFILE: ProfileActionType = "FETCH_PROFILE";
const FETCH_SUCCESS: ProfileActionType = "FETCH_SUCCESS";
const FETCH_FAILURE: ProfileActionType = "FETCH_FAILURE";

const initialState: ProfileStateType = {
  loading: false,
  profileData: null,
  error: "",
};

const initFetch = () => {
  return { type: FETCH_PROFILE };
};

const fetchSuccess = (data: Employee) => {
  return {
    type: FETCH_SUCCESS,
    data,
  };
};

const fetchFailure = (message: string) => {
  return {
    type: FETCH_FAILURE,
    message,
  };
};

const profileReducer = (state: ProfileStateType = initialState, action: ProfileReducerAction) => {
  switch (action.type) {
    case FETCH_PROFILE: {
      return { ...state, loading: true };
    }
    case FETCH_SUCCESS: {
      return { ...state, loading: false, profileData: action.data, error: "" };
    }
    case FETCH_FAILURE: {
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
        const userProfileInfo = res?.data?.Result?.Employee;
        if (userProfileInfo?.employeeId !== null) {
          sessionStorage.setItem("id", userProfileInfo.EmployeeId);
          sessionStorage.setItem("station", userProfileInfo.Station);
          sessionStorage.setItem("fname", userProfileInfo.FirstName);
          sessionStorage.setItem("lname", userProfileInfo.LastName);
          sessionStorage.setItem("jobRole", userProfileInfo.JobRole);
          sessionStorage.setItem("isBase", res.data.Result.IsBaseFlow);
        }
        dispatch(fetchSuccess(userProfileInfo));
      })
      .catch((error) => dispatch(fetchFailure(error.message)));
  };
};

export default profileReducer;
