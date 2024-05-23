import { Link, Router, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import ProductMap, { ProductList } from "./product";
import GoodsDetail from "./goodsdetail";
import React, { useState, useEffect } from "react";
import Paging from "./paging";
import ProductAxiosApi from "../../api/ProductAxios";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-content: center;
  justify-content: center;
  /* background-color: pink; */
`;
const Pagingbox = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Goodsall = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  width: 80%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background: url("https://firebasestorage.googleapis.com/v0/b/isecon-ee0a6.appspot.com/o/goodsBackground.png?alt=media&token=59af943d-2d79-4f58-ab13-862a7bb78c88");
  gap: 20px;
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
          <Pagingbox>
            <Paging
              page={currentPage}
              itemsCountPerPage={pageSize}
              totalItemsCount={prod.length}
              onPageChange={handlePageChange}
            />
          </Pagingbox>
        </Goodsall>
      </Container>
    </>
  );
};

export default Goods;
