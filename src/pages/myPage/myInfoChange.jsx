import { useState } from "react";
import styled from "styled-components";
import MyPage from "./myPage";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ChangeBox = styled.div`
  position: absolute;
  display: flex;
  width: 30%;
  height: 70%;
  justify-content: center;
  align-items: center;
  background: #304a70;
`;
const TextForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: red;
`;
const StyledInput = styled.input`
  width: 400px;
  height: 55px;
  margin-bottom: 20px;
  font-size: 20px;
  border: none;
  background: #f3f3f3;

  &:focus {
    border-bottom: 1px solid red;
    outline: none;
    background: #fff;
  }
  &::placeholder {
    color: #ccc;
    padding-left: 10px;
  }
`;
const Button = styled.button`
  position: absolute;
  width: 150px;
  height: 50px;
  bottom: 7%;
`;

function UserUpdateFrom() {
  const [nickName, setNickName] = useState("");
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const changeNickName = (e) => {
    setNickName(e.target.value);
  };
  const changeId = (e) => {
    setId(e.target.value);
  };
  const changePwd = (e) => {
    setPwd(e.target.value);
  };
  const changePhone = (e) => {
    setPhone(e.target.value);
  };
  const changeAddress = (e) => {
    setAddress(e.target.value);
  };

  return (
    <Container>
      <ChangeBox>
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
              value={id}
              onChange={changeId}
              placeholder="ID"
            />
          </label>
          <label>
            <StyledInput
              type="text"
              value={pwd}
              onChange={changePwd}
              placeholder="PWD"
            />
          </label>
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
        <Button>저장</Button>
      </ChangeBox>
    </Container>
  );
}
export default UserUpdateFrom;
