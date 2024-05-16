import styled from "styled-components";
import ProductAxiosApi from "../../api/GoodsAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
const ProductMap = () => {
  const [prod, setProd] = useState([]);

  useEffect(() => {
    const godProd = async () => {
      const rsp = await ProductAxiosApi.goodAllproduct();
      setProd(rsp.data);
    };
    godProd();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {prod.map((pd) => (
        <Productdiv
          onClick={() => {
            navigate(`/goodsdetail?name=${pd.pname}`);
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
