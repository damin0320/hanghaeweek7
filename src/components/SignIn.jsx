import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {__userLogin} from "../redux/modules/LoginSlice"
import instagram from "../images/instagram.png"
import front from "../images/front.png"
import { colors } from '../theme/theme';


const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const initialState = {
    email: "",
    password: "",
  };
  const [login, setLogin] = useState(initialState);
  const onChangeHandler = (event) => {
    const {name, value} = event.target
    setLogin({...login, [name] : value})
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    const obj = {
      id : 1,
      //임시
      email: login.email,
      password: login.password,
    }
    dispatch(__userLogin(obj))
    
  }

  return (
    
    <div>
<LoginContainer>
      <Wrap>
      <LoginImg width={500} height={600} src={front} alt="예시 이미지" />
        <div>
          <LoginBox>
            <LogoBox>
            <img width={200} height={60} src={instagram} alt="로고" />
            </LogoBox>
            <Input
              placeholder='사용자 이메일'
              type='text'
              name='email'
              value={login.email}
              onChange={onChangeHandler}
            />
            <Input
              placeholder='비밀번호'
              type='password'
              name='password'
              value={login.password}
              onChange={onChangeHandler}
            />
            <LoginButton onClick={onSubmitHandler}>
              로그인
            </LoginButton>
          </LoginBox>

          <SignupBox>
            <p>계정이 없으신가요?</p>
            <SignupButton onClick={() => navigate('/signup')}>
              가입하기
            </SignupButton>
          </SignupBox>
        </div>
      </Wrap>
    </LoginContainer>

    </div>
  )
}

export default SignIn

const LoginImg = styled.img`
  width: 350px;
  height: 536px;
  margin-right: 30px;
  img {
    width: 100%;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Wrap = styled.div`
  display: flex;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 350px;
  height: 320px;
  border: 1px solid #eee;
  /* margin: 0 auto; */
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  outline: 1px solid ${colors.border};
  width: 250px;
  height: 40px;
  margin-bottom: 7px;
  padding: 10px;
  font-size: 12px;
  border-radius: 4px;
  background: #fafafa;
  &:focus {
    outline: 1px solid #adadad;
  }
`;

const LoginButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  width: 250px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
  &:disabled {
    background-color: #b2dffc;
  }
`;

const SignupBox = styled.div`
  background-color: white;
  width: 350px;
  height: 80px;
  border: 1px solid #eee;
  margin-top: 20px;
  /* margin: 0 auto; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoBox = styled.div`
  width: 175px;
  height: 51px;
  margin-bottom: 36px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const SignupButton = styled.button`
  border: none;
  background: none;
  font-weight: bold;
  color: ${colors.primary};
`;