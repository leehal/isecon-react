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
  border-radius: 15px;

  label {
    margin-bottom: 16%;
  }
  input {
    position: absolute;
    display: flex;
    right: 8%;
    width: 85%;
    height: 23%;
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
const Textbox = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 40%;
  flex-direction: column;
  top: 8%;
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
const IdError = styled.div`
  color: ${({ isMail }) => (isMail ? `green` : `red`)};
  position: absolute;
  right: 10%;
  top: 26%;
  font-size: 13px;
`;
const PwdError = styled.div`
  color: ${({ isMail }) => (isMail ? `green` : `red`)};
  position: absolute;
  right: 10%;
  top: 62%;
  font-size: 13px;
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
