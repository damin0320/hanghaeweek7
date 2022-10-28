import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import profile from "../images/profile.jpeg"
// img tag 이용
import {__userProfile} from "../redux/modules/LoginSlice"
import { useDispatch } from 'react-redux'

const Mypage = () => {

const {account} = useSelector((state) => state.account)  
const dispatch = useDispatch()

useEffect(() => {
  dispatch(__userProfile())
}, [dispatch])

  return (
    <div>
      <img width={200} height={200} src={profile}></img>
      <p>{account.nickname}</p>
    </div>
  )
}

export default Mypage