import axios from "axios";

const ISECON_URL = "http://localhost:8125/isecon";
const MY_URL = "/users";

const MyPageAxiosApi = {
  mypageAll: async (uno) => {
    return await axios.get(ISECON_URL + MY_URL + `/userinfo?uno=${uno}`);
  },
};
export default MyPageAxiosApi;
