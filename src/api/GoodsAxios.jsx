import axios from "axios";

const ISECON_URL = "http://localhost:8125/isecon";
const GOD_URL = "/goods";

const ProductAxiosApi = {
  goodAllproduct: async () => {
    return await axios.get(ISECON_URL + GOD_URL + "/allgoods");
  },
  detailProduct: async (pname) => {
    console.log(`/goodsdetail?pname=${pname}`);
    return await axios.get(
      ISECON_URL + GOD_URL + `/goodsdetail?pname=${pname}`
    );
  },
};

export default ProductAxiosApi;
