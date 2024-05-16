import { Link, Router, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import ProductMap, { ProductList } from "./product";
import GoodsDetail from "./goodsdetail";

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: pink;
`;

const Goodsall = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  width: 80%;
  height: 100%;
  background-color: hotpink;
  overflow-y: auto;
  gap: 10px;
`;

const Goods = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Goodsall>
          {/* <Link to="/goodsdetail"> */}
          <ProductMap></ProductMap>
          {/* </Link> */}
        </Goodsall>
      </Container>
    </>
  );
};

export default Goods;
