import axios from "axios";

const ISECON_URL = "http://localhost:8125/isecon";
const Cart_URL = "/cart";

const CartAxiosApi = {
  cartAllselect: async () => {
    return await axios.get(ISECON_URL + Cart_URL + "/cart");
  },
};

export default CartAxiosApi;
