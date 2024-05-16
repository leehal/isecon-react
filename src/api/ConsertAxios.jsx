import axios from "axios";

const ISECON_URL = "http://localhost:8125/isecon";
const CON_URL = "/consert";

const ConsertAxiosApi = {
  conAllMusic: async () => {
    return await axios.get(ISECON_URL + CON_URL + "/allmusic");
  },
};
export default ConsertAxiosApi;
