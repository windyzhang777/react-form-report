import { Dispatch } from "react";
import {
  EsfrReportActionType,
  EsfrReportDispatchFuncType,
  EsfrReportReducerAction,
  EsfrReportStateType,
  IReportSearchValues,
} from "src/commons/types";
import { GetEsfrReportResResult } from "src/types/GetEsfrReportRes";
import axiosInstance from "src/utils/axiosInstance";
import config from "src/utils/env.config";

const initialState: EsfrReportStateType = {
  loading: false,
  esfrReport: null,
  error: "",
};

const initFetch = () => {
  return { type: EsfrReportActionType.FETCH_ESFR_REPORT };
};

const fetchSuccess = (data: GetEsfrReportResResult[]) => {
  return {
    type: EsfrReportActionType.FETCH_ESFR_REPORT_SUCCESS,
    data,
  };
};

export const resetEsfrReportSuccess = () => {
  return {
    type: EsfrReportActionType.FETCH_ESFR_REPORT_SUCCESS,
    data: null,
  };
};

const fetchFailure = (message: string) => {
  return {
    type: EsfrReportActionType.FETCH_ESFR_REPORT_FAILURE,
    message,
  };
};

const esfrReportReducer = (
  state: EsfrReportStateType = initialState,
  action: EsfrReportReducerAction
) => {
  switch (action.type) {
    case EsfrReportActionType.FETCH_ESFR_REPORT: {
      return { ...state, loading: true };
    }
    case EsfrReportActionType.FETCH_ESFR_REPORT_SUCCESS: {
      return { ...state, loading: false, esfrReport: action.data, error: "" };
    }
    case EsfrReportActionType.FETCH_ESFR_REPORT_FAILURE: {
      return { ...state, loading: false, esfrReport: null, error: action.message };
    }
    default:
      return state;
  }
};

export const getEsfrReport = (values: IReportSearchValues) => {
  return function (dispatch: Dispatch<EsfrReportDispatchFuncType>) {
    dispatch(initFetch());
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_GET_ESFR_REPORT}`, values)
      .then((res) => {
        const esfrReport = res?.data?.Result;
        dispatch(fetchSuccess(esfrReport));
      })
      .catch((error) => dispatch(fetchFailure(error.message)));
  };
};

export default esfrReportReducer;
