import React from 'react'
import './style.scss';
import img from 'components/Interactive_Comments_Secttion/images/avatars/image-juliusomo.png';
import { useForm } from "react-hook-form";

interface FormProps{
    reply:string,

}
interface Props {
    setShow?: (show:boolean) => void
}
const NewReply: React.FC<Props> = ({setShow}) => {
    const onSubmit = (data:FormProps) => {
        setShow && setShow(false)
        console.log(data)
    };
    const { register, handleSubmit } = useForm<FormProps>();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <img src={img} alt="currentUser"/>
            <input {...register("reply", {required:true})} placeholder="Add a comment..."/>
            <button type="submit" >Send</button>
        </form>
    )
}

export default NewReply