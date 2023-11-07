import { combineReducers } from "redux";
import profileReducer from "./getProfile";

const rootReducer = combineReducers({
    profile: profileReducer
});

export default rootReducer;
