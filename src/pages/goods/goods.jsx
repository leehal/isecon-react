import { Link, Router, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import ProductMap, { ProductList } from "./product";
import GoodsDetail from "./goodsdetail";
import React, { useState, useEffect } from "react";
import Paging from "./paging";
import ProductAxiosApi from "../../api/ProductAxios";
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
  const [currentPage, setCurrentPage] = useState("1");
  const [prod, setProd] = useState([]);

  useEffect(() => {
    const godProd = async () => {
      const rsp = await ProductAxiosApi.goodAllproduct();
      setProd(rsp.data);
    };
    godProd();
  }, []);

  const pageSize = 12;

  const paginatedData = prod.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Container>
        <Goodsall>
          <ProductMap paginatedData={paginatedData}></ProductMap>
          <Paging
            page={currentPage}
            itemsCountPerPage={pageSize}
            totalItemsCount={prod.length}
            onPageChange={handlePageChange}
          />
        </Goodsall>
      </Container>
    </>
  );
};

export default Goods;
