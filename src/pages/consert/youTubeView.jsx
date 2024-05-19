import styled from "styled-components";
import React, { useEffect,  useState } from "react";
import YouTube from "react-youtube";

const Container = styled.div`
  display: flex;
  align-items: left;
  justify-content: left;
  height: 100vh;
  width: 78vw;
  background-color: royalblue;
  margin: 0%;
`;

const videoId = "fgSXAKsq-Vo";
const apiKey = "AIzaSyCAJ10MmyMcOipEdJUlTaPt5OeEnrgvQv0";
const apiUrl = "https://www.googleapis.com/youtube/v3/search";
const part = "snippet";
const chanId = "UCzh4yY8rl38knH33XpNqXbQ";
const playID = "PLWTycz4el4t4l6uuriz3OhqR2aKy86EEP";
const maxResults = 10;
// https://i.ytimg.com/vi/fgSXAKsq-Vo/default.jpg
// https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=YOUR_CHANNEL_ID&maxResults=5&key=YOUR_API_KEY

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playID}&maxResults=${maxResults}&key=${apiKey}`;

const YouTubeView = () => {
  const [nowMusic, setNowMusic] = useState("");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(url);
        console.log(response);
        console.log(`url : ${response.url}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data)
        setVideos(data.items);
        setNowMusic(data[0].id)
      } catch (e) {
        console.log(e);
      }
    };
    fetchVideos();
  }, []);

  return (
    <>
      <Container>
      {videos.map((video) => (
          // console.log(`video : ${video.snippet.title}`),
          // console.log(`video id : ${video.id}`)
          // <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={this._onReady} />
          // <video/>
          // <YouTube videoId={nowMusic}></YouTube>
          // <YouTube videoId={nowMusic} id="player"></YouTube>
          <YouTube videoId={videos[0].snippet.resourceId.videoId} />
        ))}
      </Container>
    </>
  );
};
export default YouTubeView;
