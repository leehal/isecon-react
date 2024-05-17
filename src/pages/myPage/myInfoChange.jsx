import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 120vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ChangeBox = styled.div`
  position: relative;
  display: flex;
  width: 40%;
  height: 80%;
  justify-content: center;
  align-items: center;
  background: #304a70;
`;
const TextForm = styled.div`
  position: absolute;
  top: 40%;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 80%;
`;
const StyledInput = styled.input`
  width: 550px;
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
