
import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from "react-redux";
import {__getPost} from "../redux/modules/PostsSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PostList = () => {

  const posts = useSelector((state) => state.posts.posts);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  //get 해오기
    useEffect(() => {
      dispatch(__getPost());

        }, [dispatch]);

  return (
    <>  
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
                            {post.nickname}<br/>
                            <img src={post.img}
                            style={{ width: "400px", height: "400px"}}
                            /><br/>
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