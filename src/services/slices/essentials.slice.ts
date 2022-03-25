import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface EssentialState {
	show: boolean;
}
const initialState: EssentialState = {
	show: false,
};

const EssentialSlice = createSlice({
	name: "essential",
	initialState,
	reducers: {
		showModel: (state, action) => {
			state.show = action.payload.case;
		},
	},
	extraReducers: {},
});

export const essentialReducer = EssentialSlice.reducer;
export const { showModel } = EssentialSlice.actions;
export const essentialState = (state: RootState) => state.root.essential;
