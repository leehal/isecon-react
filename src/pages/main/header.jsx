import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
`;

const Sidebar = styled.div`
  position: fixed;
  top: -17%;
  right: -8%;
  width: 500px;
  height: 500px;
  border-radius: 100%;
  background-color: #333;
  color: white;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.isHovered ? "translate(0)" : "translate(100%)"};
`;

const SidebarText = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 30%;
  height: 40%;
  /* background: red; */
  bottom: 5%;
  right: 35%;

  p {
    font-size: 20px;
    color: #fff;
    margin: 10px 0;
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid #fff;
    }
  }
`;

const Overlay = styled.div`
  display: ${(props) => (props.isHovered ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 900;
  transition: opacity 0.3s ease-in-out;
  opacity: ${(props) => (props.isHovered ? "1" : "0")};
`;

const MenuButton = styled.img`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1100;
  height: 10%;
`;

const SidebarWrapper = styled.div`
  &:hover ${Sidebar} {
    transform: translate(0);
  }
  &:hover ${Overlay} {
    background-color: rgba(0, 0, 0, 0.5);
  }
  ${Sidebar}:hover + ${Overlay} {
    opacity: 1;
  }
`;

const HeadBox = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isHovered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isHovered]);

  return (
    <AppContainer>
      <MenuButton
        src="img/headLogo.png"
        onMouseEnter={() => setIsHovered(true)}
        onClick={() => navigate("/main")}
        // onMouseLeave={() => setIsHovered(false)}
      ></MenuButton>
      <SidebarWrapper>
        <Sidebar isHovered={isHovered} onMouseLeave={() => setIsHovered(false)}>
          <SidebarText>
            <p onClick={() => navigate("/goods")}>goods</p>
            <p onClick={() => navigate("/cart")}>cart</p>
            <p onClick={() => navigate("/consert")}>consert</p>
            <p onClick={() => navigate("/mypage")}>mypage</p>
          </SidebarText>
        </Sidebar>
        <Overlay isHovered={isHovered} />
      </SidebarWrapper>
      <Outlet />
    </AppContainer>
  );
};

export default HeadBox;
