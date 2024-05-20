import styled from "styled-components";
import React, { useEffect, useState } from "react";
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
  const [nowMusic, setNowMusic] = useState("");

  return (
    <>
      <Container>
        {/* {videos.map((video) => ( 
          // console.log(`video : ${video.snippet.title}`),
          // console.log(`video id : ${video.id}`)
          // <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={this._onReady} />
          // <video/>
          // <YouTube videoId={nowMusic}></YouTube>
          // <YouTube videoId={nowMusic} id="player"></YouTube>
          // <YouTube videoId={video.snippet.resourceId.videoId} />
          // <VideoView videoId={videos[0].snippet.resourceId.videoId} />
         ))} */}
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
