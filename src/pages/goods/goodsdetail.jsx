import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ProductAxiosApi from "../../api/ProductAxios";
import { UserContext } from "../../UserStore";

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const ProductBox = styled.div`
  width: 100%;
  margin-bottom: 3%;
`;

const ProductLine = styled.div`
  width: 100%;
  border: solid 0.5px #ebe3e3;
`;

const Guide = styled.div`
  width: 80%;
  /* background-color: darkred; */
  margin: 15% 0 5% 0;
`;

const Reservation = styled.div`
  width: 100%;
  border: solid 1px black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  /* background-color: pink; */
  font-weight: bold;
`;

const Rsvtext1 = styled.span`
  margin: 2% 0 0 0;
`;
const Rsvtext2 = styled.span`
  margin: 2% 0;
`;

const Intertext1 = styled.span`
  margin-bottom: 0.5%;
`;
const Intertext2 = styled.span``;

const Highlight = styled.span`
  color: red;
`;

const International = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  font-size: 13px;
  color: red;
  margin: 10% 0;
`;

const Pdimg = styled.div`
  img {
    width: "100%";
    border-radius: 10px;
    margin-top: 10px;
  }
`;

const TitleBox = styled.div`
  margin-bottom: 4%;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
  text-align: center;
`;

const Text = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Pimg = styled.div`
  width: 25%;
  img {
    width: 100%;
    border-radius: 10px;
  }
`;

const InfoBox = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const OPNBox = styled.div`
  margin-bottom: 10px;
`;

const OPNText = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
`;

const ShippingInfo = styled.div`
  height: 23%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  color: #555;
  /* background-color: red; */
`;

const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PriceLabel = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const Price = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #d9534f;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  width: 48%;
  padding: 15px;
  background: rgb(240, 90, 153);
  border-radius: 4px;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.01);
    background: rgb(235, 112, 155);
  }
`;

const TableContainer = styled.div`
  width: 100%;
  margin: 10% 0 5% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 50%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 12px;
`;
const Th = styled.th`
  background-color: #f2f2f2;
  font-weight: bold;
  padding: 8px;
  text-align: center;
  border: 1px solid #ddd;
`;

const Td1 = styled.td`
  width: 30%;
  padding: 8px;
  text-align: center;
  border: 1px solid #ddd;
  font-weight: bold;
`;

const Td = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  font-weight: bold;
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
      setDtl(rsp.data);
      setProImg(rsp.data[0]?.pimg);
      setProdImg(rsp.data[0]?.pdimg);
      setOption(rsp.data[0]?.pno);
      setPrice(rsp.data[0]?.price);
    };
    productDetail();
  }, [pname]);

  const optionSelect = (e) => {
    setOption(e.target.value);
  };

  const cartInsertProduct = async () => {
    alert("장바구니 담기 완료!");
    try {
      await ProductAxiosApi.productInsertCart(option, uno);
    } catch (e) {
      console.error(e);
    }
  };

  const productInsertSale1 = async () => {
    alert("결제가 완료 되었습니다.");
    try {
      await ProductAxiosApi.productInsertSale(option, uno);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Banner>
        <ProductBox>
          <TitleBox>
            <Text>이세계 아이돌 {pname} / 1ST POP-UP STORE OFFICAL MD</Text>
          </TitleBox>
          <ContentBox>
            <Pimg>
              <img src={proImg} alt="강사님 죄송합니다." />
            </Pimg>
            <InfoBox>
              <OPNBox>
                <OPNText>옵션 선택</OPNText>
                <Select onChange={optionSelect}>
                  {dtl.map((dt) => (
                    <option key={dt.pno} value={dt.pno}>
                      {dt.option}
                    </option>
                  ))}
                </Select>
              </OPNBox>
              <PriceBox>
                <PriceLabel>가격</PriceLabel>
                <Price>{price} 원</Price>
              </PriceBox>
              <ShippingInfo>
                <div>발송 시작일: 2024-05-30</div>
                <div>국내 배송</div>
                <div>3,000원 (50,000원 이상 구매 시 무료)</div>
              </ShippingInfo>
              <ButtonBox>
                <Button onClick={cartInsertProduct}>장바구니 넣기</Button>
                <Button onClick={productInsertSale1}>바로 구매</Button>
              </ButtonBox>
            </InfoBox>
          </ContentBox>
        </ProductBox>
        <ProductLine></ProductLine>
        <Guide>
          <Reservation>
            <Rsvtext1>
              본 상품은 <Highlight>예약 판매</Highlight> 상품입니다. This
              product is on <Highlight>Pre-order.</Highlight>
            </Rsvtext1>
            <Rsvtext2>
              ※ 발송일 (shipping start on) : <Highlight>2024-05-30</Highlight>
            </Rsvtext2>
          </Reservation>
        </Guide>
        <International>
          <Intertext1>
            ※ 해외 발송의 경우, 사전 고지 된 예약 발송일 보다 국가별로 7일~15일
            (주말/휴일 제외) 정도의 배송기간이 소요되오니 구매 시 참고
            부탁드립니다.
          </Intertext1>
          <Intertext2>
            ※ Please note that overseas shipping takes 7-15 more days per
            country (Excluding weekends/holidays) than the schedule. Please
            check before purchasing.
          </Intertext2>
        </International>
        <Pdimg>
          <img src={prodImg} alt="강사님 죄송합니다." />
        </Pdimg>
        <TableContainer>
          <Title>전자상거래등에서의 상품정보제공 고시</Title>
          <Table>
            <thead>
              <tr>
                <Th>종류</Th>
                <Th>이세계아이돌 - {pname} / 1ST POP-UP STORE OFFICAL MD</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td1>소재</Td1>
                <Td>상세페이지 참고</Td>
              </tr>
              <tr>
                <Td1>사이즈</Td1>
                <Td>상세페이지 참고</Td>
              </tr>
              <tr>
                <Td1>제조자 (수입자)</Td1>
                <Td>㈜코팬글로벌</Td>
              </tr>
              <tr>
                <Td1>제조국</Td1>
                <Td>KOREA</Td>
              </tr>
              <tr>
                <Td1>취급시 주의사항</Td1>
                <Td>화기에 가까이 하지 마세요.</Td>
              </tr>
              <tr>
                <Td1>품질보증기준</Td1>
                <Td>관련 법 및 소비자분쟁 해결기준에 따름.</Td>
              </tr>
              <tr>
                <Td1>법에 의한 인증 및 허가사항</Td1>
                <Td>해당사항 없음</Td>
              </tr>
              <tr>
                <Td1>A/S 책임자와 전화번호</Td1>
                <Td>㈜코팬글로벌 / 1544-4205</Td>
              </tr>
            </tbody>
          </Table>
        </TableContainer>
      </Banner>
    </Container>
  );
};

export default GoodsDetail;
