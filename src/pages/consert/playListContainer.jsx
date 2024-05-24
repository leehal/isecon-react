import { useState } from "react";
import styled from "styled-components";
import ConsertAxiosApi from "../../api/ConsertAxios";
import MusicDiv from "./musicDiv";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 78%;
  background-color: black;
  overflow-y: auto; /* 수직 스크롤 바를 활성화 */
  flex-direction: column;
`;

const PlayListContainer = ({
  musicChoice,
  nowConsert,
  changePlayListSideBar,
  video,
}) => {
  const [music, setMusic] = useState([]); // 음악 넣을 곳

  return (
    <>
      <Container>
        <MusicDiv
          musicChoice={musicChoice}
          nowConsert={nowConsert}
          changePlayListSideBar={changePlayListSideBar}
          video={video}
        ></MusicDiv>
      </Container>
    </>
  );
};
export default PlayListContainer;
