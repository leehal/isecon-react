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
  productInsertCart: async (pno, uno) => {
    const id = {
      pno: pno,
      uno: uno,
    };
    return await axios.post(ISECON_URL + GOD_URL + `/goodsdetail`, id);
  },
};

export default ProductAxiosApi;
