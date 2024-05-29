import { useEffect, useState } from "react";
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

  @media (max-width: 1024px) {
    width: 90%;
    height: 50%;
  }
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;
const SignInput = styled.div`
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
    height: 20%;
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
  }

  input::placeholder {
    color: #b4b4b4;
    font-size: 17px;
    font-weight: 600;

    @media (max-width: 1024px) {
      font-size: 16px;
    }
    @media (max-width: 768px) {
      font-size: 15px;
    }
  }
  @media (max-width: 768px) {
    width: 70%;
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
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
  @media (max-width: 768px) {
    display: none;
  }
`;
const OkBtn = styled.div`
  position: absolute;
  bottom: 13%;
  width: 30%;
  right: 3%;
  height: 8%;
  background: rgb(228, 66, 123);
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  transition: all 0.1s ease-in-out;
  font-size: 16px;
  font-weight: 500;

  @media (max-width: 768px) {
    left: 50%;
    transform: translate(-50%);
    width: 55%;
    min-width: 240px;
    height: 8%;
    bottom: 15%;
  }
  &:hover {
    background: rgb(231, 93, 142);
  }
`;
const Textbox = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 60%;
  top: 15%;
  flex-direction: column;
`;

const NoBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  color: #000;
  bottom: 7%;
  width: 30%;
  height: 5%;
  right: 3%;
  font-size: 1em;
  color: #8f8f8f;
  white-space: nowrap;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55%;
    min-width: 240px;
    left: 50%;
    transform: translate(-50%);
    height: 8%;
    bottom: 3%;
    color: #fff;
    background: rgb(250, 176, 202);
    border-radius: 10px;
    white-space: nowrap;
  }

  &:hover {
    color: #ccc;
  }
`;
const IdError = styled.div`
  color: ${({ isMail }) => (isMail ? `green` : `red`)};
  position: absolute;
  right: 13%;
  top: 15%;
  font-size: 13px;

  @media (max-width: 1600px) {
    font-size: 11px;
  }
  @media (max-width: 1260px) {
    font-size: 10px;
  }
  @media (max-width: 1143px) {
    font-size: 9px;
  }
`;
const PwdError = styled.div`
  color: ${({ isMail }) => (isMail ? `green` : `red`)};
  position: absolute;
  right: 13%;
  top: 35%;
  font-size: 13px;

  @media (max-width: 1600px) {
    font-size: 11px;
  }
  @media (max-width: 1260px) {
    font-size: 10px;
  }
  @media (max-width: 1143px) {
    font-size: 9px;
  }
`;

const Signup = () => {
  const Navigate = useNavigate("");
  const [inputId, setinputId] = useState("");
  const [inputPwd, setInputPwd] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputAddress, setInputAddress] = useState("");

  // 유효성
  const [idComment, setIdComment] = useState("");
  const [pwdComment, setPwdComment] = useState("");
  const [sle, setSle] = useState("");

  const [isId, setIsId] = useState(false); // 써야하는데 안 씀
  const [isPwd, setIsPwd] = useState(false);

  const onChangeId = (e) => {
    // 함수 생성
    setinputId(e.target.value); // 이벤트가 발생한 곳의 값을 가져옴
    const idRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // 유효성 검사
    if (!idRegex.test(e.target.value)) {
      // 값이 맞지 않을 때 올바른 형식이 아닙니다 실행, setIsMail = false
      setIdComment("이메일이 올바른 형식이 아닙니다");
      setIsId(false); // 최종 회원가입 시 확인용
      // } else if (!sle) {
      //   setIdComment("사용가능한 이메일 입니다.");
      //   setIsId(true); // 최종 회원가입 시 확인용
      // } else if (sle) {
      //   setIdComment("중복된 이메일 입니다.");
      // setIsId(false);
    } else {
      setIdComment("올바른 형식입니다."); // 값이 맞으면 올바른 형식 실행
      checkSign(e.target.value);
      setIsId(true); // 최종 회원가입 시 확인용
    }
  };

  const onChangePwd = (e) => {
    // 함수 생성
    setInputPwd(e.target.value); // 이벤트가 발생한 곳의 값을 가져옴
    const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/; // 유효성 검사
    if (!pwdRegex.test(e.target.value)) {
      // 값이 맞지 않을 때 올바른 형식이 아닙니다 실행, setIsMail = false
      setPwdComment("숫자+영문자 조합으로 8자리 이상 입력해주세요");
      setIsPwd(false); // 최종 회원가입 시 확인용
    } else {
      setPwdComment("안전한 비밀번호 입니다"); // 값이 맞으면 올바른 형식 실행
      setIsPwd(true); // 최종 회원가입 시 확인용
    }
  };

  // useEffect(() => {
  const checkSign = async (inputId) => {
    const rsp = await SignAxiosApi.cheackDpe(inputId);
    setSle(rsp.data);
    console.log(rsp.data);
    if (rsp.data) {
      setIdComment("사용가능한 이메일 입니다.");
      //setIsId(true); // 최종 회원가입 시 확인용
    } else if (!rsp.data) {
      setIdComment("중복된 이메일 입니다.");
      // setIsId(false);
    }
  };
  // checkSign(inputId);
  // console.log(sle);
  // }, [inputId, sle]);

  const clickSave = async (e) => {
    e.preventDefault(); // 폼의 기본 동작인 페이지 새로고침 방지

    // 아이디와 비밀번호의 유효성 검사를 통과했는지 확인
    if (isId && isPwd) {
      try {
        const rsp = await SignAxiosApi.memberReg(
          inputId,
          inputPwd,
          inputNickName,
          inputPhone,
          inputAddress
        );
        if (rsp.data) {
          alert("회원 가입 성공");
          Navigate("/");
        } else {
          alert("회원 가입에 실패 했습니다.");
        }
      } catch (error) {
        console.log(error);
        alert("회원 가입에 실패 했습니다. 서버에 문제가 있을 수 있습니다.");
      }
    } else {
      alert("아이디나 비밀번호 형식을 확인해주세요.");
    }
  };

  const checkTrueId = (e) => {
    if (sle) {
      clickSave(e);
    } else {
      alert("정보를 입력해 주세요");
    }
  };

  const clickNo = () => {
    Navigate("/");
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
          <Textbox>
            <label>
              <input
                type="email" // 타입이 이메일
                value={inputId} // e.target.value
                onChange={onChangeId} // setinputId 함수 내의 값 넣음
                placeholder="아이디" // 기본값
              />
            </label>
            <IdError isMail={isId}>{idComment}</IdError>
            <label>
              <input
                type="password"
                value={inputPwd}
                onChange={onChangePwd}
                placeholder="비밀번호"
              />
            </label>
            <PwdError isMail={isPwd}>{pwdComment}</PwdError>
            <label>
              <input
                type="text"
                value={inputNickName}
                onChange={(e) => setInputNickName(e.target.value)}
                placeholder="닉네임"
              />
            </label>
            <label>
              <input
                type="text"
                value={inputPhone}
                onChange={(e) => setInputPhone(e.target.value)}
                placeholder="전화번호"
              />
            </label>
            <label>
              <input
                type="text"
                value={inputAddress}
                onChange={(e) => setInputAddress(e.target.value)}
                placeholder="주소"
              />
            </label>
          </Textbox>
        </SignInput>
        <OkBtn onClick={checkTrueId}>회원가입</OkBtn>
        <NoBtn onClick={clickNo}>
          이미 계정이 있으신가요? <span>로그인</span>
        </NoBtn>
      </SignBox>
    </Container>
  );
};
export default Signup;
