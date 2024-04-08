import { Dispatch } from "redux";
import {
  ApprovedSdrFuncType,
  SdrEsfrRecordDetailsActionType,
  SdrEsfrRecordDetailsFuncType,
  SdrEsfrRecordDetailsReducerAction,
  SdrEsfrRecordDetailsStateType,
  SfrMasterDataFuncType,
  ViewLogPageDetailsFuncType,
} from "src/commons/types";
import { GetApprovedSDRResResult } from "src/types/GetApprovedSdrRes";
import { GetSDREsfrRecordDetailsResResult } from "src/types/GetSdrEsfrRecordDetailsRes";
import { GetSfrMasterDataResResult } from "src/types/GetSfrMasterDataRes";
import { ViewLogpageResResult } from "src/types/ViewLogpageRes";
import axiosInstance from "src/utils/axiosInstance";
import config from "src/utils/env.config";

const initialState: SdrEsfrRecordDetailsStateType = {
  loading: false,
  detailsData: null,
  snapshotData: null,
  masterData: null,
  logpageData: null,
  error: "",
};

const initFetch = () => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_DETAILS };
};

const fetchSuccess = (data: GetSDREsfrRecordDetailsResResult) => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_ESFR_DETAIL_SUCCESS, data };
};

const fetchFailure = (message: string) => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_ESFR_DETAIL_FAILURE, message };
};

export const resetEsfrRecordDetailData = () => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_ESFR_DETAIL_SUCCESS, data: null };
};

const fetchApprovedSdrSuccess = (data: GetApprovedSDRResResult) => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_APPROVED_SDR_SUCCESS, data };
};

const fetchApprovedSdrFailure = (message: string) => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_APPROVED_SDR_FAILURE, message };
};

const fetchSfrMaterDataSuccess = (data: GetSfrMasterDataResResult) => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_SFR_MATER_DATA_SUCCESS, data };
};

const fetchSfrMaterDataFailure = (message: string) => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_SFR_MATER_DATA_FAILURE, message };
};

const fetchLogpageDataSuccess = (data: ViewLogpageResResult) => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_LOGPAGE_DATA_SUCCESS, data };
};

export const resetLogpageDataSuccess = () => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_LOGPAGE_DATA_SUCCESS, data: null };
};

const fetchLogpageDataFailure = (message: string) => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_LOGPAGE_DATA_FAILURE, message };
};

export const setDetailsLoaderOff = () => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_SET_DETAILS_LOADER_OFF };
};

export const sdrEsfrRecordDetailsReducer = (
  state: SdrEsfrRecordDetailsStateType = initialState,
  action: SdrEsfrRecordDetailsReducerAction
) => {
  switch (action.type) {
    case SdrEsfrRecordDetailsActionType.FETCH_DETAILS: {
      return {
        ...state,
        loading: true,
        detailsData: null,
        snapshot: null,
        logpageData: null,
        error: "",
      };
    }
    case SdrEsfrRecordDetailsActionType.FETCH_ESFR_DETAIL_SUCCESS: {
      return { ...state, detailsData: action.data, error: "" };
    }
    case SdrEsfrRecordDetailsActionType.FETCH_ESFR_DETAIL_FAILURE: {
      return {
        ...state,
        loading: false,
        detailsData: null,
        error: `Fail to get Esfr Detail (${action.message})`,
      };
    }
    case SdrEsfrRecordDetailsActionType.FETCH_APPROVED_SDR_SUCCESS: {
      return { ...state, snapshotData: action.data, error: "" };
    }
    case SdrEsfrRecordDetailsActionType.FETCH_APPROVED_SDR_FAILURE: {
      return {
        ...state,
        loading: false,
        snapshotData: null,
        error: `Fail to get Snapshot Detail (${action.message})`,
      };
    }
    case SdrEsfrRecordDetailsActionType.FETCH_SFR_MATER_DATA_SUCCESS: {
      return { ...state, loading: false, masterData: action.data, error: "" };
    }
    case SdrEsfrRecordDetailsActionType.FETCH_SFR_MATER_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        masterData: null,
        error: `Fail to get Mater Data (${action.message})`,
      };
    }
    case SdrEsfrRecordDetailsActionType.FETCH_LOGPAGE_DATA_SUCCESS: {
      return { ...state, logpageData: action.data, error: "" };
    }
    case SdrEsfrRecordDetailsActionType.FETCH_LOGPAGE_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        logpageData: null,
        error: `Fail to get Logpage Data (${action.message})`,
      };
    }
    case SdrEsfrRecordDetailsActionType.FETCH_SET_DETAILS_LOADER_OFF: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const getSdrEsfrRecordDetails = (logpageNumber: string) => {
  return function (dispatch: Dispatch<SdrEsfrRecordDetailsFuncType>) {
    dispatch(initFetch());
    axiosInstance
      .get(
        `${config.apiBaseAddress}${config.URL_GET_SDR_ESFR_RECORD_DETAILS}?logpageNumber=${logpageNumber}`
      )
      .then((res) => {
        const esfrRecordDetail = res?.data?.Result;
        dispatch(fetchSuccess(esfrRecordDetail));
      })
      .catch((error) => dispatch(fetchFailure(error.message)));
  };
};

export const viewLogPageDetails = (logpageNumber: string) => {
  return function (dispatch: Dispatch<ViewLogPageDetailsFuncType>) {
    dispatch(initFetch());
    axiosInstance
      .get(`${config.apiBaseAddress}${config.URL_VIEW_LOGPAGE}?logpageNumber=${logpageNumber}`)
      .then((res) => {
        const logpageData = res?.data?.Result;
        dispatch(fetchLogpageDataSuccess(logpageData));
      })
      .catch((error) => dispatch(fetchLogpageDataFailure(error.message)));
  };
};

export const getApprovedSdr = (OperatorControlNumber: string) => {
  return function (dispatch: Dispatch<ApprovedSdrFuncType>) {
    dispatch(initFetch());
    axiosInstance
      .get(
        `${config.apiBaseAddress}${config.URL_GET_APPROVED_SDR}?OperatorControlNumber=${OperatorControlNumber}`
      )
      .then((res) => {
        const esfrRecordDetail = res?.data?.Result;
        dispatch(fetchApprovedSdrSuccess(esfrRecordDetail));
      })
      .catch((error) => dispatch(fetchApprovedSdrFailure(error.message)));
  };
};

export const getSfrMasterData = () => {
  return function (dispatch: Dispatch<SfrMasterDataFuncType>) {
    dispatch(initFetch());
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_GET_SFR_MASTER_DATA}`)
      .then((res) => {
        const masterData = res?.data?.Result;
        dispatch(fetchSfrMaterDataSuccess(masterData));
      })
      .catch((error) => {
        dispatch(fetchSfrMaterDataFailure(error.message));
        const masterData = require("src/types/GetSfrMasterDataRes.json");
        dispatch(fetchSfrMaterDataSuccess(masterData.Result));
      });
  };
};
