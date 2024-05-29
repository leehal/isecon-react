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
  height: auto;
  overflow: hidden;
`;
const SlideImg = styled.div`
  width: 400%;
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
  /* background: red; */
  justify-content: center;
  align-items: center;
`;
const ChangeImg = styled.div`
  position: absolute;
  width: 80%;
  height: 100%;
  z-index: 2;
  object-fit: contain;
  @media (max-width: 768px) {
    min-width: 400px;
  }

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
  align-items: center;
  position: absolute;
  bottom: 10%;
  width: 50%;
  min-width: 500px;
  height: auto;
  left: 10%;

  border-radius: 50px;
  left: ${(props) => (props.selectedIdolName ? "10%" : "50%")};
  transform: ${(props) =>
    props.selectedIdolName ? "none" : "translate(-50%, -50%)"};

  @media (max-width: 1024px) {
    left: 50%;
    transform: translate(-50%);
    bottom: 5%;
  }
  @media (max-width: 768px) {
    width: 8%;
    height: 50%;
    min-width: 43px;
    left: 10%;
    top: 25%;
  }

  ul {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;

    @media (max-width: 768px) {
      width: 100%;
      flex-direction: column;
    }
  }
`;

const IdolItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: blue;
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

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin: 10px 0;
  }
`;

const LeftBox = styled.div`
  position: absolute;
  width: 25%;
  height: 24%;
  display: flex;
  background: #fff;
  box-shadow: 3px 3px 9px -5px gray;
  justify-content: center;
  align-items: center;
  top: ${(props) => (props.selectedIdolName ? "34%" : "50%")};
  left: ${(props) => (props.selectedIdolName ? "32%" : "50%")};
  transform: ${(props) =>
    props.selectedIdolName ? "none" : "translate(-50%, -50%)"};

  @media (max-width: 1600px) {
    width: 40%;
    top: ${(props) => (props.selectedIdolName ? "30%" : "50%")};
    left: ${(props) => (props.selectedIdolName ? "10%" : "50%")};
  }
  @media (max-width: 768px) {
    width: 80%;
    height: 15%;
    top: 80%;
    left: 50%;
    transform: translate(-50%);
  }
  @media (max-width: 620px) {
    top: 80%;
  }
`;
const Textbox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  text-align: start;
  line-height: 1.5;
  height: auto;
  color: #000;
  border-radius: 10px;

  h2 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 1em;
  }
  p {
    font-size: 1em;
    font-weight: 500;
  }
  @media (max-width: 768px) {
    width: 100%;
    font-size: 2vw;
    height: auto;
  }
`;

const YouTubeV = styled.div`
  position: absolute;
  width: 45%;
  min-width: 520px;
  display: flex;
  justify-content: center;
  height: 13%;
  overflow: hidden;
  border-radius: 20px;
  top: 5%;
  left: 50%;
  transform: translate(-50%);

  @media (max-width: 768px) {
    top: 10%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;

    @media (max-width: 768px) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      min-width: 350px;
    }
  }
`;

const RightBox = styled.div`
  position: absolute;
  z-index: 999;
  width: 30%;
  min-width: 250px;
  height: 0;
  padding: 16% 0 15% 0;
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 11px -2px #ccc;
  background: linear-gradient(to top left, #f8f2f6, transparent 50%),
    linear-gradient(to top right, #f8f2f6, transparent 50%),
    linear-gradient(to bottom left, #f8f2f6, transparent 50%),
    linear-gradient(to bottom right, #f8f2f6, transparent 50%);
  border-radius: 100%;
  right: 5%;
  bottom: 20%;
  opacity: ${(props) => (props.showRightBox ? 1 : 0)};
  visibility: ${(props) => (props.showRightBox ? "visible" : "hidden")};
  animation: ${(props) => (props.showRightBox ? fadeIn : "none")} 0.5s
    ease-in-out;

  img {
    width: 100%;
    height: auto;
    position: absolute;
    object-fit: cover;
  }

  @media (max-width: 1024px) {
    width: 40%;
    padding: 25% 0 20% 0;
    top: 35%;
  }
  @media (max-width: 768px) {
    top: 33%;
    width: 60%;
    padding: 30% 0 30% 0;
    left: 50%;
    transform: translate(-50%);
  }
`;

const VideoIdol = styled.div`
  position: absolute;
  width: 20%;
  height: 20%;
  top: 35%;
  left: 10%;
  display: ${(props) => (props.show ? "block" : "none")};

  @media (max-width: 1600px) {
    top: 55%;
    width: 40%;
    left: 10%;
  }
  @media (max-width: 1600px) {
    top: 55%;
    width: 40%;
    left: 10%;
  }
  @media (max-width: 768px) {
    display: none;
  }
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
  아이네: "Dl9l3kQ1Wjs",
  징버거: "goBJJTlcC_M",
  릴파: "eEPmx_JZCkY",
  주르르: "O7GlqoF5GXI",
  고세구: "6GQV6lhwgNs",
  비챤: "WHtoRKgIHZc",
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

  const [idolProfile, setIdolProfile] = useState(null);

  const handleIdolClick = (idolName) => {
    const selectedIdolInfo = idols.find((idol) => idol.name === idolName);
    if (selectedIdolInfo) {
      setSelectedIdol(idolName);
      setSelectedIdolImage(selectedIdolInfo.image);
      setShowLeftBox(true);
      setShowRightBox(false);
      setSelectedIdolName(idolName);
      setVideo(YoutubeVideoId[idolName]);

      switch (idolName) {
        case "아이네":
          setIdolProfile({
            title: "아이네",
            description:
              "어렸을 때부터 다양한 콩쿠르에 참여하면서 성악가를 장래 희망으로 삼았으며 자신의 실력에 한계를 느껴 고등학생 때 즈음 꿈을 접었지만 이후 다시금 노래를 제대로 해보고 싶다는 희망이 생겨 실용음악을 공부했다고 한다.",
          });
          break;
        case "징버거":
          setIdolProfile({
            title: "징버거",
            description:
              "다룰 수 있는 목소리 톤이 다양하고 음역대가 풍부해 스펙트럼이 넓은 보컬로, TOMBOY나 LOVE DIVE와 같은 K-POP 아이돌 장르는 물론이고 STAY, 별빛 등대의 섬, 강풍 올백 등 여러 장르의 곡을 커버해 각기 다른 목소리를 보여준다.",
          });
          break;
        case "릴파":
          setIdolProfile({
            title: "릴파",
            description:
              "활동 초기부터 아이네와 함께 메인보컬로 거론될 만큼 실력이 좋다. 기본기가 좋으며 단단한 성대와 발성, 고유의 창법 등 특색있는 매력을 가지고 있어 다양한 장르에서 본인만의 색을 드러내는 것이 가능한 보컬이다.",
          });
          break;
        case "주르르":
          setIdolProfile({
            title: "주르르",
            description:
              "높은 톤과 밝은 음색의 목소리를 지닌 보컬로, 이런 점으로 하여금 K-POP 아이돌 노래와 같은 장르에 자연스럽게 녹아드면서도 자신만의 특색을 보일 수 있는 가창이 가능하다.",
          });
          break;
        case "고세구":
          setIdolProfile({
            title: "고세구",
            description:
              "맑고 청아한 음색이 특징인 보컬 스타일을 가지고 있으며, 특유의 음색이 맑고 깨끗해서 듣기 편안하다고 좋아하는 팬들이 많으며, 데뷔곡 RE : WIND에서 가이드 보컬을 담당하면서 자신의 실력을 증명했다.",
          });
          break;
        case "비챤":
          setIdolProfile({
            title: "비챤",
            description:
              "음색이 굉장히 독특하고 매력적이며 창법의 개성이 강한 보컬이다. 고음부에서 허스키하면서도 얇고 예쁜 톤을 유지하면서도 힘이 잘 붙는 편이다.",
          });
          break;
        default:
          setIdolProfile(null);
      }

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
              {idolProfile ? (
                <>
                  <h2>{idolProfile.title}</h2>
                  <p>{idolProfile.description}</p>
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
