import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "services/slices/auth.Slice";
import { FetchReducer } from "../slices/data.slice";
import { essentialReducer } from "../slices/essentials.slice";

const rootReducer = combineReducers({
	auth: authReducer,
	fetch: FetchReducer,
	essential: essentialReducer,
});

export default rootReducer;
