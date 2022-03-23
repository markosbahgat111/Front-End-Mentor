import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from 'services/slices/auth.Slice';

const rootReducer = combineReducers({
    auth: authReducer
})

export default rootReducer;