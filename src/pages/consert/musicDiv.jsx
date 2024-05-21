import { useState } from "react";
import styled from "styled-components";

const MTitle = styled.div`
  background-color: #80808060;
  color: white;
  display: flex;
  align-items: center;
  width: 100%;
  height: 7%;
  border: solid 1px black;
  &:hover {
    background-color: #ee82eeba;
  }
`;

const MusicDiv = ({ Music, musicChoice }) => {
  // const [music, setMusic] = useState([]); // 음악 넣을 곳
  // setMusic(Music);
  // console.log(Music);
  // console.log(music);
  // console.log(music[0].mname);
  if (!Music || Music.length === 0) {
    return <div>No music list available.</div>;
  }
  return (
    <>
      {Music.map((music) => (
        <MTitle key={music.mno} onClick={() => musicChoice(music.surl)}>
          {music.mname}
          {music.singer}
        </MTitle>
      ))}
    </>
  );
};
export default MusicDiv;
