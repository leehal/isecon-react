import styled from "styled-components";
import React, { useState } from "react";
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
`;

const VideoView = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const YouTubeView = ({ video, onReady }) => {
  return (
    <>
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
              height: "951px",
            }}
            onReady={onReady}
          />
        </VideoView>
      </Container>
    </>
  );
};
export default YouTubeView;
