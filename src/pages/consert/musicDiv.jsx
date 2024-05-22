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

const MusicDiv = ({ musicChoice, nowConsert, changePlayListSideBar }) => {
  const [music, setMusic] = useState([]); // 음악 넣을 곳
  const [playList, setPlayList] = useState([]); //플리이름 넣는 곳
  const [plistname, setPlistName] = useState(""); //선택된 플리 이름

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
          const rsp = await ConsertAxiosApi.conMyPlayList(uno);
          setPlayList(rsp.data);
          console.log(rsp.data);
        } else if ("playMusic") {
          const rsp = await ConsertAxiosApi.conMyPlMusic(plistname, uno);
          setMusic(rsp.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    MusicList();
  }, [nowConsert, plistname]);

  const myPlayMusicList = (e) => {
    setPlistName(e.target.dataset.plname);
    console.log(`plname : ${plistname}`);
    console.log(`e.target.value : ${e.target.dataset.plname}`);
    changePlayListSideBar("playMusic");
  };

  if (!music || music.length === 0) {
    return <div>No music list available.</div>;
  }
  if (nowConsert === "allMusic" || nowConsert === "playMusic") {
    return (
      <>
        {music.map((m) => (
          <MTitle key={m.mno} onClick={() => musicChoice(m.surl)}>
            {m.mname} {m.singer}
          </MTitle>
        ))}
      </>
    );
  } else if (nowConsert === "playList") {
    // 나의 플레이리스트 목록 보여주기
    return (
      <>
        <MTitle>+ 플레이 리스트 추가</MTitle>
        {playList.map((p) => (
          <MTitle
            key={p.INDEX}
            data-plname={p.plname}
            onClick={myPlayMusicList}
          >
            {p.plname}
          </MTitle>
        ))}
      </>
    );
  }
};
export default MusicDiv;
