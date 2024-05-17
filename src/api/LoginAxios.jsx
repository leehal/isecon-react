import axios from "axios";

const ISECON_URL = "http://localhost:8125/isecon";
const MY_URL = "/users";

const LoginAxiosApi = {
  myLogin: async (id, pwd) => {
    console.log(id, "id");
    console.log(pwd, "pwd");
    const login = {
      id: id,
      pwd: pwd,
    };
    return await axios.post(ISECON_URL + MY_URL + `/userLogin`, login);
  },
};
export default LoginAxiosApi;
