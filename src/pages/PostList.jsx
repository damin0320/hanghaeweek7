

import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from "react-redux";
import {__getPost} from "../redux/modules/PostsSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header"


const PostList = () => {

  const posts = useSelector((state) => state.posts.posts);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  //get 해오기
  // 와칭해주는게 지켜보다가 변경이 되면 리렌더링(삭제도 됨)
    useEffect(() => {

      dispatch(__getPost());
        }, [ posts.length]);

  return (

    <>  
    <Header/>
    {
      posts.length > 0 &&
        (
          <>
            {
              posts.map((post, index) => {
                return (
                  <div key={index}  onClick={() => {navigate(`/PostDetail/${post.id}`);}}>
                    <ListContainer>
                        <div>
                          <ListContent>
                            {post.nickname} - {post.createdAt}
                            
                            {
                              post.img.map((imgs)=> {
                                return(
                                  <div key={imgs.id}>
                                    <img src={imgs}
                                     style={{ width: "200px", height: "200px"}}/>
                                  </div>
                                )
                              })
                            }
                            <br/>
                            <button>좋아요</button><br/>
                            내용 : {post.content}<br/>
                          </ListContent>
                        </div>
                    </ListContainer>
                  </div>
                )
              })
            }
          </>
        )
    }
    </>
  )
  }

export default PostList

const ListContainer = styled.div`
margin-right: 32px;
min-width: 468px;
`;

const ListContent = styled.div`
  margin: auto;
  border: 0.1px solid gray;
  border-radius: 10px;
  width : 400px;
  height: 550px;
  margin-bottom: 10px;
`