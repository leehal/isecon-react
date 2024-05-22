import axios from "axios";

const ISECON_URL = "http://localhost:8125/isecon";
const CON_URL = "/consert";

const ConsertAxiosApi = {
  conAllMusic: async () => {
    return await axios.get(ISECON_URL + CON_URL + "/allmusic");
  },
  conMyPlayList: async (uno) => {
    return await axios.get(ISECON_URL + CON_URL + `/myplaylist/${uno}`);
  },
  conMyPlMusic: async (plname, uno) => {
    return await axios.get(ISECON_URL + CON_URL + `/music/${plname}/${uno}`);
  },
  conPlInsert: async (mnoList, uno, plname) => {
    const plInsertVo = {
      mnoList: mnoList,
      uno: uno,
      plname: plname,
    };
    return await axios.post(ISECON_URL + CON_URL + "/insertpl", plInsertVo);
  },
};
export default ConsertAxiosApi;
