import React from "react";
import "./form.scss";
import img from "./data/image-juliusomo.png";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { appendComment, appendNewComment, appendReply, FetchState } from "../../services/slices/data.slice";

interface FormProps {
	reply: string;
}
interface Props {
	setShow?: (show: boolean) => void;
	type?: boolean | string;
	commentId?: number;
	replyId?: number;
}
const NewReply: React.FC<Props> = ({ setShow, type, commentId, replyId }) => {
	const state = useAppSelector(FetchState);
	const date = new Date();
	const dateNow = date.getTime();
	const dispatch = useAppDispatch();
	const onSubmit = (data: FormProps) => {
		if (type && commentId) {
			const reply = {
				content: data.reply,
				id: dateNow,
				replies: [],
				replyingTo: state.AllComments.find((item) => item.id === commentId)?.replies.find(
					(item) => item.id === replyId
				)?.user.username,
				score: 0,
				createdAt: dateNow,
				user: { ...state.CurrentUser },
			};
			dispatch(appendReply({ reply, commentId, replyId }));
		} else if (type === "New") {
			const newComment = {
				content: data.reply,
				id: dateNow,
				replies: [],
				score: 0,
				createdAt: dateNow,
				user: { ...state.CurrentUser },
			};
			dispatch(appendNewComment(newComment));
		} else {
			const comment = {
				content: data.reply,
				id: dateNow,
				replies: [],
				score: 0,
				replyingTo: state.AllComments.find((item) => item.id === replyId)?.user.username,
				createdAt: dateNow,
				user: { ...state.CurrentUser },
			};
			dispatch(appendComment({ comment, replyId }));
		}
		setShow && setShow(false);
	};
	const { register, handleSubmit } = useForm<FormProps>();
	return (
		<form onSubmit={handleSubmit(onSubmit)} id={`${type ? (type === "New" ? "comment" : "reply") : "comment"}`}>
			<img src={img} alt="currentUser" />
			<input {...register("reply", { required: true })} placeholder="Add a comment..." />
			<button type="submit">Send</button>
		</form>
	);
};

export default NewReply;
