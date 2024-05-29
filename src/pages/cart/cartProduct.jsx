import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CartAxiosApi from "../../api/CartAxiosApi";
import { UserContext } from "../../UserStore";

const CartContainer = styled.div`
  width: 100%;
  padding: 10px;
`;

const CartHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-bottom: 2px solid #000;
  font-weight: bold;
  font-size: 0.9vw;
`;

const HeaderItem1 = styled.div`
  width: 10%;
  text-align: center;
`;

const HeaderItem2 = styled.div`
  position: relative;
  right: 3%;
  width: 24%;
  text-align: center;
`;

const HeaderItem3 = styled.div`
  width: 15%;
  text-align: center;
`;

const HeaderItem4 = styled.div`
  position: relative;
  right: 0.5%;
  width: 8%;
  text-align: center;
`;

const HeaderItem5 = styled.div`
  position: relative;
  right: 4%;
  width: 10%;
  text-align: center;
`;

const Deletebox = styled.div`
  width: 5%;
  background-color: white;
  img {
    width: 100%;
  }
`;

const Cartproduct = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

const Cartimgbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  img {
    width: 100%;
  }
`;

const CartText1 = styled.div`
  font-weight: bold;
  width: 30%;
  font-size: 0.8vw;
  margin-bottom: 10px;
  /* background-color: red; */
`;

const CartText2 = styled.div`
  width: 20%;
  font-size: 0.73vw;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  /* background-color: blue; */
`;

const CartText3 = styled.div`
  width: 10%;
  font-size: 0.75vw;
  text-align: center;
  /* background-color: violet; */
`;

const CartText4 = styled.div`
  width: 10%;
  font-size: 0.75vw;
  text-align: center;
  /* background-color: aqua; */
`;

const SummaryContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  flex-direction: column;
  border-bottom: 2px solid #e9e3e3;
`;

const SummaryItem = styled.div`
  display: flex;
  width: 20%;
  justify-content: space-between;
  text-align: center;
  font-size: 0.8vw;
  margin-top: 2%;
  margin-bottom: 1%;
  /* background-color: blueviolet; */
`;

const Summarytitle = styled.div``;
const Summarydetail = styled.div``;

const Delivery = styled.span`
  position: relative;
  right: 4%;
  font-size: 0.7vw;
  color: red;
  padding-bottom: 2%;
`;

const SummaryTotal = styled.div`
  width: 20%;
  text-align: center;
  font-size: 1vw;
  font-weight: bold;
  color: blue;
`;

const SummarytotalBox = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: flex-end;
  padding: 4% 0;
`;

const Buttonbox = styled.div`
  padding: 2%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border: 2px solid rgb(240, 90, 153);
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  outline: none;
  &:checked {
    background-color: rgb(240, 90, 153);
    border: none;
  }
  &:checked::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 5px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const Button = styled.button`
  width: 15%;
  padding: 1%;
  background: rgb(240, 90, 153);
  border-radius: 4px;
  border: none;
  color: #fff;
  font-size: 1.1vw;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.01);
    background: rgb(235, 112, 155);
  }
`;

const CartProduct = () => {
  const [crt, setCrt] = useState([]); // 장바구니 보기
  const [checkedItems, setCheckedItems] = useState([]); // 선택된 아이템
  const [isDel, setIsDel] = useState(false); // 장바구니 삭제
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(3000);
  const [selectAll, setSelectAll] = useState(); // 전체 선택 상태

  const context = useContext(UserContext);
  const { uno } = context;

  useEffect(() => {
    const crtProd = async () => {
      const rsp2 = await CartAxiosApi.cartAllselect(uno);
      setCrt(rsp2.data);
    };
    crtProd();
    setIsDel(false);
  }, [isDel]);

  const handleCheck = (e, pd) => {
    if (e.target.checked) {
      setCheckedItems([...checkedItems, pd]);
      setTotalPrice((prevPrice) => prevPrice + pd.price);
    } else {
      setCheckedItems(checkedItems.filter((item) => item.pno !== pd.pno));
      setTotalPrice((prevPrice) => prevPrice - pd.price);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setCheckedItems(crt);
      setTotalPrice(crt.reduce((acc, item) => acc + item.price, 0));
    } else {
      setCheckedItems([]);
      setTotalPrice(0);
    }
    setSelectAll(e.target.checked);
  };

  useEffect(() => {
    setDeliveryFee(totalPrice >= 50000 ? 0 : 3000);
  }, [totalPrice]);

  const cartDelete = async (cno) => {
    console.log(cno);
    try {
      const rsp = await CartAxiosApi.cartDelete(cno);
      console.log(rsp.data);
      setIsDel(true);
    } catch (e) {
      console.log(e);
    }
  };

  const cartDeleteSale = async () => {
    alert("결제가 완료되었습니다.");
    try {
      const rsp = await CartAxiosApi.cartDeleteSale(
        checkedItems.map((item) => item.pno),
        uno
      );
      console.log(rsp.data);
      setIsDel(true);
      setSelectAll(false);
      setTotalPrice(0);
    } catch (e) {
      console.log(e);
    }
  };

  const finalAmount = totalPrice + deliveryFee;

  return (
    <CartContainer>
      <CartHeader>
        <HeaderItem1>
          <Checkbox checked={selectAll} onChange={handleSelectAll} />
        </HeaderItem1>
        <HeaderItem2>상품</HeaderItem2>
        <HeaderItem3>옵션</HeaderItem3>
        <HeaderItem4>배송방법</HeaderItem4>
        <HeaderItem5>가격</HeaderItem5>
      </CartHeader>
      {crt.map((pd) => (
        <Cartproduct key={pd.pno}>
          <Checkbox
            value={pd.pno}
            checked={checkedItems.some((item) => item.pno === pd.pno)}
            onChange={(e) => handleCheck(e, pd)}
          />
          <Cartimgbox>
            <img src={pd.pimg} alt="상품 이미지" />
          </Cartimgbox>
          <CartText1>
            이세계 아이돌 {pd.pname} / 1ST POP-UP STORE OFFICAL MD
          </CartText1>
          <CartText2>{pd.option}</CartText2>
          <CartText4>택배</CartText4>
          <CartText3>{pd.price}원</CartText3>
          <Deletebox>
            <button onClick={() => cartDelete(pd.pno)}>
              <img
                src="https://i.namu.wiki/i/OmG-AXDt3L7SIMTobiuQoA8IB4Om9XPNfSXHVuPie1uC3gflfcL-W23uqdcgJJK0QB3yetg1Tnp1iAW_ag0dwg.webp"
                alt="삭제"
              />
            </button>
          </Deletebox>
        </Cartproduct>
      ))}
      <SummaryContainer>
        <SummaryItem>
          <Summarytitle>상품 가격: </Summarytitle>
          <Summarydetail>{totalPrice}원</Summarydetail>
        </SummaryItem>
        <SummaryItem>
          <Summarytitle>배송비: </Summarytitle>
          <Summarydetail>{deliveryFee}원</Summarydetail>
        </SummaryItem>
        <Delivery>※ 50,000원 이상 구매 시 무료</Delivery>
      </SummaryContainer>
      <SummarytotalBox>
        <SummaryTotal>결제금액: {finalAmount}원</SummaryTotal>
      </SummarytotalBox>
      <Buttonbox>
        <Button type="button" onClick={cartDeleteSale}>
          결제하기
        </Button>
      </Buttonbox>
    </CartContainer>
  );
};

export default CartProduct;
