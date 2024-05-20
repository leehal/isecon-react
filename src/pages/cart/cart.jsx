import styled from "styled-components";
import CartProduct from "./cartProduct";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: blue;
`;

const CartProductAll = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  background-color: pink;
`;

const Cart = () => {
  return (
    <>
      <Container>
        <CartProductAll>
          <CartProduct></CartProduct>
        </CartProductAll>
      </Container>
    </>
  );
};
export default Cart;
