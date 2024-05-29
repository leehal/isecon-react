import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import PlayListContainer from "./playListContainer";
import { MdOutlineMotionPhotosPaused } from "react-icons/md";
import { IoPlayCircleOutline } from "react-icons/io5";
import { AiFillFastForward, AiFillFastBackward } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  flex-direction: column; //세로 방향으로 요소를 배치
  align-items: right;
  justify-content: right;
  height: 100vh;
  width: 22vw;
  background-color: black;
  margin: 0%;
  @media (max-width: 768px) {
    height: 50vh;
    width: 100vw;
  }
`;

const PlHead = styled.div`
  background-color: rgb(240, 90, 153);
  color: white;
  width: 100%;
  height: 7%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5vw;
  letter-spacing: 0.35vw;
`;

const ButtonBar = styled.div`
  background-color: black;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 15%;
  /* position: fixed; */
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
  @media (max-width: 768px) {
    position: relative;
    bottom: 4%;
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
          <AiFillFastBackward
            style={{ color: "rgb(240, 90, 153)", width: "30%", height: "30%" }}
          />
          <button onClick={playPauseBtn}>
            {isPlaying ? (
              <MdOutlineMotionPhotosPaused
                style={{
                  width: "100%",
                  height: "100%",
                  color: "rgb(240, 90, 153)",
                }}
              />
            ) : (
              <IoPlayCircleOutline
                style={{
                  width: "100%",
                  height: "100%",
                  color: "rgb(240, 90, 153)",
                }}
              />
            )}
          </button>
          <AiFillFastForward
            style={{ color: "rgb(240, 90, 153)", width: "30%", height: "30%" }}
          />
        </ButtonBar>
      </Container>
    </>
  );
};
export default PlayListSide;
