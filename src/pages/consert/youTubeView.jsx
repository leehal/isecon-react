import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";

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
// https://i.ytimg.com/vi/fgSXAKsq-Vo/default.jpg
// https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=YOUR_CHANNEL_ID&maxResults=5&key=YOUR_API_KEY

const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${chanId}&maxResults=5&key=${apiKey}`;

const YouTubeView = () => {
  const [nowMusic, setNowMusic] = useState("");

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(url);
        console.log(response);
        console.log(`url : ${response.url}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // setPlaylists(data.items);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <>
      <Container></Container>
    </>
  );
};
export default YouTubeView;
