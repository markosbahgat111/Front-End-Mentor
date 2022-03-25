import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { downVote, editReply, FetchState, upVote } from "../../services/slices/data.slice";
import { showModel } from "../../services/slices/essentials.slice";
import NewReply from "./NewReplyForm";
import { useState } from "react";
import { IComment } from "../../models/Comments.interface";
import "./replies.scss";
import { IReply } from "../../models/reply.interface";

interface IReplaing extends IComment {
	replyingTo?: string;
}
interface Props {
	item: IReplaing;
	currentUserName?: string;
	commentId?: number;
}
const ReplySection: React.FC<Props> = ({ item, currentUserName, commentId }) => {
	const [inputValue, setInputValue] = useState<string>(item.content);
	const [show, setShow] = useState<boolean>(false);
	const [editModeOn, setEditModeOn] = useState<boolean>(false);
	const [inc, setInc] = useState<number>(0);
	const dispatch = useAppDispatch();
	const state = useAppSelector(FetchState);
	const handleUp = () => {
		if (inc <= 0) {
			dispatch(upVote({ child: item.id, parent: commentId }));
			setInc((inc) => inc + 1);
		}
	};
	const handleDown = () => {
		if (inc > -1) {
			dispatch(downVote({ child: item.id, parent: commentId }));
			setInc((inc) => inc - 1);
		}
	};
	const handleDelete = () => {
		dispatch(showModel({ case: true, parent: commentId, child: item.id }));
	};
	const handleUpdate = () => {
		dispatch(editReply({ commentId, replyId: item.id, content: inputValue }));
		setEditModeOn((editModeOn) => !editModeOn);
	};
	const date = new Date();
	let dateNow = date.getTime();
	const timeDifference = Math.floor((dateNow - item.createdAt) / 1000 / 60);
	const timeStamp =
		timeDifference > 0
			? timeDifference > 60
				? Math.floor(timeDifference / 60) + " Hours Ago"
				: timeDifference + " Minutes Ago"
			: "A Few Seconds Ago";
	return (
		<>
			<section className="comment_section" id="reply">
				<div className="likes_container">
					<button onClick={handleUp}>
						<i className="fa-solid fa-plus" />
					</button>
					<span>{item.score}</span>
					<button onClick={handleDown}>
						<i className="fa-solid fa-minus" />
					</button>
				</div>
				<div className="comment_container">
					<div className="identity_container">
						<div className="person_container">
							<img
								src={item.user.image.png}
								alt="avatarImg"
								className="avatar_Img"
								data-testid="avatar"
							/>
							<h4>{item.user.username}</h4>
							{item.user.username === currentUserName && <title className="badge">You</title>}
							<span>{timeStamp}</span>
						</div>
					</div>
					{editModeOn ? (
						<>
							<textarea
								value={inputValue}
								className="textarea"
								onChange={(e) => setInputValue(e.target.value)}></textarea>
							<button className="update_button" onClick={handleUpdate}>
								Update
							</button>
						</>
					) : (
						<p>
							{item.replyingTo && (
								<span style={{ color: "hsl(238, 40%, 52%)", fontWeight: "500" }}>
									@{item.replyingTo + " "}
								</span>
							)}
							{item.content}
						</p>
					)}
				</div>
				<div className="edit_del_container">
					{item.user.username !== currentUserName ? (
						<button onClick={() => setShow(true)}>
							<i className="fa-solid fa-reply" /> Reply
						</button>
					) : (
						<div style={{ whiteSpace: "nowrap" }}>
							<button className="delete_btn" onClick={handleDelete}>
								<i className="fa-solid fa-trash" /> Delete
							</button>
							<button onClick={() => setEditModeOn((editModeOn) => !editModeOn)}>
								<i className="fa-solid fa-pen" /> Edit
							</button>
						</div>
					)}
				</div>
			</section>
			{item.replies?.length > 0 &&
				item.replies.map((reply: IReply) => (
					<ReplySection
						key={reply.id}
						commentId={item.id}
						item={reply}
						currentUserName={state.CurrentUser.username}
					/>
				))}
			{show && (
				<NewReply
					setShow={setShow}
					type={item.replyingTo ? true : false}
					commentId={commentId}
					replyId={item.id}
				/>
			)}
		</>
	);
};

export default ReplySection;
