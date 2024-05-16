import styled from "styled-components";
import YouTubeView from "./youTubeView";
import PlayListSide from "./playListSide";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  margin: 0%;
  padding: 0%;
  display: flex;
`;

const Consert = () => {
  return (
    <>
      <Container>
        <YouTubeView />
        <PlayListSide />
      </Container>
    </>
  );
};
export default Consert;
