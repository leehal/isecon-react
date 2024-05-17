import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 120vh;
  background: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Mybox = styled.div`
  position: absolute;
  display: flex;
  width: 80%;
  height: 35%;
  top: 15%;
  background: #fbfbfb;
`;
const Img = styled.div`
  position: absolute;
  background: yellow;
  width: 250px;
  height: 250px;
  top: 20%;
  left: 18%;
  border-radius: 150px;
`;

const Userbox = styled.div`
  display: flex;
  position: absolute;
  top: 20%;
  right: 18%;
  width: 40%;
  height: 60%;
  background: #4f6e9e;
`;
const Ptext = styled.div`
  position: absolute;
  font-size: 18px;
  color: #fff;
  left: 10%;
  top: 10%;
  line-height: 2;
`;
const Button = styled.div`
  position: absolute;
  bottom: 5%;
  right: 18%;
  width: 200px;
  height: 50px;
  font-size: 20px;
  color: #fff;
  background: #1a345c;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #45a049; /* Dark green */
  }
`;

const Mybox2 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 35%;
  bottom: 15%;
`;
const Userbox2 = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  bottom: 0;
  width: 70%;
  height: 70%;
  background: blue;
  overflow-y: auto;
  gap: 10px;
`;

const Sellbox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 15%;
  min-height: 15%;
  background: #000;
`;
const Title = styled.div`
  position: absolute;
  left: 5%;
  font-size: 18px;
  color: #fff;
`;
const Option = styled.div`
  position: absolute;
  left: 35%;
  font-size: 18px;
  color: #fff;
`;
const Date = styled.div`
  position: absolute;
  right: 5%;
  font-size: 18px;
  color: #fff;
`;

const MypageMap = () => {
  const mp = [
    {
      name: "이세계 아이돌 - 01 페이스 쿠션",
      option: "A. 아이네",
      date: "2024. 05. 16",
    },
    {
      name: "이세계 아이돌 - 01 페이스 쿠션",
      option: "C. 릴파",
      date: "2024. 05. 16",
    },
    {
      name: "이세계 아이돌 - 01 페이스 쿠션",
      option: "B. 징버거",
      date: "2024. 05. 16",
    },
    {
      name: "이세계 아이돌 - 04 스마트톡",
      option: "A. 아이네",
      date: "2024. 05. 16",
    },
    {
      name: "이세계 아이돌 - 04 스마트톡",
      option: "E. 고세구",
      date: "2024. 05. 16",
    },
  ];
  const mypa = mp.map((pa) => (
    <Sellbox>
      <Title>{pa.name}</Title>
      <Option>{pa.option}</Option>
      <Date>{pa.date}</Date>
    </Sellbox>
  ));
  return mypa;
};

const MyPage = () => {
  const [mypageInfo, setMypageInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userData = async (uno) => {
      try {
        const response = await axios.get(
          "http://localhost:8125/isecon/users/userinfo?uno=27"
        );
        setMypageInfo(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    userData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <Container>
      <Mybox>
        <Img></Img>
        <Userbox>
          <Ptext>
            <p>아이디: {mypageInfo.id}</p>
            <p>닉네임: {mypageInfo.nickname}</p>
            <p>전화번호: {mypageInfo.phone}</p>
            <p>주소: {mypageInfo.address}</p>
          </Ptext>
        </Userbox>
        <Button>수정하기</Button>
      </Mybox>
      <Mybox2>
        <Userbox2>
          <MypageMap></MypageMap>
        </Userbox2>
      </Mybox2>
    </Container>
  );
};
export default MyPage;
