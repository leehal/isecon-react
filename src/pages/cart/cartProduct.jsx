import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CartAxiosApi from "../../api/CartAxiosApi";
import ProductAxiosApi from "../../api/ProductAxios";
import { UserContext } from "../../UserStore";

const Cartproduct = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  height: 20%;
  background-color: hotpink;
  border: solid black 1px;
`;
const CartImg = styled.div`
  width: 40%;
  height: 100%;
  background-image: url(${(props) => props.url});
  background-size: contain;
  flex-wrap: wrap;
  background-repeat: no-repeat;
`;
const CartTextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  background-color: gray;
  justify-content: space-around;
  align-items: center;
`;
const CartText1 = styled.div`
  text-align: center;
  width: 80%;
  height: 30%;
  background-color: red;
`;
const CartText2 = styled.div`
  text-align: center;
  width: 80%;
  height: 30%;
  background-color: red;
`;
const CartText3 = styled.div`
  text-align: center;
  width: 80%;
  height: 30%;
  background-color: red;
`;

const CartProduct = () => {
  const [crt, setCrt] = useState([]); // 장바구니 보기
  const [cart, setCart] = useState([]); // 장바구니 결제
  const [isDel, setIsDel] = useState(false); // 장바구니 삭제
  const [catdelsal, setCatdelsal] = useState(); // 장바구니 삭제 시 결제내역 넘김

  const context = useContext(UserContext);
  const { uno } = context;

  const CartCheck = (e) => {
    setCart([...cart, e.target.value]);
  };

  const checkAll = () => {
    alert(cart);
  };

  useEffect(() => {
    const crtProd = async () => {
      const rsp2 = await CartAxiosApi.cartAllselect(1);
      setCrt(rsp2.data);
    };
    crtProd();
    setIsDel(false);
  }, [isDel]);

  const cartDelete = async (cno) => {
    console.log(cno);
    try {
      const rsp = await CartAxiosApi.cartDelete(cno);
      console.log(rsp.data);
      setIsDel(true);
    } catch (e) {
      console.log(e);
    }
  };

  const cartDeleteSale = async () => {
    alert("결제가 완료 되었습니다.");
    try {
      const rsp = await CartAxiosApi.cartDeleteSale(cart, 1);
      console.log(rsp.data);
      setIsDel(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {crt.map((pd) => (
        <>
          <Cartproduct>
            <input type="checkbox" value={pd.pno} onChange={CartCheck} />
            <CartImg url={pd.pimg}></CartImg>
            <CartTextBox>
              <CartText1>{pd.pname}</CartText1>
              <CartText2>{pd.option}</CartText2>
              <CartText3>{pd.price}</CartText3>
            </CartTextBox>
            <button type="button" onClick={() => cartDelete(pd.pno)}>
              삭제하기
            </button>
          </Cartproduct>
        </>
      ))}
      {}
      <button type="button" onClick={cartDeleteSale}>
        결제하기
      </button>
    </>
  );
};
export default CartProduct;
