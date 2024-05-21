import axios from "axios";

const ISECON_URL = "http://localhost:8125/isecon";
const MY_URL = "/users";

const SignAxiosApi = {
  memberReg: async (id, pwd, nickname, phone, address) => {
    const signup = {
      id: id,
      pwd: pwd,
      nickname: nickname,
      phone: phone,
      address: address,
    };
    return await axios.post(ISECON_URL + MY_URL + "/userSignup", signup);
  },
};
export default SignAxiosApi;
