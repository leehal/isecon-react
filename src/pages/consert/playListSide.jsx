import { useEffect, useState } from "react";
import styled from "styled-components";
import ConsertAxiosApi from "../../api/ConsertAxios";
import PlayListContainer from "./playListContainer";

const Container = styled.div`
  display: flex;
  flex-direction: column; //세로 방향으로 요소를 배치
  align-items: right;
  justify-content: right;
  height: 100vh;
  width: 30vw;
  background-color: #704a81;
  margin: 0%;
`;

const PlHead = styled.div`
  background-color: #ce0aff75;
  color: white;
  width: 100%;
  height: 7%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBar = styled.div`
  background-color: black;
  width: 100%;
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    border-radius: 5%;
    background-color: gray;
    width: 70%;
    color: white;
    ::placeholder {
      color: white;
    }
  }
`;

const PlayListSide = () => {
  const [music, setMusic] = useState([]); // 음악 넣을 곳

  useEffect(() => {
    const conMusic = async () => {
      const rsp = await ConsertAxiosApi.conAllMusic();
      console.log(rsp.data);
      setMusic(rsp.data);
    };
    conMusic();
  }, []);

  return (
    <>
      <Container>
        <PlHead>ISECON</PlHead>
        <SearchBar>
          <input type="text" placeholder="검색" />
        </SearchBar>
        <PlayListContainer />
      </Container>
    </>
  );
};
export default PlayListSide;
