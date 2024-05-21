import { useEffect, useState } from "react";
import styled from "styled-components";
import ConsertAxiosApi from "../../api/ConsertAxios";

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

const MusicDiv = ({ musicChoice }) => {
  const [music, setMusic] = useState([]); // 음악 넣을 곳

  useEffect(() => {
    const MusicList = async () => {
      try {
        const rsp = await ConsertAxiosApi.conAllMusic();
        setMusic(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    MusicList();
  }, []);

  // setMusic(Music);
  // console.log(Music);
  // console.log(music);
  // console.log(music[0].mname);
  if (!music || music.length === 0) {
    return <div>No music list available.</div>;
  }
  return (
    <>
      {music.map((m) => (
        <MTitle key={m.mno} onClick={() => musicChoice(m.surl)}>
          {m.mname}
          {m.singer}
        </MTitle>
      ))}
    </>
  );
};
export default MusicDiv;
