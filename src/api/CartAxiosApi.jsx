import axios from "axios";

const ISECON_URL = "http://localhost:8125/isecon";
const Cart_URL = "/cart";

const CartAxiosApi = {
  cartAllselect: async (uno) => {
    return await axios.get(ISECON_URL + Cart_URL + `/allcart?uno=${uno}`);
  },
};

export default CartAxiosApi;
