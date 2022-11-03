import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddPost from "../pages/AddPost";
import PostDetail from "../pages/PostDetail";
import PostList from "../pages/PostList";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import Mypage from "../pages/Mypage"


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지 이동하기 */}
        <Route path='/' element={<SignInPage />} />

        {/* 회원가입 페이지 이동하기 */}
        <Route path='signup' element={<SignUpPage />} />

        {/* 포스트 리스트 생성 페이지로 이동하기 */}
        <Route path='/addpost' element={<AddPost />} />
        
        {/* 게시글 홈으로 이동하기 */}
        <Route path='/postlist' element={<PostList />} />

        {/* 포스트리스트 카드별 상세보기 페이지로 이동하기 */}
        <Route path='/PostDetail/:id' element={<PostDetail />} />

        {/* 개인 페이지 이동하기 */}
        <Route path='/mypage' element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
