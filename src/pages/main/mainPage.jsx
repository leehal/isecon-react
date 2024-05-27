import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  width: 100vw;
  overflow-x: hidden;
`;
const SlideImg = styled.div`
  overflow-x: hidden;
  width: 400vw;
  height: 100vh;
  display: flex;
  transition: transform 1s ease-in-out;
`;

const SlideBox = styled.div`
  width: 100vw;
  height: 100%;
`;

const Slide = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ChangeWrap = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ChangeImg = styled.div`
  position: absolute;
  width: 80%;
  height: 100%;
  object-fit: contain;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: ${(props) => {
    console.log("Selected Idol:", props.selectedIdolName); // 콘솔에 선택된 아이돌 이름 출력
    switch (props.selectedIdolName) {
      case "아이네":
        return `linear-gradient(to top left, #eeeaf8, transparent 50%), linear-gradient(to top right, #f3c7d6, transparent 50%), linear-gradient(to bottom left, #e5bdf7, transparent 50%), linear-gradient(to bottom right, #ebbbd4, transparent 50%)`;
      case "징버거":
        return `linear-gradient(to top left, #f8f0ea, transparent 50%), linear-gradient(to top right, #f3c7d6, transparent 50%), linear-gradient(to bottom left, #f0eab7, transparent 50%), linear-gradient(to bottom right, #f3c7d6, transparent 50%)`;
      case "릴파":
        return `linear-gradient(to top left, #eaebf8, transparent 50%), linear-gradient(to top right, #f3c7d6, transparent 50%), linear-gradient(to bottom left, #d3d4f8, transparent 50%), linear-gradient(to bottom right, #f3c7d6, transparent 50%)`;
      case "주르르":
        return `linear-gradient(to top left, #f8eaf4, transparent 50%), linear-gradient(to top right, #f3c7d6, transparent 50%), linear-gradient(to bottom left, #f8d7ef, transparent 50%), linear-gradient(to bottom right, #f3c7d6, transparent 50%)`;
      case "고세구":
        return `linear-gradient(to top left, #eaf6f8, transparent 50%), linear-gradient(to top right, #f3c7d6, transparent 50%), linear-gradient(to bottom left, #c1ecf3, transparent 50%), linear-gradient(to bottom right, #f3c7d6, transparent 50%)`;
      case "비챤":
        return `linear-gradient(to top left, #f0f8ea, transparent 50%), linear-gradient(to top right, #f3c7d6, transparent 50%), linear-gradient(to bottom left, #d5f1ad, transparent 50%), linear-gradient(to bottom right, #f3c7d6, transparent 50%)`;
      default:
        return `linear-gradient(to top left, #f8d7ec, transparent 50%), linear-gradient(to top right, #f3c7d6, transparent 50%), linear-gradient(to bottom left, #ffc2e8, transparent 50%), linear-gradient(to bottom right, #f3c7d6, transparent 50%)`;
    }
  }};
`;

const ClickIdol = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 10%;
  width: 50%;
  height: auto;
  left: 10%;
  background: #fff;
  border-radius: 50px;
  left: ${(props) => (props.selectedIdolName ? "10%" : "50%")};
  transform: ${(props) =>
    props.selectedIdolName ? "none" : "translate(-50%, -50%)"};

  ul {
    display: flex; /* 이 부분 추가 */
    justify-content: center;
    flex-direction: row; /* 이 부분 추가 */
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

const IdolItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100%;
  border-radius: 50%;
  background: ${(props) => (props.isSelected ? "navy" : "yellow")};
  color: ${(props) => (props.isSelected ? "#fff" : "#000")};
  margin: 0 20px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const LeftBox = styled.div`
  position: absolute;
  width: 25%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${(props) => (props.selectedIdolName ? "35%" : "50%")};
  left: ${(props) => (props.selectedIdolName ? "32%" : "50%")};
  transform: ${(props) =>
    props.selectedIdolName ? "none" : "translate(-50%, -50%)"};
`;

const Textbox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 20px;
  color: #000;
  background: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 13px -5px gray;
  h2 {
    font-size: 22px;
    margin-bottom: 25px;
    font-weight: 600;
  }
  p {
    font-size: 18px;
    line-height: 1.5;
    font-weight: 600;
  }
`;

const YouTubeV = styled.div`
  position: absolute;
  width: 50%;
  height: 13%;
  overflow: hidden;
  border-radius: 20px;
  top: 5%;
  left: 50%;
  transform: translate(-50%);
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const RightBox = styled.div`
  position: absolute;
  z-index: 999;
  width: 25%;
  height: 60%;
  right: 10%;
  bottom: 5%;
  opacity: ${(props) => (props.showRightBox ? 1 : 0)};
  visibility: ${(props) => (props.showRightBox ? "visible" : "hidden")};
  animation: ${(props) => (props.showRightBox ? fadeIn : "none")} 0.5s
    ease-in-out;

  img {
    width: 100%;
    position: absolute;
    right: 0;
    object-fit: cover;
  }
`;

const VideoIdol = styled.div`
  position: absolute;
  width: 20%;
  height: 20%;
  top: 35%;
  left: 10%;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const idols = [
  { name: "아이네", image: "img/ine.png" },
  { name: "징버거", image: "img/jingber.png" },
  { name: "릴파", image: "img/lilpa.png" },
  { name: "주르르", image: "img/julele.png" },
  { name: "고세구", image: "img/gosegu.png" },
  { name: "비챤", image: "img/bechan.png" },
];
const idolImages = {
  아이네: "img/ine_li.jpg",
  징버거: "img/jingber_li.jpg",
  릴파: "img/lilpa_li.jpg",
  주르르: "img/julele_li.jpg",
  고세구: "img/gosegu_li.jpg",
  비챤: "img/bechan_li.jpg",
};

const YoutubeVideoId = {
  아이네: "cFQgyKvQ48A",
  징버거: "mQk1RJ-oNUQ",
  릴파: "KoMlJAR37Ps",
  주르르: "pZisa2yAdVE",
  고세구: "ehW-aR791yA",
  비챤: "OxwQkgr2gz8",
};

const Main = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedIdol, setSelectedIdol] = useState(null);
  const [selectedIdolImage, setSelectedIdolImage] = useState(null);
  const [showLeftBox, setShowLeftBox] = useState(false);
  const [showRightBox, setShowRightBox] = useState(false);
  const [selectedIdolName, setSelectedIdolName] = useState(null);
  const [video, setVideo] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 4);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleIdolClick = (idolName) => {
    const selectedIdolInfo = idols.find((idol) => idol.name === idolName);
    if (selectedIdolInfo) {
      setSelectedIdol(idolName);
      setSelectedIdolImage(selectedIdolInfo.image);
      setShowLeftBox(true);
      setShowRightBox(false);
      setSelectedIdolName(idolName);
      setVideo(YoutubeVideoId[idolName]);

      setTimeout(() => {
        setShowRightBox(true);
      }, 50);
    }
  };

  return (
    <Container>
      <SlideImg style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
        {[1, 2, 3, 4].map((slideNumber) => (
          <SlideBox className={`main${slideNumber}`} key={slideNumber}>
            <Slide
              src={`img/mainImg${slideNumber}.png`}
              alt=""
              style={{ objectFit: slideNumber === 3 ? "contain" : "cover" }}
            />
          </SlideBox>
        ))}
      </SlideImg>
      <ChangeWrap>
        <ChangeImg selectedIdolName={selectedIdolName}>
          <YouTubeV>
            {selectedIdol && (
              <img
                src={`img/${selectedIdolImage
                  .replace("img/", "")
                  .replace(".png", "Bg.jpg")}`}
                alt=""
              />
            )}
          </YouTubeV>
          <ClickIdol selectedIdolName={selectedIdolName}>
            <ul>
              {idols.map((idol) => (
                <IdolItem
                  key={idol.name}
                  onClick={() => handleIdolClick(idol.name)}
                  isSelected={selectedIdolName === idol.name}
                >
                  <img src={idolImages[idol.name]} alt={idol.name} />
                </IdolItem>
              ))}
            </ul>
          </ClickIdol>
          <LeftBox selectedIdolName={selectedIdolName}>
            <Textbox>
              {selectedIdolName ? (
                <>
                  <h2>{selectedIdolName}님의 프로필</h2>
                  <p>
                    {selectedIdolName} 아이돌을 선택했네요! <br />
                    어떤 이야기를 들려드릴까요?
                  </p>
                </>
              ) : (
                <p>아이돌을 선택해주세요!</p>
              )}
            </Textbox>
          </LeftBox>
          <RightBox showRightBox={showRightBox}>
            {selectedIdolImage && (
              <img src={selectedIdolImage} alt={`${selectedIdol} 이미지`} />
            )}
          </RightBox>
          <VideoIdol show={!!selectedIdol}>
            <YouTube
              videoId={video}
              opts={{
                playerVars: {
                  autoplay: 0,
                },
                width: "100%",
                height: "205px",
              }}
            />
          </VideoIdol>
        </ChangeImg>
      </ChangeWrap>
    </Container>
  );
};

export default Main;
