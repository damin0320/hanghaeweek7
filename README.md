# 항해 7주차 팀과제 3 : Redux, Toolkit 등 활용한 클론프로젝트(인스타그램)


## 프론트 팀 : 안다민 / 이지나

## 프로젝트 소개

<p align="justify">
리액트 심화 및 리덕스 기본기를 바탕으로 백엔드와 소통하여 인스타그램 클론<br>
제한 및 공통 사항 : <br>
  <li> 컴포넌트 및 UI는 자유로 한다.</li>
  <li> ducks 패턴 활용한다.</li>
  <li> Redux 등 심화 과정에 필요한 자료를 활용한다.</li>
  <li> 배운 내용을 복습한다 생각하고 백엔드와 데이터를 주고 받아본다. 다만 저번주에 비해 다양한 기능을 구사해본다.</li>

</p>


### <a href="https://hanghaeweek7.vercel.app/">버셀 배포 페이지</a>

### <a href="https://imaginary-surf-76a.notion.site/SA-3-fd3c1e0bb2c74c24b10439460248a97a">노션 SA</a>

### <a href="https://youtu.be/6ho4HjvkOeA">유튜브 링크</a>

---
<br>

## 기술 스택

HTML / CSS in JS / JavaScript / React / Redux / Redux Toolkit / slick slider / git / gitHub / Velcel

기술 사용 이유 : 

- Redux : 원활한 전역적인 상태 관리를 위해 사용

- slick slider : 사진 슬라이드를 부드럽게 하기 위해 순수 자바스크립트보다 효율적인 라이브러리 사용

- vercel : 깃허브와 연동되어 push 시 자동 배포가 되는 velcel 선택하여 사용 + 백엔드의 https 협업 원활하여 사용

---

## LightHouse 측정 결과

<img src="src/images/lighthouse.png" />

___
<br>

## 구현 요소 및 역할 분담

- 로그인 및 회원가입(다민)

- 좋아요 기능 구현(다민)

- 유저 권한 기능 부여(다민)

- CSS 전반적 구현(다민)

- 파일 형식 사진 다중 업로드 및 슬라이더 기능 구현(지나)

- 인스타그램 게시글 및 댓글 CRUD(지나)

---
## 구현 기능

### 기능 1 : 로그인 및 회원가입

- AccessToken 백엔드와 관리 통한 유저 식별(header에 담겨 오는 토큰 직접 관리)

- 쿠키 활용한 토큰 보안 강화

- 유저 회원가입 시 조건에 맞는 유효성 검사(정규표현식 등 활용)


<br>


### 기능 2 : 좋아요 기능 구현

- 백엔드와 소통하여 좋아요 상태값(T/F) 및 좋아요 갯수 불러오기 후 화면 렌더링

- 삼항연산자 통한 좋아요 토글 기능 구현

- 컴포넌트화로 사용 확장성 대비

<br>

### 기능 3 : 유저 권한 기능 부여

- 오직 본인만 작성 글 및 댓글에만 수정 및 삭제 권한 부여

- 로그인 시 받아온 고유 nickname을 게시글의 닉네임과 대조하여 삼항연산자처리(T/F)

- 타 유저가 접속 시 게시글의 수정 및 삭제 버튼이 아예 보이지 않게 처리


<br>

### 기능 4 : CSS 전반적 구현

- 인스타그램 UI 구현 노력

- theme 등 사용하여 버튼 및 양식 색감 구현

<br>

### 기능 5 : 파일 형식 사진 다중 업로드 및 슬라이더 기능 구현

- 이미지 슬라이드 사용(슬라이드 / 캐러셀 라이브러리)

- 사진 다중 업로드를 하면서 사진을 보여주는 animation을 고민하다가 slick 라이브러리를 이용해 사진을 슬라이드로 보이게 함

- 미리보기 기능 활용하여 유저가 사진 미리 볼 수 있게 한 편의성 제공

<br>

### 기능 6 : 인스타그램 게시글 및 댓글 CRUD + 모달창 구현

- 리덕스 및 툴킷 사용한 인스타그램 게시글 및 댓글 CRUD 기능 구현

- 게시글 작성 파트 모달 만들기

- 게시글 및 댓글에 해당 글 게시 시간 부여(몇 분 전, 몇 시간 전 등)
 

<br>

### 기능 7 : 그 외 구현 사항

- 동적 라우팅을 사용 (공통) -> react-router-dom 활용

- Form에 유효성 검증 기능을 적용 -> 회원가입 시 조건에 맞지 않을 시 alert 동작

- 배포된 결과물에서는 `console.log()` 가 보이지 않도록 처리 -> 코드 확인 완료


<br>

---

## 컴포넌트와 나눈 이유

### Ducks 패턴 활용 통한 컴포넌트 나누기

### 1. Components
- Likes.jsx : 좋아요 관리
- SignIn.jsx & SignUp : 일반 로그인 및 회원가입
- Header.jsx & Layout.jsx : 홈페이지 전반적 레이아웃(홈, 로그아웃, 글쓰기 포함)
- header.css : header의 css 관리

<br>

### 2. Pages
- AddPost.jsx : 인스타그램 list에 게시될 게시글 위한 기능 구현
- PostDetail.jsx : 인스타그램 게시글의 디테일 페이지
- PostList.jsx : 인스타그램 게시물 리스트 페이지
- SiginInPage.jsx : 로그인 페이지
- SignUpPage.jsx : 회원가입 페이지
- MyPage.jsx : 회원 닉네임 정보 및 상세 게시글 조회 가능한 페이지


<br>

### 3. redux & Router & cookie & theme
- modules > LoginSlice.js : Login의 Reducer 관리
- modules > PostsSlice.js : Posts의 Reducer 관리
- shared > Router.jsx : react-router-dom 방식에 따라 로그인 페이지, 상세페이지 이동 위한 설정으로 패턴 관리
- cookie > cookie.js : AccessToken 받기 위한 쿠키 함수 모음
- them > theme.js : border, text, color 등 전역 설정

<br>

---
## 배운 점 & 아쉬운 점

(다민)

### 배운 점 : 
- 리액트로 로그인 및 회원가입을 구현에 익숙해져 토큰을 주고 받는데 어려움이 없어졌다.
- 지나님 코드를 보고 함께 고치면서 CRUD에 대해 많이 이해할 수 있는 계기가 되었다.
- 조건부 렌더링, 사진 첨부파일로 업로드, 슬릭 슬라이더, 좋아요, 유저 권한 부여 등 다양한 신기술을 접할 수 있었다.
- 백엔드와 소통하며 Axios 및 스테이트 관리에 대해 자세히 알 수 있게 되어 실전프로젝트에 응용할 수 있을 것 같다.

### 아쉬운 점 : 
- 트러블 슈팅으로 좋아요 기능을 수행하는데 전체 페이지가 리렌더링 되는데에 이슈가 있었다. 따로 컴포넌트를 분할해 데이터를 받아오니 성공했다. 조금 아쉬운 점은 좋아요 기능 구현 중 발견된 이슈들이 100% 이해가 되지 않아 조금 더 공부가 필요할 것 같다.
- 매니저님이 제안한 챌린지에 대해서 도전하지 못 한게 아쉽다.(무한 스크롤)

(지나)

### 배운 점 :
- 지난주에 하지못했던 기능인 "지나 : 사진 다중업로드, slick 라이브러리 사용", "다민 : 좋아요 기능,  작성한 유저가 아니면 삭제 수정버튼 뜨지 않게 하기" 함께 구현할 수 있어서 즐거웠다.

### 아쉬운 점 :
- 트러블  슈팅으로 사진을 map 돌릴 때 이슈가 발생했는데 조건부 렌더링으로 해결
- 소셜 로그인 부분 / 검색 기능을 못 해본 것이 아쉽다.
- 모달창을 훅으로 해보고 싶다.

<br>

<p align="justify">

</p>

<br>

---

## 라이센스

Copyright 2022. hang-hae99 9th W7 team 3. all rights reserved.
