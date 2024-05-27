import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: green;
`;

const Header = styled.div`
  display: flex;
  align-items: right;
  justify-content: right;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: #ceee82;
`;

const Logo = styled.img`
  height: 100%;
  cursor: pointer;
`;

const expandCircle = keyframes`
  from {
    width: 0;
    height: 0;
    opacity: 0.5;
  }
  to {
    width: 500px;
    height: 500px;
    opacity: 1;
  }
`;

const HeaderBar = styled.div`
  background-color: violet;
  border-radius: 50%;
  width: 0;
  height: 0;
  position: fixed;
  position: absolute;
  top: 50%; /* Adjust this to position the circle below the logo */
  right: -20%;
  transform: translate(-50%, -50%);
  display: ${(props) => (props.show ? "block" : "none")};
  animation: ${(props) => (props.show ? expandCircle : "none")} 0.5s ease-out
    forwards;
`;
const HeadOption = styled.div`
  list-style: none;
  display: flex;
`;
const HeaderBarContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #00000037;
  display: ${(props) => (props.show ? "block" : "none")};
  animation: ${(props) => (props.show ? expandCircle : "none")} 0.5s ease-out;
`;
const HeadBox = () => {
  const [isHead, setIsHead] = useState(false);
  const navigate = useNavigate();

  const viewHeader = () => {
    setIsHead(true);
  };
  const byeHeader = () => {
    setIsHead(false);
  };

  return (
    <Container>
      <Header>
        <Logo
          src="https://firebasestorage.googleapis.com/v0/b/isecon-ee0a6.appspot.com/o/%EC%9D%B4%EC%84%B8%EB%8F%8C%EB%B3%B4%EB%9D%BC%EB%A1%9C%EA%B3%A0.png?alt=media&token=65154553-9a9a-43dc-9435-d081d5961835"
          alt=""
          onClick={() => navigate("/main")}
          onMouseEnter={viewHeader}
          onMouseLeave={byeHeader}
        />
        {/* <HeaderBarContainer > */}
        <HeaderBar
          show={isHead}
          onMouseEnter={viewHeader}
          onMouseLeave={byeHeader}
        />
        {/* </HeaderBarContainer> */}
      </Header>
    </Container>
  );
};

export default HeadBox;
