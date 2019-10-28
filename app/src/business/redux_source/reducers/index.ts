import { combineReducers } from "redux-immutable";

import dynamic from "../reducers/dynamic";
import account from "../reducers/account";

const appReducer = combineReducers({
	account,
	dynamic
});

export default appReducer;
