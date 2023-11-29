import { combineReducers } from "redux";
import profileReducer from "./getProfile";
import {approvedSdrsReducer, flaggedSdrsReducer, newSdrsReducer} from "./getAllSdrs";
import {esfrRecordDetailsReducer} from "./getEsfrRecordDetails";

const rootReducer = combineReducers({
    profile: profileReducer,
    newSdrs: newSdrsReducer,
    flaggedSdrs: flaggedSdrsReducer,
    approvedSdrs: approvedSdrsReducer,
    esfrRecordDetail: esfrRecordDetailsReducer
});

export default rootReducer;
