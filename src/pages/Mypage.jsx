import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import profile from "../images/profile.jpeg"
import { useNavigate } from 'react-router-dom';
// img tag 이용
// import {__userProfile} from "../redux/modules/LoginSlice"
import { useDispatch } from 'react-redux'
import { colors } from '../theme/theme';
import { __userLogout } from '../redux/modules/LoginSlice';
import Header from "../components/Header"
import { delCookie } from '../cookie/cookie'
import {__userFeed} from "../redux/modules/LoginSlice";


const Mypage = () => {

const {detail, feeds} = useSelector((state) => state.account)
const dispatch = useDispatch()
const navigate = useNavigate();

// 유저 닉네임 받아오기
// useEffect(() => {
//   dispatch(__userProfile())
// }, [dispatch])


// 로그아웃
const onLogoutHandler = () => {
  dispatch(__userLogout())
  delCookie("Access_Token")
  delCookie("nickname")
  alert("이용하시려면 다시 로그인 해주세요")
  window.location.replace("/signin")
}

// 마이페이지 본인이 올린 사진 받아오기
useEffect(() => {
  dispatch(__userFeed());
    }, []);

useEffect(() => {
}, [detail])

useEffect(() => {
}, [feeds])

  return (
    <>
      <Header/>
        <ProfileBox>
          <img width={200} height={200} src={profile}></img>
          <h1>{detail.nickname}</h1>
          {/* 값이 두개가 들어와서 이렇게 함 */}
        </ProfileBox>
      <LogoutBox>
        <span onClick={onLogoutHandler}>로그아웃</span>
      </LogoutBox>

    <Hr/>
        {
          feeds.length > 0 && (
            <>
              <div>
                  {feeds.map((feed) => {
                    return (
                      <div key={feed.id}>
                        <Img>
                          <img style={{ width: "300px", height: "300px"}} src={feed.img[0]}
                          onClick={() => {navigate(`/PostDetail/${feed.id}`)}}/>
                        </Img>
                      </div>
                    )
                  })}
              </div>
           </>
          )
        }
    </>
  )
}

export default Mypage

const ProfileBox = styled.div`
position:relative;
h1{
  text-align: center;
  position:absolute;
  top : 30px;
  left: 350px;
}
`

const LogoutBox = styled.div`
  background-color: white;
  width: 100px;
  padding: 20px;
  border: 1px solid ${colors.border};
  margin-top: 50px;
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: ${colors.primary};
    margin-left: 4px;
    font-weight: bold;
    cursor: pointer;
  }
  `;

  const Hr = styled.hr`
  width: 95%;
  margin-top: 15px;
  `

  const Img = styled.div`
  float : left;
  flex-direction: row;
  padding : 30px;
  `