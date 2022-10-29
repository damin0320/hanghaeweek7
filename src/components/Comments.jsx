import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector  } from "react-redux";
import { useParams } from 'react-router-dom';
import {__getComment, __addComment, __deleteComment } from "../redux/modules/CommentsSlice"

const Comments = () => {

  const dispatch = useDispatch();
  const comments = useSelector((state)=> state.comments.comments)
  const [Input, setInput] = useState({
    comment : ""
  })
  
//onchange 
const onChangeInputHandler = (e) => {
  const { name, value } = e.target;
  setInput({
    ...Input,
    [name]: value,
  });
};

//get으로 comment 내용 가져오기
  useEffect(() => {
    dispatch(__getComment(Number(id)));
    console.log(comments);
      }, [dispatch]);


//dispatch 이용하기
  const { id } = useParams()

  const onClickComment = (e)=> {
    e.preventDefault();
    dispatch(__addComment({id: Number(id), commentId: comments.length+1,...Input}))
    setInput({
      comment:""
    })
  }

//삭제버튼 만들기
    const onDeleteButton = (payload) => {
      dispatch(__deleteComment(payload));
    };

  return (
   <>
      <div>
        <hr/>
        <div>Comments</div>
        <div>
            <input type="text" 
              placeholder='댓글을 입력하세요'
              value={Input.comment || ""}
              name="comment"
              onChange={onChangeInputHandler}></input>
            <button onClick={onClickComment}> 추가하기</button>
        </div>
      </div>

      <div>
        {
          comments.map((comment)=>{
            if(comment.commentId==id){
              return(
                <div key={comment.id}>
                    {comment.comment}
                    {comment.nickname}
                    <button onClick={()=>onDeleteButton(comment.id)}>삭제하기</button>
                  </div>
                )
            }
            }
          )
        }
      </div>
    </>
  )
}

export default Comments