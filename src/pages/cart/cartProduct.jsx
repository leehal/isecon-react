import { useEffect, useState } from "react";
import styled from "styled-components";
import CartAxiosApi from "../../api/CartAxiosApi";
import ProductAxiosApi from "../../api/GoodsAxios";

const Cartproduct = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  height: 20%;
  background-color: hotpink;
`;

const CartImg = styled.div`
  width: 40%;
  height: 100%;
  background-image: url(${(props) => props.url});
  background-size: contain;
  flex-wrap: wrap;
  background-repeat: no-repeat;
`;
const CartText = styled.div`
  width: 50%;
  height: 100%;
  background-color: brown;
`;

const CartProduct = () => {
  const [crt, setCrt] = useState([]);
  const [cart, setCart] = useState([]);
  const [buttonClick, setButtonClick] = useState(false);

  const cartCheck = (e) => {
    setCrt(e.target.value);
  };

  const onCart = (e) => {
    setCart([...cart, e.target.value]);
  };
  const cartSubmit = () => {
    alert(cart);
    setButtonClick(true);
  };

  useEffect(() => {
    console.log("!");
  }, [buttonClick]);

  useEffect(() => {
    const crtProd = async () => {
      const rsp2 = await CartAxiosApi.cartAllselect(1);
      console.log(rsp2.data);
      setCrt(rsp2.data);
    };
    crtProd();
  }, []);

  return (
    <>
      {crt.map((pd) => (
        <>
          <Cartproduct>
            <input type="checkbox" value={pd.option} onChange={onCart} />
            <CartImg url={pd.pimg}></CartImg>
            <CartText>
              {pd.pname}
              {pd.price}
              {pd.option}
            </CartText>
          </Cartproduct>
        </>
      ))}
      <button type="button" onClick={cartSubmit}>
        결제하기
      </button>
    </>
  );
};
export default CartProduct;
