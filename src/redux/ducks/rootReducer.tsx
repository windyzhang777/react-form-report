import { combineReducers } from "redux";
import {
  approvedSdrsReducer,
  flaggedSdrsReducer,
  newSdrsReducer,
} from "src/redux/ducks/getAllSdrs";
import { esfrRecordDetailsReducer } from "src/redux/ducks/getEsfrRecordDetails";
import profileReducer from "src/redux/ducks/getProfile";

const rootReducer = combineReducers({
  profile: profileReducer,
  newSdrs: newSdrsReducer,
  flaggedSdrs: flaggedSdrsReducer,
  approvedSdrs: approvedSdrsReducer,
  esfrRecordDetail: esfrRecordDetailsReducer,
});

export default rootReducer;
