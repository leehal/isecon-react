import styled from "styled-components";
import ProductAxiosApi from "../../api/ProductAxios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserStore";

const Productdiv = styled.ul`
  width: 30%;
  min-width: 30%;
  height: 20%;
  min-height: 20%;
  background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-style: solid;
  text-align: center;
`;
const Productimg = styled.div`
  width: 90%;
  height: 45%;
  background-image: url(${(props) => props.url});
`;

const Producttext = styled.div`
  width: 90%;
  height: 45%;
`;
const ProductMap = ({ paginatedData }) => {
  const navigate = useNavigate();

  const context = useContext(UserContext);
  const { setPname } = context;
  return (
    <>
      {paginatedData.map((pd) => (
        <Productdiv
          onClick={() => {
            navigate(`/goodsdetail`);
            setPname(pd.pname);
          }}
        >
          <Productimg url={pd.pimg}></Productimg>
          <Producttext>{pd.pname}</Producttext>
          <Producttext>{pd.price}</Producttext>
        </Productdiv>
      ))}
    </>
  );
};

export default ProductMap;
