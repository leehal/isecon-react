import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MyPageAxiosApi from "../../api/MyPageAxios";
import UserStore, { UserContext } from "../../UserStore";

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
  overflow: hidden;
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

const MyPage = () => {
  const [mypageInfo, setMypageInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sle, setSle] = useState([]);

  const context = useContext(UserContext);
  const { uno } = context;

  const navigate = useNavigate();
  const myinfo = (e) => {
    navigate("/UserUpdateFrom");
  };

  useEffect(() => {
    const sleProd = async () => {
      const rsp = await MyPageAxiosApi.myPageSale(uno);
      setSle(rsp.data);
    };
    sleProd();
  }, []);

  useEffect(() => {
    console.log(uno);
    const userData = async (uno) => {
      try {
        const response = await MyPageAxiosApi.mypageAll(uno);
        setMypageInfo(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    userData(uno);
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
        <Img>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHbnGNCaUuLwJDOqaNB7RKM1Cw2Cxb0M24Va-FGjaDTg&s"
            alt=""
          />
        </Img>
        <Userbox>
          <Ptext>
            <p>아이디: {mypageInfo.id}</p>
            <p>닉네임: {mypageInfo.nickname}</p>
            <p>전화번호: {mypageInfo.phone}</p>
            <p>주소: {mypageInfo.address}</p>
          </Ptext>
        </Userbox>
        <Button onClick={myinfo}>수정하기</Button>
      </Mybox>
      <Mybox2>
        <Userbox2>
          {sle.map((sp) => (
            <Sellbox>
              <Title>{sp.pname}</Title>
              <Option>{sp.option}</Option>
              <Date>{sp.price}</Date>
            </Sellbox>
          ))}
        </Userbox2>
      </Mybox2>
    </Container>
  );
};
export default MyPage;
