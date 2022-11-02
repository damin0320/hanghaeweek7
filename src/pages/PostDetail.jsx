import React, {useEffect, useState} from 'react'
import { useParams, useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {__getPost2, __deletePost, __editPost, __addComment, __deleteComment} from "../redux/modules/PostsSlice";
import styled from "styled-components";
import { getCookie, setCookie } from '../cookie/cookie';
import Header from "../components/Header"

const PostDetail = () => {
  const checkCookie = {
    'nickname' : getCookie('nickname')
  }
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
   };

  const onClickUdapte = () => {

    const formData = new FormData();
    formData.append("content", input.content);

    const Fdata = { id: Number(id), formData: formData};
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
    <Header/>
      <div>
        <STDetailContainer>
        <STDetailContainer2>
        <STDetailContainer3>
        <div>
          {
            posts.nickname !== undefined &&
          (
            <>


          {edit ? (

            <div>
              <STDetailButton3  onClick={()=> onClickUdapte(input)}>수정완료</STDetailButton3 ><br/>
              <img src={posts.img}
                      style={{
                        width: "400px",
                        height: "300px",
                      }}/><br/>
              <input type="text" name="content" 
                  onChange={onChangeHandler}/>
            </div>
          
              ) : ( 
                <div>
                    {checkCookie.nickname === posts.nickname ?(<STDetailButton onClick={()=> 
                    {onPostDelete(posts.id)
                    navigate("/")}}>삭제하기</STDetailButton>) : ""}

                    {checkCookie.nickname === posts.nickname ?(<STDetailButton3 onClick={()=>{toggleEdit()}}>수정하기</STDetailButton3>) : ""}<br/>
                    {posts.nickname} - {posts.createdAt}<br/>
                    <div>/</div>

                            {
                              posts.img && (
                                <>
                                  {
                                    posts.img.map((imgs, index)=> {
                                      return(
                                        <div key={index}>
                                          <img src={imgs}
                                          style={{ width: "200px", height: "200px"}}/>
                                        </div>
                                      )
                                    })
                                  }
                                </>
                              )
                            }

                    <br/>
                    <STDetailContent>{posts.content}</STDetailContent>
              </div>
              )}
        </>)}      
        </div>

        {/*댓글 부분 */}

        <div>
              <input type="text" 
                placeholder='댓글을 입력하세요'
                value={Input2.comment || ""}
                name="comment"
                onChange={onChangeInputHandler}></input>
              <STDetailButton4 onClick={onClickComment}> 추가하기</STDetailButton4>
              {posts.comments !== undefined &&
              (
                <>
                  {
                    posts.comments.map((post, index)=>{
                      return (
                        <STDetailComment key={index}>
                          <div>
                            <STDetailNickname>{post.nickname}</STDetailNickname>
                            {post.comment} 
                            {post.createdAt}
                          </div>
                          {checkCookie.nickname === posts.nickname ?(<STDetailButton2 onClick={()=> onDeleteButton(post.commentid)} >삭제하기</STDetailButton2>) : ""}
                        </STDetailComment>
                      )
                    })
                  }
                </>
              )
            }
            </div>
            </STDetailContainer3>
            </STDetailContainer2>
          </STDetailContainer>
        </div>
    </>
  )
}

export default PostDetail



const STDetailContainer = styled.div`
  //모달창 크기
  width: 100%;
  height: 80%;
  //최상단
  z-index: 999;
  //중앙배치
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //모달창 디자인
  background-color: rgba(196, 196, 196, 0.6);
  /* border: 1px solid black; */
  /* border-radius: 8px; */
  
`
const STDetailContainer2 = styled.div`
  /* padding: 20px 20px 28px 20px; */
  display: block;
  position: absolute;
  top: 50px;
  width: 100%;
`

const STDetailContainer3 = styled.div`
  width: 600px;
  height: 600px;
  background-color: #f1f1f1;
  border-radius: 14px;
  background-color: #fff !important;
  margin : auto;
  margin-bottom: 400px;
  justify-content: center;
  align-items: center;
 
  display: flex;
  flex-direction: column;
  position: relative;
`

const STDetailComment = styled.div`
  display: flex;
  margin-top: 15px;

  .div{
    float :left;
  }
`
const STDetailNickname = styled.b`
  margin-right: 15px;
`
const STDetailContent = styled.div`
  margin-bottom : 15px;
`

const STDetailButton = styled.button`
  //게시글 삭제하기 
  position: absolute;
  right: 30px;
  top: 20px;
  background-color: #d62176;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  width: 100px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
  &:disabled {
  background-color: #b2dffc;}
`

const STDetailButton2 = styled.button`
  //게시글 삭제하기 
  position: absolute;
  right: 30px;
  background-color: #d62176;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  width: 100px;
  height: 30px;

  &:disabled {
  background-color: #b2dffc;}
`
const STDetailButton3 = styled.button`
//게시글  수정하기
  position: absolute;
  top: 30px;
  left: 30px;
  background-color: #0095f6;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  width: 100px;
  height: 30px;


  &:disabled {
  background-color: #b2dffc;}
`

const STDetailButton4 = styled.button`
//댓글 추가하기 
  position: absolute;
  right: 30px;
  background-color: #76f0a4;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  width: 100px;
  height: 30px;


  &:disabled {
  background-color: #b2dffc;}
`

