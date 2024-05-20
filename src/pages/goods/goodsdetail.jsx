import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ProductAxiosApi from "../../api/GoodsAxios";
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

  const context = useContext(UserContext);
  const { pname } = context;

  useEffect(() => {
    const productDetail = async () => {
      const rsp = await ProductAxiosApi.detailProduct(pname);
      console.log(rsp.data);
      setDtl(rsp.data);
      setProImg(rsp.data[0].pimg);
      setProdImg(rsp.data[0].pdimg);
    };
    productDetail();
  }, []);

  return (
    <>
      <Container>
        <Banner>
          <Pimg url={proImg}></Pimg>
          <select>
            {dtl.map((dt) => (
              <OPN key={dtl.pno}>{dt.option}</OPN>
            ))}
          </select>
          <Pdimg url={prodImg}></Pdimg>
        </Banner>
      </Container>
    </>
  );
};

export default GoodsDetail;
