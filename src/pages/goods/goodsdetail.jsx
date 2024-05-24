import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ProductAxiosApi from "../../api/ProductAxios";
import ProductMap from "./product";
import { UserContext } from "../../UserStore";

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  /* background-color: pink; */
  height: 100%;
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
  /* background-color: navy; */
`;

const ProductBox1 = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  /* background-color: red; */
`;

const Pimg = styled.div`
  width: 28%;
  background-color: violet;
  img {
    width: 100%;
  }
  /* background-size: 80%;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.url}); */
`;

const Text = styled.span`
  font-size: 24px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: space-around;
  width: 70%;
  background-color: blue;
`;

const Pdimg = styled.div`
  width: 80%;
  height: 100%;
  /* background-repeat: no-repeat;
  background-image: url(${(props) => props.url}); */
`;
const OPNBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 30%;
  background-color: orange;
`;
const OPNText = styled.div`
  height: 20%;
`;
const OPN = styled.option`
  font-size: 1em;
  border-bottom: 1px solid #ccc;
`;

const Select = styled.select`
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  margin-bottom: 8px;
`;

const ButtonBox = styled.div`
  display: flex;
  width: 50%;
  height: 20%;
  justify-content: space-around;
  background-color: green;
`;

const Price = styled.span`
  text-align: center;
  display: flex;
  justify-content: end;
  align-items: center;
  font-weight: bold;
  width: 50%;
  height: 20%;
  background-color: yellow;
`;

const GoodsDetail = () => {
  const [dtl, setDtl] = useState([]);
  const [proImg, setProImg] = useState();
  const [prodImg, setProdImg] = useState();
  const [option, setOption] = useState();
  const [price, setPrice] = useState();

  const context = useContext(UserContext);
  const { pname, uno } = context;

  useEffect(() => {
    const productDetail = async () => {
      const rsp = await ProductAxiosApi.detailProduct(pname);
      console.log(rsp.data);
      setDtl(rsp.data);
      setProImg(rsp.data[0]?.pimg);
      setProdImg(rsp.data[0]?.pdimg);
      setOption(rsp.data[0]?.pno);
      setPrice(rsp.data[0]?.price);
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
          <ProductBox1>
            <Pimg>
              <img src={proImg} alt="강사님 죄송합니다." />
            </Pimg>
            <TextBox>
              <Text>이세계 아이돌 {pname} 1ST POP-UP STORE OFFICAL MD</Text>
              <OPNBox>
                <OPNText>옵션 선택</OPNText>
                <Select onChange={optionSelect}>
                  {dtl.map((dt) => (
                    <OPN key={dt.pno} value={dt.pno}>
                      {dt.option}
                    </OPN>
                  ))}
                </Select>
              </OPNBox>
              <Price>{price} 원</Price>
              <ButtonBox>
                <button type="button" onClick={cartInsertProduct}>
                  장바구니 넣기
                </button>
                <button type="button" onClick={productInsertSale1}>
                  바로 구매
                </button>
              </ButtonBox>
            </TextBox>
          </ProductBox1>
          <Pdimg>
            <img src={prodImg} alt="강사님 죄송합니다." />
          </Pdimg>
        </Banner>
      </Container>
    </>
  );
};

export default GoodsDetail;
