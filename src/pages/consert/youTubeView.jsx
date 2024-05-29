import styled from "styled-components";
import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: left;
  justify-content: left;
  height: 100vh;
  width: 78vw;
  background-color: black;
  margin: 0;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const VideoView = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const YouTubeView = ({ video, onReady }) => {
  const [videoHeight, setVideoHeight] = useState("951px");

  useEffect(() => {
    const handleResize = () => {
      setVideoHeight(window.innerWidth <= 768 ? "400px" : "951px");
    };

    handleResize(); // 페이지가 처음 로드될 때 한 번 실행

    window.addEventListener("resize", handleResize); // 창 크기 변경 시 이벤트 핸들러 등록

    return () => {
      window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 이벤트 핸들러 제거
    };
  }, []);

  return (
    <Container>
      <VideoView>
        <YouTube
          videoId={video}
          opts={{
            playerVars: {
              autoplay: 1,
              modestbranding: 1, // YouTube 로고를 없애는 옵션
              rel: 0, // 관련 동영상 표시를 제어
              showinfo: 0, // 비디오 정보 표시를 제어
              controls: 0, // 컨트롤 표시 (0: 표시 안함, 1: 표시)
            },
            width: "100%",
            height: videoHeight,
          }}
          onReady={onReady}
        />
      </VideoView>
    </Container>
  );
};

export default YouTubeView;
