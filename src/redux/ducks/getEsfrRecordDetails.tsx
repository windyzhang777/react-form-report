import { Dispatch } from "redux";
import {
  EsfrRecordDetailActionType,
  EsfrRecordDetailFuncType,
  EsfrRecordDetailReducerAcition,
  EsfrRecordDetailStateType,
  SfrMasterDataFuncType,
} from "src/commons/types";
import { GetSDREsfrRecordDetailsResResult } from "src/types/GetSdrEsfrRecordDetailsRes";
import { GetSfrMasterDataResResult } from "src/types/GetSfrMasterDataRes";
import { ViewLogpageResResult } from "src/types/ViewLogpageRes";
import axiosInstance from "src/utils/axiosInstance";
import config from "src/utils/env.config";

const FETCH_ESFR_DETAIL: EsfrRecordDetailActionType = "FETCH_ESFR_DETAIL";
const FETCH_ESFR_DETAIL_SUCCESS: EsfrRecordDetailActionType = "FETCH_ESFR_DETAIL_SUCCESS";
const FETCH_ESFR_DETAIL_FAILURE: EsfrRecordDetailActionType = "FETCH_ESFR_DETAIL_FAILURE";
const FETCH_SDR_MATER_DATA_SUCCESS: EsfrRecordDetailActionType = "FETCH_SDR_MATER_DATA_SUCCESS";
const FETCH_SDR_MATER_DATA_FAILURE: EsfrRecordDetailActionType = "FETCH_SDR_MATER_DATA_FAILURE";
const FETCH_LOGPAGE_DATA_SUCCESS: EsfrRecordDetailActionType = "FETCH_LOGPAGE_DATA_SUCCESS";
const FETCH_LOGPAGE_DATA_FAILURE: EsfrRecordDetailActionType = "FETCH_LOGPAGE_DATA_FAILURE";

const initialState: EsfrRecordDetailStateType = {
  loading: false,
  esfrRecordDetailData: null,
  sfrMasterData: null,
  logpageData: null,
  error: "",
};

const initFetch = () => {
  return { type: FETCH_ESFR_DETAIL };
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
  return { type: FETCH_SDR_MATER_DATA_SUCCESS, data };
};

const fetchSfrMaterDataFailure = (message: string) => {
  return { type: FETCH_SDR_MATER_DATA_FAILURE, message };
};

export const fetchLogpageDataSuccess = (data: ViewLogpageResResult) => {
  return { type: FETCH_LOGPAGE_DATA_SUCCESS, data };
};

export const resetLogpageDataSuccess = () => {
  return { type: FETCH_LOGPAGE_DATA_SUCCESS, data: null };
};

export const esfrRecordDetailsReducer = (
  state: EsfrRecordDetailStateType = initialState,
  action: EsfrRecordDetailReducerAcition
) => {
  switch (action.type) {
    case FETCH_ESFR_DETAIL: {
      return { ...state, loading: true, error: "" };
    }
    case FETCH_ESFR_DETAIL_SUCCESS: {
      return { ...state, loading: false, esfrRecordDetailData: action.data, error: "" };
    }
    case FETCH_ESFR_DETAIL_FAILURE: {
      return {
        ...state,
        loading: false,
        esfrRecordDetailData: null,
        error: `Fail to get Esfr Detail (${action.message})`,
      };
    }
    case FETCH_SDR_MATER_DATA_SUCCESS: {
      return { ...state, loading: false, sfrMasterData: action.data };
    }
    case FETCH_SDR_MATER_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        sfrMasterData: null,
        error: `Fail to get Mater Data (${action.message})`,
      };
    }
    case FETCH_LOGPAGE_DATA_SUCCESS: {
      return { ...state, loading: false, logpageData: action.data };
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

export const getEsfrRecordDetails = (logpageNumber: string) => {
  return function (dispatch: Dispatch<EsfrRecordDetailFuncType>) {
    dispatch(initFetch());
    axiosInstance
      .get(
        `${config.apiBaseAddress}${config.URL_GET_ESFR_RECORD_DETAILS}?logpageNumber=${logpageNumber}`
      )
      .then((res) => {
        const esfrRecordDetail = res?.data?.Result;
        esfrRecordDetail && dispatch(fetchSuccess(esfrRecordDetail));
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
        const sfrMasterData = res?.data?.Result;
        sfrMasterData && dispatch(fetchSfrMaterDataSuccess(sfrMasterData));
      })
      .catch((error) => dispatch(fetchSfrMaterDataFailure(error.message)));
  };
};
