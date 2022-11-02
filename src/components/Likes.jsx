

import { useSelector, useDispatch} from "react-redux";
import {__like} from "../redux/modules/PostsSlice";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Likes =(props)=>{ 

    const dispatch = useDispatch();
    
    //const like = useSelector((state) => state.posts.posts);
  
    const [likes, setLikes] = useState(false)
    const [count, setCount] = useState(props.count)

    useEffect(() => {
        console.log("몇번");
        dispatch(__like(props.id))
          }, [likes]);

    const onLike = () => {
        if(likes === true){
            setCount(count-1)
            setLikes(false)
        }else{
            setCount(count+1)
           setLikes(true)
        }
       // setLikes(!likes)
      }

    return(
        <>
            <LikeButton onClick={onLike}>{likes ? "❤️" : "🤍"}</LikeButton>
            <Span>{count}</Span>
        </>
    )
}

export default Likes;

const LikeButton = styled.button`
    border: 0 solid transparent;
    background-color: transparent;
    color : gray;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    `

const Span = styled.span`
    font-size: 20px;
    padding: 5px;
    cursor: pointer;
    `