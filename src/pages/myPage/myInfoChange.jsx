import { useRef, useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import updateUserInfo from "../../api/MyPageInfoAxios";
import { storage } from "../../api/firebase";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ChangeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 30%;
  height: 70%;
  box-shadow: 1px 5px 15px -5px gray;
`;
const ChangeImg = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 30%;
  top: 3%;
`;
const ImgCircle = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85%;
  height: 100%;
  border-radius: 50%;
  background: #fff;
  box-shadow: 3px 5px 13px -5px gray;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 66%;
    height: auto;
  }
`;
const ChangeBtn = styled.button`
  width: 45%;
  height: 20%;
  position: absolute;
  border-radius: 20px;
  right: -40%;
  bottom: 5%;
  border: none;
  color: #ffffff;
  box-shadow: 3px 3px 6px -3px gray;
  background: #1a345c;
  cursor: pointer;

  &:hover {
    background-color: #45a049; /* Dark green */
  }
`;
const TextForm = styled.div`
  position: absolute;
  top: 35%;
  width: 70%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  label {
    width: 100%;
    height: 30%;
    background: yellow;
    margin: 10px 0;
  }
  input {
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-bottom: 1px solid #ccc;
  }
`;
const StyledInput = styled.input``;
const Save = styled.button`
  position: absolute;
  width: 20%;
  height: 6%;
  bottom: 5%;
  right: 28%;
  background: #1a345c;
  cursor: pointer;
  color: #fff;
  border: none;

  &:hover {
    background-color: #45a049; /* Dark green */
  }
`;
const Off = styled.button`
  position: absolute;
  width: 20%;
  height: 6%;
  bottom: 5%;
  left: 28%;
  background: #1a345c;
  cursor: pointer;
  color: #fff;
  border: none;

  &:hover {
    background-color: #45a049; /* Dark green */
  }
`;
const PwdError = styled.div`
  color: ${({ isMail }) => (isMail ? `green` : `red`)};
  position: absolute;
  right: 0;
  top: 50%;
  font-size: 13px;
`;

function UserUpdateFrom() {
  const [nickName, setNickName] = useState("");
  const [pwd, setPwd] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const uno = localStorage.getItem("uno");
  const [file, setFile] = useState(null); // 회원 사진 수정 파일 선택
  const [url, setUrl] = useState(""); // firebase 등록 된 사진 url 가져오기

  const [pwdComment, setPwdComment] = useState("");

  const [isPwd, setIsPwd] = useState(false);

  const inputFile = useRef(null);

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = async () => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      // // 파일을 업로드합니다.
      await fileRef.put(file);
      console.log("File uploaded successfully!");

      // 파일의 다운로드 URL을 가져옵니다.
      const downloadURL = await fileRef.getDownloadURL();

      // 상태를 업데이트합니다.
      setUrl(downloadURL);
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error);
    }
  };

  const changeNickName = (e) => {
    setNickName(e.target.value);
  };

  const changePhone = (e) => {
    setPhone(e.target.value);
  };
  const changeAddress = (e) => {
    setAddress(e.target.value);
  };
  const navigate = useNavigate();
  const saveBtn = async () => {
    if (isPwd) {
      try {
        const rsp = await updateUserInfo.myUserInfo(
          nickName,
          pwd,
          phone,
          address,
          uno,
          null
        );
        if (rsp.data) {
          alert("저장완료");
          navigate("/myPage");
        } else {
          alert("저장이 안됬음");
        }
      } catch (error) {
        console.error("유저 정보 업데이트 에러:", error);
      }
    } else {
      alert("아이디나 비밀번호 형식을 확인해주세요.");
    }
  };

  const offBtn = () => {
    navigate("/myPage");
  };

  const onClickProfile = () => {
    inputFile.current.click();
  };

  const onChangePwd = (e) => {
    // 함수 생성
    setPwd(e.target.value); // 이벤트가 발생한 곳의 값을 가져옴
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

  return (
    <Container>
      <ChangeBox>
        <ChangeImg>
          <ImgCircle onClick={onClickProfile}>
            <img src={url} alt="" />
            <input
              type="file"
              onChange={handleFileInputChange}
              ref={inputFile}
              hidden
            />
          </ImgCircle>
          <ChangeBtn onClick={handleUploadClick}>이미지 변경</ChangeBtn>
        </ChangeImg>
        <TextForm>
          <label>
            <StyledInput
              type="text"
              value={nickName}
              onChange={changeNickName}
              placeholder="닉네임"
            />
          </label>
          <label>
            <StyledInput
              type="text"
              value={pwd}
              onChange={onChangePwd}
              placeholder="PWD"
            />
          </label>
          <PwdError isMail={isPwd}>{pwdComment}</PwdError>
          <label>
            <StyledInput
              type="text"
              value={phone}
              onChange={changePhone}
              placeholder="전화번호"
            />
          </label>
          <label>
            <StyledInput
              type="text"
              value={address}
              onChange={changeAddress}
              placeholder="주소"
            />
          </label>
        </TextForm>
        <Save onClick={saveBtn}>저장</Save>
        <Off onClick={offBtn}>취소</Off>
      </ChangeBox>
    </Container>
  );
}
export default UserUpdateFrom;
