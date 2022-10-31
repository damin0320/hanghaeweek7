
import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from "react-redux";
import {__getPost} from "../redux/modules/PostsSlice";
import { useNavigate } from "react-router-dom";

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
                        <div>
                          <img src={post.img}
                          style={{ width: "400px", height: "300px"}}
                          /><br/>
                          내용 : {post.content}<br/>
                          id : {post.nickname}<br/>
                        </div>
                        <hr/>
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