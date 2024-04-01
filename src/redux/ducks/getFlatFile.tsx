import { Dispatch } from "react";
import {
  FlatFileActionType,
  FlatFileDispatchFuncType,
  FlatFileReducerAction,
  FlatFileStateType,
} from "src/commons/types";
import { ExtractSDRRecordsResResult } from "src/types/ExtractSdrRecordsRes";
import { InsertSnapshotSDRFilenameReq } from "src/types/InsertSnapshotSdrFilenameReq";
import axiosInstance from "src/utils/axiosInstance";
import config from "src/utils/env.config";

const initialState: FlatFileStateType = {
  loading: false,
  fileData: null,
  error: "",
};

const initFetch = () => {
  return { type: FlatFileActionType.FETCH_FLAT_FILE };
};

export const fetchSuccess = (data: ExtractSDRRecordsResResult) => {
  return {
    type: FlatFileActionType.FETCH_FLAT_FILE_SUCCESS,
    data,
  };
};

export const fetchFailure = (message: string) => {
  return {
    type: FlatFileActionType.FETCH_FLAT_FILE_FAILURE,
    message,
  };
};

const updateExtractionStatusSuccess = () => {
  return { type: FlatFileActionType.UPDATE_SNAPSHOT_SDR_EXTRACTION_STATUS_SUCCESS };
};

const updateExtractionStatusFailure = (message: string) => {
  return { type: FlatFileActionType.UPDATE_SNAPSHOT_SDR_EXTRACTION_STATUS_FAILURE, message };
};

const insertSnapshotSdrFilenameSuccess = () => {
  return { type: FlatFileActionType.INSERT_SNAPSHOT_SDR_FILENAME_SUCCESS };
};

const insertSnapshotSdrFilenameFailure = (message: string) => {
  return { type: FlatFileActionType.INSERT_SNAPSHOT_SDR_FILENAME_FAILURE, message };
};

const flatFileReducer = (
  state: FlatFileStateType = initialState,
  action: FlatFileReducerAction
) => {
  switch (action.type) {
    case FlatFileActionType.FETCH_FLAT_FILE: {
      return { ...state, loading: true };
    }
    case FlatFileActionType.FETCH_FLAT_FILE_SUCCESS: {
      return { ...state, loading: false, fileData: action.data, error: "" };
    }
    case FlatFileActionType.FETCH_FLAT_FILE_FAILURE: {
      return { ...state, loading: false, fileData: null, error: action.message };
    }
    case FlatFileActionType.UPDATE_SNAPSHOT_SDR_EXTRACTION_STATUS_SUCCESS: {
      return { ...state, loading: false, error: "" };
    }
    case FlatFileActionType.UPDATE_SNAPSHOT_SDR_EXTRACTION_STATUS_FAILURE: {
      return { ...state, loading: false, error: action.message };
    }
    case FlatFileActionType.INSERT_SNAPSHOT_SDR_FILENAME_SUCCESS: {
      return { ...state, loading: false, error: "" };
    }
    case FlatFileActionType.INSERT_SNAPSHOT_SDR_FILENAME_FAILURE: {
      return { ...state, loading: false, error: action.message };
    }
    default:
      return state;
  }
};

export const updateExtractionStatus = (ids: number[]) => {
  return function (dispatch: Dispatch<FlatFileDispatchFuncType>) {
    dispatch(initFetch());
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_UPDATE_SNAPSHOT_SDR_EXTRACTION_STATUS}`, ids)
      .then((res) => {
        if (res?.data?.Result?.IsSuccess) {
          dispatch(updateExtractionStatusSuccess());
        }
      })
      .catch((error) => dispatch(updateExtractionStatusFailure(error.message)));
  };
};

export const InsertSnapshotSdrFilename = (payload: InsertSnapshotSDRFilenameReq) => {
  return function (dispatch: Dispatch<FlatFileDispatchFuncType>) {
    dispatch(initFetch());
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_INSERT_SNAPSHOT_SDR_FILENAME}`, payload)
      .then((res) => {
        if (res?.data?.Result?.IsSuccess) {
          dispatch(insertSnapshotSdrFilenameSuccess());
        }
      })
      .catch((error) => dispatch(insertSnapshotSdrFilenameFailure(error.message)));
  };
};

export default flatFileReducer;
