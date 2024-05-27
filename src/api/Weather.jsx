import axios from "axios";

const ISECON_URL = "http://localhost:8125/isecon";
const MY_URL = "/weather";

const WeatherAxiosApi = {
  weatherAll: async () => {
    return await axios.get(ISECON_URL + MY_URL + "/weatherall");
  },
  weather: async (uno, onair) => {
    const weather = {
      uno: uno,
      onair: onair,
    };
    return await axios.post(ISECON_URL + MY_URL + "/weatherupdate", weather);
  },
};
export default WeatherAxiosApi;
