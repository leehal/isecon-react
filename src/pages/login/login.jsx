import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginAxiosApi from "../../api/LoginAxios";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
const LoginBox = styled.div`
  width: 70%;
  height: 60%;
  position: absolute;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
const Img = styled.div``;

const LoginImg = styled.div`
  position: absolute;
  background: red;
  width: 63%;
  height: 100%;
  left: 0;
  overflow: hidden;
`;
const LoginInput = styled.div`
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
const LoginIcon = styled.div`
  position: absolute;
  width: 100%;
  height: 100px;
  bottom: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Kicon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin: 0 20px;
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid #e0e0e0;

  img {
    width: 60px;
    height: 70px;
  }
`;
const Gicon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin: 0 20px;
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid #e0e0e0;

  img {
    width: 60px;
    height: 70px;
  }
`;
const Nicon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin: 0 20px;
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid #e0e0e0;

  img {
    width: 60px;
    height: 70px;
  }
`;
const LoginBtn = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 25%;
  width: 90%;
  height: 50px;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  background: rgb(228, 66, 123);
`;
const SignBtn = styled.button``;

const LOGIN = () => {
  const navigate = useNavigate();
  const onClickSignUp = (e) => {
    navigate("/Signup");
  };
  const onClickLogin = async () => {
    // 로그인을 위해 axios호출
    try {
      const rsp = await LoginAxiosApi.myLogin(id, pwd);
      console.log(rsp.data);
      if (rsp.data !== 0) {
        localStorage.setItem("uno", rsp.data); // 저장
        localStorage.setItem("isLogin", "TRUE");
        navigate("/mypage");
        alert("성공");
      } else {
        // 서버의 응답을 줬지만 성공이 아닌 경우
        alert("아이디 및 패스워드를 재 확인 해 주세요.");
      }
    } catch (e) {
      // 서버가 응답하지 않는 경우
      alert("서버가 응답하지 않습니다.");
    }
  };

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const changeId = (e) => {
    setId(e.target.value);
    console.log(e.target.value);
  };
  const changePwd = (e) => {
    setPwd(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <Container>
        <Img>
          <img src="img/Rectangle409.png" alt="Rectangle409" />
        </Img>
        <LoginBox>
          <LoginImg>
            <img
              src="https://image.fmkorea.com/files/attach/new3/20240320/2978469841/6599888316/6835846688/27acff1af36ed18d743f7e94c723db87.png"
              alt=""
            />
          </LoginImg>
          <LoginInput>
            <label>
              <input
                type="text"
                value={id}
                onChange={changeId}
                placeholder="id"
              />
            </label>
            <label>
              <input
                type="text"
                value={pwd}
                onChange={changePwd}
                placeholder="pwd"
              />
            </label>
            <LoginBtn onClick={onClickLogin}>로그인</LoginBtn>
            <SignBtn onClick={onClickSignUp}>회원가입</SignBtn>
            <LoginIcon>
              <Kicon>
                <img src="img/Kicon.png" alt="" />
              </Kicon>
              <Gicon>
                <img src="img/Gicon.png" alt="" />
              </Gicon>
              <Nicon>
                <img src="img/Nicon.png" alt="" />
              </Nicon>
            </LoginIcon>
          </LoginInput>
        </LoginBox>
      </Container>
    </>
  );
};

export default LOGIN;
