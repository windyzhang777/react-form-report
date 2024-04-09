import { Dispatch } from "react";
import {
    IDiscrepancyPartsReportSearchValues,
    PartsReportActionType,
    PartsReportDispatchFuncType,
    PartsReportReducerAction,
    PartsReportStateType,
} from "src/commons/types";
import { GetPartsReportResResult } from "src/types/GetDiscrepancyPartsReportRes";
import axiosInstance from "src/utils/axiosInstance";
import config from "src/utils/env.config";

const initialState: PartsReportStateType = {
  loading: false,
  partsReport: null,
  error: "",
};

const initFetch = () => {
  return { type: PartsReportActionType.FETCH_PARTS_REPORT };
};

const fetchSuccess = (data: GetPartsReportResResult[]) => {
  return {
    type: PartsReportActionType.FETCH_PARTS_REPORT_SUCCESS,
    data,
  };
};

export const resetPartsReportSuccess = () => {
  return {
    type: PartsReportActionType.FETCH_PARTS_REPORT_SUCCESS,
    data: null,
  };
};

const fetchFailure = (message: string) => {
  return {
    type: PartsReportActionType.FETCH_PARTS_REPORT_FAILURE,
    message,
  };
};

const partsReportReducer = (
  state: PartsReportStateType = initialState,
  action: PartsReportReducerAction
) => {
  switch (action.type) {
    case PartsReportActionType.FETCH_PARTS_REPORT: {
      return { ...state, loading: true };
    }
    case PartsReportActionType.FETCH_PARTS_REPORT_SUCCESS: {
      return { ...state, loading: false, partsReport: action.data, error: "" };
    }
    case PartsReportActionType.FETCH_PARTS_REPORT_FAILURE: {
      return { ...state, loading: false, partsReport: null, error: action.message };
    }
    default:
      return state;
  }
};

export const getPartsReport = (values: IDiscrepancyPartsReportSearchValues) => {
  return function (dispatch: Dispatch<PartsReportDispatchFuncType>) {
    dispatch(initFetch());
    axiosInstance
      .post(`${config.apiBaseAddress}${config.URL_GET_PARTS_REPORT}`, values)
      .then((res) => {
        const partsReport = res?.data?.Result;
        dispatch(fetchSuccess(partsReport));
      })
      .catch((error) => dispatch(fetchFailure(error.message)));
  };
};

export default partsReportReducer;
