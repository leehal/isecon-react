import styled from "styled-components";
import ProductAxiosApi from "../../api/ProductAxios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserStore";

const ProductdivBox = styled.div`
  width: 31%;
  height: 48vh;
  background-color: black;
`;

const Productdiv = styled.ul`
  width: 100%;
  height: 100%;

  background-color: red;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const Productimg = styled.div`
  width: 70%;
  img {
    width: 100%;
  }
  /* background-position: center;
  background-size: contain;
  background-repeat: no-repeat; */
  /* background-image: url(${(props) => props.url}); */
`;
const Producttextbox = styled.div`
  width: 100%;
  height: 100%;
`;
const Producttext = styled.div`
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductMap = ({ paginatedData }) => {
  const navigate = useNavigate();

  const context = useContext(UserContext);
  const { setPname } = context;
  return (
    <>
      {paginatedData.map((pd) => (
        <ProductdivBox key={pd.pno}>
          <Productdiv
            onClick={() => {
              navigate(`/goodsdetail`);
              setPname(pd.pname);
            }}
          >
            <Productimg>
              <img src={pd.pimg} alt="아무거나 쳐봐" />
            </Productimg>
            <Producttextbox>
              <Producttext>{pd.pname}</Producttext>
              <Producttext>{pd.price}</Producttext>
            </Producttextbox>
          </Productdiv>
        </ProductdivBox>
      ))}
    </>
  );
};

export default ProductMap;
