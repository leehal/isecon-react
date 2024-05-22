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
  background-color: royalblue;
  margin: 0;
`;

const VideoView = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const YouTubeView = ({ video }) => {
  return (
    <>
      <Container>
        <VideoView>
          <YouTube
            videoId={video}
            opts={{
              playerVars: {
                autoplay: 1,
              },
              width: "100%",
              height: "951px",
              // height: "100%",
            }}
          />
        </VideoView>
      </Container>
    </>
  );
};
export default YouTubeView;
