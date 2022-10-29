import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import profile from "../images/profile.jpeg"
// img tag 이용
import {__userProfile} from "../redux/modules/LoginSlice"
import { useDispatch } from 'react-redux'
import { colors } from '../theme/theme';
import { __userLogout } from '../redux/modules/LoginSlice';
import Header from "../components/Header"
import { delCookie } from '../cookie/cookie'


const Mypage = () => {

const {account} = useSelector((state) => state.account)  
const dispatch = useDispatch()

useEffect(() => {
  dispatch(__userProfile())
}, [dispatch])

const onLogoutHandler = () => {
  dispatch(__userLogout())
  delCookie("Access_Token")
  alert("이용하시려면 다시 로그인 해주세요")
  window.location.replace("/signin")
}

  return (
    <>
        <Header/>
    
    <div>
      <img width={200} height={200} src={profile}></img>
      <p>{account.nickname}</p>
    <LogoutBox>
    <span onClick={onLogoutHandler}>로그아웃</span>
    </LogoutBox>
    </div>
    </>
  )
}

export default Mypage

const LogoutBox = styled.div`
  background-color: white;
  width: 100px;
  padding: 20px;
  border: 1px solid ${colors.border};
  margin-top: 10px;
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