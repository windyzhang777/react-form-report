import { Dispatch } from "redux";
import { SdrDispatchFuncType, ReducerAction, SdrStateType, SdrDataType, StatusId, SdrActionType } from "../../commons/types";
import axiosInstance from "../../utils/axiosInstance";
import config from "../../utils/env.config";

const FETCH_NEW_SDRS: SdrActionType = "FETCH_NEW_SDRS";
const FETCH_APPROVED_SDRS: SdrActionType = "FETCH_APPROVED_SDRS";
const FETCH_FLAGGED_SDRS: SdrActionType = "FETCH_FLAGGED_SDRS";
const FETCH_NEW_SUCCESS: SdrActionType = "FETCH_NEW_SUCCESS";
const FETCH_APPROVED_SUCCESS: SdrActionType = "FETCH_APPROVED_SUCCESS";
const FETCH_FLAGGED_SUCCESS: SdrActionType = "FETCH_FLAGGED_SUCCESS";
const FETCH_NEW_FAILURE: SdrActionType = "FETCH_NEW_FAILURE";
const FETCH_APPROVED_FAILURE: SdrActionType = "FETCH_APPROVED_FAILURE";
const FETCH_FLAGGED_FAILURE: SdrActionType = "FETCH_FLAGGED_FAILURE";

const initialState: SdrStateType = {
    loading: false,
    sdrData: null,
    error: "",
};

const initFetch = (statusId: StatusId) => {
    switch (statusId) {
        case 2:
            return { type: FETCH_NEW_SDRS };
        case 3:
            return { type: FETCH_APPROVED_SDRS};
        case 4:
            return { type: FETCH_FLAGGED_SDRS};
    }
};

const fetchSuccess = (data: SdrDataType, statusId: StatusId) => {
    switch (statusId) {
        case 2:
            return {type: FETCH_NEW_SUCCESS, data};
        case 3:
            return {type: FETCH_APPROVED_SUCCESS, data};
        case 4:
            return {type: FETCH_FLAGGED_SUCCESS, data};
    }
};

const fetchFailure = (message: string, statusId: StatusId) => {
    switch (statusId) {
        case 2:
            return {type: FETCH_NEW_FAILURE, message};
        case 3:
            return {type: FETCH_APPROVED_FAILURE, message};
        case 4:
            return {type: FETCH_FLAGGED_FAILURE, message};
    }
};

export const newSdrsReducer = (state: SdrStateType = initialState, action: ReducerAction) => {
    switch (action.type) {
        case FETCH_NEW_SDRS: {
            return { ...state, loading: true };
        }
        case FETCH_NEW_SUCCESS: {
            return { ...state, loading: false, sdrData: action.data, error: "" };
        }
        case FETCH_NEW_FAILURE: {
            return { ...state, loading: false, sdrData: null, error: action.message };
        }
        default:
            return state;
    }
};

export const approvedSdrsReducer = (state: SdrStateType = initialState, action: ReducerAction) => {
    switch (action.type) {
        case FETCH_APPROVED_SDRS: {
            return { ...state, loading: true };
        }
        case FETCH_APPROVED_SUCCESS: {
            return { ...state, loading: false, sdrData: action.data, error: "" };
        }
        case FETCH_APPROVED_FAILURE: {
            return { ...state, loading: false, sdrData: null, error: action.message };
        }
        default:
            return state;
    }
};

export const flaggedSdrsReducer = (state: SdrStateType = initialState, action: ReducerAction) => {
    switch (action.type) {
        case FETCH_FLAGGED_SDRS: {
            return { ...state, loading: true };
        }
        case FETCH_FLAGGED_SUCCESS: {
            return { ...state, loading: false, sdrData: action.data, error: "" };
        }
        case FETCH_FLAGGED_FAILURE: {
            return { ...state, loading: false, sdrData: null, error: action.message };
        }
        default:
            return state;
    }
};

export const getAllSdrs = (statusId: StatusId) => {
    return function (dispatch: Dispatch<SdrDispatchFuncType>) {
        dispatch(initFetch(statusId));
        axiosInstance
            .post(`${config.apiBaseAddress}${config.URL_GET_ALL_SDRS}`, {
                "statusId": statusId
            })
            .then((res) => {
                const sdrsInfo = res.data.Result;
                dispatch(fetchSuccess(sdrsInfo, statusId));
            })
            .catch((error) => dispatch(fetchFailure(error.message, statusId)));
    };
};