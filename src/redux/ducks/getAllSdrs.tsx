import { Dispatch } from "redux";
import {
  SdrActionType,
  SdrDispatchFuncType,
  SdrReducerAction,
  SdrStateType,
  SelectedStatus,
} from "src/commons/types";
import { transformSdrData } from "src/helpers";
import { GetAllEsfrRecordsResResult } from "src/types/GetAllEsfrRecordsRes";
import axiosInstance from "src/utils/axiosInstance";
import config from "src/utils/env.config";

const initialState: SdrStateType = {
  loading: false,
  sdrData: null,
  error: "",
};

const initFetch = (statusId: SelectedStatus) => {
  switch (statusId) {
    case SelectedStatus.Approved:
      return { type: SdrActionType.FETCH_APPROVED_SDRS };
    case SelectedStatus.ApprovedWithFollowUp:
      return { type: SdrActionType.FETCH_FLAGGED_SDRS };
    case SelectedStatus.Open:
    default:
      return { type: SdrActionType.FETCH_NEW_SDRS };
  }
};

const fetchSuccess = (data: GetAllEsfrRecordsResResult[], statusId: SelectedStatus) => {
  switch (statusId) {
    case SelectedStatus.Approved:
      return { type: SdrActionType.FETCH_APPROVED_SUCCESS, data: transformSdrData(data, statusId) };
    case SelectedStatus.ApprovedWithFollowUp:
      return { type: SdrActionType.FETCH_FLAGGED_SUCCESS, data: transformSdrData(data, statusId) };
    case SelectedStatus.Open:
    default:
      return { type: SdrActionType.FETCH_NEW_SUCCESS, data: transformSdrData(data, statusId) };
  }
};

const fetchFailure = (message: string, statusId: SelectedStatus) => {
  switch (statusId) {
    case SelectedStatus.Approved:
      return { type: SdrActionType.FETCH_APPROVED_FAILURE, message };
    case SelectedStatus.ApprovedWithFollowUp:
      return { type: SdrActionType.FETCH_FLAGGED_FAILURE, message };
    case SelectedStatus.Open:
    default:
      return { type: SdrActionType.FETCH_NEW_FAILURE, message };
  }
};

export const newSdrsReducer = (state: SdrStateType = initialState, action: SdrReducerAction) => {
  switch (action.type) {
    case SdrActionType.FETCH_NEW_SDRS: {
      return { ...state, loading: true };
    }
    case SdrActionType.FETCH_NEW_SUCCESS: {
      return { ...state, loading: false, sdrData: action.data, error: "" };
    }
    case SdrActionType.FETCH_NEW_FAILURE: {
      return { ...state, loading: false, sdrData: null, error: action.message };
    }
    default:
      return state;
  }
};

export const approvedSdrsReducer = (
  state: SdrStateType = initialState,
  action: SdrReducerAction
) => {
  switch (action.type) {
    case SdrActionType.FETCH_APPROVED_SDRS: {
      return { ...state, loading: true };
    }
    case SdrActionType.FETCH_APPROVED_SUCCESS: {
      return { ...state, loading: false, sdrData: action.data, error: "" };
    }
    case SdrActionType.FETCH_APPROVED_FAILURE: {
      return { ...state, loading: false, sdrData: null, error: action.message };
    }
    default:
      return state;
  }
};

export const flaggedSdrsReducer = (
  state: SdrStateType = initialState,
  action: SdrReducerAction
) => {
  switch (action.type) {
    case SdrActionType.FETCH_FLAGGED_SDRS: {
      return { ...state, loading: true };
    }
    case SdrActionType.FETCH_FLAGGED_SUCCESS: {
      return { ...state, loading: false, sdrData: action.data, error: "" };
    }
    case SdrActionType.FETCH_FLAGGED_FAILURE: {
      return { ...state, loading: false, sdrData: null, error: action.message };
    }
    default:
      return state;
  }
};

export const getAllSdrs = (statusId: SelectedStatus) => {
  return function (dispatch: Dispatch<SdrDispatchFuncType>) {
    dispatch(initFetch(statusId));
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_GET_ALL_SDRS}`, {
        statusId: statusId,
      })
      .then((res) => {
        const sdrsInfo = res?.data?.Result;
        dispatch(fetchSuccess(sdrsInfo, statusId));
      })
      .catch((error) => dispatch(fetchFailure(error.message, statusId)));
  };
};
