import React, { useState, useRef, useEffect } from 'react'
import styled from "styled-components";
import AddImage from "../components/elements/addImage.svg";
import { useDispatch, useSelector  } from "react-redux";
import {__addPost, __getPost} from "../redux/modules/PostsSlice";


const Form = () => {


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
    //2-1 image onChange

    const [imageUrl, setImageUrl] = useState(null);
    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();

    const onChangeImage = () => {
      const reader = new FileReader();
      const file = imgRef.current.files[0];
      reader.readAsDataURL(file);
      reader.onloadend = () => {
      setImageUrl(reader.result);
      setImgFile(file);
    };
    }

  const onSubmit = (e) => {

    const formData = new FormData();
    formData.append("image", imgFile);
    formData.append("content", post.content);

    dispatch(__addPost(formData));

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    if (!content) {
      return alert("내용을 입력해주세요");
    }
  };
  


  return (
    <div method="post" id="add" encType="multipart/form-data">
        <button onClick={showModal}>모달 띄우기</button>
        {modalOpen? (
          <STFormBox>
            <STFormBox2>
              <STFormBox3>
              <STFormButton onClick={showModal}>이전</STFormButton>
              <span>새 게시물 만들기</span>  
              <div>본인 아이디 </div>
              <STFormButton2 type="submit" form="add" onClick={()=>{onSubmit(); showModal();}}>입력하기</STFormButton2>
                <STFormBox4 >
                  <div><br/>
                    <label htmlFor="imgFile">
                      <img
                            src={imageUrl ? imageUrl : AddImage}
                            style={{
                              marginBottom: "24px",
                              width: "300px",
                              height: "300px",
                            }}
                          />
                          <input
                            style={{ display: "none" }}
                            type="file"
                            id="imgFile"
                            onChange={onChangeImage}
                            accept="image/*"
                            ref={imgRef}
                            name="imgFile"
                            multiple
                          />
                      </label>
                  </div>
                  <STFormTextarea
                  onChange={contentHandler} 
                  type="text" placeholder='문구 입력...' 
                  name="content"></STFormTextarea>
                </STFormBox4 >
              </STFormBox3>
            </STFormBox2>
          </STFormBox>
        ):("")}
 
            </div>

  )
}

export default Form

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
  /* border: 1px solid black; */
  /* border-radius: 8px; */
  
`
const STFormBox2 = styled.div`
  /* padding: 20px 20px 28px 20px; */
  display: block;
  position: absolute;
  bottom: 0px;
  width: 100%;
`

const STFormBox3 = styled.div`
  width: 600px;
  height: 600px;
  background-color: #f1f1f1;
  border-radius: 14px;
  background-color: #fff !important;
  margin : auto;
  margin-bottom: 400px;
  justify-content: center;
  align-items: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  position: relative;
`
const STFormBox4 = styled.div`
  display: flex;
  flex-direction: row;
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

const STFormTextarea = styled.textarea`
  margin-left: 20px;
`
