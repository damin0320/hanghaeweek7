import React from 'react'
import styled from 'styled-components'
import instagram from "../images/instagram.png"
import home from "../images/home.png"
import plus from "../images/plus.png"

const Header = () => {
  return (
    <Head>
      <div>
  <img width={150} height={40}src={instagram} alt="로고" />
  </div>
  <IconBox>
  <HomeBox>
  <img width={30} height={30}src={home} alt="로고" />
  <img width={30} height={30}src={plus} alt="로고" />
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

const LogoBox = styled.img`

  margin-top: 25px;
  margin-bottom: 12px;
`;

const HomeBox = styled.div`
  width: 120px;
  margin-top: 10px;
  margin-bottom: 12px;

`;

const IconBox = styled.div`
img {
  margin-right : 10px;
}

`
