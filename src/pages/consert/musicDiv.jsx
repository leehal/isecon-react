import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ConsertAxiosApi from "../../api/ConsertAxios";
import { UserContext } from "../../UserStore";

const Container = styled.div`
  height: 90%;
  width: 100%;
  overflow-y: auto;
  position: relative;
`;

const MTitle = styled.div`
  background-color: #80808060;
  color: white;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  border: solid 1px black;
  &:hover {
    background-color: #ee82eeba;
  }
`;

const SearchBar = styled.div`
  background-color: black;
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    border-radius: 5%;
    background-color: gray;
    width: 70%;
    color: white;
    ::placeholder {
      color: white;
    }
  }
`;

const InsertButtonBar = styled.div`
  background-color: #ce0aff75;
  width: 100%;
  height: 10%;
  position: fixed; /* 고정 위치 설정 */
  bottom: 0; /* 화면의 맨 아래로 설정 */
`;

const MusicDiv = ({ musicChoice, nowConsert, changePlayListSideBar }) => {
  const [music, setMusic] = useState([]); // 음악 넣을 곳
  const [playList, setPlayList] = useState([]); //플리이름 넣는 곳
  const [plistname, setPlistName] = useState(""); //선택된 플리 이름
  const [mnoList, setMnoList] = useState([]);

  const context = useContext(UserContext);
  const { uno } = context;

  useEffect(() => {
    const MusicList = async () => {
      try {
        console.log(nowConsert);
        if (nowConsert === "allMusic" || nowConsert === "PlInsert") {
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
  }, [nowConsert, plistname, uno]);

  const myPlayMusicList = (e) => {
    setPlistName(e.target.dataset.plname);
    console.log(`plname : ${plistname}`);
    console.log(`e.target.value : ${e.target.dataset.plname}`);
    changePlayListSideBar("playMusic");
  };

  const playListCheck = (e, mno) => {
    const checkbox = e.currentTarget.querySelector(`input[value="${mno}"]`);
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        setMnoList((prevMnoList) => prevMnoList.concat(mno));
      } else {
        setMnoList((prevMnoList) => prevMnoList.filter((id) => id !== mno));
      }
    }
  };

  useEffect(() => {
    console.log(mnoList);
  }, [mnoList]);

  // const plInsertView = () => {
  //   changePlayListSideBar("PlInsert");
  // };

  if (!music || music.length === 0) {
    return <div>No music list available.</div>;
  }
  if (nowConsert === "allMusic" || nowConsert === "playMusic") {
    return (
      <>
        <SearchBar>
          <input type="text" placeholder="검색" />
        </SearchBar>
        <Container>
          {music.map((m) => (
            <MTitle key={m.mno} onClick={() => musicChoice(m.surl)}>
              {m.mname} {m.singer}
            </MTitle>
          ))}
        </Container>
      </>
    );
  } else if (nowConsert === "playList") {
    // 나의 플레이리스트 목록 보여주기
    return (
      <>
        <SearchBar>
          <input type="text" placeholder="검색" />
        </SearchBar>
        <Container>
          <MTitle onClick={() => changePlayListSideBar("PlInsert")}>
            + 플레이 리스트 추가
          </MTitle>
          {playList.map((p) => (
            <MTitle
              key={p.INDEX}
              data-plname={p.plname}
              onClick={myPlayMusicList}
            >
              {p.plname}
            </MTitle>
          ))}
        </Container>
      </>
    );
  } else if (nowConsert === "PlInsert") {
    // 플리 만드는 div
    return (
      <>
        <SearchBar>
          <input type="text" placeholder="플레이리스트 이름" />
        </SearchBar>
        <Container>
          {music.map((m) => (
            <MTitle key={m.mno} onClick={(e) => playListCheck(e, m.mno)}>
              <input type="checkbox" value={m.mno} />
              {m.mname} {m.singer}
            </MTitle>
          ))}
          <InsertButtonBar>
            <button>추가</button>
          </InsertButtonBar>
        </Container>
      </>
    );
  }
};
export default MusicDiv;
