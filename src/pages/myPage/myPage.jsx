import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MyPageAxiosApi from "../../api/MyPageAxios";
import { UserContext } from "../../UserStore";
import { storage } from "../../api/firebase";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 120vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Mybox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  left: 14%;
  width: 20%;
  height: 50%;
  top: 20%;
  background: #f3f2f2;
  box-shadow: 0px 3px 5px -2px #a3a3a3;
`;
const Img = styled.div`
  position: absolute;
  background: #fff;
  box-shadow: 3px 5px 13px -5px gray;
  width: 40%;
  height: 27%;
  display: flex;
  left: 50%;
  transform: translate(-50%);
  top: 5%;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
  }
`;

const Userbox = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 40%;
  width: 100%;
  height: 30%;
  background: #4f6e9e;
`;
const Ptext = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: start;
  font-size: 16px;
  color: #fff;
  width: 60%;
  height: 100%;
  line-height: 2;
`;
const Button = styled.div`
  position: absolute;
  width: 70%;
  height: 8%;
  font-size: 20px;
  color: #fff;
  background: rgb(240, 90, 153);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 15%;
  cursor: pointer;

  &:hover {
    background: rgb(245, 126, 167);
  }
`;

const Mybox2 = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  top: 20%;
  right: 14%;
  background: #f1f1f1;
  box-shadow: 0px 3px 5px -2px #a3a3a3;
`;
const Userbox2 = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  width: 90%;
  height: 80%;
  overflow-y: auto;
  gap: 10px;
  background: #fff;
`;

const Sellbox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40%;
  min-height: 40%;
  background: #ffffff;
  box-shadow: 3px 3px 13px -5px gray;
`;
const Title = styled.div`
  position: absolute;
  left: 5%;
  font-size: 20px;
  color: #000000;
  font-weight: 600;
`;
const Option = styled.div`
  position: absolute;
  left: 25%;
  font-size: 16px;
  color: #000000;
  font-weight: 600;
`;
const Date = styled.div`
  position: absolute;
  right: 40%;
  font-size: 16px;
  color: #000000;
  font-weight: 600;
`;
const P = styled.div`
  position: absolute;
  right: 5%;
  font-size: 17px;
`;

const MyPage = () => {
  const [mypageInfo, setMypageInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sle, setSle] = useState([]);

  const [file, setFile] = useState(null); // 선택된 파일에 대한 상태관리
  const [url, setUrl] = useState(""); // 사진 경로 (파이어베이스의 업로드된 경로)

  const context = useContext(UserContext);
  const { uno } = context;

  const navigate = useNavigate();
  const myinfo = () => {
    if (!uno) {
      alert("로그인하세요");
      navigate("/");
    } else {
      navigate("/UserUpdateFrom");
    }
  };

  useEffect(() => {
    const sleProd = async () => {
      try {
        const rsp = await MyPageAxiosApi.myPageSale(uno);
        setSle(rsp.data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };
    sleProd();
  }, [uno]);

  useEffect(() => {
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
    if (!uno) {
      alert("로그인하세요");
      navigate("/");
    } else {
      userData(uno);
    }
  }, [navigate, uno]);

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
            src={
              mypageInfo.uimg ||
              "https://firebasestorage.googleapis.com/v0/b/isecon-ee0a6.appspot.com/o/wu.webp?alt=media&token=2c30d6b5-ff9c-4871-867a-e5a7aaf0de85"
            }
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
              <P>결제완료</P>
            </Sellbox>
          ))}
        </Userbox2>
      </Mybox2>
    </Container>
  );
};
export default MyPage;
