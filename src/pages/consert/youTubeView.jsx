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
  margin: 0%;
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
        <YouTube
          videoId={video}
          opts={{
            playerVars: {
              autoplay: 1,
            },
          }}
        ></YouTube>
      </Container>
    </>
  );
};
export default YouTubeView;
