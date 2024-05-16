import axios from "axios";

const ISECON_URL = "http://localhost:8125/isecon";
const CON_URL = "/goods";

const ProductAxiosApi = {
  goodAllproduct: async () => {
    return await axios.get(ISECON_URL + CON_URL + "/allgoods");
  },
};
export default ProductAxiosApi;
