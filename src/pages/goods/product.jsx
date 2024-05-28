import styled from "styled-components";
import ProductAxiosApi from "../../api/ProductAxios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserStore";

const ProductdivBox = styled.div`
  width: 31%;
  height: 20%;
  background: linear-gradient(to top left, #eeeaf8, transparent 50%) top left,
    linear-gradient(to top right, #f8ebf2, transparent 50%) top right,
    linear-gradient(to bottom left, #d9b0da, transparent 50%) bottom left,
    linear-gradient(to bottom right, #dce5fe, transparent 50%) bottom right;
  /* background-color: hotpink; */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0.1, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Productdiv = styled.ul`
  width: 90%;
  height: 85%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f7;
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    img {
      transition: all 0.2s ease-in-out;
      transform: scale(1.02);
    }
  }
`;
const Productimg = styled.div`
  background-color: #f5f5f7;
  padding-top: 10px;
  width: 100%;
  border-bottom: solid 2px #f0e3e9;
  img {
    width: 100%;
  }
  /* background-position: center;
  background-size: contain;
  background-repeat: no-repeat; */
  /* background-image: url(${(props) => props.url}); */
`;
const ProductimgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Producttextbox = styled.div`
  width: 100%;
  height: 100%;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-end;
`;

const KRW = styled.span`
  position: relative;
  top: 12%;
  right: 3%;
  font-size: 1.3em;
`;

const Producttext1 = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Producttext2 = styled.div`
  font-size: 2.4em;
  height: 50%;
  right: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: bisque; */
  position: relative;
`;

const ProductMap = ({ paginatedData }) => {
  const navigate = useNavigate();

  const context = useContext(UserContext);
  const { setPname } = context;

  return (
    <>
      {paginatedData.map((pd) => (
        <ProductdivBox key={pd.pno}>
          <Producttext1>{pd.pname}</Producttext1>
          <Productdiv
            onClick={() => {
              navigate(`/goodsdetail`);
              setPname(pd.pname);
            }}
          >
            <ProductimgBox>
              <Productimg>
                <img src={pd.pimg} alt="아무거나 쳐봐" />
              </Productimg>
            </ProductimgBox>
            <Producttextbox>
              <KRW>KRW</KRW>
              <Producttext2>{pd.price}</Producttext2>
            </Producttextbox>
          </Productdiv>
        </ProductdivBox>
      ))}
    </>
  );
};

export default ProductMap;
