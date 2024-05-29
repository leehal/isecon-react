import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import PlayListContainer from "./playListContainer";
import { MdOutlineMotionPhotosPaused } from "react-icons/md";
import { IoPlayCircleOutline } from "react-icons/io5";

const Container = styled.div`
  display: flex;
  flex-direction: column; //세로 방향으로 요소를 배치
  align-items: right;
  justify-content: right;
  height: 100vh;
  width: 22vw;
  background-color: black;
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

const ButtonBar = styled.div`
  background-color: black;

  width: 100%;
  height: 15%;
  position: fixed; /* 고정 위치 설정 */
  bottom: 0; /* 화면의 맨 아래로 설정 */
  /* display: flex;
  align-items: center;
  justify-content: center; */
  button {
    width: 80px;
    height: 80px;
    background-color: transparent;
    color: pink;

    border: 0;
  }
`;

const PlayListSide = ({ musicChoice, player, video }) => {
  const [nowConsert, setNowConsert] = useState("allMusic");

  const changePlayListSideBar = useCallback((nowdiv) => {
    setNowConsert(nowdiv);
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);

  const playPauseBtn = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <Container>
        <PlHead onClick={() => setNowConsert("allMusic")}>ISECON</PlHead>
        <PlayListContainer
          musicChoice={musicChoice}
          nowConsert={nowConsert}
          changePlayListSideBar={changePlayListSideBar}
          video={video}
        />
        <ButtonBar>
          <button onClick={playPauseBtn}>
            {isPlaying ? (
              <MdOutlineMotionPhotosPaused
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <IoPlayCircleOutline style={{ width: "100%", height: "100%" }} />
            )}
          </button>
        </ButtonBar>
      </Container>
    </>
  );
};
export default PlayListSide;
