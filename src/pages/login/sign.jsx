import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
const SignBox = styled.div`
  width: 70%;
  height: 60%;
  position: absolute;
`;
const SignInput = styled.div`
  position: absolute;
  width: 36%;
  background: #fff;
  height: 100%;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  label {
    margin-bottom: 70px;
  }
  input {
    position: absolute;
    display: flex;
    right: 5%;
    width: 90%;
    height: 50px;
    border: none;
    border-bottom: 2px solid #ccc;
    font-size: 20px;
  }
`;
const SignImg = styled.div`
  position: absolute;
  background: red;
  width: 63%;
  height: 100%;
  left: 0;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
const OkBtn = styled.div`
  position: absolute;
  bottom: 5%;
  right: 7%;
  width: 150px;
  height: 50px;
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;
const NoBtn = styled.div`
  position: absolute;
  bottom: 5%;
  right: 20%;
  width: 150px;
  height: 50px;
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const Signup = () => {
  const [inputId, setinputId] = useState("");
  const [inputPwd, setInputPwd] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  const signId = (e) => {
    setinputId(e.target.value);
  };
  const signPwd = (e) => {
    setInputPwd(e.target.value);
  };
  const signNickName = (e) => {
    setInputNickName(e.target.value);
  };
  const signPhone = (e) => {
    setInputPhone(e.target.value);
  };

  const Navigate = useNavigate("");
  return (
    <Container>
      <img src="img/Rectangle409.png" alt="Rectangle409" />
      <SignBox>
        <SignImg>
          <img
            src="https://image.fmkorea.com/files/attach/new3/20240320/2978469841/6599888316/6835846688/27acff1af36ed18d743f7e94c723db87.png"
            alt=""
          />
        </SignImg>
        <SignInput>
          <label>
            <input
              type="text"
              value={inputId}
              onChange={signId}
              placeholder="id"
            />
            <button>확인</button>
          </label>
          <label>
            <input
              type="text"
              value={inputPwd}
              onChange={signPwd}
              placeholder="pwd"
            />
            <button>확인</button>
          </label>
          <label>
            <input
              type="text"
              value={inputNickName}
              onChange={signNickName}
              placeholder="닉네임"
            />
            <button>확인</button>
          </label>
          <label>
            <input
              type="text"
              value={inputPhone}
              onChange={signPhone}
              placeholder="전화번호"
            />
            <button>확인</button>
          </label>
        </SignInput>
        <OkBtn>가입</OkBtn>
        <NoBtn>취소</NoBtn>
      </SignBox>
    </Container>
  );
};
export default Signup;
