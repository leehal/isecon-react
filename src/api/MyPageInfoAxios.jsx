import axios from "axios";

const ISECON_URL = "http://localhost:8125/isecon";
const MY_URL = "/users";

const updateUserInfo = {
  myUserInfo: async (nickName, pwd, phone, address, uno, uimg) => {
    console.log(nickName, "nickName");
    console.log(phone, "phone");
    console.log(address, "address");
    console.log(pwd, "pwd");
    const userinfo = {
      nickname: nickName,
      phone: phone,
      address: address,
      pwd: pwd,
      uno: uno,
      uimg: uimg,
    };
    return await axios.post(ISECON_URL + MY_URL + "/userupdate", userinfo);
  },
};
export default updateUserInfo;
