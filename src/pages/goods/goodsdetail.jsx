import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ProductAxiosApi from "../../api/ProductAxios";
import ProductMap from "./product";
import { UserContext } from "../../UserStore";

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100vw;
  height: 800vh;
  background-color: pink;
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
  background-color: orange;
`;

const Pimg = styled.div`
  width: 80%;
  height: 10%;
  background-size: 80%;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.url});
`;

const Pdimg = styled.div`
  width: 80%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.url});
`;

const OPN = styled.option``;

const GoodsDetail = () => {
  const [dtl, setDtl] = useState([]);
  const [proImg, setProImg] = useState();
  const [prodImg, setProdImg] = useState();
  const [insert, setInsert] = useState();
  const [option, setOption] = useState();

  const context = useContext(UserContext);
  const { pname } = context;

  useEffect(() => {
    const productDetail = async () => {
      const rsp = await ProductAxiosApi.detailProduct(pname);
      console.log(rsp.data);
      setDtl(rsp.data);
      setProImg(rsp.data[0].pimg);
      setProdImg(rsp.data[0].pdimg);
      setOption(rsp.data[0].pno);
    };
    productDetail();
  }, []);

  const optionSelect = (e) => {
    setOption(e.target.value);
  };
  const cartInsertProduct = async () => {
    alert(option);
    try {
      const rsp = await ProductAxiosApi.productInsertCart(option, 1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container>
        <Banner>
          <Pimg url={proImg}></Pimg>
          <select onChange={optionSelect}>
            {dtl.map((dt) => (
              <OPN key={dt.pno} value={dt.pno}>
                {dt.option}
              </OPN>
            ))}
          </select>
          <button type="button" onClick={cartInsertProduct}>
            장바구니 넣기
          </button>
          <Pdimg url={prodImg}></Pdimg>
        </Banner>
      </Container>
    </>
  );
};

export default GoodsDetail;
