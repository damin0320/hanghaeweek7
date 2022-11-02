

import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from "react-redux";
import {__getPost, __like} from "../redux/modules/PostsSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header"
import profile from "../images/profile.jpeg"

//slick 
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PostList = () => {

  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //get 해오기
  // 와칭해주는게 지켜보다가 변경이 되면 리렌더링(삭제도 됨)
    useEffect(() => {

      dispatch(__getPost());
        }, [posts.length]);
const onLike = (id) => {
  dispatch(__like(id))
}

  //slick 부분
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (

    <>  
    <Header/>
    {
      posts.length > 0 &&
        (
          <>
            {
              posts.map((post) => {
                return (
                  <div key={post.id}>
                    <ListContainer>
                        <div>
                          <ListContent>

                            <img width={30} height={30}src={profile} alt="프로필"/>
                            <Nickname>{post.nickname}</Nickname> 
                           
                            <Slider {...settings}>
                              {
                                post.img.map((imgs)=> {
                                  return(
                                    <div key={imgs.id}>
                                      <img src={imgs}
                                      style={{ width: "400px", height: "400px"}}/>
                                    </div>
                                  )
                                })
                              }
                            </Slider>
                                   
                            <LikeButton onClick={()=>onLike(post.id)}>{post.like_state ? "❤️" : "🤍"}</LikeButton>
                            <Span>{post.like_count}</Span>
                            <Span onClick={() => {navigate(`/PostDetail/${post.id}`)}}>💬</Span><br/>
                            {post.content} - <Time>{post.createdAt}</Time><br/>
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
margin-bottom: 20px;
`;

const ListContent = styled.div`
  margin: auto;
  border: 0.1px solid gray;
  border-radius: 10px;
  width : 400px;
  height: 550px;
  margin-bottom: 10px;
`

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

const Nickname = styled.span`
font-size: 20px;
padding: 20px;
`

const Time = styled.span`
  color : gray;
`