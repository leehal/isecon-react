import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ConsertAxiosApi from "../../api/ConsertAxios";
import { UserContext } from "../../UserStore";

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

const MusicDiv = ({ musicChoice, nowConsert }) => {
  const [music, setMusic] = useState([]); // 음악 넣을 곳
  const [playList, setPlayList] = useState([]); //플리이름 넣는 곳

  const context = useContext(UserContext);
  const { uno } = context;

  useEffect(() => {
    const MusicList = async () => {
      try {
        if (nowConsert === "allMusic") {
          const rsp = await ConsertAxiosApi.conAllMusic();
          setMusic(rsp.data);
          console.log(rsp.data);
        } else if (nowConsert === "playList") {
          const rsp = await ConsertAxiosApi.conMyPlayList(1);
          setPlayList(rsp.data);
          console.log(rsp.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    MusicList();
  }, [nowConsert]);

  if (!music || music.length === 0) {
    return <div>No music list available.</div>;
  }
  if (nowConsert === "allMusic") {
    return (
      <>
        {music.map((m) => (
          <MTitle key={m.mno} onClick={() => musicChoice(m.surl)}>
            {m.mname} {m.singer}
          </MTitle>
        ))}
      </>
    );
  }

  // 만약 nowConsert가 "playList"이면 아무것도 렌더링하지 않습니다.
  return (
    <>
      {playList.map((p) => (
        <MTitle key={p.INDEX}>{p.plname}</MTitle>
      ))}
    </>
  );
};
export default MusicDiv;
