import React from 'react'
import img1 from './images/avatars/image-amyrobson.png';
import './style.scss';
import {IComment} from "../../models/Comments.interface";

interface IReplaing extends IComment{
    replyingTo?:string
}
interface Props {
    item:IReplaing
    currentUserName?:string
}


const CommentsSection: React.FC<Props> = ({item, currentUserName}) => {
  return (
    <section className='comment_section'>
        <div className='likes_container'>
            <button><i className="fa-solid fa-plus"/></button>
              <span>{item.score}</span>
            <button><i className="fa-solid fa-minus"/></button>
        </div>
        <div className="comment_container">
            <div className='identity_container'>
                <div className='person_container'>
                    <img src={img1} alt="avatarImg" className='avatar_Img' data-testid="avatar"/>
                    <h4>{item.user.username}</h4>
                    <span>{item.createdAt}</span>
                </div>
            </div>
            <p>{item.replyingTo && <span style={{color:"hsl(238, 40%, 52%)", fontWeight:"500"}}>@{item.replyingTo} </span>}{item.content}</p>
        </div>
        <div className='reply_button_container'>
            {item.user.username !== currentUserName ? (<button><i className="fa-solid fa-reply"/> Reply</button>):(
                <div style={{marginRight:"2em", whiteSpace:"nowrap"}}>
                <button style={{color:"red", marginRight:"1em"}}><i className="fa-solid fa-trash"/> Delete</button>
                <button><i className="fa-solid fa-pen"/> Edit</button>
                </div>
            )}
        </div>
    </section>
  )
}

export default CommentsSection