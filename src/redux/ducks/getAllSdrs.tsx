import { Dispatch } from "redux";
import { DispatchFunctionType, ReducerAction, SdrStateType, SdrsDataType, StatusId } from "../../commons/types";
import axiosInstance from "../../utils/axiosInstance";
import config from "../../utils/env.config";

const Types = {
    FETCH_NEW_SDRS: "FETCH_NEW_SDRS",
    FETCH_APPROVED_SDRS: "FETCH_APPROVED_SDRS",
    FETCH_FLAGGED_SDRS: "FETCH_FLAGGED_SDRS",
    FETCH_NEW_SUCCESS: "FETCH_NEW_SUCCESS",
    FETCH_APPROVED_SUCCESS: "FETCH_APPROVED_SUCCESS",
    FETCH_FLAGGED_SUCCESS: "FETCH_FLAGGED_SUCCESS",
    FETCH_NEW_FAILURE: "FETCH_NEW_FAILURE",
    FETCH_APPROVED_FAILURE: "FETCH_APPROVED_FAILURE",
    FETCH_FLAGGED_FAILURE: "FETCH_FLAGGED_FAILURE",
};

const initialState: SdrStateType = {
    loading: false,
    sdrsData: null,
    error: "",
};


const initFetch = (statusId: StatusId) => {
    switch (statusId) {
        case 2:
            return { type: Types.FETCH_NEW_SDRS };
        case 3:
            return { type: Types.FETCH_APPROVED_SDRS};
        case 4:
            return { type: Types.FETCH_FLAGGED_SDRS};
    }
};

const fetchSuccess = (data: SdrsDataType, statusId: StatusId) => {
    switch (statusId) {
        case 2:
            return {type: Types.FETCH_NEW_SUCCESS, data};
        case 3:
            return {type: Types.FETCH_APPROVED_SUCCESS, data};
        case 4:
            return {type: Types.FETCH_FLAGGED_SUCCESS, data};
    }
};

const fetchFailure = (message: string, statusId: StatusId) => {
    switch (statusId) {
        case 2:
            return {type: Types.FETCH_NEW_FAILURE, message};
        case 3:
            return {type: Types.FETCH_APPROVED_FAILURE, message};
        case 4:
            return {type: Types.FETCH_FLAGGED_FAILURE, message};
    }
};

export const newSdrsReducer = (state: SdrStateType = initialState, action: ReducerAction) => {
    switch (action.type) {
        case Types.FETCH_NEW_SDRS: {
            return { ...state, loading: true };
        }
        case Types.FETCH_NEW_SUCCESS: {
            return { ...state, loading: false, sdrsData: action.data, error: "" };
        }
        case Types.FETCH_NEW_FAILURE: {
            return { ...state, loading: false, sdrsData: null, error: action.message };
        }
        default:
            return state;
    }
};

export const approvedSdrsReducer = (state: SdrStateType = initialState, action: ReducerAction) => {
    switch (action.type) {
        case Types.FETCH_APPROVED_SDRS: {
            return { ...state, loading: true };
        }
        case Types.FETCH_APPROVED_SUCCESS: {
            return { ...state, loading: false, sdrsData: action.data, error: "" };
        }
        case Types.FETCH_APPROVED_FAILURE: {
            return { ...state, loading: false, sdrsData: null, error: action.message };
        }
        default:
            return state;
    }
};

export const flaggedSdrsReducer = (state: SdrStateType = initialState, action: ReducerAction) => {
    switch (action.type) {
        case Types.FETCH_FLAGGED_SDRS: {
            return { ...state, loading: true };
        }
        case Types.FETCH_FLAGGED_SUCCESS: {
            return { ...state, loading: false, sdrsData: action.data, error: "" };
        }
        case Types.FETCH_FLAGGED_FAILURE: {
            return { ...state, loading: false, sdrsData: null, error: action.message };
        }
        default:
            return state;
    }
};

export const getAllSdrs = (statusId: StatusId) => {
    return function (dispatch: Dispatch<DispatchFunctionType>) {
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
