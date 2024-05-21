import axios from "axios";

const ISECON_URL = "http://localhost:8125/isecon";
const Cart_URL = "/cart";

const CartAxiosApi = {
  cartAllselect: async (uno) => {
    return await axios.get(ISECON_URL + Cart_URL + `/allcart?uno=${uno}`);
  },

  cartDelete: async (cno) => {
    return await axios.post(ISECON_URL + Cart_URL + `/deletecart/${cno}`);
  },

  cartDeleteSale: async (cno1, uno) => {
    console.log(uno);
    const id = {
      cnoList: cno1,
      uno: uno,
    };
    return await axios.post(ISECON_URL + Cart_URL + `/cartdeletesale`, id);
  },
};

export default CartAxiosApi;
