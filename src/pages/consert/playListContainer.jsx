import { useEffect, useState } from "react";
import styled from "styled-components";
import ConsertAxiosApi from "../../api/ConsertAxios";
import MusicDiv from "./musicDiv";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
  background-color: #36293b;
  overflow-y: auto; /* 수직 스크롤 바를 활성화 */
  flex-direction: column;
`;

const PlayListContainer = ({ musicList, musicChoice }) => {
  const [music, setMusic] = useState([]); // 음악 넣을 곳

  return (
    <>
      <Container>
        <MusicDiv Music={musicList} musicChoice={musicChoice}></MusicDiv>
      </Container>
    </>
  );
};
export default PlayListContainer;
