import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { __userSignUp } from '../redux/modules/LoginSlice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { colors } from '../theme/theme';
import instagram from "../images/instagram.png"


const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {account} = useSelector((state) => state.account)
  const initialState = {
    email: "",
    nickname: "",
    password: "",    
  };
  const [join, setJoin] = useState(initialState);
  const onChangeHandler = (event) => {
    const {name, value} = event.target
    setJoin({...join, [name] : value})
  }
  const obj = {
    id : 1,
    //임시
    email: join.email,
    nickname: join.nickname,
    password: join.password,
  }

  const useremailCheck = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  const usernicknameCheck = /^[a-z]+[a-z0-9]{5,19}$/g;
  const passwordCheck = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if(!useremailCheck.test(obj.email)){
      return alert("이메일 양식에 맞춰주세요")
    }
    if(!usernicknameCheck.test(obj.nickname)){
      return alert("닉네임 양식에 맞춰주세요")
    }
    if(!passwordCheck.test(obj.password)){
      return alert("비밀번호 양식에 맞춰주세요")
    }

    if(obj.email === "" || obj.email === undefined) {
      return alert("빈칸을 입력해주세요.")
    }

    if(obj.nickname === "" || obj.nickname === undefined) {
      return alert("빈칸을 입력해주세요.")
    }

    if(obj.password === "" || obj.password === undefined) {
      return alert("빈칸을 입력해주세요.")
    }

    dispatch(__userSignUp(obj))
  }
  
    useEffect(() => {
      
      if(account.statusCode === 200){
        alert("회원가입이 완료되었습니다.")
        setJoin({
          email : "",
          nickname: "",
          password: "",
        })
          window.location.replace("/signin")
      }
    },[account])

  return (
    <SignupContainer>
      <SignupBox onSubmit={onSubmitHandler}>
        <LogoBox>
         <img width={200} height={60}src={instagram} alt="로고" />
        </LogoBox>
        <SignupText>친구들의 사진과 동영상을 보려면 가입하세요</SignupText>
          <InputBox>
            <Input
              placeholder='이메일 주소'
              name='email'
              onChange={onChangeHandler}
            />
            <Input
              placeholder='사용자 이름'
              name='nickname'
              onChange={onChangeHandler}
            />
            <Input
              placeholder='비밀번호 영어 숫자 포함 8자 이상'
              type='password'
              name='password'
              onChange={onChangeHandler}
            />
            <SignupButton onClick={onSubmitHandler}>회원가입</SignupButton>
          </InputBox>
      </SignupBox>
      <LoginBox> 이미 계정이 있으신가요?{' '}
        <span onClick={() => navigate('/')}>로그인</span>
      </LoginBox>
    </SignupContainer>
  );
};

export default SignUp;

const SignupContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SignupBox = styled.form`
  background-color: white;
  width: 350px;
  border: 1px solid ${colors.border};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 36px;
`;

const InputBox = styled.div`
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Input = styled.input`
  border: none;
  outline: 1px solid ${colors.border};
  width: 250px;
  height: 40px;
  margin-bottom: 8px;
  padding: 10px;
  font-size: 12px;
  border-radius: 4px;
  background: #fafafa;
  &:focus {
    outline: 1px solid #adadad;
  }
`;

const SignupButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  width: 250px;
  height: 30px;
  margin-top: 40px;
  &:disabled {
    background-color: #b2dffc;
  }
`;

const LogoBox = styled.div`
  width: 175px;
  height: 51px;
  margin-top: 36px;
  margin-bottom: 12px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const SignupText = styled.div`
  width: 200px;
  text-align: center;
  font-size: 17px;
  line-height: 20px;
  font-weight: bold;
  color: ${colors.text};
`;


const LoginBox = styled.div`
  background-color: white;
  width: 350px;
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
