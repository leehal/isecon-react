import styled from "styled-components";

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
  background-color: pink;
`;

const Cart = () => {
  return (
    <>
      <Container>
        <CartProductAll></CartProductAll>
      </Container>
    </>
  );
};
export default Cart;
