import React from 'react'
import styled from 'styled-components'
import instagram from "../images/instagram.png"
import home from "../images/home.png"
import plus from "../images/plus.png"
import profile from "../images/profile.jpeg"
import { useNavigate } from 'react-router-dom'


const Header = () => {
  const navigate = useNavigate();
  const handleGoToHome = () => {
    navigate("/");
  };
  const handleGoToProfile = () => {
    navigate("/mypage");
  };

  return (
    <Head>
      <div>
  <img width={150} height={40}src={instagram} alt="로고" onClick={handleGoToHome}/>
  </div>
  <IconBox>
  <HomeBox>
  <img width={30} height={30}src={home} alt="로고" onClick={handleGoToHome}/>
  <img width={30} height={30}src={plus} alt="로고" />
  <img width={30} height={30}src={profile} alt="로고" onClick={handleGoToProfile}/>

  </HomeBox>
  </IconBox>
  </Head>
  )
}

export default Header

const Head = styled.div`
display: flex;
justify-content: space-evenly;
width: 100%;
`

const HomeBox = styled.div`
  width: 120px;
  margin-top: 10px;
  margin-bottom: 12px;

`;

const IconBox = styled.div`
img {
  margin-right : 10px;
}
`;