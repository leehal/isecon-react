import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ProductAxiosApi from "../../api/ProductAxios";
import ProductMap from "./product";
import { UserContext } from "../../UserStore";

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: pink;
  height: 100%;
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
  /* background-size: 80%;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.url}); */
`;

const Pdimg = styled.div`
  width: 80%;
  height: 100%;
  /* background-repeat: no-repeat;
  background-image: url(${(props) => props.url}); */
`;

const OPN = styled.option``;

const GoodsDetail = () => {
  const [dtl, setDtl] = useState([]);
  const [proImg, setProImg] = useState();
  const [prodImg, setProdImg] = useState();
  const [option, setOption] = useState();

  const context = useContext(UserContext);
  const { pname, uno } = context;

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
    console.log(`프로덕트${option}`);
    try {
      await ProductAxiosApi.productInsertCart(option, uno);
    } catch (e) {
      console.log(e);
    }
  };

  const productInsertSale1 = async () => {
    console.log(`세일${option}`);
    try {
      await ProductAxiosApi.productInsertSale(option, uno);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container>
        <Banner>
          <Pimg>
            <img src={proImg} alt="아무거나 쳐봐" />
          </Pimg>
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
          <button type="button" onClick={productInsertSale1}>
            바로 구매
          </button>
          <Pdimg>
            <img src={prodImg} alt="아무거나 쳐봐" />
          </Pdimg>
        </Banner>
      </Container>
    </>
  );
};

export default GoodsDetail;
