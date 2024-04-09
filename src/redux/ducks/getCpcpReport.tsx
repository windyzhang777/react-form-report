import { Dispatch } from "react";
import {
    CpcpReportActionType,
    CpcpReportDispatchFuncType,
    CpcpReportReducerAction,
    CpcpReportStateType,
    ICpcpReportSearchValues
} from "src/commons/types";
import { GetCpcpReportResResult } from "src/types/GetCpcpReportRes";
import axiosInstance from "src/utils/axiosInstance";
import config from "src/utils/env.config";

const initialState: CpcpReportStateType = {
  loading: false,
  cpcpReport: null,
  error: "",
};

const initFetch = () => {
  return { type: CpcpReportActionType.FETCH_CPCP_REPORT };
};

const fetchSuccess = (data: GetCpcpReportResResult[]) => {
  return {
    type: CpcpReportActionType.FETCH_CPCP_REPORT_SUCCESS,
    data,
  };
};

export const resetCpcpReportSuccess = () => {
  return {
    type: CpcpReportActionType.FETCH_CPCP_REPORT_SUCCESS,
    data: null,
  };
};

const fetchFailure = (message: string) => {
  return {
    type: CpcpReportActionType.FETCH_CPCP_REPORT_FAILURE,
    message,
  };
};

const cpcpReportReducer = (
  state: CpcpReportStateType = initialState,
  action: CpcpReportReducerAction
) => {
  switch (action.type) {
    case CpcpReportActionType.FETCH_CPCP_REPORT: {
      return { ...state, loading: true };
    }
    case CpcpReportActionType.FETCH_CPCP_REPORT_SUCCESS: {
      return { ...state, loading: false, cpcpReport: action.data, error: "" };
    }
    case CpcpReportActionType.FETCH_CPCP_REPORT_FAILURE: {
      return { ...state, loading: false, cpcpReport: null, error: action.message };
    }
    default:
      return state;
  }
};

export const getCpcpReport = (values: ICpcpReportSearchValues) => {
  return function (dispatch: Dispatch<CpcpReportDispatchFuncType>) {
    dispatch(initFetch());
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_GET_CPCP_REPORT}`, values)
      .then((res) => {
        const cpcpReport = res?.data?.Result;
        dispatch(fetchSuccess(cpcpReport));
      })
      .catch((error) => dispatch(fetchFailure(error.message)));
  };
};

export default cpcpReportReducer;
