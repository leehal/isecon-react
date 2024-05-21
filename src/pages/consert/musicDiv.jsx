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
  const [listData, setListData] = useState("");

  const context = useContext(UserContext);
  const { uno } = context;

  useEffect(() => {
    const MusicList = async (viewListData) => {
      try {
        if (viewListData === "allMusic") {
          const rsp = await ConsertAxiosApi.conAllMusic();
          setMusic(rsp.data);
        } else if (viewListData === "playList") {
          const rsp = await ConsertAxiosApi.conMyPlayList(1);
        } else {
        }
      } catch (e) {
        console.log(e);
      }
    };
    setListData(nowConsert);
    MusicList(listData);
  }, [listData]);

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
