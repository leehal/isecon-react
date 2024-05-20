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

  cartDeleteSale: async (cno, uno) => {
    const id = {
      cno: cno,
    };
    return await axios.post(
      ISECON_URL + Cart_URL + `/cartdeletesale${uno}`,
      id
    );
  },
};

export default CartAxiosApi;
