import React, {useEffect} from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector  } from "react-redux";
import {__getPost, __deletePost} from "../redux/modules/PostsSlice";
import Comments from '../components/Comments';

//사진 업로드가 불가능해서 이 사진으로 대체
import Img from "../components/elements/Billie Eilish.jpg"
import { useState } from 'react';


const PostDetail = () => {
  
  
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const navigate = useNavigate();
  const {id }= useParams()
  //get 해오기
    // useEffect(() => {
    //   dispatch(__getPost());
    //     }, [dispatch]);

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
    // const formData = new FormData();
    // formData.append("content", data.content);s
    // const Fdata = { id: input.id, formData: formData };
    // dispatch(__editMelon(Fdata));
     setEdit(false);
  };

 
  return (
    <>
      <div>
        <div>PostDetail</div>
        {posts.content}
        {
          posts.filter((post)=> post.id===Number(id))
          .map(post => 
            (
              <div key={post.id}>
                {
                  edit ? (
                    <div>
                      <button onClick={()=> onClickUdapte()}>수정완료</button>
                      <div><img src={Img}/></div>
                      <input type="text" name="content" value={posts.content ||""}
                      onChange={onChangeHandler}/>
                      
                    </div>
                  ) : (
                    <div>
                      <button onClick={()=> {onPostDelete(post.id)
                      navigate("/")}}>삭제하기</button>
                        <button onClick={()=>{toggleEdit()}}>수정하기</button>

                        {/* 임의로 들어간 이미지*/}
                        <div><img src={post.img}
                        style={{
                          width: "400px",
                          height: "300px",
                        }}/></div>
                        내용 : {post.content}<br/>
                        id : {post.nickname}
                    </div>
                  )
                }
                <Comments />
              </div>
            )
          )

        }
      </div>
      
      
    </>
  )
}

export default PostDetail