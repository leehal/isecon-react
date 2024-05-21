import styled from "styled-components";
import YouTubeView from "./youTubeView";
import PlayListSide from "./playListSide";
import { useCallback, useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import ConsertAxiosApi from "../../api/ConsertAxios";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  margin: 0%;
  padding: 0%;
  display: flex;
`;
const videoId = "DPEtmqvaKqY";
const apiKey = "AIzaSyCAJ10MmyMcOipEdJUlTaPt5OeEnrgvQv0";
const apiUrl = "https://www.googleapis.com/youtube/v3/search";
const part = "snippet";
const chanId = "UCzh4yY8rl38knH33XpNqXbQ";
const playID = "PLWTycz4el4t4l6uuriz3OhqR2aKy86EEP";
const maxResults = 10;
// https://i.ytimg.com/vi/fgSXAKsq-Vo/default.jpg
// https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=YOUR_CHANNEL_ID&maxResults=5&key=YOUR_API_KEY

// const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playID}&maxResults=${maxResults}&key=${apiKey}`;

const Consert = () => {
  const [videos, setVideos] = useState("vXfs9LEgXfE");
  // const [nowConsert, setNowConsert] = useState("PlayListContainer");

  const url = `https://www.googleapis.com/youtube/v3/videos?part=${part}&id=${videos}&key=${apiKey}`;

  const musicChoice = useCallback((videos) => {
    console.log("ddddddddd");
    setVideos(videos);
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(url);

        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        const data = response.data;
        if (!data.items) {
          throw new Error("No items found in the response");
        }
      } catch (e) {
        console.error("Error fetching videos:", e);
      }
    };

    fetchVideos();
  }, [url]);
  return (
    <>
      <Container>
        <YouTubeView video={videos} />
        <PlayListSide musicChoice={musicChoice} />
      </Container>
    </>
  );
};
export default Consert;
