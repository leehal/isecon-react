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
  conPlNameUpdate: async (oldName, newName, uno, mnoList) => {
    const plUpdateMusicVo = {
      oldPlName: oldName,
      newPlName: newName,
      uno: uno,
      mnoList: mnoList,
    };
    return await axios.post(
      ISECON_URL + CON_URL + "/plnameup",
      plUpdateMusicVo
    );
  },
};
export default ConsertAxiosApi;
