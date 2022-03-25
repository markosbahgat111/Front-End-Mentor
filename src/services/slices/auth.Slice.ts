import { createSlice } from "@reduxjs/toolkit";

interface AuthState {}
const initialState: AuthState = {};

const AuthSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		signUp: (state, action) => {},
	},
	extraReducers: {},
});

export const authReducer = AuthSlice.reducer;
export const authActions = AuthSlice.actions;
