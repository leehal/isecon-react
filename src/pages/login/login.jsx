import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "../login/modal";
import LoginAxiosApi from "../../api/LoginAxios";
const Container = styled.div``;
const Img = styled.div``;
const StyledInput = styled.div``;

const LOGIN = () => {
  // 입력받기
  const [inputId, setInputId] = useState("");
  const [inputPwd, setInputPwd] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState("");
  const [isPwd, setIsPwd] = useState("");

  const navigate = useNavigate();

  const onClickLogin = async () => {
    // 로그인을 위해 axios호출
    try {
      const rsp = await LoginAxiosApi.mypageAll(id, pwd);
      console.log(rsp.data);
      if (rsp.data) {
        localStorage.setItem("email", isId); // 저장
        localStorage.setItem("isLogin", "TRUE");
        // navigate("/home");
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
          <img src="" alt="" />
        </Img>
        <label>
          <input type="text" value={id} onChange={changeId} placeholder="id" />
        </label>
        <label>
          <input
            type="text"
            value={pwd}
            onChange={changePwd}
            placeholder="pwd"
          />
        </label>
        <button onClick={onClickLogin}>ㅇㅇ</button>
      </Container>
    </>
  );
};

export default LOGIN;
