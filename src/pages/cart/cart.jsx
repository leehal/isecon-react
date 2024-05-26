import styled from "styled-components";
import CartProduct from "./cartProduct";

const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 3%;
  background-color: #f8f8f8;
`;

const CartProductAll = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: white;
`;

const CartText = styled.div`
  height: 20%;
  font-weight: bold;
  font-size: 30px;
  padding-bottom: 2%;
`;

const Cart = () => {
  return (
    <>
      <Container>
        <CartText>장바구니</CartText>
        <CartProductAll>
          <CartProduct></CartProduct>
        </CartProductAll>
      </Container>
    </>
  );
};
export default Cart;
