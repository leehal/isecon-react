import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductAxiosApi from "../../api/GoodsAxios";
import ProductMap from "./product";

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
  background-image: url("https://cafe24img.poxo.com/withmuulive/web/product/small/202402/054d9313676e4b3ef01ecef081fa4e9b.jpg");
  /* background-image: url(${(props) => props.url}); */
`;

const Pdimg = styled.div`
  width: 80%;
  height: 100%;
  background-image: url("https://withdrama.speedgabia.com/star-3/ISEGYE/2402/ISEGYE-01.jpg");
  /* background-image: url(${(props) => props.url}); */
`;

const GoodsDetail = () => {
  const [dtl, setDtl] = useState([]);

  useEffect(() => {
    const productDetail = async () => {
      const rsp = await ProductAxiosApi.detailProduct();
      setDtl(rsp.data);
    };
    productDetail();
  }, []);
  return (
    <>
      <Container>
        <Banner>
          <Pimg></Pimg>
          <Pdimg></Pdimg>
        </Banner>
      </Container>
    </>
  );
};

export default GoodsDetail;
