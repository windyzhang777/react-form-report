import { combineReducers } from "redux";
import {
  approvedSdrsReducer,
  flaggedSdrsReducer,
  newSdrsReducer,
} from "src/redux/ducks/getAllSdrs";
import profileReducer from "src/redux/ducks/getProfile";
import { sdrEsfrRecordDetailsReducer } from "src/redux/ducks/getSdrEsfrRecordDetails";

const rootReducer = combineReducers({
  profile: profileReducer,
  newSdrs: newSdrsReducer,
  flaggedSdrs: flaggedSdrsReducer,
  approvedSdrs: approvedSdrsReducer,
  sdrEsfrRecordDetails: sdrEsfrRecordDetailsReducer,
});

export default rootReducer;
