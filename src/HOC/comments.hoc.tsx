import CommentsSection from 'components/Interactive_Comments_Secttion/comments.component'
import React,{useEffect, useState} from 'react'
import {IData} from "../models/data.interface";
import 'styles/CommentsHOC.scss';
import NewReply from "../components/Interactive_Comments_Secttion/NewReplyForm";
import BoxModel from "../components/Interactive_Comments_Secttion/boxModel/BoxModel";

interface Props {}

const CommentsHOC = (props: Props) => {
    const [showModel, setShowModel] = useState<boolean>(false);
    const [data, setData] = useState<IData | null>(null);
    useEffect(() => {
        fetch("data.json")
            .then(response => response.json())
            .then(json => setData(json));
    }, []);
    console.log(data)
  return (
      <>
          <BoxModel showModel={showModel} setShowModel={setShowModel}/>
          <div>
              {data?.comments.map(item => (
                  <>
                    <CommentsSection item={item}/>
                  </>
              ))}
          </div>
          <div className='reply_container'>
              <hr/>
              <div className='replies'>
                    {data?.comments.map(item => item.replies.length > 0 && item.replies.map(reply => (<CommentsSection setShowModel={setShowModel} item={reply} currentUserName={data?.currentUser.username}/>)))}
              </div>
          </div>
          <NewReply/>
    </>
  )
}

export default CommentsHOC