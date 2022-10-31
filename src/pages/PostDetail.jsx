import React, {useEffect, useState} from 'react'
import { useParams, useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {__getPost2, __deletePost, __editPost, __addComment, __deleteComment} from "../redux/modules/PostsSlice";


const PostDetail = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const {id}= useParams()
 
  //get 해오기
  useEffect(() => {
    dispatch(__getPost2(id));
  }, [dispatch]);

  // 게시글 삭제 버튼
  const onPostDelete = (payload) => {
    dispatch(__deletePost(payload));
  };
  
  //수정하기
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => {setEdit(!edit);};
  
  //onChange
  const [input, setInput] = useState()
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    console.log(input);
  };

  const onClickUdapte = (data) => {
    const formData = new FormData();
    formData.append("content", data.content);
    const Fdata = { id: input.id, formData: formData };
    dispatch(__editPost(Fdata));
     setEdit(false);
  };


  //---------comment 부분
  const [Input2, setInput2] = useState({
    comment : ""
  })
  
  //comment onchange 
  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setInput2({
      ...Input2,
      [name]: value,
    });
  };

  const onClickComment = (e)=> {
    e.preventDefault();
    dispatch(__addComment({id: Number(id), ...Input2}))
    setInput2({
      comment:""
    })
  }

  //삭제버튼 만들기
    const onDeleteButton = (commentid) => {
      dispatch(__deleteComment(commentid));
    };

  return (
    <>
      <div>
        {edit ? (

          <div>
            <button onClick={()=> onClickUdapte()}>수정완료</button><br/>
            <img src={posts.img}
                    style={{
                      width: "400px",
                      height: "300px",
                    }}/><br/>
            <input type="text" name="content" value={posts.content ||""}
                 onChange={onChangeHandler}/>
          </div>
         
            ) : (
              <div>
                  <button onClick={()=> 
                  {onPostDelete(posts.id)
                  navigate("/")}}>삭제하기</button>

                  <button onClick={()=>{toggleEdit()}}>수정하기</button>

                  <div><img src={posts.img}
                          style={{
                            width: "400px",
                            height: "300px",
                          }}/></div>

                  내용 : {posts.content}<br/>
                  이름 : {posts.nickname}<br/>
                  
            </div>
            )}
      </div>

      {/*댓글 부분 */}

      <div>
            <input type="text" 
              placeholder='댓글을 입력하세요'
              value={Input2.comment || ""}
              name="comment"
              onChange={onChangeInputHandler}></input>
            <button onClick={onClickComment}> 추가하기</button>
                   
            {posts.comments !== undefined &&
            (
              <>
                {
                  posts.comments.map((post, index)=>{
                    return (
                      <div key={index}>
                        <div>{post.nickname}</div>
                        <div>{post.comment}</div>
                        <button onClick={()=> onDeleteButton(post.commentid)} >삭제하기</button>
                        <hr/>
                      </div>
                    )
                  })
                }
              </>
            )
          }
  
        </div>
    </>
  )
}

export default PostDetail

