import axiosInstance from "../../utils/axiosInstance";
import config from "../../utils/env.config";
import {ReducerAction, ProfileStateType, DispatchFunctionType} from "../../commons/types";
import { Dispatch } from "react";

const Types = {
    FETCH_PROFILE: "FETCH_PROFILE",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_FAILURE: "FETCH_FAILURE",
};

const initialState: ProfileStateType = {
    loading: false,
    profileData: null,
    error: "",
};

const initFetch = () => {
    return { type: Types.FETCH_PROFILE };
};

const fetchSuccess = (data: ProfileStateType) => {
    return {
        type: Types.FETCH_SUCCESS,
        data,
    };
};

const fetchFailure = (message: string) => {
    return {
        type: Types.FETCH_FAILURE,
        message,
    };
};

const profileReducer = (state: ProfileStateType = initialState, action: ReducerAction) => {
    switch (action.type) {
        case Types.FETCH_PROFILE: {
            return { ...state, loading: true };
        }
        case Types.FETCH_SUCCESS: {
            return { ...state, loading: false, profileData: action.data, error: "" };
        }
        case Types.FETCH_FAILURE: {
            return { ...state, loading: false, profileData: null, error: action.message };
        }
        default:
            return state;
    }
};

export const getProfile = (empID: string) => {
    return function (dispatch: Dispatch<DispatchFunctionType>) {
        dispatch(initFetch());
        axiosInstance
            .post(`${config.apiBaseAddress}${config.URL_GET_PROFILE}`, { EmployeeId: empID })
            .then((res) => {
                const userProfileInfo = res.data.Result.Employee;
                if (userProfileInfo.employeeId !== null) {
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
