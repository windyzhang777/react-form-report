import { Dispatch } from "redux";
import axiosInstance from "../../utils/axiosInstance";
import config from "../../utils/env.config";
import {EsfrRecordDetailAcition, EsfrRecordDetailApi, EsfrRecordDetailStateType} from "../../commons/types";

const FETCH_ESFR_DETAIL = "FETCH_ESFR_DETAIL";
const FETCH_ESFR_DETAIL_SUCCESS = "FETCH_ESFR_DETAIL_SUCCESS";
const FETCH_ESFR_DETAIL_FAILURE = "FETCH_ESFR_DETAIL_FAILURE";

const initialState = {
    loading: false,
    esfrRecordDetail: {
        OperatorControlNumber: ""
    },
    error: "",
};

const initFetch = () => {
    return { type: FETCH_ESFR_DETAIL };
};

const fetchSuccess = (data: EsfrRecordDetailApi) => {
    return {type: FETCH_ESFR_DETAIL_SUCCESS, data};
};

const fetchFailure = (message: string) => {
    return {type: FETCH_ESFR_DETAIL_FAILURE, message};
};

export const esfrRecordDetailsReducer = (state: EsfrRecordDetailStateType = initialState, action: EsfrRecordDetailAcition) => {
    switch (action.type) {
        case FETCH_ESFR_DETAIL: {
            return { ...state, loading: true };
        }
        case FETCH_ESFR_DETAIL_SUCCESS: {
            return { ...state, loading: false, sdrData: action.data, error: "" };
        }
        case FETCH_ESFR_DETAIL_FAILURE: {
            return { ...state, loading: false, sdrData: null, error: action.message };
        }
        default:
            return state;
    }
};

export const getEsfrRecordDetails = (id: number, recordType: string) => {
    return function (dispatch: Dispatch) {
        dispatch(initFetch());
        axiosInstance
            .get(`${config.apiBaseAddress}${config.URL_GET_ESFR_RECORD_DETAILS}id=${id}&recordType=${recordType}`)
            .then((res) => {
                console.log("Youwei Lu check res: ", res);
                const esfrRecordDetail = res.data.Result;
                dispatch(fetchSuccess(esfrRecordDetail));
            })
            .catch((error) => dispatch(fetchFailure(error.message)));
    };
};
