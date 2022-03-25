import { createSlice, current } from "@reduxjs/toolkit";
import { IComment } from "../../models/Comments.interface";
import { RootState } from "../store/store";
import { showModel } from "./essentials.slice";
import { IReply } from "../../models/reply.interface";

interface IFetchState {
	AllComments: IComment[];
	CurrentUser: {
		username: string;
		image: {
			png: string;
			webp: string;
		};
	};

	identifiers: {
		parent: number | null;
		child: number | null;
	};
}

const initialState: IFetchState = {
	AllComments: [],
	CurrentUser: {
		username: "",
		image: {
			png: "",
			webp: "",
		},
	},
	identifiers: {
		parent: null,
		child: null,
	},
};
const FetchSlice = createSlice({
	name: "fetch",
	initialState,
	reducers: {
		AppendData: (state, action) => {
			state.AllComments = action.payload.comments;
			state.CurrentUser = action.payload.currentUser;
		},
		upVote: (state, action) => {
			const target = state.AllComments.find((item) => item.id === action.payload.child);
			if (target) {
				target.score += 1;
			} else if (!target) {
				const parentTarget = state.AllComments.find((item) => item.id === action.payload.parent);
				if (parentTarget) {
					const childTarget = parentTarget.replies.find((reply: IReply) => reply.id === action.payload.child);
					if (childTarget) {
						// @ts-ignore
						childTarget.score += 1;
					}
				}
			}
		},
		downVote: (state, action) => {
			const target = state.AllComments.find((item) => item.id === action.payload.child);
			if (target && target.score !== 0) {
				target.score -= 1;
			} else if (!target) {
				const parentTarget = state.AllComments.find((item) => item.id === action.payload.parent);
				if (parentTarget) {
					const childTarget = parentTarget.replies.find((reply: IReply) => reply.id === action.payload.child);
					// @ts-ignore
					if (childTarget && childTarget.score !== 0) {
						// @ts-ignore
						childTarget.score -= 1;
					}
				}
			}
		},
		appendReply: (state, action) => {
			const target = state.AllComments.find((item) => item.id === action.payload.commentId);
			if (target) {
				const childTarget = target.replies.find((item) => item.id === action.payload.replyId);
				if (childTarget) {
					console.log(current(childTarget));
					childTarget.replies.push(action.payload.reply);
				}
			}
		},
		appendComment: (state, action) => {
			const target = state.AllComments.find((item) => item.id === action.payload.replyId);
			if (target) target.replies.push(action.payload.comment);
		},
		appendNewComment: (state, action) => {
			state.AllComments.push(action.payload);
		},
		editReply: (state, action) => {
			const target = state.AllComments.find((item) => item.id === action.payload.commentId);
			if (target) {
				const childTarget = target.replies.find((item) => item.id === action.payload.replyId);
				if (childTarget) childTarget.content = action.payload.content;
			}
		},
		editComment: (state, action) => {
			const target = state.AllComments.find((item) => item.id === action.payload.id);
			if (target) {
				target.content = action.payload.content;
			}
		},
		deleteReply: (state) => {
			if (state.identifiers.parent) {
				const parentTarget = state.AllComments.find((item) => item.id === state.identifiers.parent);
				if (parentTarget) {
					if (parentTarget.replies.length > 0) {
						parentTarget.replies = parentTarget.replies.filter(
							(item) => item.id !== state.identifiers.child
						);
					}
				}
			} else {
				state.AllComments = state.AllComments.filter((item) => item.id !== state.identifiers.child);
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(showModel, (state, action) => {
			state.identifiers.child = action.payload.child;
			state.identifiers.parent = action.payload.parent;
		});
	},
});

export const FetchReducer = FetchSlice.reducer;
export const {
	AppendData,
	upVote,
	downVote,
	appendReply,
	editReply,
	deleteReply,
	appendComment,
	appendNewComment,
	editComment,
} = FetchSlice.actions;
export const FetchState = (state: RootState) => state.root.fetch;
