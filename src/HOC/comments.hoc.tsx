import CommentsSection from 'components/Interactive_Comments_Secttion/comments.component'
import React,{useEffect, useState} from 'react'
import {IData} from "../models/data.interface";
import { useForm } from "react-hook-form";
import 'styles/CommentsHOC.scss';
import img from 'components/Interactive_Comments_Secttion/images/avatars/image-juliusomo.png';

interface Props {}
interface FormProps{
    reply:string
}
const CommentsHOC = (props: Props) => {
    const { register, handleSubmit } = useForm<FormProps>();
    const [data, setData] = useState<IData | null>(null);
    const onSubmit = (data:FormProps) => console.log(data);
    useEffect(() => {
        fetch("data.json")
            .then(response => response.json())
            .then(json => setData(json));
    }, []);
    console.log(data)
  return (
      <>
          <div>
              {data?.comments.map(item => (
                <CommentsSection item={item}/>
              ))}
          </div>
          <div className='reply_container'>
              <hr/>
              <div className='replies'>
                    {data?.comments.map(item => item.replies.length > 0 && item.replies.map(reply => (<CommentsSection item={reply} currentUserName={data?.currentUser.username}/>)))}
              </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
              <img src={img} alt="currentUser"/>
              <input {...register("reply", {required:true})} placeholder="Add a comment..."/>
              <button type="submit">Send</button>
          </form>
    </>
  )
}

export default CommentsHOC