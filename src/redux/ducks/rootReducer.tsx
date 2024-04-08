import { combineReducers } from "redux";
import flatFileReducer from "src/redux/ducks//getFlatFile";
import {
  approvedSdrsReducer,
  flaggedSdrsReducer,
  newSdrsReducer,
} from "src/redux/ducks/getAllSdrs";
import esfrReportReducer from "src/redux/ducks/getEsfrReport";
import profileReducer from "src/redux/ducks/getProfile";
import { sdrEsfrRecordDetailsReducer } from "src/redux/ducks/getSdrEsfrRecordDetails";

const rootReducer = combineReducers({
  profile: profileReducer,
  newSdrs: newSdrsReducer,
  flaggedSdrs: flaggedSdrsReducer,
  approvedSdrs: approvedSdrsReducer,
  sdrEsfrRecordDetails: sdrEsfrRecordDetailsReducer,
  flatFile: flatFileReducer,
  esfrReport: esfrReportReducer,
});

export default rootReducer;
