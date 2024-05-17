import { useState } from "react";
import styled from "styled-components";

const MTitle = styled.div`
  background-color: #80808060;
  color: white;
  display: flex;
  width: 100%;
  height: 8%;
`;

const MusicDiv = ({ Music }) => {
  // const [music, setMusic] = useState([]); // 음악 넣을 곳
  // setMusic(Music);
  console.log(Music);
  // console.log(music);
  // console.log(music[0].mname);
  return (
    <>
      <MTitle>
        {Music.map((music) => (
          <p key={music.mno}>
            <h6>{music.mname}</h6>
          </p>
        ))}
      </MTitle>
    </>
  );
};
export default MusicDiv;
