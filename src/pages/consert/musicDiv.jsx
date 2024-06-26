import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ConsertAxiosApi from "../../api/ConsertAxios";
import { UserContext } from "../../UserStore";

const Container = styled.div`
  height: 90%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

const MTitle = styled.div`
  background-color: ${(props) =>
    props.isActive ? "rgba(240, 90, 152, 0.534)" : "black"};
  margin: 2%;
  color: white;
  display: flex;
  align-items: left;
  width: 100%;
  height: 60px;
  padding: 3%;
  /* border: solid 1px black; */
  border-radius: 3px;
  flex-direction: column;
  &:hover {
    background-color: #ee82eeba;
  }
  p {
    color: white;
    font-size: 1rem;
    margin-bottom: 2%;
  }
  span {
    font-size: 0.8rem;
    color: #e0e0e0;
  }
  @media (max-width: 768) {
    margin: 0%;
    padding: 0%;
    p {
      margin: 0;
    }
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
    border-radius: 10px;
    background-color: gray;
    width: 90%;
    height: 55%;
    color: white;
    padding-left: 10px;
    border: solid 2px gray;
    ::placeholder {
      color: white;
    }
  }
`;

const ButtonDiv = styled.div`
  background-color: black;
  width: 100%;
  height: 7%;
  display: flex;
  align-items: right;
  justify-content: right;

  button {
    margin-top: 10px;
    background-color: black;
    width: 100px;
    height: 40%;
    color: white;
    border-radius: 20%;
    border: black;
  }
  select {
    margin-top: 10px;
    margin-right: 10px;
    background-color: black;
    width: 50px;
    height: 40%;
    color: white;
    border-radius: 20%;
    border: black;
  }

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
  const [upNewPlName, setUpNewPlName] = useState("");
  const [oldPlMusic, setOldPlMusic] = useState([]);

  const context = useContext(UserContext);
  const { uno } = context;

  useEffect(() => {
    const MusicList = async () => {
      try {
        console.log(nowConsert);
        if (
          nowConsert === "allMusic" ||
          nowConsert === "PlInsert" ||
          nowConsert === "plUpdate"
        ) {
          const rsp = await ConsertAxiosApi.conAllMusic();
          setMusic(rsp.data);
          console.log(rsp.data, "lIST");
        } else if (nowConsert === "playList") {
          const rsp = await ConsertAxiosApi.conMyPlayList(uno);
          setPlayList(rsp.data);
          console.log(rsp.data);
        } else if ("playMusic") {
          const rsp = await ConsertAxiosApi.conMyPlMusic(plistname, uno);
          setMusic(rsp.data);
          setOldPlMusic(rsp.data.map((m) => m.mno));
        }
        //  else if ("searchMusic") {
        //   const rsp = await ConsertAxiosApi.conSearch(searchTerm);
        //   setMusic(rsp.data);
        //   console.log(rsp.data);
        //   console.log(nowConsert);
        // }
      } catch (e) {
        console.log(e);
      }
    };
    MusicList();
  }, [nowConsert, plistname, uno]);

  // useEffect(() => {
  //   setSearchTerm(""); // nowConsert가 변경될 때마다 검색어 초기화
  // }, [nowConsert]);

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

  const playListAddCheck = (mno) => {
    if (oldPlMusic.includes(mno)) {
      setOldPlMusic((prev) => prev.filter((id) => id !== mno));
    } else if (mnoList.includes(mno)) {
      setMnoList((prevMnoList) => prevMnoList.filter((id) => id !== mno));
    } else {
      setMnoList((prevMnoList) => [...prevMnoList, mno]);
    }
    console.log(`oldPlMno : ${oldPlMusic}`);
    console.log(`newPlMno : ${mnoList}`);
  };

  const isChecked = (mno) => {
    return oldPlMusic.includes(mno) || mnoList.includes(mno);
  };

  const addPlayListName = (e) => {
    setPlistName(e.target.value);
    console.log(e.target.value);
  };

  const upPlayListName = (e) => {
    setUpNewPlName(e.target.value);
    console.log(`구 플리 이름 : ${plistname}`);
    console.log(`현 플리 이름 : ${e.target.value}`);
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

  const updatePlayList = async () => {
    const finalMnoList = [...mnoList, ...oldPlMusic];
    let finalPlName = upNewPlName;

    if (finalPlName === "") {
      finalPlName = plistname;
    }
    console.log(`구 플리명 : ${plistname}`);
    console.log(`현 플리명 : ${finalPlName}`);
    console.log(`uno : ${uno}`);
    console.log(`finalMnoList : ${finalMnoList}`);
    const rsp = await ConsertAxiosApi.conPlNameUpdate(
      plistname,
      finalPlName,
      uno,
      finalMnoList
    );
    // setPlistName(upNewPlName);
    if (rsp.data) {
      changePlayListSideBar("playList");
      setUpNewPlName(""); // 구 플리이름 초기화
      setMnoList([]);
      setOldPlMusic([]); // oldPlMusicList 초기화
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
  // const [word , setWord] =useState()
  const searchMusicList = () => {
    // setSearchTerm(e.target.value);
    console.log(searchTerm, "!");
    const search = async (word) => {
      if (searchTerm === "") {
        changePlayListSideBar("allMusic");
      } else {
        const rsp = await ConsertAxiosApi.conSearch(word);
        setMusic(rsp.data);
        console.log(rsp.data, "검색 결과 데이터");
      }
    };
    search(searchTerm);
    setSearchTerm("");
    changePlayListSideBar("searchMusic");
    console.log(nowConsert);
    // console.log(e.target.value);
    // console.log(nowConsert);
  };
  const onKeyEnter = (e) => {
    if (e.key === "Enter") {
      searchMusicList();
    }
  };

  //대소문자 구분없이 비교하기위해 인풋을 다 소문자로변경
  const searchTermLower = searchTerm.toLowerCase();

  if (!music || music.length === 0) {
    return <div>No music list available.</div>;
  }
  if (nowConsert === "allMusic" || nowConsert === "searchMusic") {
    // 기본/ 모든 음악 보여주기
    return (
      <>
        <SearchBar>
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={onKeyEnter}
          />
          {/* <button onClick={searchMusicList}>검색</button> */}
        </SearchBar>
        <Container>
          {music
            .filter(
              (music) =>
                music &&
                (music.mname.toLowerCase().includes(searchTermLower) ||
                  music.singer.toLowerCase().includes(searchTermLower))
            )
            .map((m) => (
              <MTitle
                key={m.mno}
                onClick={() => musicChoice(m.surl)}
                isActive={m.surl === video}
              >
                <p>{m.mname}</p>
                <span>{m.singer}</span>
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
              <p>{m.mname}</p>
              <span>{m.singer}</span>
            </MTitle>
          ))}
        </Container>
        <ButtonDiv>
          <button onClick={addPlayList}>추가</button>
        </ButtonDiv>
      </>
    );
  } else if (nowConsert === "playMusic") {
    // 특정 플리의 음악들을 보여줌
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
                <p>{m.mname}</p>
                <span>{m.singer}</span>
              </MTitle>
            ))}
          </Container>
          <ButtonDiv>
            <button onClick={() => changePlayListSideBar("plUpdate")}>
              플레이 리스트 수정
            </button>
          </ButtonDiv>
        </>
      </>
    );
  } else if (nowConsert === "plUpdate") {
    // 플레이리스트 수정(선택: 노래 추가, 노래삭제)
    return (
      <>
        <SearchBar>
          <input
            type="text"
            placeholder="플레이리스트 이름"
            onChange={upPlayListName}
            // value={plistname}
          />
        </SearchBar>
        <Container>
          {music.map((m) => (
            <MTitle key={m.mno} onClick={() => playListAddCheck(m.mno)}>
              <input
                type="checkbox"
                value={m.mno}
                checked={isChecked(m.mno)}
                readOnly
              />
              <p>{m.mname}</p>
              <span>{m.singer}</span>
            </MTitle>
          ))}
        </Container>
        <ButtonDiv>
          <button onClick={updatePlayList}>플레이 리스트 수정</button>
        </ButtonDiv>
      </>
    );
  }
};
export default MusicDiv;
