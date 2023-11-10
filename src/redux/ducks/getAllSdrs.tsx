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

const initialNewState = {
    loading: null,
    newSdrsData: {},
    error: "",
};

const initialApprovedState = {
    loading: null,
    approvedSdrsData: {},
    error: "",
}

const initialFlaggedState = {
    loading: null,
    flaggedSdrsData: {},
    error: "",
}

const initFetch = (statusId: number) => {
    switch (statusId) {
        case 2:
            return { type: Types.FETCH_NEW_SDRS };
        case 3:
            return { type: Types.FETCH_APPROVED_SDRS};
        case 4:
            return { type: Types.FETCH_FLAGGED_SDRS};
    }
};

const fetchSuccess = (data:any, statusId: number) => {
    switch (statusId) {
        case 2:
            return {type: Types.FETCH_NEW_SUCCESS, data};
        case 3:
            return {type: Types.FETCH_APPROVED_SUCCESS, data};
        case 4:
            return {type: Types.FETCH_FLAGGED_SUCCESS, data};
    }
};

const fetchFailure = (message: any, statusId: number) => {
    switch (statusId) {
        case 2:
            return {type: Types.FETCH_NEW_FAILURE, message};
        case 3:
            return {type: Types.FETCH_APPROVED_FAILURE, message};
        case 4:
            return {type: Types.FETCH_FLAGGED_FAILURE, message};
    }
};

export const newSdrsReducer = (state = initialNewState, action: any) => {
    switch (action.type) {
        case Types.FETCH_NEW_SDRS: {
            return { ...state, loading: true };
        }
        case Types.FETCH_NEW_SUCCESS: {
            return { ...state, loading: false, newSdrsData: action.data, error: "" };
        }
        case Types.FETCH_NEW_FAILURE: {
            return { ...state, loading: false, newSdrsData: {}, error: action.message };
        }
        default:
            return state;
    }
};

export const approvedSdrsReducer = (state = initialApprovedState, action: any) => {
    switch (action.type) {
        case Types.FETCH_APPROVED_SDRS: {
            return { ...state, loading: true };
        }
        case Types.FETCH_APPROVED_SUCCESS: {
            return { ...state, loading: false, approvedSdrsData: action.data, error: "" };
        }
        case Types.FETCH_APPROVED_FAILURE: {
            return { ...state, loading: false, approvedSdrsData: {}, error: action.message };
        }
        default:
            return state;
    }
};

export const flaggedSdrsReducer = (state = initialFlaggedState, action: any) => {
    switch (action.type) {
        case Types.FETCH_FLAGGED_SDRS: {
            return { ...state, loading: true };
        }
        case Types.FETCH_FLAGGED_SUCCESS: {
            return { ...state, loading: false, flaggedSdrsData: action.data, error: "" };
        }
        case Types.FETCH_FLAGGED_FAILURE: {
            return { ...state, loading: false, flaggedSdrsData: {}, error: action.message };
        }
        default:
            return state;
    }
};

export const getAllSdrs = (statusId: number) => {
    return function (dispatch: any) {
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
