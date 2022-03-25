import CommentsSection from "components/Interactive_Comments_Secttion/comments.component";
import React, { useEffect } from "react";
import "styles/CommentsHOC.scss";
import NewReply from "../components/Interactive_Comments_Secttion/NewReplyForm";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { AppendData, FetchState } from "../services/slices/data.slice";
import { IComment } from "../models/Comments.interface";
import BoxModel from "../components/Interactive_Comments_Secttion/boxModel/BoxModel";

interface Props {}

const CommentsHOC: React.FC<Props> = () => {
	const dispatch = useAppDispatch();
	const state = useAppSelector(FetchState);
	console.log(state);
	useEffect(() => {
		fetch("data.json")
			.then((response) => response.json())
			.then((json) => dispatch(AppendData(json)));
	}, [dispatch]);
	return (
		<>
			<BoxModel />
			<div className="all_container">
				{state.AllComments.map((item: IComment) => (
					<CommentsSection item={item} key={item.id} currentUserName={state.CurrentUser.username} />
				))}
				<NewReply type="New" />
			</div>
		</>
	);
};

export default CommentsHOC;
