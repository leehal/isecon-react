import { Link, Router, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import ProductMap, { ProductList } from "./product";
import GoodsDetail from "./goodsdetail";
import React, { useState, useEffect } from "react";
import Paging from "./paging";
import ProductAxiosApi from "../../api/ProductAxios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* background-color: aqua; */
  // background-image: url("img/Rectangle409.png");
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  /* background-color: yellow; */
`;

const BackgroundBox = styled.div`
  position: relative;
  width: 60%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: blueviolet; */
  img {
    width: 85%;
    height: 100%;
  }
`;
const ProductBox = styled.div`
  width: 75%;
  height: 80%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: black; */
`;
const ProductMapbox = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-between;
  /* background-color: chartreuse; */
`;
const Pagingbox = styled.div`
  display: flex;
  /* background-color: red; */
  align-items: center;
  justify-content: center;
`;
const Goodsall = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  top: 7%;
  align-content: space-around;
  justify-content: space-around;
  /* background-color: blue; */
  width: 100%;
  height: 100%;
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
        <Top>이세계아이돌 굿즈 판매</Top>
        <BackgroundBox>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/isecon-ee0a6.appspot.com/o/222222222222222222222222.png?alt=media&token=e0331832-d35a-4e83-ab8c-1d78e21a74a6"
            alt="강사님 죄송합니다."
          />
          <ProductBox>
            <Goodsall>
              <ProductMapbox>
                <ProductMap paginatedData={paginatedData}></ProductMap>
              </ProductMapbox>
              <Pagingbox>
                <Paging
                  page={currentPage}
                  itemsCountPerPage={pageSize}
                  totalItemsCount={prod.length}
                  onPageChange={handlePageChange}
                />
              </Pagingbox>
            </Goodsall>
          </ProductBox>
        </BackgroundBox>
      </Container>
    </>
  );
};

export default Goods;
