import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginAxiosApi from "../../api/LoginAxios";
import { UserContext } from "../../UserStore";

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

  @media (max-width: 1024px) {
    width: 90%;
    height: 50%;
  }
`;
const Img = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

const LoginImg = styled.div`
  position: absolute;
  width: 63%;
  height: 100%;
  left: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
`;
const LoginInput = styled.div`
  position: absolute;
  width: 36%;
  min-width: 255px;
  background: #fff;
  height: 100%;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  label {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  input {
    width: 80%;
    height: 80%;
    border: none;
    background: #f1f0f0;
    border-radius: 5px;
    font-size: 1.2em;
    padding-left: 3%;

    @media (max-width: 768px) {
    }
  }
  ::placeholder {
    color: #b4b4b4;
    font-size: 1em;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    width: 70%;
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
`;

const TestBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 40%;
  top: 20%;
  flex-direction: column;
`;

const LoginIcon = styled.div`
  position: absolute;
  width: 55%;
  min-width: 55%;
  height: 10%;
  bottom: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Kicon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  min-width: 20%;
  height: auto;
  margin: 0 5%;
  border-radius: 30px;
  overflow: hidden;
  cursor: pointer;
  background: rgb(255, 233, 0);
  img {
    width: 100%;
    min-width: 100%;
    height: auto;
  }
`;
const Gicon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  min-width: 20%;
  height: auto;
  margin: 0 5%;
  border-radius: 30px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    min-width: 100%;
    height: auto;
  }
`;
const Nicon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  min-width: 20%;
  height: auto;
  margin: 0 5%;
  border-radius: 30px;
  overflow: hidden;
  cursor: pointer;
  background: rgb(0, 199, 60);
  img {
    width: 100%;
    min-width: 100%;
    height: auto;
  }
`;
const LoginBtn = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 27%;
  width: 90%;
  min-width: 240px;
  height: 8%;
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  background: rgb(228, 66, 123);
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: translate(1.1);
    background: rgb(231, 93, 142);
    box-shadow: 1px 2px 3px 1px #c6c6ca;
  }
`;
const SignBtn = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 22%;
  font-size: 15px;
  font-weight: 600;
  color: #b8b8b8;

  &:hover {
    color: #ccc;
  }
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    min-width: 240px;
    height: 8%;
    bottom: 16%;
    color: #fff;
    background: rgb(250, 176, 202);
    border-radius: 10px;
    white-space: nowrap;
  }
`;

const LOGIN = () => {
  const context = useContext(UserContext);
  const { setUno } = context;
  const navigate = useNavigate();
  const onClickSignUp = (e) => {
    navigate("/Signup");
  };
  const onClickLogin = async () => {
    // 로그인을 위해 axios호출
    try {
      const rsp = await LoginAxiosApi.myLogin(id, pwd);
      console.log(`uno:${rsp.data}`);
      if (rsp.data !== 0) {
        setUno(rsp.data);
        // 저장
        localStorage.setItem("isLogin", true);
        navigate("/main");
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
    // console.log(e.target.value);
  };
  const changePwd = (e) => {
    setPwd(e.target.value);
    // console.log(e.target.value);
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
            <TestBox>
              <label>
                <input
                  type="text"
                  value={id}
                  onChange={changeId}
                  placeholder="아이디"
                />
              </label>
              <label>
                <input
                  type="text"
                  value={pwd}
                  onChange={changePwd}
                  placeholder="비밀번호"
                />
              </label>
            </TestBox>
            <LoginBtn onClick={onClickLogin}>로그인</LoginBtn>
            <SignBtn onClick={onClickSignUp}>
              새로운 계정을 만들까요? 회원가입
            </SignBtn>
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
