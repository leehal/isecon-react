import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SignAxiosApi from "../../api/SignUpAxios";

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
    margin-bottom: 80px;
  }
  input {
    position: absolute;
    display: flex;
    right: 8%;
    width: 85%;
    height: 50px;
    border: none;
    border-bottom: 2px solid #ccc;
    font-size: 20px;
  }
  ::placeholder {
    color: #b4b4b4;
    font-weight: 600;
  }
`;
const SignImg = styled.div`
  position: absolute;
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
  bottom: 10%;
  right: 3%;
  width: 30%;
  height: 50px;
  background: rgb(228, 66, 123);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;
const NoBtn = styled.div`
  position: absolute;
  color: #000;
  bottom: 5%;
  right: 10%;
  font-size: 15px;
  color: #8f8f8f;

  &:hover {
    border-bottom: 1px solid #bdbdbd;
    cursor: pointer;
  }
`;
const Signup = () => {
  const Navigate = useNavigate("");
  const [inputId, setinputId] = useState("");
  const [inputPwd, setInputPwd] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputAddress, setInputAddress] = useState("");

  const clickSave = async (e) => {
    try {
      const rsp = await SignAxiosApi.memberReg(
        inputId,
        inputPwd,
        inputNickName,
        inputPhone,
        inputAddress
      );
      if (rsp.data) {
        alert("성공.");
        Navigate("/");
      } else {
        alert("회원 가입에 실패 했습니다.");
      }
    } catch (e) {
      // 서버가 응답하지 않는 경우
      console.log(e);
    }
  };

  const clickNo = () => {
    Navigate("/");
  };

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
  const signAddress = (e) => {
    setInputAddress(e.target.value);
  };

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
              placeholder="아이디"
            />
          </label>
          <label>
            <input
              type="text"
              value={inputPwd}
              onChange={signPwd}
              placeholder="비밀번호"
            />
          </label>
          <label>
            <input
              type="text"
              value={inputNickName}
              onChange={signNickName}
              placeholder="닉네임"
            />
          </label>
          <label>
            <input
              type="text"
              value={inputPhone}
              onChange={signPhone}
              placeholder="전화번호"
            />
          </label>
          <label>
            <input
              type="text"
              value={inputAddress}
              onChange={signAddress}
              placeholder="주소"
            />
          </label>
        </SignInput>
        <OkBtn onClick={clickSave}>회원가입</OkBtn>
        <NoBtn onClick={clickNo}>
          이미 계정이 있으신가요? <span>로그인</span>
        </NoBtn>
      </SignBox>
    </Container>
  );
};
export default Signup;
