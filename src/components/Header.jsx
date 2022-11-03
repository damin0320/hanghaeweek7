import React, { useState, useRef, useEffect} from 'react'
import styled from 'styled-components'
import instagram from "../images/instagram.png"
import home from "../images/home.png"
import plus from "../images/plus.png"
import profile from "../images/profile.jpeg"
import { useNavigate } from 'react-router-dom'
import "./header.css"  
import AddImage from "../components/elements/addImage.svg";
import { useDispatch, useSelector  } from "react-redux";
import {__addPost, __getPost} from "../redux/modules/PostsSlice";
import imageCompression from "browser-image-compression";
import { __userFeed } from '../redux/modules/LoginSlice'

//slick 
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Header = () => {

  const navigate = useNavigate();
  const handleGoToHome = () => {
    navigate("/");
  };

  const handleGoToProfile = () => {
    navigate("/mypage");
  };

  //게시글 작성
  const dispatch = useDispatch();

  //modal창 노출
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {setModalOpen(!modalOpen);};


  // 게시글 업로드
  //1. content onchange
  const [content, setContent] = useState()
  const [post, setPost] = useState({
    content: ""
  })

  const contentHandler = (e) => {
    setContent(e.target.value);
    const { value, name } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  //2. image 부분

    const [imgFile, setImgFile] = useState([]);
    const [imgUrl, setImgUrl] = useState([]);
    const imgRef = useRef();

    //2-1 image onChange
    const onChangeImage = (e) => {
      const files = e.currentTarget.files;

      if ([...files].length > 3) {
        alert('이미지는 최대 3개까지 업로드가 가능합니다.');
        return;
      }

      //선택한 이미지 파일 반복문 돌리기
      [...files].forEach(file => {

        //이미지 압축 지정 
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 220,
          useWebWorker: true,
        };

        //압축 관련 내용
        imageCompression(file, options)
          .then((res) => {

            //이미지를 담기 : type에서 "image/*"을 하면 나오지 X split을 이용
            setImgFile(imgs => [...imgs, new File([res], res.name, { type: "image/" + res.name.split(".")[1] })]);
            const reader = new FileReader(); 

            reader.onload = () => {
              setImgUrl(imgUrl => [...imgUrl, reader.result]);
            };
            reader.readAsDataURL(res); 
          })
          .catch((error) => {
            console.log("파일 압축 실패", error);
          })
      });

    }


    //2-2 image onsubmit 부분
    const onSubmit = () => {

      const formData = new FormData();

      //폼 데이터에 각각 이미지 보내기
      if (imgFile.length > 0) {
        imgFile.forEach((file) => {
          formData.append("image", file);
        })
      } else {
        formData.append("image", null);
      }

      //폼 데이터에 글작성 데이터 넣기
      formData.append("content", post.content);

      //Api 날리기
      dispatch(__addPost(formData));
      window.location.replace("/")
    }


    useEffect(() => {
      dispatch(__userFeed())
    }, [dispatch])


      //slick 부분
      const settings = {
        infinite: true,
        //speed: 500,
        dots : false,
        slidesToShow: 1,
        slidesToScroll: 1
      };

  return (

    <Head className="head">
      
      <div>
        <img width={150} height={40}src={instagram} alt="로고" onClick={handleGoToHome}/>
      </div>
      <IconBox>
      <HomeBox className="homeBox">
      <img width={30} height={30} src={home} alt="홈" onClick={handleGoToHome}/>

      <div method="post" id="add" encType="multipart/form-data">
        <img width={30} height={30} src={plus} alt="추가하기" onClick={showModal}/>
            {modalOpen? (
              <STFormBox>
                <STFormBox2>
                  <STFormBox3>
                  <span>새 게시물 만들기</span>  
                    <STButtons>
                      <STFormButton onClick={showModal}>이전</STFormButton>
                      <STFormButton3 onClick={()=> { imgRef.current.click()}}> 업로드 버튼</STFormButton3>
                      <STFormButton2 type="submit" form="add" onClick={()=>{onSubmit(); showModal();}}>입력하기</STFormButton2>
                    </STButtons>
                    <div><br/>
                        <label htmlFor="imgFile">
                              <input
                                style={{ display: "none" }}
                                type="file"
                                id="imgFile"
                                onChange={onChangeImage}
                                accept="image/*"
                                ref={imgRef}
                                name="imgFile"/>

                        <StyledSlider {...settings}>
                                    {
                                      imgUrl.map((img) => {
                                        return (
                                          <div key={img.id}>
                                            <img src={img ? img : AddImage}  style={{height: "300px", width : "300px"}}/>
                                          </div>
                                          )
                                        })
                                    }
                        </StyledSlider>
                        </label>
                    </div >

                    <STFormTextarea
                      onChange={contentHandler} 
                      type="text" placeholder='문구 입력...' 
                      name="content">
                    </STFormTextarea>
                  </STFormBox3>
                </STFormBox2>
              </STFormBox>
            ):("")}
    
          </div>

      <img width={30} height={30}src={profile} alt="프로필" onClick={handleGoToProfile}/>

      </HomeBox>
      </IconBox>
  </Head>
  )
}

export default Header;

const Head = styled.div`
display: flex;
justify-content: space-between;
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
}`;

const STFormBox = styled.div`
  //모달창 크기
  width: 100%;
  height: 100%;
  //최상단
  z-index: 999;
  //중앙배치
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //모달창 디자인
  background-color: rgba(196, 196, 196, 0.6);
`

const STFormBox2 = styled.div`
  display: block;
  width: 100%;
`

const STFormBox3 = styled.div`
  width: 600px;
  height: 800px;
  background-color: #f1f1f1;
  border-radius: 14px;
  background-color: #fff !important;
  margin : auto;
  justify-content: center;
  align-items: center;
  align-self: center;
  position: relative;
`

const STFormButton = styled.button`
  //이전 버튼
  position: absolute;
  left : 10px;
  top: 10px;
  background-color:#0095f6;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  width: 100px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
  &:disabled {
  background-color: #b2dffc;}
`

const STFormButton2 = styled.button`
  //입력하기 버튼
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: #0095f6;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  width: 100px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
  &:disabled {
  background-color: #b2dffc;}
`


const STFormButton3 = styled.button`
  //입력하기 버튼
  position: absolute;
  right:250px;
  top: 10px;
  background-color: #d62176;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  width: 100px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
  &:disabled {
  background-color: #b2dffc;}
`

const STFormTextarea = styled.textarea`
  margin-top:500px;
  margin-left: 30px;
  z-index: 999;
  width:500px;
  height: 200px;
  border : 1px solid gray;
  border-radius: 5px;
  padding : 5px;
`


const StyledSlider = styled(Slider)`
    width:400x;
    height: 0px;
    cursor: pointer;
    color : transparent;
    
   div{
    margin-top: 10px;
    margin-left: 20px;
   }
  
`;

const STButtons = styled.div`
  justify-content: space-between;
`