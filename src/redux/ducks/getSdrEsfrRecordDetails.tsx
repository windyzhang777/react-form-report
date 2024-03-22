import { Dispatch } from "redux";
import {
  SdrEsfrRecordDetailsActionType,
  SdrEsfrRecordDetailsFuncType,
  SdrEsfrRecordDetailsReducerAcition,
  SdrEsfrRecordDetailsStateType,
  SfrMasterDataFuncType,
} from "src/commons/types";
import { GetSDREsfrRecordDetailsResResult } from "src/types/GetSdrEsfrRecordDetailsRes";
import { GetSfrMasterDataResResult } from "src/types/GetSfrMasterDataRes";
import { ViewLogpageResResult } from "src/types/ViewLogpageRes";
import axiosInstance from "src/utils/axiosInstance";
import config from "src/utils/env.config";

const FETCH_INIT: SdrEsfrRecordDetailsActionType = "FETCH_INIT";
const FETCH_ESFR_DETAIL_SUCCESS: SdrEsfrRecordDetailsActionType = "FETCH_ESFR_DETAIL_SUCCESS";
const FETCH_ESFR_DETAIL_FAILURE: SdrEsfrRecordDetailsActionType = "FETCH_ESFR_DETAIL_FAILURE";
const FETCH_SFR_MATER_DATA_SUCCESS: SdrEsfrRecordDetailsActionType = "FETCH_SFR_MATER_DATA_SUCCESS";
const FETCH_SFR_MATER_DATA_FAILURE: SdrEsfrRecordDetailsActionType = "FETCH_SFR_MATER_DATA_FAILURE";
const FETCH_LOGPAGE_DATA_SUCCESS: SdrEsfrRecordDetailsActionType = "FETCH_LOGPAGE_DATA_SUCCESS";
const FETCH_LOGPAGE_DATA_FAILURE: SdrEsfrRecordDetailsActionType = "FETCH_LOGPAGE_DATA_FAILURE";

const initialState: SdrEsfrRecordDetailsStateType = {
  loading: false,
  detailsData: null,
  masterData: null,
  logpageData: null,
  error: "",
};

const initFetch = () => {
  return { type: FETCH_INIT };
};

const fetchSuccess = (data: GetSDREsfrRecordDetailsResResult) => {
  return { type: FETCH_ESFR_DETAIL_SUCCESS, data };
};

const fetchFailure = (message: string) => {
  return { type: FETCH_ESFR_DETAIL_FAILURE, message };
};

export const resetEsfrRecordDetailData = () => {
  return { type: FETCH_ESFR_DETAIL_SUCCESS, data: null };
};

const fetchSfrMaterDataSuccess = (data: GetSfrMasterDataResResult) => {
  return { type: FETCH_SFR_MATER_DATA_SUCCESS, data };
};

const fetchSfrMaterDataFailure = (message: string) => {
  return { type: FETCH_SFR_MATER_DATA_FAILURE, message };
};

export const fetchLogpageDataSuccess = (data: ViewLogpageResResult) => {
  return { type: FETCH_LOGPAGE_DATA_SUCCESS, data };
};

export const resetLogpageDataSuccess = () => {
  return { type: FETCH_LOGPAGE_DATA_SUCCESS, data: null };
};

export const sdrEsfrRecordDetailsReducer = (
  state: SdrEsfrRecordDetailsStateType = initialState,
  action: SdrEsfrRecordDetailsReducerAcition
) => {
  switch (action.type) {
    case FETCH_INIT: {
      return { ...state, loading: true, error: "" };
    }
    case FETCH_ESFR_DETAIL_SUCCESS: {
      return { ...state, loading: false, detailsData: action.data, error: "" };
    }
    case FETCH_ESFR_DETAIL_FAILURE: {
      return {
        ...state,
        loading: false,
        detailsData: null,
        error: `Fail to get Esfr Detail (${action.message})`,
      };
    }
    case FETCH_SFR_MATER_DATA_SUCCESS: {
      return { ...state, loading: false, masterData: action.data, error: "" };
    }
    case FETCH_SFR_MATER_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        masterData: null,
        error: `Fail to get Mater Data (${action.message})`,
      };
    }
    case FETCH_LOGPAGE_DATA_SUCCESS: {
      return { ...state, loading: false, logpageData: action.data, error: "" };
    }
    case FETCH_LOGPAGE_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        logpageData: null,
        error: `Fail to get Logpage Data (${action.message})`,
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

export const getSfrMasterData = () => {
  return function (dispatch: Dispatch<SfrMasterDataFuncType>) {
    dispatch(initFetch());
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_GET_SFR_MASTER_DATA}`)
      .then((res) => {
        const masterData = res?.data?.Result;
        dispatch(fetchSfrMaterDataSuccess(masterData));
      })
      .catch((error) => dispatch(fetchSfrMaterDataFailure(error.message)));
  };
};
