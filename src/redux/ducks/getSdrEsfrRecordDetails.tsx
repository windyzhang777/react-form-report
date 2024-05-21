import axios from "axios";
import { Dispatch } from "redux";
import {
  CtnDataFuncType,
  IViewSdrResult,
  SdrEsfrRecordDetailsActionType,
  SdrEsfrRecordDetailsReducerAction,
  SdrEsfrRecordDetailsStateType,
  SfrMasterDataFuncType,
  ViewLogPageDetailsFuncType,
  locationStaDataFuncType,
} from "src/commons/types";
import { DoesSDRExistsResResult } from "src/types/DoesSdrExistsRes";
import { GetApprovedSDRResResult } from "src/types/GetApprovedSdrRes";
import { GetCtnResResult } from "src/types/GetCtnRes";
import { GetLocationStaDataResResult } from "src/types/GetLocationStaDataRes";
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
  locationStaData: null,
  logpageData: null,
  ctnData: null,
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

export const resetApprovedSdrSuccess = () => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_APPROVED_SDR_SUCCESS, data: null };
};

const fetchApprovedSdrFailure = (message: string) => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_APPROVED_SDR_FAILURE, message };
};

const fetchSfrMasterDataSuccess = (data: GetSfrMasterDataResResult) => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_SFR_MASTER_DATA_SUCCESS, data };
};

const fetchSfrMasterDataFailure = (message: string) => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_SFR_MASTER_DATA_FAILURE, message };
};

const fetchLocationStaDataSuccess = (data: GetLocationStaDataResResult) => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_LOCATION_STA_DATA_SUCCESS, data };
};

const fetchLocationStaDataFailure = (message: string) => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_LOCATION_STA_DATA_FAILURE, message };
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

const fetchCtnDataSuccess = (data: GetCtnResResult) => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_CTN_DATA_SUCCESS, data };
};

export const resetCtnDataSuccess = () => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_CTN_DATA_SUCCESS, data: null };
};

const fetchCtnDataFailure = (message: string) => {
  return { type: SdrEsfrRecordDetailsActionType.FETCH_CTN_DATA_FAILURE, message };
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
        ctnData: null,
        error: "",
      };
    }
    case SdrEsfrRecordDetailsActionType.FETCH_ESFR_DETAIL_SUCCESS: {
      return { ...state, loading: false, detailsData: action.data, error: "" };
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
    case SdrEsfrRecordDetailsActionType.FETCH_LOGPAGE_DATA_SUCCESS: {
      return { ...state, loading: false, logpageData: action.data, error: "" };
    }
    case SdrEsfrRecordDetailsActionType.FETCH_LOGPAGE_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        logpageData: null,
        error: action.message,
      };
    }
    case SdrEsfrRecordDetailsActionType.FETCH_SFR_MASTER_DATA_SUCCESS: {
      return { ...state, loading: false, masterData: action.data, error: "" };
    }
    case SdrEsfrRecordDetailsActionType.FETCH_SFR_MASTER_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        masterData: null,
        error: `Fail to get Master Data (${action.message})`,
      };
    }
    case SdrEsfrRecordDetailsActionType.FETCH_LOCATION_STA_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        locationStaData: action.data,
        error: "",
      };
    }
    case SdrEsfrRecordDetailsActionType.FETCH_LOCATION_STA_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        locationStaData: null,
        error: `Fail to get Location Sta Data (${action.message})`,
      };
    }
    case SdrEsfrRecordDetailsActionType.FETCH_CTN_DATA_SUCCESS: {
      return { ...state, loading: false, ctnData: action.data, error: "" };
    }
    case SdrEsfrRecordDetailsActionType.FETCH_CTN_DATA_FAILURE: {
      return {
        ...state,
        loading: false,
        ctnData: null,
        error: `No data found for the current fleet`,
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

export const getSdrEsfrRecordDetails = (selectedSdr: IViewSdrResult) => {
  return function (dispatch: Dispatch<any>) {
    dispatch(resetEsfrRecordDetailData());
    dispatch(resetLogpageDataSuccess());
    dispatch(initFetch());
    axiosInstance
      .get(
        `${config.apiBaseAddress}${config.URL_GET_SDR_ESFR_RECORD_DETAILS}?logpageNumber=${selectedSdr?.LogpageNumber}&station=${selectedSdr?.Station}&aircraftNumber=${selectedSdr?.AircraftNumber}&logpageCreationDate=${selectedSdr?.LogpageCreationDate}`
      )
      .then((res) => {
        const esfrRecordDetail = res?.data?.Result;
        dispatch(fetchSuccess(esfrRecordDetail));
      })
      .catch((error) => dispatch(fetchFailure(error.message)))
      .finally(() => dispatch(setDetailsLoaderOff()));
  };
};

export const viewLogPageDetails = (logpageNumber: string, checkSdr: boolean = false) => {
  return function (dispatch: Dispatch<ViewLogPageDetailsFuncType>) {
    dispatch(initFetch());
    axiosInstance
      .get(`${config.apiBaseAddress}${config.URL_VIEW_LOGPAGE}?logpageNumber=${logpageNumber}`)
      .then((res) => {
        const logpageData = res?.data?.Result;
        if (logpageData.MasterData) {
          if (checkSdr) {
            axiosInstance
              .get(
                `${config.apiBaseAddress}${config.URL_DOES_SDR_EXISTS}?logpageNumber=${logpageNumber}&aircraftNumber=${logpageData?.FleetInfo?.TailNumber}&logpageCreationDate=${logpageData?.FleetInfo?.Date}`
              )
              .then((res) => {
                const isSdrExists = (res?.data?.Result as DoesSDRExistsResResult).IsSdrExists;
                if (isSdrExists) {
                  dispatch(fetchLogpageDataFailure("SDR for this logpage already exists"));
                } else {
                  dispatch(fetchLogpageDataSuccess(logpageData));
                }
              });
          }
        } else {
          dispatch(fetchLogpageDataFailure("Invalid Logpage Number"));
        }
      })
      .catch((error) =>
        dispatch(fetchLogpageDataFailure(`Fail to get Logpage Data (${error.message})`))
      );
  };
};

export const getApprovedSdr = (logpageNumber: string, OperatorControlNumber: string) => {
  return function (dispatch: Dispatch<any>) {
    dispatch(resetApprovedSdrSuccess());
    dispatch(resetLogpageDataSuccess());
    dispatch(initFetch());
    axios
      .all([
        axiosInstance.get(
          `${config.apiBaseAddress}${config.URL_GET_APPROVED_SDR}?OperatorControlNumber=${OperatorControlNumber}`
        ),
        axiosInstance.get(
          `${config.apiBaseAddress}${config.URL_VIEW_LOGPAGE}?logpageNumber=${logpageNumber}`
        ),
      ])
      .then(
        axios.spread((...res) => {
          const esfrRecordDetail = res?.[0]?.data?.Result;
          dispatch(fetchApprovedSdrSuccess(esfrRecordDetail));
          const logpageData = res?.[1]?.data?.Result;
          if (logpageData.MasterData) {
            dispatch(fetchLogpageDataSuccess(logpageData));
          } else {
            dispatch(fetchLogpageDataFailure("Invalid Logpage Number"));
          }
        })
      )
      .catch((error) => dispatch(fetchApprovedSdrFailure(error.message)))
      .finally(() => dispatch(setDetailsLoaderOff()));
  };
};

export const getSfrMasterData = () => {
  return function (dispatch: Dispatch<SfrMasterDataFuncType>) {
    dispatch(initFetch());
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_GET_SFR_MASTER_DATA}`)
      .then((res) => {
        const masterData = res?.data?.Result;
        dispatch(fetchSfrMasterDataSuccess(masterData));
      })
      .catch((error) => {
        dispatch(fetchSfrMasterDataFailure(error.message));
        const masterData = require("src/types/GetSfrMasterDataRes.json");
        dispatch(fetchSfrMasterDataSuccess(masterData.Result));
      });
  };
};

export const getLocationStaData = (SceptreCode: string, DefectLocationId: number) => {
  return function (dispatch: Dispatch<locationStaDataFuncType>) {
    dispatch(initFetch());
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_GET_LOCATION_STA_DATA}`, {
        FleetCode: SceptreCode,
        DefectLocationId,
      })
      .then((res) => {
        const locationStaData = res?.data?.Result;
        dispatch(fetchLocationStaDataSuccess(locationStaData));
      })
      .catch((error) => dispatch(fetchLocationStaDataFailure(error.message)));
  };
};

export const getCtnData = (SceptreCode: string) => {
  return function (dispatch: Dispatch<CtnDataFuncType>) {
    dispatch(initFetch());
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_GET_CTN}`, { FleetCode: SceptreCode })
      .then((res) => {
        const ctnData = res?.data?.Result;
        dispatch(fetchCtnDataSuccess(ctnData));
      })
      .catch((error) => dispatch(fetchCtnDataFailure(error.message)));
  };
};

export const getSidData = (SceptreCode: string) => {
  return function (dispatch: Dispatch<CtnDataFuncType>) {
    dispatch(initFetch());
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_GET_SID}`, { FleetCode: SceptreCode })
      .then((res) => {
        const ctnData = res?.data?.Result;
        dispatch(fetchCtnDataSuccess(ctnData));
      })
      .catch((error) => dispatch(fetchCtnDataFailure(error.message)));
  };
};
