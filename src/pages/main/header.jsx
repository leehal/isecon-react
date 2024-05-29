import React, { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../UserStore";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
`;
const Header = styled.div`
  display: flex;
  position: fixed;
  z-index: 999;
  justify-content: center;
  align-items: center;
  opacity: 0.7; /* 50% 투명도 */
  background: #fff;
  /* background: blue; */
  width: 100vw;
  height: 15%;

  @media (max-width: 1024px) {
    display: none;
  }
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 55%;
  height: 100%;
  cursor: pointer;

  img {
    width: 30%;
    height: auto;
    object-fit: cover;
  }
`;
const GnbLeft = styled.div`
  position: absolute;
  bottom: 10%;
  left: 25%;
  width: 15%;
  height: 25%;

  ul {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
    list-style: none;
  }

  li {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0 30px;
    padding: 0 5px;
    font-size: 1vw;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      color: rgb(240, 90, 153);
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -2px; /* 가상 요소를 li의 아래쪽에 배치 */
      left: 0;
      width: 0;
      border-bottom: 2px solid rgb(240, 90, 153);
      transition: width 250ms ease-in-out;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const GnbRight = styled.div`
  position: absolute;
  bottom: 10%;
  right: 25%;
  width: 15%;
  height: 25%;

  ul {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
    list-style: none;
  }

  li {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0 30px;
    padding: 0 5px;
    font-size: 1vw;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      color: rgb(240, 90, 153);
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -2px; /* 가상 요소를 li의 아래쪽에 배치 */
      left: 0;
      width: 0;
      border-bottom: 2px solid rgb(240, 90, 153);
      transition: width 250ms ease-in-out;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const Login = styled.div`
  position: absolute;
  top: 50%;
  right: 5%;
  width: 10%;
  height: 20%;
  display: flex;
  justify-content: center;
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }

  li {
    padding: 5px;
    margin: 0 10px;
    cursor: pointer;
    white-space: nowrap;
    font-size: 1vw;

    &:hover {
      color: rgb(240, 90, 153);
    }
  }
`;

const MbHeader = styled.div`
  display: none;
  position: fixed;
  top: 4%;
  right: 3%;
  z-index: 999;

  @media (max-width: 1024px) {
    display: block;
  }
  #check_box {
    display: none;
  }

  #check_box + label {
    position: relative;
    display: block;
    width: 50px;
    height: 30px;
    cursor: pointer;
    z-index: 3; /* 메뉴보다 앞에 오도록 설정 */
  }

  #check_box + label > span {
    position: absolute;
    display: block;
    width: 100%;
    height: 5px;
    background: black;
    border-radius: 5px;
    transition: transform 300ms, opacity 0ms;
  }

  #check_box + label > span:nth-child(1) {
    top: 0;
  }

  #check_box:checked + label > span:nth-child(1) {
    top: 50%;
    transform: translate(0, -50%) rotate(45deg);
  }

  #check_box + label > span:nth-child(2) {
    top: 50%;
    transform: translate(0, -50%);
  }

  #check_box:checked + label > span:nth-child(2) {
    opacity: 0;
  }

  #check_box + label > span:nth-child(3) {
    bottom: 0;
  }

  #check_box:checked + label > span:nth-child(3) {
    top: 50%;
    transform: translate(0, -50%) rotate(-45deg);
  }
`;

const HamberGer = styled.div`
  position: fixed;
  top: 0;
  right: -350px;
  width: 350px;
  height: 100vh;
  background: #bbbbbb;
  transition: right 300ms;
  overflow: hidden;
  z-index: 1;

  #check_box:checked ~ & {
    right: 0;
  }

  ul {
    list-style-type: none;
    padding: 20px;
    margin: 0;
    color: white;
  }

  li {
    cursor: pointer;
    margin: 20px 0;
    transition: all 0ms.5 ease-in;

    &:hover {
      color: rgb(240, 90, 153);
    }
  }
`;
const MenuBox = styled.div`
  position: absolute;
  top: 15%;
  left: 10%;
  font-size: 17px;
`;
const MbLogin = styled.div`
  position: absolute;
  left: 30%;
  width: 200px;
  font-size: 15px;

  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  li {
    display: flex;
    margin: 0 10px;
  }
`;
const LogoImg = styled.div`
  position: absolute;
  left: 40%;
  transform: translate(-50%);
  top: 3%;
  cursor: pointer;
`;

const HeadBox = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 사용자 로그인 상태
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { uno, setUno } = context;

  const logOut = () => {
    if (localStorage.getItem("isLogin")) {
    }
  };

  return (
    <Container>
      <MbHeader>
        <input type="checkBox" id="check_box" />
        <label htmlFor="check_box">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <HamberGer>
          <MenuBox>
            <ul>
              <li onClick={() => navigate("/goods")}>굿즈</li>
              <li onClick={() => navigate("/cart")}>장바구니</li>
              <li onClick={() => navigate("/consert")}>콘서트</li>
              <li onClick={() => navigate("/mypage")}>마이페이지</li>
            </ul>
            <MbLogin>
              {uno === "" ? (
                <ul>
                  <li onClick={() => navigate("/")}>로그인</li>
                  <li onClick={() => navigate("/Signup")}>회원가입</li>
                </ul>
              ) : (
                <ul>
                  <li onClick={() => setUno("")}>로그아웃</li>
                </ul>
              )}
            </MbLogin>
          </MenuBox>
          <LogoImg onClick={() => navigate("/main")}>
            <img src="img/footerLogo.webp" alt="" />
          </LogoImg>
        </HamberGer>
      </MbHeader>
      <Header>
        <Logo onClick={() => navigate("/main")}>
          <img src="img/logoLong.webp" alt="" />
        </Logo>
        <GnbLeft>
          <ul>
            <li onClick={() => navigate("/goods")}>굿즈</li>
            <li onClick={() => navigate("/cart")}>장바구니</li>
          </ul>
        </GnbLeft>
        <GnbRight>
          <ul>
            <li onClick={() => navigate("/consert")}>콘서트</li>
            <li onClick={() => navigate("/mypage")}>마이페이지</li>
          </ul>
        </GnbRight>
        <Login>
          {uno === "" ? (
            <ul>
              <li onClick={() => navigate("/")}>로그인</li>
              <li onClick={() => navigate("/Signup")}>회원가입</li>
            </ul>
          ) : (
            <ul>
              <li onClick={() => setUno("")}>로그아웃</li>
            </ul>
          )}
        </Login>
      </Header>
      <Outlet />
    </Container>
  );
};

export default HeadBox;
