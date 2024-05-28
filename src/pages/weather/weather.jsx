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

const Icon = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background-size: cover;
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
  const [inputOnair, setInputOnair] = useState([
    icons.cloudy,
    icons.cloudy,
    icons.cloudy,
    icons.cloudy,
    icons.cloudy,
    icons.cloudy,
  ]);
  const [onairAll, setOnairAll] = useState();

  const uno = 1;
  const changeWeather = (e, index) => {
    setInputOnair[index](e.targer.value);
  };

  useEffect(() => {
    console.log(uno);
    const weatherOn = async (uno) => {
      try {
        const rsp = await WeatherAxiosApi.weather(uno);
        setOnairAll(rsp.data);
      } catch (error) {}
    };
    const weatherAll = async () => {
      try {
        const rsp = await WeatherAxiosApi.weatherAll();
        console.log(rsp.data);
        if (rsp.data) {
          setOnairAll(rsp.data);
        }
      } catch (e) {}
    };
    weatherAll();
  }, []);

  const viewSelect = () => {};

  return (
    <>
      <WeatherContainer>
        <Header>
          <Title>이세계 일기예보</Title>
        </Header>
        <WeatherList>
          <WeatherItem>
            <Icon style={{ backgroundImage: inputOnair[0] }} />
            <Description>
              <Name>아이네</Name>
              <Detail>{weatherData[inputOnair[0]]}</Detail>
            </Description>
          </WeatherItem>

          <WeatherItem>
            <Icon style={{ backgroundImage: inputOnair[1] }} />
            <Description>
              <Name>징버거</Name>
              <Detail>{weatherData[inputOnair[1]]}</Detail>
            </Description>
          </WeatherItem>

          <WeatherItem>
            <Icon style={{ backgroundImage: inputOnair[2] }} />
            <Description>
              <Name>릴파</Name>
              <Detail>{weatherData[inputOnair[2]]}</Detail>
            </Description>
          </WeatherItem>

          <WeatherItem>
            <Icon style={{ backgroundImage: inputOnair[3] }} />
            <Description>
              <Name>주르르</Name>
              <Detail>{weatherData[inputOnair[3]]}</Detail>
            </Description>
          </WeatherItem>

          <WeatherItem>
            <Icon style={{ backgroundImage: inputOnair[4] }} />
            <Description>
              <Name>고세구</Name>
              <Detail>{weatherData[inputOnair[4]]}</Detail>
            </Description>
          </WeatherItem>

          <WeatherItem>
            <Icon style={{ backgroundImage: inputOnair[5] }} />
            <Description>
              <Name>비챤</Name>
              <Detail>{weatherData[inputOnair[5]]}</Detail>
            </Description>
          </WeatherItem>

          {/* ))} */}
        </WeatherList>
      </WeatherContainer>
    </>
  );
};
export default WeatherForecast;
