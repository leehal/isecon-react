import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

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
  overflow: hidden;
`;
const SlideImg = styled.div`
  overflow: hidden;
  width: 400vw;
  height: 100vh;
  display: flex;
  transition: transform 1s ease-in-out;
`;

const SlideBox = styled.div`
  width: 100%;
  height: 100%;
`;

const Slide = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ChangeImg = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  object-fit: contain;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(to top left, #eeeaf8, transparent 50%) top left,
    linear-gradient(to top right, #ebbbd4, transparent 50%) top right,
    linear-gradient(to bottom left, #bff7bd, transparent 50%) bottom left,
    linear-gradient(to bottom right, #ebbbd4, transparent 50%) bottom right;
`;

const ClickIdol = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 10%;
  height: 80%;
  background: blue;

  ul {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

const IdolItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 5%;
  background: ${(props) => (props.isSelected ? "navy" : "yellow")};
  color: ${(props) => (props.isSelected ? "#fff" : "#000")};
  margin: 20px 0;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const LeftBox = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  left: 10%;
`;

const Textbox = styled.div`
  position: absolute;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
  width: 50%;
  height: 25%;
  color: #000;
  background: #fff;
  border-radius: 10px;
  top: 40%;
  left: 5%;

  h2 {
    font-size: 18px;
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
  }
`;

const YouTubeV = styled.div`
  position: absolute;
  width: 100%;
  height: 25%;
  top: 10%;
  left: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RightBox = styled.div`
  position: absolute;
  z-index: 999;
  width: 50%;
  height: 80%;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.showRightBox ? 1 : 0)};
  visibility: ${(props) => (props.showRightBox ? "visible" : "hidden")};
  animation: ${(props) => (props.showRightBox ? fadeIn : "none")} 0.5s
    ease-in-out;

  img {
    width: 50%;
    object-fit: cover;
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

const Main = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedIdol, setSelectedIdol] = useState(null);
  const [selectedIdolImage, setSelectedIdolImage] = useState(null);
  const [showLeftBox, setShowLeftBox] = useState(false);
  const [showRightBox, setShowRightBox] = useState(false);
  const [selectedIdolName, setSelectedIdolName] = useState(null);

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
      <ChangeImg>
        <ClickIdol>
          <ul>
            {idols.map((idol) => (
              <IdolItem
                key={idol.name}
                onClick={() => handleIdolClick(idol.name)}
                isSelected={selectedIdolName === idol.name}
              >
                {idol.name}
              </IdolItem>
            ))}
          </ul>
        </ClickIdol>
        <LeftBox showLeftBox={showLeftBox}>
          <Textbox>
            <h2>{selectedIdol}님의 프로필</h2>
            <p>
              {selectedIdol} 아이돌을 선택했네요! <br />
              어떤 이야기를 들려드릴까요?
            </p>
          </Textbox>
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
        </LeftBox>
        <RightBox showRightBox={showRightBox}>
          {selectedIdolImage && (
            <img src={selectedIdolImage} alt={`${selectedIdol} 이미지`} />
          )}
        </RightBox>
      </ChangeImg>
    </Container>
  );
};

export default Main;
