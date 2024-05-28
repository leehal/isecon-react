import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import WeatherAxiosApi from "../../api/Weather";

// Styled Components
const WeatherContainer = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Arial, sans-serif";
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 16px;
  margin: 0;
  color: #333;
`;

const MoreLink = styled.a`
  font-size: 12px;
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
`;

const WeatherList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const WeatherItem = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.select`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background-size: cover;
  /* cursor: ${(props) => (props.isSelect ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.isSelect ? 0.5 : 1)};
  pointer-events: ${(props) => (props.isSelect ? "none" : "auto")}; */
  /* :disabled */
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 14px;
  color: #333;
`;

const Detail = styled.span`
  font-size: 12px;
  color: #777;
`;

// 아이콘 URL (실제 아이콘 경로로 대체해야 함)
const icons = {
  cloudy: "url(https://ssl.gstatic.com/onebox/weather/128/cloudy.png)",
  waves: "url(https://ssl.gstatic.com/onebox/weather/128/fog.png)",
  rain: "url(https://ssl.gstatic.com/onebox/weather/128/rain.png)",
  sun: "url(https://ssl.gstatic.com/onebox/weather/128/sunny.png)",
};

// 날씨 데이터
const weatherData = [
  0,
  { detail: "뱅온예상", icon: icons.cloudy },
  { detail: "정보X", icon: icons.waves },
  { detail: "휴뱅", icon: icons.rain },
  { detail: "뱅온", icon: icons.sun },
];

const WeatherForecast = () => {
  const [isSelect, setIsSelect] = useState(true);
  const [inputOnair, setInputOnair] = useState([
    icons.cloudy,
    icons.cloudy,
    icons.cloudy,
    icons.cloudy,
    icons.cloudy,
    icons.cloudy,
  ]);
  const [onairAll, setOnairAll] = useState();
  // const context = useContextt(UserContext);
  // const { uno } = context;
  const uno = 1;
  const changeWeather = (e) => {
    let onair = e.target.value;
    const weatherOn = async (uno, onair) => {
      try {
        const rsp = await WeatherAxiosApi.weather(uno, onair);
        setIsSelect(rsp.data);
      } catch (error) {
        console.log(error);
      }
    };
    console.log("실행됨");
    weatherOn(uno, onair);
  };
  // const getDisabledStatus = (uno, itemName) => {
  //   switch (uno) {
  //     case 1:
  //       return itemName !== "아이네";
  //     case 2:
  //       return itemName !== "징버거";
  //     case 3:
  //       return itemName !== "릴파";
  //     case 4:
  //       return itemName !== "주르르";
  //     case 5:
  //       return itemName !== "고세구";
  //     case 6:
  //       return itemName !== "비챤";
  //     default:
  //       return true;
  //   }
  // };
  useEffect(() => {
    console.log(uno);
    const weatherAll = async () => {
      try {
        const rsp = await WeatherAxiosApi.weatherAll();
        console.log(rsp.data);
        if (rsp.data) {
          console.log(rsp.data);
          console.log(weatherData[rsp.data[0].onair]);
          setOnairAll(rsp.data);
          setInputOnair(rsp.data);
        }
      } catch (e) {}
    };
    weatherAll();
  }, [isSelect]);

  const isDisabled = (index) => {
    // console.log(typeof uno);
    // console.log(index);
    if (index === uno - 1) {
      // setIsSelect(false);
      return false;
    }
    return true;
  };

  return (
    <>
      {onairAll && (
        <WeatherContainer>
          <Header>
            <Title>이세계 일기예보</Title>
          </Header>
          <WeatherList>
            <WeatherItem>
              <Icon
                style={{
                  backgroundImage: weatherData[onairAll[0]?.onair].icon,
                }}
                onChange={changeWeather}
              >
                <option value="1" disabled={isDisabled(0)}>
                  뱅온예상
                </option>
                <option value="2" disabled={isDisabled(0)}>
                  정보X
                </option>
                <option value="3" disabled={isDisabled(0)}>
                  휴뱅
                </option>
                <option value="4" disabled={isDisabled(0)}>
                  뱅온
                </option>
              </Icon>
              <Description>
                <Name>아이네</Name>
                <Detail>{weatherData[onairAll[0]?.onair].detail}</Detail>
              </Description>
            </WeatherItem>

            <WeatherItem>
              <Icon
                style={{
                  backgroundImage: weatherData[onairAll[1]?.onair].icon,
                }}
              >
                <option value="1" disabled={isDisabled(1)}>
                  뱅온예상
                </option>
                <option value="2" disabled={isDisabled(1)}>
                  정보X
                </option>
                <option value="3" disabled={isDisabled(1)}>
                  휴뱅
                </option>
                <option value="4" disabled={isDisabled(1)}>
                  뱅온
                </option>
              </Icon>
              <Description>
                <Name>징버거</Name>
                <Detail>{weatherData[onairAll[1]?.onair].detail}</Detail>
              </Description>
            </WeatherItem>

            <WeatherItem>
              <Icon
                style={{
                  backgroundImage: weatherData[onairAll[2]?.onair].icon,
                }}
              >
                <option value="1" disabled={isDisabled(2)}>
                  뱅온예상
                </option>
                <option value="2" disabled={isDisabled(2)}>
                  정보X
                </option>
                <option value="3" disabled={isDisabled(2)}>
                  휴뱅
                </option>
                <option value="4" disabled={isDisabled(2)}>
                  뱅온
                </option>
              </Icon>
              <Description>
                <Name>릴파</Name>
                <Detail>{weatherData[onairAll[2]?.onair].detail}</Detail>
              </Description>
            </WeatherItem>

            <WeatherItem>
              <Icon
                style={{
                  backgroundImage: weatherData[onairAll[3]?.onair].icon,
                }}
              >
                <option value="1" disabled={isDisabled(3)}>
                  뱅온예상
                </option>
                <option value="2" disabled={isDisabled(3)}>
                  정보X
                </option>
                <option value="3" disabled={isDisabled(3)}>
                  휴뱅
                </option>
                <option value="4" disabled={isDisabled(3)}>
                  뱅온
                </option>
              </Icon>
              <Description>
                <Name>주르르</Name>
                <Detail>{weatherData[onairAll[3]?.onair].detail}</Detail>
              </Description>
            </WeatherItem>

            <WeatherItem>
              <Icon
                style={{
                  backgroundImage: weatherData[onairAll[4]?.onair].icon,
                }}
              >
                <option value="1" disabled={isDisabled(4)}>
                  뱅온예상
                </option>
                <option value="2" disabled={isDisabled(4)}>
                  정보X
                </option>
                <option value="3" disabled={isDisabled(4)}>
                  휴뱅
                </option>
                <option value="4" disabled={isDisabled(4)}>
                  뱅온
                </option>
              </Icon>
              <Description>
                <Name>고세구</Name>
                <Detail>{weatherData[onairAll[4]?.onair].detail}</Detail>
              </Description>
            </WeatherItem>

            <WeatherItem>
              <Icon
                style={{
                  backgroundImage: weatherData[onairAll[5]?.onair].icon,
                }}
              >
                <option value="1" disabled={isDisabled(5)}>
                  뱅온예상
                </option>
                <option value="2" disabled={isDisabled(5)}>
                  정보X
                </option>
                <option value="3" disabled={isDisabled(5)}>
                  휴뱅
                </option>
                <option value="4" disabled={isDisabled(5)}>
                  뱅온
                </option>
              </Icon>
              <Description>
                <Name>비챤</Name>
                <Detail>{weatherData[onairAll[5]?.onair].detail}</Detail>
              </Description>
            </WeatherItem>
          </WeatherList>
        </WeatherContainer>
      )}
    </>
  );
};
export default WeatherForecast;
