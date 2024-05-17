import axios from "axios";

const ISECON_URL = "http://localhost:8125/isecon";
const MY_URL = "/users";

const SignAxiosApi = {
  memberReg: async (nickname, id, pwd, email, phone) => {
    const signup = {
      nickname: nickname,
      id: id,
      pwd: pwd,
      email: email,
      phone: phone,
    };
    return await axios.post(ISECON_URL + MY_URL + "/userSignup", signup);
  },
};
export default SignAxiosApi;
