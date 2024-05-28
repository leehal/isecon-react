import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
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
  font-size: 1vw;
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

const HeadBox = () => {
  const navigate = useNavigate();

  return (
    <Container>
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
          <ul>
            <li onClick={() => navigate("/")}>로그인</li>
            <li onClick={() => navigate("/Signup")}>회원가입</li>
          </ul>
        </Login>
      </Header>
      <Outlet />
    </Container>
  );
};

export default HeadBox;
