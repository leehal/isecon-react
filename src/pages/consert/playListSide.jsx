import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ConsertAxiosApi from "../../api/ConsertAxios";
import PlayListContainer from "./playListContainer";

const Container = styled.div`
  display: flex;
  flex-direction: column; //세로 방향으로 요소를 배치
  align-items: right;
  justify-content: right;
  height: 100vh;
  width: 22vw;
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

const ButtonBar = styled.div`
  background-color: black;
  width: 100%;
  height: 20%;
  position: fixed; /* 고정 위치 설정 */
  bottom: 0; /* 화면의 맨 아래로 설정 */
`;

const ButtonDiv = styled.div`
  background-color: violet;
  width: 100%;
  height: 30%;

  /* option[value=""][disabled] {
    display: none;
  } */
`;

const PlayListSide = ({ musicChoice }) => {
  const [nowConsert, setNowConsert] = useState("allMusic");
  const [selectedOption, setSelectedOption] = useState("");

  const changePlayListSideBar = useCallback((divName) => {
    setNowConsert(divName);
  }, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <Container>
        <PlHead>ISECON</PlHead>
        <SearchBar>
          <input type="text" placeholder="검색" />
        </SearchBar>
        <PlayListContainer musicChoice={musicChoice} nowConsert={nowConsert} />
        <ButtonBar>
          <ButtonDiv>
            <button onClick={() => setNowConsert("playList")}>
              플레이리스트
            </button>
            <select value={selectedOption} onChange={handleChange}>
              <option value="" disabled>
                정렬
              </option>
              <option value="가수">가수</option>
              <option value="노래">노래</option>
            </select>
          </ButtonDiv>
        </ButtonBar>
      </Container>
    </>
  );
};
export default PlayListSide;
