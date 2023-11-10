import { combineReducers } from "redux";
import profileReducer from "./getProfile";
import {approvedSdrsReducer, flaggedSdrsReducer, newSdrsReducer} from "./getAllSdrs";

const rootReducer = combineReducers({
    profile: profileReducer,
    newSdrs: newSdrsReducer,
    flaggedSdrs: flaggedSdrsReducer,
    approvedSdrs: approvedSdrsReducer
});

export default rootReducer;
