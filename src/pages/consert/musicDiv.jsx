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
  background-color: ${(props) => (props.isActive ? "#ee82eeba" : "#80808060")};
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
  color: white;
  input {
    border-radius: 5%;
    background-color: gray;
    width: 70%;
    height: 60%;
    color: white;
    ::placeholder {
      color: white;
    }
  }
`;

const ButtonDiv = styled.div`
  background-color: #ce0aff75;
  width: 100%;
  height: 7%;

  /* option[value=""][disabled] {
    display: none;
  } */
`;

const MusicDiv = ({
  musicChoice,
  nowConsert,
  changePlayListSideBar,
  video,
}) => {
  const [music, setMusic] = useState([]); // 음악 넣을 곳
  const [playList, setPlayList] = useState([]); //플리이름 넣는 곳
  const [plistname, setPlistName] = useState(""); //선택된 플리 이름
  const [mnoList, setMnoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [selectedOption, setSelectedOption] = useState(""); // select option

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

  useEffect(() => {
    setSearchTerm(""); // nowConsert가 변경될 때마다 검색어 초기화
  }, [nowConsert]);

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

  const addPlayListName = (e) => {
    setPlistName(e.target.value);
    console.log(e.target.value);
  };

  const addPlayList = async () => {
    const rsp = await ConsertAxiosApi.conPlInsert(mnoList, uno, plistname);
    setPlistName(""); //초기화
    setMnoList([]);
    if (rsp) {
      changePlayListSideBar("playList");
    } else {
      alert("실패");
    }
  };

  useEffect(() => {
    console.log(mnoList);
  }, [mnoList]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  if (!music || music.length === 0) {
    return <div>No music list available.</div>;
  }
  if (nowConsert === "allMusic") {
    return (
      <>
        <SearchBar>
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
        <Container>
          {music.map((m) => (
            <MTitle
              key={m.mno}
              onClick={() => musicChoice(m.surl)}
              isActive={m.surl === video}
            >
              {m.mname} {m.singer}
            </MTitle>
          ))}
        </Container>
        <ButtonDiv>
          <button onClick={() => changePlayListSideBar("playList")}>
            플레이리스트
          </button>
          <select value={selectedOption} onChange={handleChange}>
            <option value="" disabled>
              정렬
            </option>
            <option value="가수">가수</option>
            <option value="노래">노래</option>
          </select>
        </ButtonDiv>
      </>
    );
  } else if (nowConsert === "playList") {
    // 나의 플레이리스트 목록 보여주기
    return (
      <>
        <SearchBar>
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
        <ButtonDiv>
          <button onClick={() => changePlayListSideBar("playList")}>
            플레이리스트
          </button>
          <select value={selectedOption} onChange={handleChange}>
            <option value="" disabled>
              정렬
            </option>
            <option value="가수">가수</option>
            <option value="노래">노래</option>
          </select>
        </ButtonDiv>
      </>
    );
  } else if (nowConsert === "PlInsert") {
    // 플리 만드는 div
    return (
      <>
        <SearchBar>
          <input
            type="text"
            placeholder="플레이리스트 이름"
            onChange={addPlayListName}
            value={plistname}
          />
        </SearchBar>
        <Container>
          {music.map((m) => (
            <MTitle key={m.mno} onClick={(e) => playListCheck(e, m.mno)}>
              <input type="checkbox" value={m.mno} />
              {m.mname} {m.singer}
            </MTitle>
          ))}
        </Container>
        <ButtonDiv>
          <button onClick={addPlayList}>추가</button>
        </ButtonDiv>
      </>
    );
  } else if (nowConsert === "playMusic") {
    return (
      <>
        <>
          <SearchBar>
            <p>{plistname}</p>
          </SearchBar>
          <Container>
            {music.map((m) => (
              <MTitle
                key={m.mno}
                onClick={() => musicChoice(m.surl)}
                isActive={m.surl === video}
              >
                {m.mname} {m.singer}
              </MTitle>
            ))}
          </Container>
          <ButtonDiv>
            <button onClick={() => changePlayListSideBar("playList")}>
              플레이 리스트 수정
            </button>
          </ButtonDiv>
        </>
      </>
    );
  }
};
export default MusicDiv;
